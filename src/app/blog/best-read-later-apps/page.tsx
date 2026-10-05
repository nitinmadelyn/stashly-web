import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppStoreBadges from "@/components/AppStoreBadges";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The 7 Best Read-Later Apps in 2026 (Honestly Compared)",
  description:
    "Most read-later apps only save articles. But you save Instagram posts, TikTok videos, YouTube links, and Reddit threads too. Here are the 7 best apps for 2026 — honestly compared.",
  metadataBase: new URL("https://stashly.pro"),
  alternates: { canonical: "https://stashly.pro/blog/best-read-later-apps" },
  openGraph: {
    title: "The 7 Best Read-Later Apps in 2026 (Honestly Compared)",
    description:
      "Most read-later apps only save articles. Here are the 7 best options for 2026, including ones that work with Instagram, TikTok, and YouTube.",
    url: "https://stashly.pro/blog/best-read-later-apps",
    siteName: "Stashly",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The 7 Best Read-Later Apps in 2026 (Honestly Compared)",
    description:
      "Most read-later apps only save articles. Here are 7 honestly compared — including ones that handle Instagram, TikTok, and YouTube.",
  },
  robots: { index: true, follow: true },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The 7 Best Read-Later Apps in 2026 (Honestly Compared)",
  description:
    "Most read-later apps only save articles. But in 2026 you save Instagram posts, TikTok videos, YouTube links, and Reddit threads too. Here are the 7 best apps, honestly compared.",
  url: "https://stashly.pro/blog/best-read-later-apps",
  datePublished: "2026-10-05",
  dateModified: "2026-10-05",
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
      name: "What is the best read-later app in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best read-later app depends on what you save. For mobile users who save links from Instagram, TikTok, YouTube, and Reddit — not just articles — Stashly is the best option. It works with every app via the iOS and Android share sheet, has instant full-text search, tags, reminders, and collections. For pure article reading with highlighting, Instapaper or Readwise Reader are worth considering.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free read-later app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Stashly has a generous free plan with unlimited saves, full search, tags, and collections. Instapaper also has a free plan, though premium features like full offline sync cost $5.99/month. Safari Reading List is completely free but only works for web pages saved in Safari.",
      },
    },
    {
      "@type": "Question",
      name: "What happened to Pocket?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pocket shut down in July 2025. Mozilla, which acquired Pocket in 2017, announced it was discontinuing the service with around 30 days notice. Users had a limited window to export their saved links. Stashly is the most commonly recommended Pocket alternative for mobile users.",
      },
    },
    {
      "@type": "Question",
      name: "Can read-later apps save Instagram links?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most read-later apps — Instapaper, Readwise Reader, GoodLinks, Flyleaf — cannot meaningfully save Instagram links. They are built around article text extraction and Instagram posts have no article text to extract. Stashly is designed to save any link from any app, including Instagram posts, reels, and profiles, via the native iOS and Android share sheet.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best Pocket alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For mobile-first users, Stashly is the best Pocket alternative. It saves links from any app via the share sheet, has instant search, tags, reminders, and collections. For desktop-heavy readers, Raindrop.io or Instapaper are solid alternatives. For power users who highlight and annotate extensively, Readwise Reader is worth its higher price.",
      },
    },
    {
      "@type": "Question",
      name: "Is Instapaper still good in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Instapaper is still a good choice for saving long-form articles to read later. It has a clean reading interface, text-to-speech, Kindle sync, and robust offline mode. However, it does not support saving social media links (Instagram, TikTok, YouTube), and its premium plan doubled in price to $5.99/month in 2025 with no new major features. For users who save more than just articles, Stashly is a more capable alternative.",
      },
    },
    {
      "@type": "Question",
      name: "Which read-later app works best on iPhone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Stashly and GoodLinks both work excellently on iPhone. Stashly is the better choice if you save links from multiple apps (Instagram, TikTok, YouTube, WhatsApp, Safari) because it integrates deeply with the iOS share sheet. GoodLinks is the better choice if you exclusively save web articles and want a beautiful native Apple design with iCloud sync.",
      },
    },
    {
      "@type": "Question",
      name: "Do read-later apps work on Android?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Stashly, Instapaper, Raindrop.io, and Readwise Reader all have Android apps. GoodLinks and Flyleaf are Apple-only. If you use Android, Stashly is the strongest choice for saving links from any app, with full share sheet integration and instant search.",
      },
    },
  ],
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const apps = [
  {
    rank: "01",
    name: "Stashly",
    tagline: "Best for mobile users who save more than just articles",
    accentColor: "#6C47FF",
    badgeBg: "#EDE9FE",
    pros: [
      "Works with any app via iOS and Android share sheet",
      "Instant full-text search across all saves",
      "Tags, collections, and reminders built in",
      "Saves Instagram, TikTok, YouTube, Reddit, and every other app",
      "Clean, fast mobile interface built for phones first",
      "Free plan with unlimited saves",
    ],
    cons: [
      "Less focus on distraction-free article reading mode",
      "No browser extension for desktop-first workflows",
    ],
    verdict:
      "If you live on your phone and save links from every app — not just web articles — Stashly is the strongest option. The share sheet integration is seamless, search is instant, and the free plan is genuinely generous. It fills the gap that every other app on this list leaves open.",
    link: "https://stashly.pro",
    isStashly: true,
  },
  {
    rank: "02",
    name: "Instapaper",
    tagline: "Best for reading long-form articles",
    accentColor: "#D97706",
    badgeBg: "#FEF3C7",
    pros: [
      "Clean, distraction-free reading view",
      "Text-to-speech for listening while commuting",
      "Kindle sync for reading on e-ink screens",
      "Robust offline access",
      "Good browser extensions on desktop",
    ],
    cons: [
      "Cannot save Instagram, TikTok, or YouTube links",
      "Premium plan is $5.99/month with few new features since 2023",
      "Mobile app feels dated compared to newer alternatives",
      "No tags — only folders",
    ],
    verdict:
      "Instapaper is still the best option if your entire reading diet is long-form web articles and you want to read them in a clean environment with highlighting and TTS. If you save anything beyond articles, it will let you down.",
    link: "https://www.instapaper.com",
    isStashly: false,
  },
  {
    rank: "03",
    name: "Readwise Reader",
    tagline: "Best for power readers who highlight and annotate",
    accentColor: "#0EA5E9",
    badgeBg: "#E0F2FE",
    pros: [
      "Best-in-class highlighting and annotation tools",
      "AI summaries and chat with saved content",
      "YouTube transcript saving",
      "Newsletter inbox built in",
      "Spaced repetition for revisiting highlights",
    ],
    cons: [
      "Expensive at $9.99/month",
      "More complex than most people need",
      "Still primarily focused on text content",
      "Instagram and TikTok saving is limited",
    ],
    verdict:
      "Readwise Reader is the most powerful read-later tool on this list if you treat saved content as a knowledge base — highlighting, annotating, and revisiting it systematically. For casual link saving, it is significantly more expensive and complex than necessary.",
    link: "https://readwise.io/read",
    isStashly: false,
  },
  {
    rank: "04",
    name: "Raindrop.io",
    tagline: "Best for desktop-first bookmark organisation",
    accentColor: "#2563EB",
    badgeBg: "#DBEAFE",
    pros: [
      "Beautiful visual layout on desktop",
      "Smart collections and nested folders",
      "Browser extension works across all browsers",
      "Free plan includes core features",
      "Supports PDFs and images alongside links",
    ],
    cons: [
      "Mobile app significantly weaker than desktop",
      "Share sheet integration on iOS has been buggy",
      "Cannot save Instagram or TikTok posts properly",
      "Pro plan is $3/month but free plan limits search",
    ],
    verdict:
      "Raindrop.io shines on a MacBook or Windows PC where the browser extension is your primary save method. On mobile, the experience has historically been inconsistent. If your workflow is primarily phone-based, Stashly handles what Raindrop struggles with.",
    link: "https://raindrop.io",
    isStashly: false,
  },
  {
    rank: "05",
    name: "GoodLinks",
    tagline: "Best for Apple-ecosystem users who only save web articles",
    accentColor: "#16A34A",
    badgeBg: "#DCFCE7",
    pros: [
      "Beautiful native Apple design (iOS, macOS, iPadOS, visionOS)",
      "iCloud sync — no account required",
      "One-time purchase of $4.99, no subscription",
      "Clean reading view with font and theme customisation",
      "Full-text search",
    ],
    cons: [
      "Apple-only — no Android version",
      "No share sheet support for non-Safari apps",
      "Cannot save Instagram, TikTok, or YouTube links",
      "No reminders or due dates on saves",
    ],
    verdict:
      "GoodLinks is the best choice for an iPhone and Mac user who exclusively saves web articles and wants a one-time purchase instead of a subscription. The moment you want to save a non-article link from a non-Safari app, it stops working for you.",
    link: "https://goodlinks.app",
    isStashly: false,
  },
  {
    rank: "06",
    name: "Flyleaf",
    tagline: "Best clean reading experience on Apple devices",
    accentColor: "#7C3AED",
    badgeBg: "#EDE9FE",
    pros: [
      "Exceptionally clean and beautiful reading interface",
      "Free plan available, Premium is just $2/month",
      "Custom themes, fonts, and reading settings",
      "iCloud sync across Apple devices",
      "Good Safari extension",
    ],
    cons: [
      "Apple-only — no Android",
      "Very limited organisation features (no tags, basic folders)",
      "No share sheet support beyond Safari",
      "Built exclusively around article reading",
    ],
    verdict:
      "Flyleaf delivers the nicest reading experience at the lowest price on this list. If your entire use case is saving articles from Safari to read later in a beautiful environment, it is hard to beat at $2/month. For anything else, it is too limited.",
    link: "https://flyleafapp.com",
    isStashly: false,
  },
  {
    rank: "07",
    name: "Safari Reading List",
    tagline: "Best free option for occasional web saves",
    accentColor: "#6B7280",
    badgeBg: "#F3F4F6",
    pros: [
      "Completely free, already on your iPhone",
      "Offline reading works without any setup",
      "iCloud sync across all Apple devices",
      "No account or sign-up required",
    ],
    cons: [
      "Only works in Safari — no other apps",
      "Search is slow and limited",
      "No tags, folders, or organisation",
      "Cannot save Instagram, TikTok, YouTube, or any non-Safari content",
      "Android users have no equivalent",
    ],
    verdict:
      "Safari Reading List is fine if you occasionally bookmark a web page to read on the train. If you save more than a handful of links per week, its limitations — no tags, no real search, Safari-only — become frustrating quickly.",
    link: "https://support.apple.com/guide/iphone/save-pages-to-a-reading-list-iph1a4721132/ios",
    isStashly: false,
  },
];

const comparisonRows = [
  { feature: "Works on Android", stashly: "✓", instapaper: "✓", readwise: "✓", raindrop: "✓", goodlinks: "✗", flyleaf: "✗", safari: "✗" },
  { feature: "Saves Instagram links", stashly: "✓", instapaper: "✗", readwise: "✗", raindrop: "✗", goodlinks: "✗", flyleaf: "✗", safari: "✗" },
  { feature: "Saves TikTok links", stashly: "✓", instapaper: "✗", readwise: "✗", raindrop: "✗", goodlinks: "✗", flyleaf: "✗", safari: "✗" },
  { feature: "Saves YouTube links", stashly: "✓", instapaper: "✗", readwise: "✓", raindrop: "✓", goodlinks: "✗", flyleaf: "✗", safari: "✗" },
  { feature: "iOS share sheet", stashly: "✓", instapaper: "✓", readwise: "✓", raindrop: "~", goodlinks: "✗", flyleaf: "✗", safari: "✗" },
  { feature: "Tags", stashly: "✓", instapaper: "✗", readwise: "✓", raindrop: "✓", goodlinks: "✗", flyleaf: "✗", safari: "✗" },
  { feature: "Reminders on saves", stashly: "✓", instapaper: "✗", readwise: "✗", raindrop: "✗", goodlinks: "✗", flyleaf: "✗", safari: "✗" },
  { feature: "Full-text search", stashly: "✓", instapaper: "✓", readwise: "✓", raindrop: "Pro", goodlinks: "✓", flyleaf: "✓", safari: "~" },
  { feature: "Free plan", stashly: "✓", instapaper: "✓", readwise: "✗", raindrop: "✓", goodlinks: "One-off", flyleaf: "✓", safari: "✓" },
  { feature: "Highlighting / notes", stashly: "Notes", instapaper: "✓", readwise: "✓", raindrop: "✗", goodlinks: "✓", flyleaf: "✗", safari: "✗" },
  { feature: "Offline reading", stashly: "✓", instapaper: "✓", readwise: "✓", raindrop: "✓", goodlinks: "✓", flyleaf: "✓", safari: "✓" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BestReadLaterAppsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-16" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <div className="flex items-center gap-3 mb-6">
              <Link href="/blog" className="text-xs font-medium" style={{ color: "#9CA3AF" }}>
                Blog
              </Link>
              <span style={{ color: "#E8E5F5" }}>›</span>
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: "#EDE9FE", color: "#6C47FF" }}
              >
                Guide
              </span>
            </div>

            <h1
              className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl"
              style={{ color: "#0F0A1E" }}
            >
              The 7 best read-later apps in 2026{" "}
              <span style={{ color: "#6C47FF" }}>(honestly compared)</span>
            </h1>

            <p className="mt-5 text-pretty text-lg leading-relaxed" style={{ color: "#4B5563" }}>
              Most "read-later" app roundups are written by people who save web
              articles and nothing else. But your saved links include Instagram
              posts, TikTok videos, YouTube playlists, Reddit threads, and
              WhatsApp links. Here is an honest look at 7 apps — what each one
              actually handles, and what it misses.
            </p>

            <div className="mt-3 flex items-center gap-4 text-xs" style={{ color: "#9CA3AF" }}>
              <span>October 2026</span>
              <span>·</span>
              <span>8 min read</span>
            </div>
          </div>
        </section>

        {/* ── What changed in 2026 ─────────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-4 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              What changed in 2025-2026
            </h2>
            <p className="mb-5 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              The biggest shift: Pocket shut down in July 2025. Mozilla gave its
              roughly 10 million users about 30 days to export their data. A
              service people had relied on for a decade went away with almost no
              warning, and it accelerated a conversation that was already
              happening — what does a modern link-saving app actually need to do?
            </p>
            <p className="mb-5 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              The answer has changed. In 2016 a "read-later" app meant saving
              a New Yorker article to read on your commute. In 2026 it means
              saving a recipe video from TikTok, a product link from Instagram,
              a YouTube tutorial, a Reddit thread, and a WhatsApp link your
              friend sent — all in the same app, all searchable, all in one place.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Most apps on this list were built for the 2016 problem. Only one
              was built for the 2026 one.
            </p>
          </div>
        </section>

        {/* ── Quick comparison table ───────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-2 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              At a glance
            </h2>
            <p className="mb-8 text-sm" style={{ color: "#6B7280" }}>
              ✓ supported &nbsp;·&nbsp; ✗ not supported &nbsp;·&nbsp; ~ partial support
            </p>
            <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid #E8E5F5" }}>
              <table className="w-full min-w-[640px] text-sm border-collapse">
                <thead>
                  <tr style={{ backgroundColor: "#0F0A1E" }}>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>
                      Feature
                    </th>
                    {["Stashly", "Instapaper", "Readwise", "Raindrop", "GoodLinks", "Flyleaf", "Safari"].map((h, i) => (
                      <th
                        key={h}
                        className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-widest"
                        style={{ color: i === 0 ? "#A87FFF" : "#6B7280" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.feature}
                      style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F9F8FF", borderTop: "1px solid #F3F4F6" }}
                    >
                      <td className="px-4 py-3 text-sm" style={{ color: "#0F0A1E" }}>{row.feature}</td>
                      {[row.stashly, row.instapaper, row.readwise, row.raindrop, row.goodlinks, row.flyleaf, row.safari].map((val, ci) => (
                        <td
                          key={ci}
                          className="px-3 py-3 text-center text-xs font-semibold"
                          style={{
                            color:
                              ci === 0
                                ? val === "✓" ? "#6C47FF" : "#9CA3AF"
                                : val === "✓" ? "#16A34A"
                                : val === "✗" ? "#D1D5DB"
                                : "#9CA3AF",
                          }}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── App reviews ──────────────────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-10 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              Every app reviewed
            </h2>

            <div className="flex flex-col gap-12">
              {apps.map((app) => (
                <div key={app.name} id={app.name.toLowerCase().replace(/\s/g, "-")}>
                  <div className="flex items-center gap-4 mb-5">
                    <span
                      className="text-3xl font-black leading-none"
                      style={{ color: app.badgeBg }}
                      aria-hidden="true"
                    >
                      {app.rank}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold" style={{ color: "#0F0A1E" }}>
                          {app.name}
                        </h3>
                        {app.isStashly && (
                          <span
                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                            style={{ backgroundColor: app.badgeBg, color: app.accentColor }}
                          >
                            Our pick
                          </span>
                        )}
                      </div>
                      <p className="text-sm mt-0.5" style={{ color: "#6B7280" }}>
                        {app.tagline}
                      </p>
                    </div>
                  </div>

                  <div
                    className="rounded-2xl p-6 mb-4"
                    style={{
                      backgroundColor: app.isStashly ? "#F9F8FF" : "#FFFFFF",
                      border: app.isStashly ? `2px solid ${app.accentColor}30` : "1px solid #E8E5F5",
                    }}
                  >
                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#16A34A" }}>
                          Pros
                        </p>
                        <ul className="flex flex-col gap-2">
                          {app.pros.map((pro) => (
                            <li key={pro} className="flex items-start gap-2 text-sm" style={{ color: "#374151" }}>
                              <span className="mt-0.5 shrink-0 text-base leading-none" style={{ color: "#16A34A" }} aria-hidden="true">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#DC2626" }}>
                          Cons
                        </p>
                        <ul className="flex flex-col gap-2">
                          {app.cons.map((con) => (
                            <li key={con} className="flex items-start gap-2 text-sm" style={{ color: "#374151" }}>
                              <span className="mt-0.5 shrink-0 text-base leading-none" style={{ color: "#D1D5DB" }} aria-hidden="true">✗</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-5" style={{ borderTop: "1px solid #E8E5F5" }}>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#6B7280" }}>
                        Verdict
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                        {app.verdict}
                      </p>
                    </div>
                  </div>

                  {app.isStashly ? (
                    <div className="flex items-center justify-between">
                      <AppStoreBadges size="sm" />
                    </div>
                  ) : (
                    <a
                      href={app.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium underline underline-offset-2"
                      style={{ color: app.accentColor }}
                    >
                      Visit {app.name} &rarr;
                    </a>
                  )}
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
                Save links from any app, find them in seconds
              </p>
              <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                Instagram, TikTok, YouTube, Reddit, Safari — one place for all of it.
              </p>
            </div>
            <div className="shrink-0">
              <AppStoreBadges size="sm" />
            </div>
          </div>
        </section>

        {/* ── How to choose ────────────────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-8 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              How to choose the right one for you
            </h2>
            <div className="flex flex-col gap-4">
              {[
                {
                  condition: "You save links from Instagram, TikTok, or WhatsApp",
                  pick: "Stashly",
                  reason: "It is the only app on this list built to handle share sheet saves from every app, not just browsers.",
                  color: "#6C47FF",
                  bg: "#F5F3FF",
                },
                {
                  condition: "You read exclusively long-form articles and want Kindle sync",
                  pick: "Instapaper",
                  reason: "The Kindle integration and text-to-speech are genuinely good. Just know it will not help you with social media links.",
                  color: "#D97706",
                  bg: "#FFFBEB",
                },
                {
                  condition: "You highlight and annotate everything and treat your saves as a knowledge base",
                  pick: "Readwise Reader",
                  reason: "Best-in-class annotation tools and spaced repetition. Worth the price if this is genuinely how you work.",
                  color: "#0EA5E9",
                  bg: "#F0F9FF",
                },
                {
                  condition: "You primarily use a Mac or PC and rarely save links from your phone",
                  pick: "Raindrop.io",
                  reason: "The desktop experience and browser extensions are excellent. Mobile is where it falls short.",
                  color: "#2563EB",
                  bg: "#EFF6FF",
                },
                {
                  condition: "You are Apple-only, save only web articles, and hate subscriptions",
                  pick: "GoodLinks",
                  reason: "One-time $4.99 purchase, beautiful native design, iCloud sync. Very narrow use case but handles it perfectly.",
                  color: "#16A34A",
                  bg: "#F0FDF4",
                },
              ].map((item) => (
                <div
                  key={item.condition}
                  className="rounded-xl p-5"
                  style={{ backgroundColor: item.bg, border: `1px solid ${item.color}20` }}
                >
                  <p className="text-sm font-medium mb-1" style={{ color: "#0F0A1E" }}>
                    If{" "}
                    <span className="font-semibold">{item.condition}</span>
                  </p>
                  <p className="text-sm" style={{ color: "#4B5563" }}>
                    <span className="font-bold" style={{ color: item.color }}>
                      Use {item.pick}.
                    </span>{" "}
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-10 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
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
        <section className="relative overflow-hidden py-24" style={{ backgroundColor: "#0F0A1E" }}>
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
              Save any link. Find it in seconds.
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "#9CA3AF" }}>
              Stashly works with every app on your phone. Instagram, TikTok,
              YouTube, Reddit, Safari, WhatsApp — tap Share, tap Stashly, done.
              Free on iPhone and Android.
            </p>
            <div className="mt-8 flex justify-center">
              <AppStoreBadges size="lg" />
            </div>
            <p className="mt-4 text-xs" style={{ color: "#4B5563" }}>
              Free to download · iOS &amp; Android · No credit card required
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
              <Link
                href="/pocket-alternative"
                className="underline underline-offset-2"
                style={{ color: "#A87FFF" }}
              >
                Pocket alternative
              </Link>
              <span style={{ color: "#4B5563" }}>·</span>
              <Link
                href="/blog/instapaper-alternative"
                className="underline underline-offset-2"
                style={{ color: "#A87FFF" }}
              >
                Instapaper alternative
              </Link>
              <span style={{ color: "#4B5563" }}>·</span>
              <Link
                href="/blog/raindrop-alternative"
                className="underline underline-offset-2"
                style={{ color: "#A87FFF" }}
              >
                Raindrop alternative
              </Link>
              <span style={{ color: "#4B5563" }}>·</span>
              <Link
                href="/personal-bookmark-manager"
                className="underline underline-offset-2"
                style={{ color: "#A87FFF" }}
              >
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
