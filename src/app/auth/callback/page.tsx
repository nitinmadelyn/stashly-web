import type { Metadata } from "next";
import { Suspense } from "react";

import AuthCallbackClient from "./AuthCallbackClient";

export const metadata: Metadata = {
  title: "Opening Stashly...",
  robots: { index: false, follow: false },
};

/**
 * /auth/callback
 *
 * Acts as a pass-through between Supabase's email verification redirect and
 * the Stashly iOS/Android app.
 *
 * Flow:
 *   1. Supabase verifies the magic-link OTP and redirects to this URL with
 *      a PKCE authorization code: /auth/callback?code=<code>
 *   2. This page loads in the user's browser (Safari, Gmail in-app browser, etc.)
 *   3. The client component does window.location.href = "stashly://?code=<code>"
 *   4. iOS opens the Stashly app with the code; the app calls
 *      supabase.auth.exchangeCodeForSession(code) to complete sign-in.
 *
 * Why not redirect directly to stashly:// from Supabase?
 *   Supabase issues an HTTP 302 to the custom scheme.  Gmail's in-app WKWebView
 *   (and some other email clients) inconsistently handle server-side HTTP
 *   redirects to custom URL schemes — the app may open without the query
 *   parameters, or not open at all.  A client-side JS redirect from our own
 *   HTTPS page is handled correctly by all browsers/WebViews on iOS and Android.
 */
export default function AuthCallbackPage() {
  return (
    <Suspense>
      <AuthCallbackClient />
    </Suspense>
  );
}
