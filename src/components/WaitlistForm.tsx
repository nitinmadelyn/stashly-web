"use client";

import { useState, type FormEvent } from "react";

type SubmitState = "idle" | "loading" | "success" | "duplicate" | "error";

interface WaitlistFormProps {
  size?: "default" | "large";
}

export default function WaitlistForm({ size = "default" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading" || state === "success") return;

    setState("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.status === 201) {
        setState("success");
        setEmail("");
        return;
      }

      const data: { error?: string } = await res.json();

      if (res.status === 409 || data.error === "already_registered") {
        setState("duplicate");
        return;
      }

      setState("error");
    } catch {
      setState("error");
    }
  }

  const isLarge = size === "large";

  if (state === "success") {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-medium"
        style={{ backgroundColor: "#EDE9FE", color: "#6C47FF" }}
      >
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="12" fill="#6C47FF" />
          <path
            d="M7.5 12.5l3 3 6-6"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>{"You're on the list! We'll let you know when we launch."}</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className={`flex w-full flex-col gap-3 sm:flex-row ${isLarge ? "sm:max-w-xl" : "sm:max-w-md"}`}
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "idle") setState("idle");
          }}
          disabled={state === "loading"}
          className={`flex-1 rounded-xl border px-4 outline-none transition-all duration-150 placeholder:text-gray-400 disabled:opacity-60 ${isLarge ? "h-14 text-base" : "h-12 text-sm"}`}
          style={{
            borderColor: "#E8E5F5",
            backgroundColor: "#FFFFFF",
            color: "#0F0A1E",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#6C47FF";
            e.currentTarget.style.boxShadow = "0 0 0 3px #6c47ff1a";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#E8E5F5";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className={`shrink-0 cursor-pointer rounded-xl font-semibold text-white transition-all duration-150 disabled:opacity-70 ${isLarge ? "h-14 px-8 text-base" : "h-12 px-6 text-sm"}`}
          style={{ backgroundColor: "#6C47FF" }}
          onMouseEnter={(e) => {
            if (state !== "loading")
              e.currentTarget.style.backgroundColor = "#5C3AE8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#6C47FF";
          }}
        >
          {state === "loading" ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Joining...
            </span>
          ) : (
            "Join Waitlist"
          )}
        </button>
      </form>

      {state === "duplicate" && (
        <p className="mt-2 text-sm" style={{ color: "#6C47FF" }}>
          {"You're already on the waitlist. We'll be in touch soon!"}
        </p>
      )}

      {state === "error" && (
        <p className="mt-2 text-sm text-red-500">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
