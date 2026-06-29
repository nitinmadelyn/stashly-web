import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppStoreBadges from "@/components/AppStoreBadges";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Instapaper vs Stashly — Which is Better for Saving Links in 2026?",
  description:
    "Instapaper is great for reading articles. But if you save YouTube videos, Instagram posts, or Reddit threads, it can't help. Stashly saves everything. Free on iOS and Android.",
  metadataBase: new URL("https://stashly.pro"),
  alternates: { canonical: "https://stashly.pro/blog/instapaper-alternative" },
  openGraph: {
    title: "Instapaper vs Stashly — Which is Better for Saving Links in 2026?",
    description:
      "Instapaper doubled its price with no new features. Stashly saves articles, videos, social posts, and any link — for free on iOS and Android.",
    url: "https://stashly.pro/blog/instapaper-alternative",
    siteName: "Stashly",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instapaper vs Stashly — Which is Better for Saving Links in 2026?",
    description:
      "Instapaper doubled its price. Stashly saves articles, videos, and social posts — free on iOS and Android.",
  },
  robots: { index: true, follow: true },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Instapaper vs Stashly — Which is Better for Saving Links in 2026?",
  description:
    "An honest comparison of Instapaper and Stashly for saving links, articles, videos, and social media posts on iOS and Android.",
  url: "https://stashly.pro/blog/instapaper-alternative",
  datePublished: "2026-06-29",
  dateModified: "2026-06-29",
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
      name: "Is Stashly free compared to Instapaper?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Stashly is completely free to download on iOS and Android with no paywalled core features. Instapaper's free tier has a 5-notes monthly cap and no full-text search, pushing most power users to the Premium plan at $5.99/month — which doubled in price in 2024 with no major new features added.",
      },
    },
    {
      "@type": "Question",
      name: "Can Stashly save YouTube videos and Instagram posts like Instapaper cannot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Instapaper is designed exclusively for saving and reading text articles — it cannot save YouTube videos, Instagram posts, TikTok links, Reddit threads, or Spotify episodes in a meaningful way. Stashly saves any link from any app using the native iOS and Android share sheet, including all social platforms.",
      },
    },
    {
      "@type": "Question",
      name: "Can I import my Instapaper saves into Stashly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Export your Instapaper library from Settings → Export as a CSV file. Then import it into Stashly via Settings → Import. All your saved articles, titles, and folder names transfer across.",
      },
    },
    {
      "@type": "Question",
      name: "Does Stashly have a reading mode like Instapaper?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Stashly saves the title, description, thumbnail, and original URL of every link. The full distraction-free reading mode that strips ads and reformats articles is Instapaper's speciality. If clean article reading is your primary need, Instapaper still does that better. But if you save a wide variety of content — videos, social posts, recipes, job listings, articles — Stashly covers all of it.",
      },
    },
    {
      "@type": "Question",
      name: "Does Stashly work on iPhone and Android?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Stashly has native apps on the App Store (iOS) and Google Play (Android). Your library syncs automatically across both platforms.",
      },
    },
    {
      "@type": "Question",
      name: "Can I set reminders on saved links in Stashly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Any saved link can have a reminder attached to it. Instapaper has no reminder feature — it assumes you will read things whenever you open the app. Stashly nudges you at exactly the right moment for time-sensitive saves.",
      },
    },
  ],
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const comparisonRows = [
  { feature: "Save articles from the web",          stashly: true,  instapaper: true,  note: "" },
  { feature: "Save YouTube / Reddit links",         stashly: true,  instapaper: false, note: "Instapaper is text-article only" },
  { feature: "Save Instagram / TikTok posts",       stashly: true,  instapaper: false, note: "" },
  { feature: "Save from any app (share sheet)",     stashly: true,  instapaper: false, note: "Instapaper needs browser extension" },
  { feature: "Tags",                                stashly: true,  instapaper: false, note: "Instapaper has folders only" },
  { feature: "Collections / folders",               stashly: true,  instapaper: true,  note: "" },
  { feature: "Real-time search",                    stashly: true,  instapaper: false, note: "Instapaper: Premium only ($5.99/mo)" },
  { feature: "Voice search",                        stashly: true,  instapaper: false, note: "" },
  { feature: "Reminders on saved links",            stashly: true,  instapaper: false, note: "" },
  { feature: "Mark links as done",                  stashly: true,  instapaper: false, note: "" },
  { feature: "Share collections publicly",          stashly: true,  instapaper: false, note: "" },
  { feature: "Distraction-free article reader",     stashly: false, instapaper: true,  note: "Instapaper's core strength" },
  { feature: "Kindle export",                       stashly: false, instapaper: true,  note: "" },
  { feature: "Text-to-speech",                      stashly: false, instapaper: true,  note: "Instapaper Premium only" },
  { feature: "Offline reading",                     stashly: false, instapaper: true,  note: "" },
  { feature: "Free tier with no caps",              stashly: true,  instapaper: false, note: "Instapaper free: 5 notes/month cap" },
  { feature: "iOS app",                             stashly: true,  instapaper: true,  note: "" },
  { feature: "Android app",                         stashly: true,  instapaper: true,  note: "" },
];

const migrationSteps = [
  {
    step: "01",
    title: "Export your Instapaper library",
    description:
      "In Instapaper, go to Settings → Export. Download your library as a CSV file. It contains all your saved articles, titles, URLs, and folder names.",
  },
  {
    step: "02",
    title: "Download Stashly",
    description:
      "Install Stashly on your iPhone or Android. Create your free account in under a minute.",
  },
  {
    step: "03",
    title: "Import your Instapaper export",
    description:
      "In Stashly, go to Settings → Import → Choose file. Select your Instapaper CSV. All your saved links and titles import automatically.",
  },
  {
    step: "04",
    title: "Save your next link from any app",
    description:
      "Open YouTube, Instagram, Reddit — anywhere you browse. Tap Share → Stashly. Two taps and it's in your library alongside your imported Instapaper articles.",
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

export default function InstapaperAlternativePage() {
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
              <Link href="/blog" className="text-xs font-medium" style={{ color: "#9CA3AF" }}>
                Blog
              </Link>
              <span style={{ color: "#E8E5F5" }}>›</span>
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: "#FEF3C7", color: "#D97706" }}
              >
                Comparison
              </span>
            </div>

            <h1
              className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl"
              style={{ color: "#0F0A1E" }}
            >
              Instapaper vs Stashly —{" "}
              <span style={{ color: "#6C47FF" }}>which one should you use in 2026?</span>
            </h1>

            <p className="mt-5 text-pretty text-lg leading-relaxed" style={{ color: "#4B5563" }}>
              Instapaper has been around for 17 years and does one thing
              beautifully — save articles to read later. But in 2026, most
              people save more than just articles. If YouTube videos, Instagram
              posts, Reddit threads, and Spotify links are part of what you
              want to save, Instapaper simply cannot help you.
            </p>

            <div className="mt-3 flex items-center gap-4 text-xs" style={{ color: "#9CA3AF" }}>
              <span>June 2026</span>
              <span>·</span>
              <span>5 min read</span>
            </div>
          </div>
        </section>

        {/* ── What Instapaper does well ────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-4 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              What Instapaper does well
            </h2>
            <p className="mb-8 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Instapaper has earned its reputation over 17 years. For one
              specific use case, it is still best-in-class.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Distraction-free reading", body: "Instapaper strips out ads, navigation, and clutter from any web page, presenting just the text in a clean, customisable reader. The typography and reading experience is genuinely excellent." },
                { title: "Kindle export", body: "Send saved articles directly to your Kindle. For people who prefer reading long-form content on an e-ink screen, this remains one of Instapaper's most-loved features." },
                { title: "Text-to-speech", body: "Premium subscribers can listen to any saved article using Instapaper's built-in audio player — useful for commuting or exercise." },
                { title: "Offline reading", body: "Articles are downloaded to your device so you can read them with no internet connection — on planes, underground, or anywhere without signal." },
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

        {/* ── Where Instapaper falls short ─────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-4 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              Where Instapaper falls short in 2026
            </h2>
            <p className="mb-8 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Instapaper was designed for a web made of articles. The 2026 web
              is Instagram, TikTok, YouTube, Reddit, Substack, and Spotify. For
              anything beyond a text article, Instapaper offers nothing.
            </p>
            <div className="flex flex-col gap-4">
              {[
                {
                  title: "Articles only — videos and social posts are unsupported",
                  body: "You cannot save a YouTube video, TikTok, Instagram post, Reddit thread, or Spotify episode into Instapaper in any meaningful way. It can technically save the URL, but it has no way to display or organise non-article content. If half of what you want to save is video or social media, Instapaper covers half your needs.",
                },
                {
                  title: "Price doubled with no major new features",
                  body: "In 2024, Instapaper raised its Premium price from $2.99 to $5.99/month — the first price rise in nine years, but with no significant new features to justify it. Users who stuck with Instapaper through years of slower development found themselves paying double overnight.",
                },
                {
                  title: "Full-text search is paywalled",
                  body: "Searching the content of your saved articles — not just titles — requires Premium at $5.99/month. The free tier has no full-text search, making it very hard to find something you saved months ago unless you remember the exact title.",
                },
                {
                  title: "5 notes per month on the free plan",
                  body: "The free tier limits you to 5 notes or highlights per month. For any serious reader using Instapaper as a research tool, this cap is hit within days and becomes a constant source of frustration.",
                },
                {
                  title: "No reminders, no action tracking",
                  body: "Instapaper assumes you will read saved articles eventually. But people save things for all kinds of reasons — a job listing to apply for, a sale that ends Friday, a recipe to try this weekend. There is no way to set a reminder or mark something as done.",
                },
                {
                  title: "No collection sharing",
                  body: "You cannot create a curated list of links and share it with a friend, team, or audience. Instapaper is purely private — useful for personal reading, not for collaboration or content curation.",
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
                Save everything — not just articles
              </p>
              <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                Free on iPhone and Android. Import from Instapaper in minutes.
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
              Instapaper vs Stashly — feature comparison
            </h2>
            <p className="mb-8 text-sm" style={{ color: "#6B7280" }}>An honest, feature-by-feature breakdown.</p>

            <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid #E8E5F5" }}>
              <div className="grid grid-cols-3 px-5 py-3 text-xs font-semibold uppercase tracking-widest" style={{ backgroundColor: "#0F0A1E", color: "#9CA3AF" }}>
                <span>Feature</span>
                <span className="text-center" style={{ color: "#A87FFF" }}>Stashly</span>
                <span className="text-center">Instapaper</span>
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
                    {row.instapaper ? <CheckIcon color="#6B7280" /> : <CrossIcon />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who should use what ──────────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-8 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              Instapaper or Stashly — which one is right for you?
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl p-6" style={{ backgroundColor: "#F9F8FF", border: "1px solid #E8E5F5" }}>
                <p className="mb-3 text-sm font-bold uppercase tracking-wide" style={{ color: "#6B7280" }}>
                  Stick with Instapaper if…
                </p>
                <ul className="flex flex-col gap-2.5">
                  {[
                    "You primarily save long-form articles to read later",
                    "You export to Kindle regularly",
                    "You want a clean, distraction-free reading experience",
                    "You listen to articles via text-to-speech",
                    "You need offline reading on flights",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm" style={{ color: "#4B5563" }}>
                      <CheckIcon color="#6B7280" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-6" style={{ backgroundColor: "#EDE9FE", border: "1px solid #C4B5FD" }}>
                <p className="mb-3 text-sm font-bold uppercase tracking-wide" style={{ color: "#6C47FF" }}>
                  Switch to Stashly if…
                </p>
                <ul className="flex flex-col gap-2.5">
                  {[
                    "You save YouTube videos, Instagram posts, or TikToks",
                    "You want core features without paying $5.99/month",
                    "You need to find saved links fast with search",
                    "You want reminders on time-sensitive saves",
                    "You share collections with friends or followers",
                    "You save from Reddit, Spotify, GitHub, or social apps",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm" style={{ color: "#3730A3" }}>
                      <CheckIcon color="#6C47FF" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Migration guide ──────────────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-2 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              How to migrate from Instapaper to Stashly
            </h2>
            <p className="mb-10 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Your entire Instapaper library moves across in four steps.
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
              Save everything, not just articles
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "#9CA3AF" }}>
              Free on iPhone and Android. Import your Instapaper library in minutes.
            </p>
            <div className="mt-8 flex justify-center">
              <AppStoreBadges size="lg" />
            </div>
            <p className="mt-4 text-xs" style={{ color: "#4B5563" }}>
              Free to download · iOS &amp; Android · No credit card required
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm" style={{ color: "#6B7280" }}>
              <Link href="/pocket-alternative" className="underline underline-offset-2" style={{ color: "#A87FFF" }}>
                Pocket alternative
              </Link>
              <span>·</span>
              <Link href="/blog/raindrop-alternative" className="underline underline-offset-2" style={{ color: "#A87FFF" }}>
                Raindrop alternative
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
