import Image from "next/image";
import WaitlistForm from "@/components/WaitlistForm";

export default function Hero() {
  return (
    <section
      className="relative pt-24 pb-20 md:pt-32 md:pb-28"
      style={{ backgroundColor: "#F9F8FF" }}
    >
      {/* Background decorations — clipped inside their own wrapper so the phone mockup is never cut off */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: "#6C47FF" }}
        />
        <div
          className="absolute bottom-0 -left-20 h-64 w-64 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "#A87FFF" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left — copy */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide"
              style={{
                backgroundColor: "#EDE9FE",
                color: "#6C47FF",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#6C47FF" }}
              />
              Coming Soon
            </div>

            <h1
              className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
              style={{ color: "#0F0A1E" }}
            >
              Save once.{" "}
              <span style={{ color: "#6C47FF" }}>Find forever.</span>
            </h1>

            <p
              className="mt-5 max-w-lg text-pretty text-lg leading-relaxed"
              style={{ color: "#4B5563" }}
            >
              Stop losing links buried in DMs and saved posts. Stashly gives
              every link a title, tags, and a home — searchable in seconds from
              any device.
            </p>

            {/* Waitlist form */}
            <div id="waitlist" className="mt-8 w-full">
              <WaitlistForm />
              <p className="mt-3 text-xs" style={{ color: "#9CA3AF" }}>
                Free forever. No spam. Get notified at launch.
              </p>
            </div>

            {/* Social proof chips */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {[
                { icon: "▶", label: "YouTube" },
                { icon: "📷", label: "Instagram" },
                { icon: "♪", label: "TikTok" },
                { icon: "𝕏", label: "Twitter" },
                { icon: "+", label: "More" },
              ].map((p) => (
                <div
                  key={p.label}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#4B5563",
                    border: "1px solid #E8E5F5",
                  }}
                >
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative flex justify-center">
      {/* Ambient glow behind the phone */}
      <div
        className="pointer-events-none absolute inset-8 rounded-[3rem] blur-3xl opacity-25"
        style={{ backgroundColor: "#6C47FF" }}
        aria-hidden="true"
      />

      {/* Phone shell */}
      <div
        className="relative overflow-hidden rounded-[3rem]"
        style={{
          width: 300,
          height: 616,
          background: "#0F0A1E",
          boxShadow:
            "0 0 0 2px #2D2845, 0 32px 80px rgba(15,10,30,0.55), 0 8px 24px rgba(108,71,255,0.18)",
          padding: "10px",
        }}
      >
        {/* Screen area */}
        <div
          className="relative overflow-hidden rounded-[2.25rem] bg-white"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Dynamic island cutout */}
          <div
            className="absolute top-3 left-1/2 z-10 -translate-x-1/2 rounded-full"
            style={{ width: 76, height: 20, backgroundColor: "#0F0A1E" }}
            aria-hidden="true"
          />

          {/* Real app screenshot */}
          <Image
            src="/app-screenshot.png"
            alt="Stashly app showing saved links with YouTube thumbnails"
            fill
            className="object-cover object-top"
            sizes="300px"
            priority
          />

          {/* Subtle bottom fade so the phone shell blends cleanly */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-16"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(15,10,30,0.35))",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
