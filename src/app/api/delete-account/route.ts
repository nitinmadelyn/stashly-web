/**
 * POST /api/delete-account
 *
 * Permanently deletes a Stashly account and all data associated with it.
 *
 * Required for Google Play Data Safety and Apple App Store privacy policy
 * compliance — users must be able to request deletion from outside the app.
 *
 * Request body:  { email: string }
 * Success:       { success: true, message: string }              HTTP 200
 * Not found:     { success: false, error: "not_found" }          HTTP 404
 * Bad input:     { success: false, error: "invalid_email" }      HTTP 400
 * Rate limited:  { success: false, error: "rate_limited" }       HTTP 429
 * Server error:  { success: false, error: "internal_error" }     HTTP 500
 *
 * Deletion order
 * --------------
 * We delete child rows explicitly before calling auth.admin.deleteUser so
 * the operation succeeds even if FK cascade rules are not fully in place.
 *
 *   1. shared_links
 *   2. shared_collections
 *   3. Fetch link IDs for the user, then delete link_tags + link_collections
 *   4. links
 *   5. collections
 *   6. tags
 *   7. user_categories
 *   8. public.users  (profile row)
 *   9. auth.users    (via admin.deleteUser — invalidates all sessions/tokens)
 *
 * Rate limiting
 * -------------
 * In-memory Map keyed by IP, max 5 attempts per 15-minute window.
 * NOTE: on serverless runtimes (Vercel) each cold-start has its own Map, so
 * this provides best-effort protection. Replace with Upstash Redis for
 * guaranteed enforcement across instances.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// ─── Rate limiter ────────────────────────────────────────────────────────────

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

interface RateEntry {
  count: number;
  windowStart: number;
}

const rateLimitMap = new Map<string, RateEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= MAX_REQUESTS) return true;
  entry.count += 1;
  return false;
}

function pruneRateLimitMap(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now - entry.windowStart > WINDOW_MS) rateLimitMap.delete(key);
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function json<T>(body: T, status: number) {
  return NextResponse.json(body, { status });
}

// Silently ignore "table does not exist" errors — schema may vary across
// deployments; anything else is a real error worth logging.
function isTableMissingError(error: unknown): boolean {
  const e = error as { code?: string };
  return e?.code === "42P01";
}

// ─── Route handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (Math.random() < 0.05) pruneRateLimitMap();

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return json({ success: false, error: "rate_limited" }, 429);
  }

  // ── Parse + validate body ──────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ success: false, error: "invalid_email" }, 400);
  }

  if (typeof body !== "object" || body === null || !("email" in body)) {
    return json({ success: false, error: "invalid_email" }, 400);
  }

  const rawEmail = (body as Record<string, unknown>).email;
  if (typeof rawEmail !== "string" || !isValidEmail(rawEmail.trim())) {
    return json({ success: false, error: "invalid_email" }, 400);
  }

  const email = rawEmail.trim().toLowerCase();

  // ── Resolve user from public.users ────────────────────────────────────────
  const { data: profile, error: profileError } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (profileError) {
    console.error("[delete-account] profile lookup:", profileError);
    return json({ success: false, error: "internal_error" }, 500);
  }

  if (!profile) {
    return json({ success: false, error: "not_found" }, 404);
  }

  const userId = profile.id as string;

  // ── 1. shared_links ───────────────────────────────────────────────────────
  {
    const { error } = await supabaseAdmin
      .from("shared_links")
      .delete()
      .eq("user_id", userId);
    if (error && !isTableMissingError(error)) {
      console.error("[delete-account] shared_links:", error);
    }
  }

  // ── 2. shared_collections ─────────────────────────────────────────────────
  {
    const { error } = await supabaseAdmin
      .from("shared_collections")
      .delete()
      .eq("user_id", userId);
    if (error && !isTableMissingError(error)) {
      console.error("[delete-account] shared_collections:", error);
    }
  }

  // ── 3. Fetch link IDs then delete link_tags + link_collections ────────────
  {
    const { data: links } = await supabaseAdmin
      .from("links")
      .select("id")
      .eq("user_id", userId);

    const linkIds = (links ?? []).map((l) => (l as { id: string }).id);

    if (linkIds.length > 0) {
      const { error: ltErr } = await supabaseAdmin
        .from("link_tags")
        .delete()
        .in("link_id", linkIds);
      if (ltErr && !isTableMissingError(ltErr)) {
        console.error("[delete-account] link_tags:", ltErr);
      }

      const { error: lcErr } = await supabaseAdmin
        .from("link_collections")
        .delete()
        .in("link_id", linkIds);
      if (lcErr && !isTableMissingError(lcErr)) {
        console.error("[delete-account] link_collections:", lcErr);
      }
    }
  }

  // ── 4. links ──────────────────────────────────────────────────────────────
  {
    const { error } = await supabaseAdmin
      .from("links")
      .delete()
      .eq("user_id", userId);
    if (error && !isTableMissingError(error)) {
      console.error("[delete-account] links:", error);
    }
  }

  // ── 5. collections ────────────────────────────────────────────────────────
  {
    const { error } = await supabaseAdmin
      .from("collections")
      .delete()
      .eq("user_id", userId);
    if (error && !isTableMissingError(error)) {
      console.error("[delete-account] collections:", error);
    }
  }

  // ── 6. tags ───────────────────────────────────────────────────────────────
  {
    const { error } = await supabaseAdmin
      .from("tags")
      .delete()
      .eq("user_id", userId);
    if (error && !isTableMissingError(error)) {
      console.error("[delete-account] tags:", error);
    }
  }

  // ── 7. user_categories ────────────────────────────────────────────────────
  {
    const { error } = await supabaseAdmin
      .from("user_categories")
      .delete()
      .eq("user_id", userId);
    if (error && !isTableMissingError(error)) {
      console.error("[delete-account] user_categories:", error);
    }
  }

  // ── 8. public.users ───────────────────────────────────────────────────────
  {
    const { error } = await supabaseAdmin
      .from("users")
      .delete()
      .eq("id", userId);
    if (error) {
      console.error("[delete-account] public.users:", error);
      // Continue — auth user deletion is the authoritative step
    }
  }

  // ── 9. auth.users — final + authoritative ─────────────────────────────────
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (authError) {
    console.error("[delete-account] auth.admin.deleteUser:", authError);
    return json({ success: false, error: "internal_error" }, 500);
  }

  return json(
    {
      success: true,
      message:
        "Your account and all associated data have been permanently deleted.",
    },
    200
  );
}
