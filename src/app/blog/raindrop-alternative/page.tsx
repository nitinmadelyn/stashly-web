import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppStoreBadges from "@/components/AppStoreBadges";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Best Raindrop.io Alternative for Mobile in 2026 — Stashly",
  description:
    "Looking for a Raindrop.io alternative that works better on mobile? Stashly saves links from Instagram, TikTok, and any app in two taps. Free on iOS and Android.",
  metadataBase: new URL("https://stashly.pro"),
  alternates: { canonical: "https://stashly.pro/blog/raindrop-alternative" },
  openGraph: {
    title: "Best Raindrop.io Alternative for Mobile in 2026 — Stashly",
    description:
      "Raindrop is great on desktop. Stashly is built for mobile — save from Instagram, TikTok, YouTube, or any app in two taps. Free on iOS and Android.",
    url: "https://stashly.pro/blog/raindrop-alternative",
    siteName: "Stashly",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Raindrop.io Alternative for Mobile in 2026 — Stashly",
    description:
      "Raindrop is great on desktop. Stashly is built for mobile — save from any app in two taps. Free on iOS and Android.",
  },
  robots: { index: true, follow: true },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Raindrop.io Alternative for Mobile in 2026",
  description:
    "An honest comparison of Raindrop.io vs Stashly for mobile users who save links from Instagram, TikTok, YouTube, and other apps.",
  url: "https://stashly.pro/blog/raindrop-alternative",
  datePublished: "2026-06-22",
  dateModified: "2026-06-22",
  publisher: {
    "@type": "Organization",
    name: "Stashly",
    url: "https://stashly.pro",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Stashly free like Raindrop.io?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Stashly is free to download on iOS and Android. Core features — saving links, tagging, collections, search, reminders, and sharing — are all free. Raindrop.io is also free but locks full-text search, permanent page copies, and unlimited highlights behind its Pro plan at $38/year.",
      },
    },
    {
      "@type": "Question",
      name: "Can I save Instagram and TikTok links with Stashly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Stashly integrates with the iOS and Android share sheet so you can save from Instagram, TikTok, YouTube, Reddit, or any other app in two taps. Raindrop.io is primarily designed around its browser extension and does not have native support for saving social media posts from mobile apps.",
      },
    },
    {
      "@type": "Question",
      name: "Can I import my Raindrop.io bookmarks into Stashly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Export your Raindrop.io library as a CSV file from Settings → Export. Then import it into Stashly via Settings → Import. All your links, titles, tags, and collections transfer across.",
      },
    },
    {
      "@type": "Question",
      name: "Does Stashly work on both iPhone and Android?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Stashly has native apps on the App Store (iOS) and Google Play (Android). Your library syncs automatically across both.",
      },
    },
    {
      "@type": "Question",
      name: "Does Stashly have collections like Raindrop.io?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Stashly has collections — named groups of links you can organise, browse, and share. You can also share a collection via a public link so anyone can view or import it with one tap.",
      },
    },
    {
      "@type": "Question",
      name: "What does Stashly have that Raindrop.io does not?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Stashly has voice search, reminders on saved links, mark-as-done, and native share sheet saving from any mobile app including Instagram and TikTok. These features are not available in Raindrop.io.",
      },
    },
  ],
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const comparisonRows = [
  { feature: "Save from any mobile app (share sheet)", stashly: true,  raindrop: false, note: "Raindrop relies on browser extension" },
  { feature: "Save Instagram / TikTok posts",           stashly: true,  raindrop: false, note: ""                                   },
  { feature: "Save YouTube / Reddit links",             stashly: true,  raindrop: true,  note: ""                                   },
  { feature: "Tags",                                    stashly: true,  raindrop: true,  note: ""                                   },
  { feature: "Collections / folders",                   stashly: true,  raindrop: true,  note: ""                                   },
  { feature: "Real-time search",                        stashly: true,  raindrop: true,  note: ""                                   },
  { feature: "Full-text search",                        stashly: true,  raindrop: false, note: "Raindrop: Pro plan only ($38/yr)"   },
  { feature: "Voice search",                            stashly: true,  raindrop: false, note: ""                                   },
  { feature: "Reminders on saved links",                stashly: true,  raindrop: false, note: ""                                   },
  { feature: "Mark links as done",                      stashly: true,  raindrop: false, note: ""                                   },
  { feature: "Share collections publicly",              stashly: true,  raindrop: true,  note: ""                                   },
  { feature: "Import collections (one tap)",            stashly: true,  raindrop: false, note: ""                                   },
  { feature: "Browser extension",                       stashly: false, raindrop: true,  note: "Stashly uses the share sheet instead"},
  { feature: "iOS app",                                 stashly: true,  raindrop: true,  note: ""                                   },
  { feature: "Android app",                             stashly: true,  raindrop: true,  note: ""                                   },
  { feature: "Free tier",                               stashly: true,  raindrop: true,  note: ""                                   },
];

const migrationSteps = [
  {
    step: "01",
    title: "Export your Raindrop.io library",
    description:
      "In Raindrop.io, go to Settings → Backups → CSV export. You will get a file containing all your saved links, titles, tags, and collections.",
  },
  {
    step: "02",
    title: "Download Stashly",
    description:
      "Install Stashly on your iPhone or Android phone. Create your free account — it takes under a minute.",
  },
  {
    step: "03",
    title: "Import your Raindrop export",
    description:
      "In Stashly, go to Settings → Import → Choose file. Select your Raindrop CSV export. All your links, titles, and tags import automatically.",
  },
  {
    step: "04",
    title: "Save your next link from any app",
    description:
      "Open Instagram, TikTok, YouTube — anywhere you browse. Tap Share → Stashly. Two taps and it's saved. No browser extension needed.",
  },
];

// ─── UI helpers ───────────────────────────────────────────────────────────────

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

export default function RaindropAlternativePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-16" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <div className="flex items-center gap-3 mb-6">
              <Link
                href="/blog"
                className="text-xs font-medium transition-colors"
                style={{ color: "#9CA3AF" }}
              >
                Blog
              </Link>
              <span style={{ color: "#E8E5F5" }}>›</span>
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: "#EDE9FE", color: "#6C47FF" }}
              >
                Comparison
              </span>
            </div>

            <h1
              className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl"
              style={{ color: "#0F0A1E" }}
            >
              The best{" "}
              <span style={{ color: "#6C47FF" }}>Raindrop.io alternative</span>
              {" "}for mobile in 2026
            </h1>

            <p
              className="mt-5 text-pretty text-lg leading-relaxed"
              style={{ color: "#4B5563" }}
            >
              Raindrop.io is one of the most polished bookmark managers on
              desktop. But if most of your browsing happens on your phone —
              Instagram, TikTok, YouTube, Reddit — Raindrop was not built for
              you. Stashly was.
            </p>

            <div className="mt-3 flex items-center gap-4 text-xs" style={{ color: "#9CA3AF" }}>
              <span>June 2026</span>
              <span>·</span>
              <span>5 min read</span>
            </div>
          </div>
        </section>

        {/* ── What Raindrop does well ──────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-4 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              What Raindrop.io does well
            </h2>
            <p className="mb-8 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Raindrop.io deserves its reputation as the most polished bookmark
              manager available. If you spend most of your time on a desktop
              browser, it is genuinely excellent.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Beautiful interface", body: "Raindrop has one of the best-designed UIs of any productivity app. Collections, covers, and board views make your saved library feel curated rather than cluttered." },
                { title: "Generous free tier", body: "Unlimited bookmarks, unlimited collections, tags, and up to 3 collaborators — all on the free plan. No artificial caps to push you towards paying." },
                { title: "Browser extension", body: "The Chrome, Firefox, and Safari extensions make saving a web page a one-click action. It also saves highlighted text and screenshots alongside the link." },
                { title: "Nested collections", body: "You can organise links into folders within folders — a proper hierarchy that scales to thousands of saved items without things getting lost." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl p-5" style={{ backgroundColor: "#F9F8FF", border: "1px solid #E8E5F5" }}>
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

        {/* ── Where Raindrop falls short ───────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-4 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              Where Raindrop.io falls short on mobile
            </h2>
            <p className="mb-8 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Raindrop was built desktop-first. Its mobile apps exist, but they
              are clearly secondary — and it shows in the places that matter
              most for how people actually browse in 2026.
            </p>
            <div className="flex flex-col gap-4">
              {[
                {
                  title: "No social media saving",
                  body: "You cannot save an Instagram post, TikTok video, or Twitter thread into Raindrop from your phone. The share sheet integration is not there. For most people's daily browsing, this is a fundamental gap.",
                },
                {
                  title: "Requires re-login on iOS share sheet",
                  body: "Multiple users report being logged out unexpectedly when trying to save a link through the iOS action sheet. Having to stop, re-login, then re-share breaks the entire flow.",
                },
                {
                  title: "iPad multitasking is broken",
                  body: "The iPad app cannot work in split screen or slide over mode — two of the most common ways people multitask on iPad. If you use an iPad as your main device, this is a real daily frustration.",
                },
                {
                  title: "Full-text search is paywalled",
                  body: "Searching the actual content of pages you saved — not just titles and tags — requires the Pro plan at $38/year. On mobile where you often save things quickly without adding tags, this limits how useful your library actually is.",
                },
                {
                  title: "No reminders or action tracking",
                  body: "Raindrop has no way to set a reminder on a saved link or mark something as done. If you save things to act on — a job listing, a product to buy, a recipe for the weekend — there is no follow-through built in.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl p-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #FEE2E2" }}>
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

        {/* ── Mid CTA ──────────────────────────────────────────────────────── */}
        <section className="py-12" style={{ backgroundColor: "#0F0A1E" }}>
          <div className="mx-auto max-w-3xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-base font-bold" style={{ color: "#FFFFFF" }}>
                Try Stashly free on iOS and Android
              </p>
              <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                Save your first link in under a minute. Import from Raindrop in minutes.
              </p>
            </div>
            <div className="shrink-0">
              <AppStoreBadges size="sm" />
            </div>
          </div>
        </section>

        {/* ── Comparison table ─────────────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-2 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              Stashly vs Raindrop.io — feature comparison
            </h2>
            <p className="mb-8 text-sm" style={{ color: "#6B7280" }}>An honest, feature-by-feature breakdown.</p>

            <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid #E8E5F5" }}>
              <div className="grid grid-cols-3 px-5 py-3 text-xs font-semibold uppercase tracking-widest" style={{ backgroundColor: "#0F0A1E", color: "#9CA3AF" }}>
                <span>Feature</span>
                <span className="text-center" style={{ color: "#A87FFF" }}>Stashly</span>
                <span className="text-center">Raindrop</span>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-3 items-center px-5 py-3.5 text-sm"
                  style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F9F8FF", borderTop: "1px solid #F3F4F6" }}
                >
                  <div>
                    <span style={{ color: "#0F0A1E" }}>{row.feature}</span>
                    {row.note && <p className="mt-0.5 text-xs" style={{ color: "#9CA3AF" }}>{row.note}</p>}
                  </div>
                  <div className="flex justify-center">
                    {row.stashly ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <div className="flex justify-center">
                    {row.raindrop ? <CheckIcon color="#6B7280" /> : <CrossIcon />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Stashly for mobile ───────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-4 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              Why Stashly works better for mobile-first users
            </h2>
            <p className="mb-8 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Stashly was designed around one core assumption: most people
              discover things they want to save on their phone, not in a desktop
              browser. That single decision changes everything about how the app
              works.
            </p>
            <div className="flex flex-col gap-4">
              {[
                {
                  accent: "#6C47FF",
                  icon: "📱",
                  title: "Share sheet first",
                  body: "Stashly plugs into the iOS and Android share sheet — the menu that appears when you tap the share button in any app. Instagram, TikTok, YouTube, Reddit, Safari, Chrome, Maps — two taps and the link is in Stashly. No switching apps, no browser extension needed.",
                },
                {
                  accent: "#0D9488",
                  icon: "🎤",
                  title: "Voice search",
                  body: "Hands full? Just speak. Say the restaurant name, the topic, or even a vague description — Stashly searches across titles, tags, notes, and platforms in real time. Raindrop has no voice search.",
                },
                {
                  accent: "#F97316",
                  icon: "🔔",
                  title: "Reminders built in",
                  body: "Attach a reminder to any saved link. The sale that ends Friday, the recipe for the weekend, the job listing to follow up on — Stashly sends you a notification at exactly the right moment.",
                },
                {
                  accent: "#16A34A",
                  icon: "✅",
                  title: "Mark as done",
                  body: "Once you've acted on a saved link — applied, bought, visited, watched — mark it done. Your active list stays clean and focused on what still needs your attention.",
                },
                {
                  accent: "#0EA5E9",
                  icon: "🔗",
                  title: "Shareable collections",
                  body: "Create a collection of links and share it via a public URL. Friends or followers can browse it without an account, or import the entire collection into their own Stashly in one tap.",
                },
              ].map((s) => (
                <div key={s.title} className="flex gap-4 rounded-xl p-5" style={{ backgroundColor: "#F9F8FF", border: "1px solid #E8E5F5" }}>
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl"
                    style={{ backgroundColor: `${s.accent}14` }}
                    aria-hidden="true"
                  >
                    {s.icon}
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold" style={{ color: "#0F0A1E" }}>{s.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Migration guide ──────────────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-2 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              How to migrate from Raindrop.io to Stashly
            </h2>
            <p className="mb-10 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Your entire Raindrop library moves across in four steps. Nothing gets left behind.
            </p>
            <div className="flex flex-col gap-0">
              {migrationSteps.map((s, i) => {
                const isLast = i === migrationSteps.length - 1;
                return (
                  <div key={s.step} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                        style={{ backgroundColor: isLast ? "#6C47FF" : "#EDE9FE", color: isLast ? "#FFFFFF" : "#6C47FF", border: "2px solid #6C47FF" }}
                      >
                        {s.step}
                      </div>
                      {!isLast && <div className="mt-1 w-px flex-1 mb-1" style={{ backgroundColor: "#E8E5F5", minHeight: 24 }} />}
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
        <section className="py-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-10 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-5">
              {faqSchema.mainEntity.map((item) => (
                <div key={item.name} className="rounded-xl p-6" style={{ backgroundColor: "#F9F8FF", border: "1px solid #E8E5F5" }}>
                  <p className="mb-2 text-base font-semibold" style={{ color: "#0F0A1E" }}>{item.name}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden py-24" style={{ backgroundColor: "#0F0A1E" }}>
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: "#6C47FF" }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-xl px-6 text-center">
            <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl" style={{ color: "#FFFFFF" }}>
              Ready to try a mobile-first alternative to Raindrop?
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "#9CA3AF" }}>
              Free to download on iPhone and Android. Import your Raindrop library in minutes.
            </p>
            <div className="mt-8 flex justify-center">
              <AppStoreBadges size="lg" />
            </div>
            <p className="mt-4 text-xs" style={{ color: "#4B5563" }}>
              Free to download · iOS &amp; Android · No credit card required
            </p>
            <div className="mt-6 flex justify-center gap-4 text-sm" style={{ color: "#6B7280" }}>
              <Link href="/pocket-alternative" className="underline underline-offset-2" style={{ color: "#A87FFF" }}>
                Pocket alternative
              </Link>
              <span>·</span>
              <Link href="/personal-bookmark-manager" className="underline underline-offset-2" style={{ color: "#A87FFF" }}>
                Personal bookmark manager
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
