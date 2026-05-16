import WaitlistForm from "@/components/WaitlistForm";

export default function WaitlistCTA() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#0F0A1E" }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "#6C47FF" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        {/* Badge */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide"
          style={{ backgroundColor: "#1A1030", color: "#A87FFF" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "#A87FFF" }}
          />
          Early access
        </div>

        <h2
          className="text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl"
          style={{ color: "#FFFFFF" }}
        >
          Be the first to use Stashly
        </h2>

        <p
          className="mt-5 text-pretty text-base leading-relaxed"
          style={{ color: "#9CA3AF" }}
        >
          Join the waitlist and get notified the moment we launch. Early users
          will get extended free access and a direct line to shape the product.
        </p>

        {/* Form — centered */}
        <div className="mt-8 flex justify-center">
          <WaitlistForm size="large" />
        </div>

        <p className="mt-4 text-xs" style={{ color: "#4B5563" }}>
          Free forever to start. No spam, ever. Unsubscribe any time.
        </p>

        {/* Three value props */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {[
            "Save from any app",
            "Find in seconds",
            "Share collections",
          ].map((v) => (
            <div
              key={v}
              className="flex items-center gap-2 text-sm"
              style={{ color: "#9CA3AF" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="8" fill="#6C47FF" />
                <path
                  d="M5 8l2 2 4-4"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {v}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
