import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppStoreBadges from "@/components/AppStoreBadges";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Best Pocket Alternative in 2026 — Stashly",
  description:
    "Pocket is shutting down. Stashly is the best Pocket alternative — import all your saved links instantly, search in seconds, and save from any app on iOS and Android. Free to download.",
  metadataBase: new URL("https://stashly.pro"),
  alternates: { canonical: "https://stashly.pro/pocket-alternative" },
  openGraph: {
    title: "Best Pocket Alternative in 2026 — Stashly",
    description:
      "Pocket is shutting down. Stashly imports all your saved articles instantly. Free Pocket alternative with smart search, tags, and mobile-first saving.",
    url: "https://stashly.pro/pocket-alternative",
    siteName: "Stashly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Pocket Alternative in 2026 — Stashly",
    description:
      "Pocket is shutting down. Stashly imports all your saved links instantly. Free, mobile-first, works on iOS and Android.",
  },
  robots: { index: true, follow: true },
};

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Stashly free like Pocket was?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Stashly is free to download on both iOS and Android. The core features — saving links, searching, tagging, and creating collections — are all available for free.",
      },
    },
    {
      "@type": "Question",
      name: "Does Stashly work on iPhone and Android?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Stashly has native apps for both iOS and Android. You can save links from any app on your phone using the native share sheet — no browser extension required.",
      },
    },
    {
      "@type": "Question",
      name: "Can I import my Pocket bookmarks into Stashly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Stashly supports importing your saved links from Pocket. Export your Pocket library as a CSV or HTML file, then import it directly into Stashly. All your links, titles, and tags come across.",
      },
    },
    {
      "@type": "Question",
      name: "Does Stashly save articles for offline reading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Stashly saves the link, title, description, and thumbnail for every item you stash. The full article offline reading feature is on our roadmap. For now, the link is always saved and available even if the original page is taken down.",
      },
    },
    {
      "@type": "Question",
      name: "Can I tag my saved links in Stashly like I did in Pocket?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Stashly has full tagging support. Add multiple tags to any saved link, then search and filter by tag instantly. You can also organise links into named collections.",
      },
    },
    {
      "@type": "Question",
      name: "Does Stashly work with social media like Instagram and TikTok?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — this is actually where Stashly goes further than Pocket ever did. You can save links directly from Instagram, TikTok, YouTube, Reddit, Twitter, and any other app using the native share sheet. Pocket was built around web articles; Stashly is built for the full modern web including social platforms.",
      },
    },
  ],
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Stashly",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "iOS, Android",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Save, search, and share links from any app. The best Pocket alternative for iOS and Android.",
  url: "https://stashly.pro",
};

// ─── Comparison data ──────────────────────────────────────────────────────────

const comparisonRows = [
  { feature: "Save from any mobile app", stashly: true,  pocket: false, note: "Pocket required a browser extension" },
  { feature: "Save Instagram / TikTok links", stashly: true,  pocket: false, note: "Pocket only supported web articles" },
  { feature: "Save YouTube videos",          stashly: true,  pocket: true,  note: ""                                  },
  { feature: "Tag organisation",             stashly: true,  pocket: true,  note: ""                                  },
  { feature: "Collections / folders",        stashly: true,  pocket: false, note: "Pocket had no folder grouping"     },
  { feature: "Real-time search",             stashly: true,  pocket: true,  note: ""                                  },
  { feature: "Voice search",                 stashly: true,  pocket: false, note: ""                                  },
  { feature: "Share collections publicly",   stashly: true,  pocket: false, note: ""                                  },
  { feature: "Add reminders to links",       stashly: true,  pocket: false, note: ""                                  },
  { feature: "Mark links as done",           stashly: true,  pocket: false, note: ""                                  },
  { feature: "Import from other apps",       stashly: true,  pocket: true,  note: ""                                  },
  { feature: "Free tier",                    stashly: true,  pocket: true,  note: "Both free to start"                },
  { feature: "iOS app",                      stashly: true,  pocket: true,  note: ""                                  },
  { feature: "Android app",                  stashly: true,  pocket: true,  note: ""                                  },
  { feature: "Still active in 2026",         stashly: true,  pocket: false, note: "Pocket shut down in 2025"          },
];

// ─── Migration steps ──────────────────────────────────────────────────────────

const migrationSteps = [
  {
    step: "01",
    title: "Export your Pocket library",
    description:
      "In Pocket, go to Settings → Export → Download your list. You will get a CSV or HTML file containing all your saved links, titles, and tags.",
  },
  {
    step: "02",
    title: "Download Stashly",
    description:
      "Install Stashly on your iPhone or Android phone. Create your free account — it takes under a minute.",
  },
  {
    step: "03",
    title: "Import your Pocket export",
    description:
      "In Stashly, go to Settings → Import → Choose file. Select your Pocket export file. All your links, titles, and tags are imported automatically.",
  },
  {
    step: "04",
    title: "You are done",
    description:
      "Your entire Pocket library is now in Stashly — searchable, taggable, and accessible from any device. Nothing was lost.",
  },
];

// ─── CheckIcon ────────────────────────────────────────────────────────────────

function CheckIcon({ color = "#6C47FF" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill={color} fillOpacity="0.12" />
      <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="#EF4444" fillOpacity="0.1" />
      <path d="M6 6l6 6M12 6l-6 6" stroke="#EF4444" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PocketAlternativePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <Navbar />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="pt-32 pb-20"
          style={{ backgroundColor: "#F9F8FF" }}
        >
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide"
              style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Pocket shut down in 2025
            </div>

            <h1
              className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl"
              style={{ color: "#0F0A1E" }}
            >
              The best{" "}
              <span style={{ color: "#6C47FF" }}>Pocket alternative</span>
              {" "}in 2026
            </h1>

            <p
              className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed"
              style={{ color: "#4B5563" }}
            >
              Stashly does everything Pocket did — and everything Pocket never
              could. Save from Instagram, TikTok, YouTube, or any app. Search
              in seconds. Share collections with anyone.
            </p>

            <div className="mt-8 flex justify-center">
              <AppStoreBadges size="lg" />
            </div>
            <p className="mt-3 text-xs" style={{ color: "#9CA3AF" }}>
              Free to download. iOS and Android. Import your Pocket library in minutes.
            </p>
          </div>
        </section>

        {/* ── Why people are leaving Pocket ────────────────────────────────── */}
        <section className="py-20" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="mb-4 text-2xl font-bold tracking-tight md:text-3xl"
              style={{ color: "#0F0A1E" }}
            >
              Why people are looking for a Pocket alternative
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#4B5563" }}>
              In early 2025, Mozilla announced that Pocket would be shutting
              down — ending over a decade of service. For millions of users who
              relied on Pocket to save articles and links, it meant finding a
              new home for their entire saved library.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#4B5563" }}>
              But beyond the shutdown, many users had already been frustrated
              with Pocket for years. It was built for a web that looked very
              different — one where you mostly saved long-form articles from
              news sites. The modern web is Instagram saves, YouTube videos,
              TikTok links, Reddit threads, Substack posts, and GitHub repos.
              Pocket never adapted.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Stashly is built for the web as it actually is in 2026. Every
              platform you use daily is supported — from the share sheet on
              your phone, in two taps.
            </p>
          </div>
        </section>

        {/* ── What Pocket did well ─────────────────────────────────────────── */}
        <section className="py-20" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="mb-4 text-2xl font-bold tracking-tight md:text-3xl"
              style={{ color: "#0F0A1E" }}
            >
              What Pocket did well
            </h2>
            <p className="mb-8 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              To be fair — Pocket was genuinely good at what it was designed
              for. It deserves credit for pioneering the "save for later" habit.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Simple save flow", body: "The browser extension made saving any web article frictionless — one click and it was in your library." },
                { title: "Clean reading experience", body: "Pocket stripped out ads and clutter, presenting articles in a clean, readable format." },
                { title: "Tag organisation", body: "Basic tagging let you categorise saved content, even if the system was limited." },
                { title: "Cross-device sync", body: "Your library was available on every device — phone, tablet, desktop — automatically." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl p-5"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E5F5" }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <CheckIcon color="#16A34A" />
                    <p className="text-sm font-semibold" style={{ color: "#0F0A1E" }}>{item.title}</p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Where Pocket fell short ──────────────────────────────────────── */}
        <section className="py-20" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="mb-4 text-2xl font-bold tracking-tight md:text-3xl"
              style={{ color: "#0F0A1E" }}
            >
              Where Pocket fell short
            </h2>
            <p className="mb-8 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Pocket was designed for the 2010s web. By 2025, it had not kept
              up with how people actually save and consume content.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { title: "No social media saving", body: "You could not save an Instagram post, TikTok video, or Twitter thread into Pocket from your phone. The share sheet integration simply was not there. For most people under 35, this was a dealbreaker." },
                { title: "Browser extension only on desktop", body: "The saving experience on mobile was clunky. The native apps were an afterthought. Pocket was fundamentally a desktop product." },
                { title: "No collection sharing", body: "You could not create a curated collection of links and share it with a friend or audience. Pocket was entirely private, which limited its usefulness for collaboration or discovery." },
                { title: "No reminders or action tracking", body: "Saved something you needed to act on — apply for that job, buy that product, follow up on that article? Pocket had no way to set a reminder or mark something as done." },
                { title: "Search was basic", body: "Pocket search worked on titles and tags, but was slow and imprecise. As libraries grew into the thousands of items, finding anything specific became genuinely difficult." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl p-5"
                  style={{ backgroundColor: "#FFF5F5", border: "1px solid #FEE2E2" }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <CrossIcon />
                    <p className="text-sm font-semibold" style={{ color: "#0F0A1E" }}>{item.title}</p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison table ─────────────────────────────────────────────── */}
        <section className="py-20" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="mb-2 text-2xl font-bold tracking-tight md:text-3xl"
              style={{ color: "#0F0A1E" }}
            >
              Stashly vs Pocket — feature comparison
            </h2>
            <p className="mb-8 text-sm" style={{ color: "#6B7280" }}>
              An honest, feature-by-feature breakdown.
            </p>

            <div
              className="overflow-hidden rounded-2xl"
              style={{ border: "1px solid #E8E5F5" }}
            >
              {/* Header */}
              <div
                className="grid grid-cols-3 px-5 py-3 text-xs font-semibold uppercase tracking-widest"
                style={{ backgroundColor: "#0F0A1E", color: "#9CA3AF" }}
              >
                <span>Feature</span>
                <span className="text-center" style={{ color: "#A87FFF" }}>Stashly</span>
                <span className="text-center">Pocket</span>
              </div>

              {comparisonRows.map((row, i) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-3 items-center px-5 py-3.5 text-sm"
                  style={{
                    backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F9F8FF",
                    borderTop: "1px solid #F3F4F6",
                  }}
                >
                  <div>
                    <span style={{ color: "#0F0A1E" }}>{row.feature}</span>
                    {row.note && (
                      <p className="mt-0.5 text-xs" style={{ color: "#9CA3AF" }}>{row.note}</p>
                    )}
                  </div>
                  <div className="flex justify-center">
                    {row.stashly ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <div className="flex justify-center">
                    {row.pocket ? <CheckIcon color="#6B7280" /> : <CrossIcon />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Migration guide ──────────────────────────────────────────────── */}
        <section className="py-20" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="mb-2 text-2xl font-bold tracking-tight md:text-3xl"
              style={{ color: "#0F0A1E" }}
            >
              How to migrate from Pocket to Stashly in 2 minutes
            </h2>
            <p className="mb-10 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Your entire Pocket library — every saved link, every tag — moves
              across in four steps. Nothing gets left behind.
            </p>

            <div className="relative flex flex-col gap-0">
              {migrationSteps.map((s, i) => {
                const isLast = i === migrationSteps.length - 1;
                return (
                  <div key={s.step} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                        style={{
                          backgroundColor: isLast ? "#6C47FF" : "#EDE9FE",
                          color: isLast ? "#FFFFFF" : "#6C47FF",
                          border: "2px solid #6C47FF",
                        }}
                      >
                        {s.step}
                      </div>
                      {!isLast && (
                        <div className="mt-1 w-px flex-1 mb-1" style={{ backgroundColor: "#E8E5F5", minHeight: 24 }} />
                      )}
                    </div>
                    <div className="pb-8 flex-1">
                      <p className="text-base font-bold mb-1" style={{ color: "#0F0A1E" }}>{s.title}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{s.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section className="py-20" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="mb-10 text-2xl font-bold tracking-tight md:text-3xl"
              style={{ color: "#0F0A1E" }}
            >
              Frequently asked questions
            </h2>

            <div className="flex flex-col gap-5">
              {faqSchema.mainEntity.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl p-6"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E5F5" }}
                >
                  <p className="mb-2 text-base font-semibold" style={{ color: "#0F0A1E" }}>
                    {item.name}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                    {item.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden py-24"
          style={{ backgroundColor: "#0F0A1E" }}
        >
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: "#6C47FF" }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-xl px-6 text-center">
            <h2
              className="text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl"
              style={{ color: "#FFFFFF" }}
            >
              Ready to switch from Pocket?
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "#9CA3AF" }}>
              Download Stashly, import your library in minutes, and never lose
              a saved link again.
            </p>
            <div className="mt-8 flex justify-center">
              <AppStoreBadges size="lg" />
            </div>
            <p className="mt-4 text-xs" style={{ color: "#4B5563" }}>
              Free to download · iOS &amp; Android · Import from Pocket in minutes
            </p>
            <p className="mt-6 text-sm" style={{ color: "#6B7280" }}>
              Also looking for a{" "}
              <Link
                href="/personal-bookmark-manager"
                className="underline underline-offset-2 transition-colors"
                style={{ color: "#A87FFF" }}
              >
                personal bookmark manager
              </Link>
              ?
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
