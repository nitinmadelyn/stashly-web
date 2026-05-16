"use client";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect width="28" height="28" rx="8" fill="#6C47FF" />
        <path
          d="M8 6h12a1 1 0 0 1 1 1v15l-7-4-7 4V7a1 1 0 0 1 1-1z"
          fill="white"
          stroke="white"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Save",
    title: "From any app, in two taps",
    description:
      "Share directly from Instagram, YouTube, TikTok, or any browser. The moment you tap Share and select Stashly, your link is captured with a preview, title, and platform — automatically.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect width="28" height="28" rx="8" fill="#6C47FF" />
        <circle cx="13" cy="13" r="5.5" stroke="white" strokeWidth="2" />
        <path
          d="M17.5 17.5l3.5 3.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Search",
    title: "Find anything in seconds",
    description:
      "Real-time search across titles, tags, categories, platforms, and descriptions simultaneously. Type three letters and the right link surfaces. Filter by platform or date. It just works.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect width="28" height="28" rx="8" fill="#6C47FF" />
        <circle cx="20" cy="9" r="3" stroke="white" strokeWidth="2" />
        <circle cx="8" cy="14" r="3" stroke="white" strokeWidth="2" />
        <circle cx="20" cy="19" r="3" stroke="white" strokeWidth="2" />
        <path d="M11 13l6-3M11 15l6 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Share",
    title: "Share collections beautifully",
    description:
      "Curate a collection of links and share it with anyone via a clean public URL. No account required to browse. Every shared collection carries a gentle invite to join Stashly.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-20 md:py-28"
      style={{ backgroundColor: "#0F0A1E" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-widest"
            style={{ color: "#A87FFF" }}
          >
            What Stashly does
          </p>
          <h2
            className="text-balance text-3xl font-bold tracking-tight md:text-4xl"
            style={{ color: "#FFFFFF" }}
          >
            Save. Search. Share.
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed"
            style={{ color: "#9CA3AF" }}
          >
            Three things done exceptionally well. No bloat, no clutter — just
            the fastest way to manage every link you care about.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.label}
              className="group flex flex-col rounded-2xl p-7 transition-all duration-200"
              style={{
                backgroundColor: "#1A1030",
                border: "1px solid #2D2845",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "#6C47FF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "#2D2845";
              }}
            >
              <div className="mb-5">{f.icon}</div>
              <p
                className="mb-1 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#6C47FF" }}
              >
                {f.label}
              </p>
              <h3
                className="mb-3 text-lg font-bold leading-snug"
                style={{ color: "#FFFFFF" }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#9CA3AF" }}
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
