/**
 * /api/cron/weekly-digest
 *
 * Server-side cron handler that sends a personalised weekly activity push
 * notification to every user who has opted in.
 *
 * Triggered by Vercel Cron on every Monday at 10:00 UTC (see vercel.json).
 * Also callable manually with:
 *   curl -X POST https://stashly.pro/api/cron/weekly-digest \
 *        -H "Authorization: Bearer $CRON_SECRET"
 *
 * Environment variables required:
 *   SUPABASE_URL          — https://<project>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY  — service_role key (bypasses RLS for admin reads)
 *   CRON_SECRET           — shared secret that protects this endpoint
 *
 * Expo Push API docs: https://docs.expo.dev/push-notifications/sending-notifications/
 */

import { NextRequest, NextResponse } from 'next/server';

// ─── Config ───────────────────────────────────────────────────────────────────

const SUPABASE_URL         = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const CRON_SECRET          = process.env.CRON_SECRET!;

/** Expo push API batch limit. */
const EXPO_BATCH_SIZE = 100;

// ─── Types ────────────────────────────────────────────────────────────────────

interface DigestUser {
  id: string;
  push_token: string;
  email: string;
}

interface ExpoPushMessage {
  to: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  sound?: 'default';
  badge?: number;
}

// ─── Helper: Supabase admin fetch ─────────────────────────────────────────────

async function supabaseAdmin<T>(path: string): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    headers: {
      apikey:        SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      Accept:        'application/json',
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Supabase error ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

// ─── Helper: count links saved last week for a user ──────────────────────────
async function countLinksLastWeek(userId: string): Promise<number> {
  // Last week = previous Mon 00:00:00 UTC  →  this Mon 00:00:00 UTC
  const now  = new Date();
  const day  = now.getUTCDay(); // 0 = Sun, 1 = Mon, …
  const daysToLastMon = day === 0 ? 6 : day;          // days since last Monday
  const thisMonday  = new Date(now);
  thisMonday.setUTCDate(now.getUTCDate() - daysToLastMon);
  thisMonday.setUTCHours(0, 0, 0, 0);

  const lastMonday = new Date(thisMonday);
  lastMonday.setUTCDate(thisMonday.getUTCDate() - 7);

  const qs = new URLSearchParams({
    user_id:    `eq.${userId}`,
    created_at: `gte.${lastMonday.toISOString()}`,
    // Filter to created_at < this Monday as well
    'created_at.lt': thisMonday.toISOString(),
    select:     'id',
  });

  // Use HEAD with Prefer: count=exact to avoid fetching all rows
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/links?user_id=eq.${encodeURIComponent(userId)}&created_at=gte.${lastMonday.toISOString()}&created_at=lt.${thisMonday.toISOString()}&select=id`,
    {
      method:  'HEAD',
      headers: {
        apikey:        SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        Prefer:        'count=exact',
      },
    },
  );

  if (!res.ok) return 0;
  const range = res.headers.get('content-range'); // e.g. "0-9/42"
  if (!range) return 0;
  const total = range.split('/')[1];
  return total ? parseInt(total, 10) : 0;
}

// ─── Helper: compose message based on activity ───────────────────────────────

function composeMessage(linkCount: number): { title: string; body: string } {
  if (linkCount === 0) {
    return {
      title: 'Your Stashly weekly digest',
      body:  "You haven't saved any links this week. Open the app and start stashing!",
    };
  }

  if (linkCount === 1) {
    return {
      title: 'Your Stashly weekly digest',
      body:  'You saved 1 link this week. Keep building your stash!',
    };
  }

  if (linkCount < 10) {
    return {
      title: 'Your Stashly weekly digest',
      body:  `You saved ${linkCount} links this week. Nice work — they're all waiting for you.`,
    };
  }

  return {
    title: 'Your Stashly weekly digest',
    body:  `You saved ${linkCount} links this week! Your stash is growing nicely.`,
  };
}

// ─── Helper: send a batch of Expo push messages ───────────────────────────────

async function sendExpoBatch(messages: ExpoPushMessage[]): Promise<void> {
  const res = await fetch('https://exp.host/--/api/v2/push/send', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body:    JSON.stringify(messages),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error(`Expo push error ${res.status}: ${body}`);
  }
}

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest): Promise<NextResponse> {
  // ── Auth ────────────────────────────────────────────────────────────────────
  const auth = req.headers.get('authorization') ?? '';
  if (!CRON_SECRET || auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const started = Date.now();

  try {
    // ── Fetch eligible users ─────────────────────────────────────────────────
    // Users who have a push token and haven't opted out.
    const users = await supabaseAdmin<DigestUser[]>(
      '/users?push_token=not.is.null&notify_weekly_digest=eq.true&select=id,push_token,email',
    );

    if (users.length === 0) {
      return NextResponse.json({ sent: 0, message: 'No eligible users.' });
    }

    // ── Build personalised messages ──────────────────────────────────────────
    const messages: ExpoPushMessage[] = [];

    await Promise.all(
      users.map(async (user) => {
        try {
          const count = await countLinksLastWeek(user.id);
          const { title, body } = composeMessage(count);
          messages.push({
            to:    user.push_token,
            title,
            body,
            sound: 'default',
            data:  { type: 'weekly_digest', userId: user.id },
          });
        } catch {
          // Skip individual users that error — never abort the whole batch.
        }
      }),
    );

    // ── Send in batches of EXPO_BATCH_SIZE ───────────────────────────────────
    let sent = 0;
    for (let i = 0; i < messages.length; i += EXPO_BATCH_SIZE) {
      const batch = messages.slice(i, i + EXPO_BATCH_SIZE);
      await sendExpoBatch(batch);
      sent += batch.length;
    }

    const elapsed = Date.now() - started;
    console.log(`[weekly-digest] Sent ${sent}/${users.length} notifications in ${elapsed}ms`);

    return NextResponse.json({
      sent,
      eligible: users.length,
      elapsedMs: elapsed,
    });
  } catch (err) {
    console.error('[weekly-digest] Fatal error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 500 },
    );
  }
}

// Vercel cron only sends POST — no GET handler needed...
export const dynamic = 'force-dynamic';
