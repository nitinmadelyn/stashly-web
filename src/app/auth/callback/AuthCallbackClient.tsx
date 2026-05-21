"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type Phase = "redirecting" | "waiting" | "error";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildDeepLink(code: string | null, hash: string): string | null {
  if (code) {
    return `stashly://?code=${encodeURIComponent(code)}`;
  }
  // Fallback: implicit-flow tokens arrive in the URL fragment (client-side only).
  // Supabase puts them as #access_token=...&refresh_token=...
  if (hash) {
    return `stashly://#${hash}`;
  }
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AuthCallbackClient() {
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<Phase>("redirecting");
  const [errorMsg, setErrorMsg] = useState("");
  const deepLinkRef = useRef<string>("");

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    // Supabase returned an explicit error (e.g. expired OTP, already used).
    if (error) {
      setErrorMsg(
        errorDescription ??
          "Authentication failed. Please go back and request a new magic link."
      );
      setPhase("error");
      return;
    }

    // Resolve the deep link — PKCE code (query param) or implicit tokens (hash).
    const hash = window.location.hash.slice(1);
    const deepLink = buildDeepLink(code, hash);

    if (!deepLink) {
      setErrorMsg(
        "This magic link is invalid or has already been used. Please request a new one."
      );
      setPhase("error");
      return;
    }

    deepLinkRef.current = deepLink;

    // Trigger the app open.
    window.location.href = deepLink;

    // If the app hasn't opened after 2 s, show the manual "Open in Stashly"
    // button so the user isn't left staring at a blank page.
    const timer = window.setTimeout(() => setPhase("waiting"), 2000);
    return () => window.clearTimeout(timer);
  }, [searchParams]);

  // ── Render ────────────────────────────────────────────────────────────────

  if (phase === "error") {
    return (
      <main className="min-h-screen bg-[#F9F8FF] flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Link expired
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            {errorMsg}
          </p>

          <a
            href="https://stashly.pro"
            className="inline-block w-full py-3.5 rounded-xl bg-[#6C47FF] text-white font-semibold text-sm text-center hover:bg-[#5a3dd4] transition-colors"
          >
            Back to Stashly
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9F8FF] flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#EDE9FF] flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-[#6C47FF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Opening Stashly&hellip;
        </h1>

        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          {phase === "redirecting"
            ? "You will be redirected to the app automatically."
            : "The app did not open automatically. Tap the button below."}
        </p>

        {/* Spinner while redirecting */}
        {phase === "redirecting" && (
          <div className="flex justify-center">
            <div className="w-6 h-6 border-2 border-[#6C47FF] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Manual fallback button */}
        {phase === "waiting" && deepLinkRef.current && (
          <a
            href={deepLinkRef.current}
            className="inline-block w-full py-3.5 rounded-xl bg-[#6C47FF] text-white font-semibold text-sm text-center hover:bg-[#5a3dd4] transition-colors"
          >
            Open in Stashly
          </a>
        )}
      </div>
    </main>
  );
}
