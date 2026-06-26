/**
 * /api/cron/og-fetcher
 *
 * Fetches missing Open Graph tags (title, description, thumbnail) for every
 * link that was saved via import (save_from = 'import') and still lacks one or
 * more OG fields.
 *
 * Retry contract
 * ─────────────
 *   - Each day this job runs it picks up all pending import links.
 *   - On a successful fetch  → og_fetch_done = true  (never touched again).
 *   - On a failed fetch      → og_retry_count++, og_last_attempted_at = now().
 *   - Once og_retry_count reaches 3 the link is permanently skipped.
 *   - A link is only retried if og_last_attempted_at is >20 h ago, which
 *     prevents the same link from being retried twice in one calendar day if
 *     the job is accidentally triggered more than once.
 *
 * Schedule: every day at 01:00 IST = 19:30 UTC  →  "30 19 * * *" in vercel.json
 *
 * Required environment variables:
 *   SUPABASE_URL              — https://<project>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY — service_role secret key
 *   CRON_SECRET               — shared secret used by Vercel Cron
 *
 * Manual trigger (for testing):
 *   curl -X POST https://stashly.pro/api/cron/og-fetcher \
 *        -H "Authorization: Bearer $CRON_SECRET"
 */

import { NextRequest, NextResponse } from 'next/server';

// ─── Config ───────────────────────────────────────────────────────────────────

const SUPABASE_URL         = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const CRON_SECRET          = process.env.CRON_SECRET!;

/** Max number of fetch attempts before a link is permanently skipped. */
const MAX_RETRIES = 3;

/** Per-URL fetch timeout in milliseconds. */
const FETCH_TIMEOUT_MS = 8_000;

/** How many links to process in one cron run (stay within Vercel's 60 s limit). */
const BATCH_LIMIT = 200;

/** Minimum gap between retry attempts for the same link. */
const MIN_RETRY_GAP_HOURS = 20;

// ─── Types ────────────────────────────────────────────────────────────────────

interface ImportLink {
  id: string;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  og_retry_count: number;
}

interface OgData {
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
}

interface UpdatePayload {
  title?: string;
  description?: string;
  thumbnail_url?: string;
  og_fetch_done: boolean;
  og_retry_count: number;
  og_last_attempted_at: string;
}

// ─── Supabase helpers ─────────────────────────────────────────────────────────

function supabaseHeaders(): Record<string, string> {
  return {
    apikey:         SUPABASE_SERVICE_KEY,
    Authorization:  `Bearer ${SUPABASE_SERVICE_KEY}`,
    'Content-Type': 'application/json',
    Accept:         'application/json',
  };
}

async function supabaseGet<T>(path: string): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    headers: supabaseHeaders(),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Supabase GET ${path} → ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

async function supabasePatch(path: string, body: object): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    method:  'PATCH',
    headers: { ...supabaseHeaders(), Prefer: 'return=minimal' },
    body:    JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Supabase PATCH ${path} → ${res.status}: ${text}`);
  }
}

// ─── OG tag extraction ────────────────────────────────────────────────────────

/**
 * Fetches the HTML at `url` and extracts og:title, og:description, og:image.
 * Falls back to <title> and <meta name="description"> when OG tags are absent.
 * Returns null for every field that cannot be found.
 *
 * Throws on network error or non-2xx response.
 */
async function fetchOgData(url: string): Promise<OgData> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let html: string;
  try {
    const res = await fetch(url, {
      signal:  controller.signal,
      headers: {
        // Mimic a real browser so sites don't block the bot outright.
        'User-Agent':
          'Mozilla/5.0 (compatible; Stashly/1.0; +https://stashly.pro)',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      redirect: 'follow',
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    // Only read the first 100 KB — <head> always comes first and this keeps
    // memory usage low for large pages.
    const reader = res.body?.getReader();
    if (!reader) throw new Error('No response body');

    const chunks: Uint8Array[] = [];
    let totalBytes = 0;
    const MAX_BYTES = 100_000;

    while (true) {
      const { done, value } = await reader.read();
      if (done || !value) break;
      chunks.push(value);
      totalBytes += value.byteLength;
      if (totalBytes >= MAX_BYTES) {
        await reader.cancel();
        break;
      }
    }

    html = new TextDecoder().decode(
      chunks.reduce((acc, chunk) => {
        const merged = new Uint8Array(acc.length + chunk.length);
        merged.set(acc);
        merged.set(chunk, acc.length);
        return merged;
      }, new Uint8Array(0)),
    );
  } finally {
    clearTimeout(timer);
  }

  return parseOgFromHtml(html);
}

/**
 * Extracts OG / meta tags from raw HTML without a DOM parser.
 * Handles both single- and double-quoted attribute values and self-closing tags.
 */
function parseOgFromHtml(html: string): OgData {
  // Stop at </head> to avoid scanning the entire body.
  const headEnd = html.toLowerCase().indexOf('</head>');
  const head = headEnd === -1 ? html : html.slice(0, headEnd);

  function extractMeta(
    property: string,
    attrName: 'property' | 'name',
  ): string | null {
    // Matches: <meta property="og:title" content="…"> in any attribute order.
    const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(
      `<meta[^>]+${attrName}=["']${escaped}["'][^>]+content=["']([^"']+)["']` +
        `|<meta[^>]+content=["']([^"']+)["'][^>]+${attrName}=["']${escaped}["']`,
      'i',
    );
    const m = re.exec(head);
    if (!m) return null;
    const raw = (m[1] ?? m[2] ?? '').trim();
    return raw ? decodeHtmlEntities(raw) : null;
  }

  function extractTitle(): string | null {
    const m = /<title[^>]*>([^<]+)<\/title>/i.exec(head);
    if (!m) return null;
    const raw = m[1].trim();
    return raw ? decodeHtmlEntities(raw) : null;
  }

  const ogTitle       = extractMeta('og:title',       'property');
  const ogDescription = extractMeta('og:description', 'property');
  const ogImage       = extractMeta('og:image',       'property');

  const metaDescription = extractMeta('description', 'name');
  const htmlTitle       = extractTitle();

  return {
    title:         ogTitle       ?? htmlTitle       ?? null,
    description:   ogDescription ?? metaDescription ?? null,
    thumbnail_url: ogImage ?? null,
  };
}

/**
 * Decodes the most common HTML entities that appear in meta tag content.
 * A full parser is overkill here; this covers 99 % of real-world cases.
 */
function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/gi,   '&')
    .replace(/&lt;/gi,    '<')
    .replace(/&gt;/gi,    '>')
    .replace(/&quot;/gi,  '"')
    .replace(/&#39;/gi,   "'")
    .replace(/&apos;/gi,  "'")
    .replace(/&#x27;/gi,  "'")
    .replace(/&#x2F;/gi,  '/')
    .replace(/&nbsp;/gi,  ' ')
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCharCode(parseInt(code, 10)),
    );
}

// ─── Core processing ──────────────────────────────────────────────────────────

async function processBatch(links: ImportLink[]): Promise<{
  succeeded: number;
  failed: number;
  permanentlySkipped: number;
}> {
  let succeeded = 0;
  let failed = 0;
  let permanentlySkipped = 0;

  // Process sequentially to avoid hammering external servers all at once.
  for (const link of links) {
    const now = new Date().toISOString();

    // Determine which fields are still missing.
    const needsTitle       = !link.title?.trim();
    const needsDescription = !link.description?.trim();
    const needsThumbnail   = !link.thumbnail_url?.trim();

    if (!needsTitle && !needsDescription && !needsThumbnail) {
      // All fields already present — mark done without a fetch.
      await supabasePatch(`/links?id=eq.${link.id}`, {
        og_fetch_done:        true,
        og_last_attempted_at: now,
      }).catch((err: unknown) =>
        console.error(`[og-fetcher] patch done-mark ${link.id}:`, err),
      );
      succeeded++;
      continue;
    }

    let ogData: OgData | null = null;
    let fetchError: string | null = null;

    try {
      ogData = await fetchOgData(link.url);
    } catch (err: unknown) {
      fetchError =
        err instanceof Error ? err.message : String(err);
    }

    if (ogData !== null) {
      // Build the update payload — only overwrite fields that are missing.
      const patch: UpdatePayload = {
        og_fetch_done:        true,
        og_retry_count:       link.og_retry_count,
        og_last_attempted_at: now,
      };

      if (needsTitle       && ogData.title)         patch.title         = ogData.title;
      if (needsDescription && ogData.description)   patch.description   = ogData.description;
      if (needsThumbnail   && ogData.thumbnail_url) patch.thumbnail_url = ogData.thumbnail_url;

      try {
        await supabasePatch(`/links?id=eq.${link.id}`, patch);
        succeeded++;
      } catch (err: unknown) {
        console.error(`[og-fetcher] DB update failed for ${link.id}:`, err);
        failed++;
      }
    } else {
      // Fetch failed — increment retry counter.
      const newRetryCount = link.og_retry_count + 1;
      const isExhausted   = newRetryCount >= MAX_RETRIES;

      if (isExhausted) permanentlySkipped++;
      else             failed++;

      console.warn(
        `[og-fetcher] fetch failed for ${link.id} (attempt ${newRetryCount}/${MAX_RETRIES}):`,
        fetchError,
      );

      await supabasePatch(`/links?id=eq.${link.id}`, {
        og_retry_count:       newRetryCount,
        og_last_attempted_at: now,
        // If exhausted we don't set og_fetch_done=true; we simply let the
        // index predicate (og_retry_count < 3) filter it out forever.
      }).catch((err: unknown) =>
        console.error(`[og-fetcher] retry-count update failed for ${link.id}:`, err),
      );
    }
  }

  return { succeeded, failed, permanentlySkipped };
}

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest): Promise<NextResponse> {
  // ── Auth ─────────────────────────────────────────────────────────────────────
  const auth = req.headers.get('authorization') ?? '';
  if (!CRON_SECRET || auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const started = Date.now();

  try {
    // ── Fetch pending links ───────────────────────────────────────────────────
    //
    // Conditions:
    //   save_from        = 'import'
    //   og_fetch_done    = false        (not yet successfully fetched)
    //   og_retry_count   < MAX_RETRIES  (not permanently exhausted)
    //   og_last_attempted_at IS NULL    (never tried)
    //     OR
    //   og_last_attempted_at < now - 20h  (enough time since last attempt)
    //
    // The Supabase REST API doesn't support OR across columns natively in a
    // single query param, so we use the `or` query parameter.

    const cutoff = new Date(
      Date.now() - MIN_RETRY_GAP_HOURS * 60 * 60 * 1_000,
    ).toISOString();

    const qs = new URLSearchParams({
      save_from:       'eq.import',
      og_fetch_done:   'eq.false',
      og_retry_count:  `lt.${MAX_RETRIES}`,
      or:              `(og_last_attempted_at.is.null,og_last_attempted_at.lt.${cutoff})`,
      select:          'id,url,title,description,thumbnail_url,og_retry_count',
      order:           'og_retry_count.asc,created_at.asc',
      limit:           String(BATCH_LIMIT),
    });

    const links = await supabaseGet<ImportLink[]>(`/links?${qs.toString()}`);

    if (links.length === 0) {
      return NextResponse.json({
        message:   'No pending import links.',
        elapsedMs: Date.now() - started,
      });
    }

    console.log(`[og-fetcher] Processing ${links.length} import links…`);

    // ── Process ───────────────────────────────────────────────────────────────
    const { succeeded, failed, permanentlySkipped } = await processBatch(links);

    const elapsedMs = Date.now() - started;
    console.log(
      `[og-fetcher] Done in ${elapsedMs}ms — ` +
        `succeeded=${succeeded} failed=${failed} permanentlySkipped=${permanentlySkipped}`,
    );

    return NextResponse.json({
      processed:          links.length,
      succeeded,
      failed,
      permanentlySkipped,
      elapsedMs,
    });
  } catch (err: unknown) {
    console.error('[og-fetcher] Fatal error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 500 },
    );
  }
}

// Vercel Cron only calls POST — no GET handler needed.
export const dynamic = 'force-dynamic';
