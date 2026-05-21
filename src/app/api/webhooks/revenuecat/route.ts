/**
 * POST /api/webhooks/revenuecat
 *
 * Receives RevenueCat server-to-server webhook events and keeps the
 * public.users plan columns in sync with the subscriber's actual entitlement.
 *
 * Security
 * --------
 * RevenueCat sends the secret you configure in the RC Dashboard
 * (Project → Integrations → Webhooks → Authorization header) as a plain
 * string in the "Authorization" request header.  We reject anything that
 * doesn't match REVENUECAT_WEBHOOK_SECRET from environment variables.
 *
 * Database writes
 * ---------------
 * All updates use the Supabase service-role client (bypasses RLS) because
 * this route runs without a user session.
 *
 * Event handling
 * --------------
 * INITIAL_PURCHASE | RENEWAL | UNCANCELLATION | PRODUCT_CHANGE
 *   → plan = 'pro', plan_expires_at = expiration_at_ms, rc_customer_id set
 *
 * EXPIRATION
 *   → plan = 'free', plan_expires_at = null
 *
 * CANCELLATION | BILLING_ISSUE
 *   → no immediate plan change; user keeps Pro until the period actually
 *     expires.  RevenueCat will send EXPIRATION when the time comes.
 *
 * SUBSCRIBER_ALIAS | TEST | * (unknown)
 *   → acknowledged with 200, no DB write
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Event types that grant or extend an active Pro entitlement. */
const GRANT_EVENTS = new Set([
  "INITIAL_PURCHASE",
  "RENEWAL",
  "UNCANCELLATION",
  "PRODUCT_CHANGE",
  "TRANSFER",
]);

/** Event types that definitively end the Pro entitlement. */
const REVOKE_EVENTS = new Set([
  "EXPIRATION",
]);

/**
 * Partial shape of a RevenueCat webhook event object.
 * Only fields this handler actually reads are declared.
 * https://www.revenuecat.com/docs/integrations/webhooks/event-flows
 */
interface RCEvent {
  /** Unique event ID — safe to use as an idempotency key if needed. */
  id: string;
  /** The event type string, e.g. "INITIAL_PURCHASE". */
  type: string;
  /**
   * The app_user_id we set via Purchases.logIn(supabaseUserId).
   * Equals the Supabase user UUID for all identified users.
   */
  app_user_id: string;
  /**
   * The original app_user_id (pre-alias / pre-login).
   * May differ from app_user_id if the user was anonymous before identifying.
   * We prefer app_user_id for DB lookups.
   */
  original_app_user_id: string;
  /**
   * Unix timestamp in milliseconds when the current paid period expires.
   * Null for lifetime purchases or when not applicable.
   */
  expiration_at_ms: number | null;
  /** "SANDBOX" in TestFlight / Google internal testing, "PRODUCTION" in prod. */
  environment: "SANDBOX" | "PRODUCTION";
}

interface RCWebhookBody {
  api_version: string;
  event: RCEvent;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getWebhookSecret(): string {
  const secret = process.env.REVENUECAT_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error(
      "REVENUECAT_WEBHOOK_SECRET environment variable is not set."
    );
  }
  return secret;
}

function msToTimestamp(ms: number | null): string | null {
  if (ms === null || !Number.isFinite(ms) || ms <= 0) return null;
  return new Date(ms).toISOString();
}

/**
 * Extract the canonical user ID from an RC event.
 * We always call Purchases.logIn(supabaseUserId) so app_user_id is the UUID.
 * Falls back to original_app_user_id if app_user_id is an anonymous RC ID
 * (anonymous IDs start with "$RCAnonymousID:").
 */
function resolveSupabaseUserId(event: RCEvent): string | null {
  const id = event.app_user_id;
  if (id && !id.startsWith("$RCAnonymousID:")) return id;
  const orig = event.original_app_user_id;
  if (orig && !orig.startsWith("$RCAnonymousID:")) return orig;
  return null;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest): Promise<NextResponse> {
  // 1. Verify Authorization header ─────────────────────────────────────────
  let secret: string;
  try {
    secret = getWebhookSecret();
  } catch (err) {
    console.error("[rc-webhook] Configuration error:", err);
    return NextResponse.json(
      { error: "Webhook not configured." },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization") ?? "";
  if (authHeader !== secret) {
    console.warn("[rc-webhook] Rejected request: invalid Authorization header.");
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // 2. Parse body ───────────────────────────────────────────────────────────
  let body: RCWebhookBody;
  try {
    body = (await request.json()) as RCWebhookBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const event = body?.event;
  if (!event || typeof event.type !== "string" || typeof event.app_user_id !== "string") {
    return NextResponse.json(
      { error: "Malformed event payload." },
      { status: 400 }
    );
  }

  const { type, environment } = event;

  console.info(
    `[rc-webhook] event=${type} env=${environment} app_user_id=${event.app_user_id} id=${event.id}`
  );

  // 3. Resolve the Supabase user ID ─────────────────────────────────────────
  const userId = resolveSupabaseUserId(event);
  if (!userId) {
    // Anonymous RC user — we cannot map to a Supabase row yet.
    // Return 200 so RC does not retry; we will reconcile if the user later
    // identifies via Purchases.logIn().
    console.warn(
      `[rc-webhook] Skipping anonymous user: app_user_id=${event.app_user_id}`
    );
    return NextResponse.json({ received: true, skipped: "anonymous_user" });
  }

  // 4. Determine the plan update ────────────────────────────────────────────
  if (GRANT_EVENTS.has(type)) {
    const planExpiresAt = msToTimestamp(event.expiration_at_ms);

    const { error } = await supabaseAdmin
      .from("users")
      .update({
        plan: "pro",
        plan_expires_at: planExpiresAt,
        rc_customer_id: userId,
      })
      .eq("id", userId);

    if (error) {
      console.error(
        `[rc-webhook] Failed to grant Pro for user=${userId}:`,
        error
      );
      // Return 500 so RevenueCat retries the delivery.
      return NextResponse.json(
        { error: "Database update failed." },
        { status: 500 }
      );
    }

    console.info(
      `[rc-webhook] Granted Pro: user=${userId} expires=${planExpiresAt ?? "never"}`
    );
    return NextResponse.json({ received: true, action: "granted_pro" });
  }

  if (REVOKE_EVENTS.has(type)) {
    const { error } = await supabaseAdmin
      .from("users")
      .update({
        plan: "free",
        plan_expires_at: null,
      })
      .eq("id", userId);

    if (error) {
      console.error(
        `[rc-webhook] Failed to revoke Pro for user=${userId}:`,
        error
      );
      return NextResponse.json(
        { error: "Database update failed." },
        { status: 500 }
      );
    }

    console.info(`[rc-webhook] Revoked Pro: user=${userId} (event=${type})`);
    return NextResponse.json({ received: true, action: "revoked_pro" });
  }

  // CANCELLATION / BILLING_ISSUE — user keeps Pro until expiration_at_ms.
  // Ensure rc_customer_id is recorded if this is the first event we've seen.
  if (type === "CANCELLATION" || type === "BILLING_ISSUE") {
    // Do a no-op plan update but still persist rc_customer_id if missing.
    const { error } = await supabaseAdmin
      .from("users")
      .update({ rc_customer_id: userId })
      .eq("id", userId)
      .is("rc_customer_id", null); // Only write if not yet set — avoids spurious writes.

    if (error) {
      // Non-fatal: log and continue. The user keeps their current plan state.
      console.warn(
        `[rc-webhook] Could not upsert rc_customer_id for user=${userId}:`,
        error
      );
    }

    console.info(
      `[rc-webhook] Acknowledged ${type} for user=${userId} — plan unchanged until expiration.`
    );
    return NextResponse.json({ received: true, action: "acknowledged" });
  }

  // All other event types (SUBSCRIBER_ALIAS, TEST, etc.) — acknowledge only.
  console.info(`[rc-webhook] No action for event type=${type}.`);
  return NextResponse.json({ received: true, action: "no_op" });
}
