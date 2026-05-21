"use client";

import type { Metadata } from "next";
import { useState, useCallback, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Note: metadata export is only honoured by Server Components.
// If you need metadata for this page, create a separate layout.tsx
// or a parallel route. The page itself must be a Client Component to
// handle form state.

// ─── Types ───────────────────────────────────────────────────────────────────

type Step = "input" | "confirm" | "loading" | "success" | "error";

interface ApiError {
  error: "not_found" | "invalid_email" | "rate_limited" | "internal_error";
}

// ─── Constants ───────────────────────────────────────────────────────────────

const DELETED_DATA_ITEMS = [
  "Your account and login credentials",
  "All saved links and link metadata",
  "All collections you created",
  "All tags you added",
  "Share links you generated",
  "Subscription and billing records",
  "Any app preferences and settings",
];

const ERROR_MESSAGES: Record<ApiError["error"], string> = {
  not_found:
    "No account found with that email address. Please check the email and try again.",
  invalid_email: "Please enter a valid email address.",
  rate_limited:
    "Too many requests. Please wait 15 minutes before trying again.",
  internal_error:
    "Something went wrong on our end. Please try again in a few minutes or email contact@stashly.pro.",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function InputStep({
  email,
  fieldError,
  onChange,
  onSubmit,
}: {
  email: string;
  fieldError: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  const hasError = fieldError.length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="mb-6 text-base leading-relaxed" style={{ color: "#4B5563" }}>
        Enter the email address associated with your Stashly account. We will
        permanently delete your account and all data linked to it.
      </p>

      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium"
        style={{ color: hasError ? "#DC2626" : "#0F0A1E" }}
      >
        Email address
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => onChange(e.target.value)}
        placeholder="you@example.com"
        required
        autoComplete="email"
        aria-describedby={hasError ? "email-error" : undefined}
        aria-invalid={hasError}
        className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all"
        style={{
          border: `1.5px solid ${hasError ? "#FCA5A5" : "#E8E5F5"}`,
          background: hasError ? "#FFF5F5" : "#FFFFFF",
          color: "#0F0A1E",
          boxShadow: hasError ? "0 0 0 3px rgba(220,38,38,0.08)" : "none",
        }}
        onFocus={(e) => {
          if (!hasError) {
            e.currentTarget.style.borderColor = "#6C47FF";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(108,71,255,0.12)";
            e.currentTarget.style.background = "#FFFFFF";
          }
        }}
        onBlur={(e) => {
          if (!hasError) {
            e.currentTarget.style.borderColor = "#E8E5F5";
            e.currentTarget.style.boxShadow = "none";
          }
        }}
      />

      {hasError && (
        <div
          id="email-error"
          role="alert"
          className="flex items-start gap-2 mt-2.5 text-sm"
          style={{ color: "#DC2626" }}
        >
          <svg
            className="shrink-0 mt-0.5"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <circle cx="7" cy="7" r="6.5" stroke="#DC2626" strokeWidth="1.2" />
            <path
              d="M7 4v4M7 9.5v.5"
              stroke="#DC2626"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          {fieldError}
        </div>
      )}

      <button
        type="submit"
        disabled={!email.trim()}
        className="mt-5 w-full py-3 rounded-xl text-base font-semibold transition-all"
        style={{
          background: email.trim() ? "#6C47FF" : "#E8E5F5",
          color: email.trim() ? "#FFFFFF" : "#9CA3AF",
          cursor: email.trim() ? "pointer" : "not-allowed",
        }}
      >
        Continue
      </button>
    </form>
  );
}

function ConfirmStep({
  email,
  onConfirm,
  onCancel,
}: {
  email: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div>
      <p className="mb-1 text-sm font-medium" style={{ color: "#4B5563" }}>
        Account to be deleted
      </p>
      <p
        className="mb-6 text-base font-semibold break-all"
        style={{ color: "#0F0A1E" }}
      >
        {email}
      </p>

      <div
        className="rounded-xl p-5 mb-6"
        style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}
      >
        <p className="text-sm font-semibold mb-3" style={{ color: "#DC2626" }}>
          The following data will be permanently deleted and cannot be recovered:
        </p>
        <ul className="space-y-2">
          {DELETED_DATA_ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#7F1D1D" }}>
              <span className="mt-0.5 shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="7" fill="#DC2626" opacity="0.15" />
                  <path
                    d="M4.5 7.5L6.5 9.5L9.5 5"
                    stroke="#DC2626"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
        This action is irreversible. Once confirmed, your account cannot be
        restored.
      </p>

      <button
        onClick={onConfirm}
        className="w-full py-3 rounded-xl text-base font-semibold transition-all mb-3"
        style={{ background: "#DC2626", color: "#FFFFFF" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#B91C1C")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#DC2626")}
      >
        Permanently Delete My Account
      </button>

      <button
        onClick={onCancel}
        className="w-full py-3 rounded-xl text-base font-medium transition-all"
        style={{
          background: "transparent",
          border: "1.5px solid #E8E5F5",
          color: "#4B5563",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#F9F8FF")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        Cancel
      </button>
    </div>
  );
}

function LoadingStep() {
  return (
    <div className="flex flex-col items-center py-8 gap-5">
      <svg
        className="animate-spin"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke="#E8E5F5"
          strokeWidth="4"
        />
        <path
          d="M20 4a16 16 0 0 1 16 16"
          stroke="#6C47FF"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-base font-medium" style={{ color: "#4B5563" }}>
        Deleting your account and all data&hellip;
      </p>
      <p className="text-sm text-center" style={{ color: "#9CA3AF" }}>
        This may take a few seconds. Please do not close this page.
      </p>
    </div>
  );
}

function SuccessStep() {
  return (
    <div className="flex flex-col items-center py-8 gap-5 text-center">
      <div
        className="flex items-center justify-center w-16 h-16 rounded-full"
        style={{ background: "#F0FDF4" }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#22C55E" opacity="0.15" />
          <path
            d="M9 16.5L13.5 21L23 11"
            stroke="#16A34A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <h2
          className="text-xl font-bold mb-2"
          style={{ color: "#0F0A1E" }}
        >
          Account deleted
        </h2>
        <p className="text-base leading-relaxed" style={{ color: "#4B5563" }}>
          Your account and all associated data have been permanently deleted.
          We&apos;re sorry to see you go.
        </p>
      </div>
      <div
        className="w-full rounded-xl p-4 text-sm text-left"
        style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#166534" }}
      >
        <p className="font-semibold mb-1">What was deleted:</p>
        <p>
          All your links, collections, tags, shared content, and account
          credentials have been permanently removed from our systems.
        </p>
      </div>
      <p className="text-sm" style={{ color: "#9CA3AF" }}>
        Questions? Contact us at{" "}
        <a
          href="mailto:contact@stashly.pro"
          className="underline"
          style={{ color: "#6C47FF" }}
        >
          contact@stashly.pro
        </a>
      </p>
    </div>
  );
}

function ErrorStep({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center py-6 gap-5 text-center">
      <div
        className="flex items-center justify-center w-16 h-16 rounded-full"
        style={{ background: "#FEF2F2" }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#EF4444" opacity="0.15" />
          <path
            d="M16 9v8M16 21v2"
            stroke="#DC2626"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2" style={{ color: "#0F0A1E" }}>
          Could not delete account
        </h2>
        <p className="text-base leading-relaxed" style={{ color: "#4B5563" }}>
          {message}
        </p>
      </div>
      <button
        onClick={onRetry}
        className="w-full py-3 rounded-xl text-base font-semibold transition-all"
        style={{ background: "#6C47FF", color: "#FFFFFF" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#5C3AE8")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#6C47FF")}
      >
        Try again
      </button>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DeleteAccountPage() {
  const [step, setStep] = useState<Step>("input");
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Clear the inline field error whenever the user edits the email
  const handleEmailChange = useCallback((v: string) => {
    setEmail(v);
    if (fieldError) setFieldError("");
  }, [fieldError]);

  const handleContinue = useCallback(() => {
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setFieldError("Please enter a valid email address.");
      return;
    }
    setFieldError("");
    setStep("confirm");
  }, [email]);

  const handleConfirm = useCallback(async () => {
    setStep("loading");
    try {
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      if (res.ok) {
        setStep("success");
        return;
      }

      const data = (await res.json()) as ApiError;

      // "not_found" is an input problem — take the user back to the email
      // field with an inline error rather than showing the full error screen.
      if (data.error === "not_found") {
        setFieldError(
          "No Stashly account found for this email address. Please check and try again."
        );
        setStep("input");
        return;
      }

      setErrorMessage(ERROR_MESSAGES[data.error] ?? ERROR_MESSAGES.internal_error);
      setStep("error");
    } catch {
      setErrorMessage(ERROR_MESSAGES.internal_error);
      setStep("error");
    }
  }, [email]);

  const handleRetry = useCallback(() => {
    setErrorMessage("");
    setFieldError("");
    setStep("input");
  }, []);

  const handleCancel = useCallback(() => {
    setFieldError("");
    setStep("input");
  }, []);

  const stepTitle: Record<Step, string> = {
    input: "Delete your account",
    confirm: "Confirm deletion",
    loading: "Deleting account",
    success: "Account deleted",
    error: "Deletion failed",
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section
          className="pt-32 pb-12"
          style={{ backgroundColor: "#F9F8FF", borderBottom: "1px solid #E8E5F5" }}
        >
          <div className="mx-auto max-w-3xl px-6">
            <p className="mb-3 text-sm font-medium" style={{ color: "#6C47FF" }}>
              Account
            </p>
            <h1
              className="mb-4 text-4xl font-bold tracking-tight"
              style={{ color: "#0F0A1E" }}
            >
              Delete Account
            </h1>
            <p className="text-lg" style={{ color: "#4B5563" }}>
              Permanently remove your account and all associated data from
              Stashly.
            </p>
          </div>
        </section>

        {/* Form card */}
        <section className="py-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-lg px-6">
            {/* Notice banner */}
            {step === "input" && (
              <div
                className="flex gap-3 rounded-xl p-4 mb-8 text-sm"
                style={{
                  background: "#FFF7ED",
                  border: "1px solid #FED7AA",
                  color: "#92400E",
                }}
              >
                <svg
                  className="shrink-0 mt-0.5"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 2L14.5 13H1.5L8 2Z"
                    stroke="#D97706"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 6v4M8 11.5v1"
                    stroke="#D97706"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p>
                  <strong>This action is permanent.</strong> Account deletion
                  cannot be undone. Make sure you have exported any data you
                  want to keep before proceeding.
                </p>
              </div>
            )}

            {/* Card */}
            <div
              className="rounded-2xl p-8"
              style={{
                border: "1px solid #E8E5F5",
                background: "#FFFFFF",
                boxShadow: "0 1px 3px rgba(108,71,255,0.06), 0 4px 16px rgba(0,0,0,0.04)",
              }}
            >
              <h2
                className="text-xl font-bold mb-6"
                style={{ color: "#0F0A1E" }}
              >
                {stepTitle[step]}
              </h2>

              {step === "input" && (
                <InputStep
                  email={email}
                  fieldError={fieldError}
                  onChange={handleEmailChange}
                  onSubmit={handleContinue}
                />
              )}
              {step === "confirm" && (
                <ConfirmStep
                  email={email}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                />
              )}
              {step === "loading" && <LoadingStep />}
              {step === "success" && <SuccessStep />}
              {step === "error" && (
                <ErrorStep message={errorMessage} onRetry={handleRetry} />
              )}
            </div>

            {/* Help text */}
            {(step === "input" || step === "confirm") && (
              <p className="mt-6 text-sm text-center" style={{ color: "#9CA3AF" }}>
                Need help?{" "}
                <a
                  href="mailto:contact@stashly.pro"
                  className="underline transition-colors"
                  style={{ color: "#6C47FF" }}
                >
                  Contact support
                </a>
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
