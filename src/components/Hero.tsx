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
    <div className="relative drop-shadow-2xl">
      {/* Glow */}
      <div
        className="absolute inset-8 rounded-3xl blur-2xl opacity-30"
        style={{ backgroundColor: "#6C47FF" }}
        aria-hidden="true"
      />

      <svg
        width="300"
        height="616"
        viewBox="-4 -4 308 616"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        className="relative"
        aria-label="Stashly app preview"
        role="img"
      >
        {/* Phone frame */}
        <rect
          x="1"
          y="1"
          width="298"
          height="598"
          rx="38"
          fill="#0F0A1E"
          stroke="#2D2845"
          strokeWidth="2"
        />
        {/* Screen */}
        <rect x="10" y="10" width="280" height="580" rx="30" fill="#FFFFFF" />

        {/* Status bar */}
        <rect x="10" y="10" width="280" height="40" rx="30" fill="#F9F8FF" />
        <text x="30" y="33" fill="#4B5563" fontSize="11" fontWeight="600">
          9:41
        </text>
        {/* Dynamic island */}
        <rect x="112" y="18" width="76" height="20" rx="10" fill="#0F0A1E" />
        {/* Battery / signal */}
        <rect x="240" y="24" width="22" height="12" rx="3" fill="none" stroke="#4B5563" strokeWidth="1.5" />
        <rect x="262" y="28" width="3" height="4" rx="1" fill="#4B5563" />
        <rect x="242" y="26" width="14" height="8" rx="1.5" fill="#6C47FF" />

        {/* App header */}
        <rect x="10" y="50" width="280" height="52" fill="#FFFFFF" />
        {/* Stashly logo in app */}
        <rect x="24" y="63" width="24" height="24" rx="6" fill="#6C47FF" />
        <path
          d="M32 69h10a1 1 0 0 1 1 1v12l-6-3-6 3V70a1 1 0 0 1 1-1z"
          fill="white"
          strokeWidth="0"
        />
        <text x="56" y="80" fill="#0F0A1E" fontSize="15" fontWeight="700">
          Stashly
        </text>
        {/* Bell icon */}
        <circle cx="265" cy="75" r="12" fill="#F5F3FF" />
        <text x="258.5" y="79.5" fill="#6C47FF" fontSize="13">
          🔔
        </text>

        {/* Search bar */}
        <rect
          x="24"
          y="112"
          width="252"
          height="36"
          rx="12"
          fill="#F9F8FF"
          stroke="#E8E5F5"
          strokeWidth="1"
        />
        <text x="50" y="134" fill="#9CA3AF" fontSize="12">
          Search your stash...
        </text>
        <text x="34" y="134" fill="#9CA3AF" fontSize="12">
          🔍
        </text>

        {/* Filter chips */}
        <rect x="24" y="158" width="40" height="22" rx="11" fill="#6C47FF" />
        <text x="31" y="173" fill="white" fontSize="10" fontWeight="600">
          All
        </text>
        <rect x="70" y="158" width="62" height="22" rx="11" fill="#F5F3FF" stroke="#E8E5F5" strokeWidth="1" />
        <text x="79" y="173" fill="#6C47FF" fontSize="10" fontWeight="500">
          ▶ YouTube
        </text>
        <rect x="138" y="158" width="68" height="22" rx="11" fill="#F5F3FF" stroke="#E8E5F5" strokeWidth="1" />
        <text x="146" y="173" fill="#6C47FF" fontSize="10" fontWeight="500">
          📷 Instagram
        </text>

        {/* Link card 1 */}
        <rect x="24" y="192" width="252" height="80" rx="14" fill="#FFFFFF" stroke="#E8E5F5" strokeWidth="1" />
        <rect x="36" y="204" width="56" height="56" rx="10" fill="#EDE9FE" />
        <text x="51" y="237" fontSize="22">▶</text>
        <text x="100" y="221" fill="#0F0A1E" fontSize="11" fontWeight="600">
          How to build a startup in 30
        </text>
        <text x="100" y="235" fill="#9CA3AF" fontSize="10">
          youtube.com
        </text>
        <rect x="100" y="243" width="42" height="16" rx="8" fill="#F5F3FF" />
        <text x="108" y="255" fill="#6C47FF" fontSize="9" fontWeight="500">
          #startup
        </text>
        <rect x="147" y="243" width="36" height="16" rx="8" fill="#F5F3FF" />
        <text x="153" y="255" fill="#6C47FF" fontSize="9" fontWeight="500">
          #learn
        </text>

        {/* Link card 2 */}
        <rect x="24" y="284" width="252" height="80" rx="14" fill="#FFFFFF" stroke="#E8E5F5" strokeWidth="1" />
        <rect x="36" y="296" width="56" height="56" rx="10" fill="#FFE4F3" />
        <text x="51" y="329" fontSize="22">📷</text>
        <text x="100" y="313" fill="#0F0A1E" fontSize="11" fontWeight="600">
          Minimal desk setup ideas 2026
        </text>
        <text x="100" y="327" fill="#9CA3AF" fontSize="10">
          instagram.com
        </text>
        <rect x="100" y="335" width="42" height="16" rx="8" fill="#F5F3FF" />
        <text x="105" y="347" fill="#6C47FF" fontSize="9" fontWeight="500">
          #design
        </text>
        <rect x="147" y="335" width="38" height="16" rx="8" fill="#F5F3FF" />
        <text x="151" y="347" fill="#6C47FF" fontSize="9" fontWeight="500">
          #setup
        </text>

        {/* Link card 3 — partial */}
        <rect x="24" y="376" width="252" height="80" rx="14" fill="#FFFFFF" stroke="#E8E5F5" strokeWidth="1" />
        <rect x="36" y="388" width="56" height="56" rx="10" fill="#E4F3FF" />
        <text x="51" y="421" fontSize="22">♪</text>
        <text x="100" y="405" fill="#0F0A1E" fontSize="11" fontWeight="600">
          Morning focus playlist — lo-fi
        </text>
        <text x="100" y="419" fill="#9CA3AF" fontSize="10">
          tiktok.com
        </text>
        <rect x="100" y="427" width="40" height="16" rx="8" fill="#F5F3FF" />
        <text x="106" y="439" fill="#6C47FF" fontSize="9" fontWeight="500">
          #music
        </text>

        {/* Fade overlay at bottom */}
        <defs>
          <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect x="10" y="430" width="280" height="80" fill="url(#fade)" />

        {/* Bottom nav */}
        <rect x="10" y="524" width="280" height="1" fill="#E8E5F5" />
        {/* Home */}
        <text x="38" y="549" fill="#6C47FF" fontSize="18" textAnchor="middle">🏠</text>
        <text x="38" y="563" fill="#6C47FF" fontSize="9" fontWeight="600" textAnchor="middle">Home</text>
        {/* Search */}
        <text x="95" y="549" fill="#9CA3AF" fontSize="18" textAnchor="middle">🔍</text>
        <text x="95" y="563" fill="#9CA3AF" fontSize="9" textAnchor="middle">Search</text>
        {/* Save FAB */}
        <circle cx="150" cy="540" r="22" fill="#6C47FF" />
        <text x="150" y="547" fill="white" fontSize="20" textAnchor="middle">+</text>
        {/* Collections */}
        <text x="205" y="549" fill="#9CA3AF" fontSize="18" textAnchor="middle">📚</text>
        <text x="205" y="563" fill="#9CA3AF" fontSize="9" textAnchor="middle">Stash</text>
        {/* Profile */}
        <text x="262" y="549" fill="#9CA3AF" fontSize="18" textAnchor="middle">👤</text>
        <text x="262" y="563" fill="#9CA3AF" fontSize="9" textAnchor="middle">Profile</text>

        {/* Home indicator */}
        <rect x="110" y="580" width="80" height="4" rx="2" fill="#E8E5F5" />
      </svg>
    </div>
  );
}
