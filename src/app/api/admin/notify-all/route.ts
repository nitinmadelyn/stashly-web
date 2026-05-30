/**
 * /api/admin/notify-all
 *
 * Sends a push notification to every user who has a registered Expo push token.
 * Intended for "New feature launched" announcements triggered manually.
 *
 * Usage:
 *   curl -X POST https://stashly.pro/api/admin/notify-all \
 *        -H "Authorization: Bearer $CRON_SECRET" \
 *        -H "Content-Type: application/json" \
 *        -d '{"title": "New feature!", "body": "Check out what we just launched."}'
 *
 * Required environment variables:
 *   SUPABASE_URL              — https://<project>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY — service_role secret key
 *   CRON_SECRET               — shared secret (reused from cron setup)
 */

import { NextRequest, NextResponse } from 'next/server';

// ─── Config ───────────────────────────────────────────────────────────────────

const SUPABASE_URL         = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const CRON_SECRET          = process.env.CRON_SECRET!;

/** Expo push API batch limit. */
const EXPO_BATCH_SIZE = 100;

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserRow {
  id: string;
  push_token: string;
}

interface ExpoPushMessage {
  to: string;
  title: string;
  body: string;
  sound: 'default';
  data: { type: string };
}

// ─── Supabase helper ──────────────────────────────────────────────────────────

async function fetchAllPushTokens(): Promise<UserRow[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/users?push_token=not.is.null&select=id,push_token`,
    {
      headers: {
        apikey:        SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        Accept:        'application/json',
      },
    },
  );

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Supabase error ${res.status}: ${body}`);
  }

  return res.json() as Promise<UserRow[]>;
}

// ─── Expo helper ──────────────────────────────────────────────────────────────

async function sendExpoBatch(messages: ExpoPushMessage[]): Promise<void> {
  const res = await fetch('https://exp.host/--/api/v2/push/send', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body:    JSON.stringify(messages),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error(`[notify-all] Expo batch error ${res.status}: ${body}`);
  }
}

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  // ── Auth ─────────────────────────────────────────────────────────────────────
  const auth = req.headers.get('authorization') ?? '';
  if (!CRON_SECRET || auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── Parse body ────────────────────────────────────────────────────────────────
  let title: unknown;
  let body: unknown;

  try {
    const json = await req.json();
    title = json?.title;
    body  = json?.body;
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400 },
    );
  }

  if (typeof title !== 'string' || !title.trim()) {
    return NextResponse.json(
      { error: '`title` is required and must be a non-empty string.' },
      { status: 400 },
    );
  }

  if (typeof body !== 'string' || !body.trim()) {
    return NextResponse.json(
      { error: '`body` is required and must be a non-empty string.' },
      { status: 400 },
    );
  }

  const trimmedTitle = title.trim();
  const trimmedBody  = body.trim();

  const started = Date.now();

  try {
    // ── Fetch all users with a push token ─────────────────────────────────────
    const users = await fetchAllPushTokens();

    if (users.length === 0) {
      return NextResponse.json({ sent: 0, message: 'No users with a push token.' });
    }

    // ── Build messages ────────────────────────────────────────────────────────
    const messages: ExpoPushMessage[] = users.map((u) => ({
      to:    u.push_token,
      title: trimmedTitle,
      body:  trimmedBody,
      sound: 'default',
      data:  { type: 'feature_announcement' },
    }));

    // ── Send in Expo batches ──────────────────────────────────────────────────
    let sent = 0;
    for (let i = 0; i < messages.length; i += EXPO_BATCH_SIZE) {
      await sendExpoBatch(messages.slice(i, i + EXPO_BATCH_SIZE));
      sent += Math.min(EXPO_BATCH_SIZE, messages.length - i);
    }

    const elapsedMs = Date.now() - started;
    console.log(
      `[notify-all] "${trimmedTitle}" sent to ${sent}/${users.length} users in ${elapsedMs}ms`,
    );

    return NextResponse.json({ sent, total: users.length, elapsedMs });
  } catch (err: unknown) {
    console.error('[notify-all] Fatal error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 500 },
    );
  }
}
