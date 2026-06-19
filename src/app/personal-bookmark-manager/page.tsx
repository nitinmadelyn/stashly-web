import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppStoreBadges from "@/components/AppStoreBadges";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Personal Bookmark Manager for iPhone and Android — Stashly",
  description:
    "Stashly is the personal bookmark manager built for mobile. Save links from Instagram, YouTube, Reddit, or any app. Search instantly. Set reminders. Free on iOS and Android.",
  metadataBase: new URL("https://stashly.pro"),
  alternates: { canonical: "https://stashly.pro/personal-bookmark-manager" },
  openGraph: {
    title: "Personal Bookmark Manager for iPhone and Android — Stashly",
    description:
      "Save links from any app, search in seconds, and share curated collections. Stashly is the personal bookmark manager designed for the mobile-first world.",
    url: "https://stashly.pro/personal-bookmark-manager",
    siteName: "Stashly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Bookmark Manager for iPhone and Android — Stashly",
    description:
      "Save links from any app, search in seconds, share collections. Free personal bookmark manager for iOS and Android.",
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
      name: "What is a personal bookmark manager?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A personal bookmark manager is an app that lets you save, organise, and retrieve links from across the web — articles, videos, products, social posts, and more. Unlike browser bookmarks, a personal bookmark manager works across all your apps and devices, and gives you powerful search, tags, and collections to find anything instantly.",
      },
    },
    {
      "@type": "Question",
      name: "How is Stashly different from browser bookmarks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Browser bookmarks are locked to one browser and are nearly impossible to search. Stashly works across every app on your phone — Instagram, TikTok, YouTube, Reddit, Safari, Chrome — using the native share sheet. Your entire saved library is searchable in real time, organised with tags and collections, and available on any device.",
      },
    },
    {
      "@type": "Question",
      name: "Can I save links from Instagram and TikTok with Stashly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Stashly integrates with the iOS and Android share sheet, so you can save a link from any app in two taps. Instagram posts, TikTok videos, YouTube videos, Reddit threads, Substack posts, GitHub repos — all of them save directly into Stashly.",
      },
    },
    {
      "@type": "Question",
      name: "Is Stashly free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Stashly is free to download on both the App Store and Google Play. Core features — saving links, tagging, collections, search, and reminders — are all available for free.",
      },
    },
    {
      "@type": "Question",
      name: "Can I share my bookmarks with others?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Stashly lets you create collections and share them via a public link. Anyone can view the collection without an account, or import the entire collection into their own Stashly library with a single tap.",
      },
    },
    {
      "@type": "Question",
      name: "Does Stashly work on both iPhone and Android?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Stashly has native apps on the App Store (iOS) and Google Play (Android). Your library syncs automatically across both platforms.",
      },
    },
    {
      "@type": "Question",
      name: "Can I set reminders for saved links?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Any saved link in Stashly can have a reminder attached to it. Set a date and time, and Stashly will send you a notification when the moment is right — a product sale, a recipe for the weekend, a job listing to follow up on.",
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
    "Personal bookmark manager for iPhone and Android. Save links from any app, search instantly, organise with tags and collections.",
  url: "https://stashly.pro",
};

// ─── Problem / Solution data ──────────────────────────────────────────────────

const problems = [
  {
    icon: "📱",
    title: "You save things in 6 different places",
    description:
      "Notes app, browser bookmarks, Instagram saved, WhatsApp links to yourself, screenshot folders. When you need something, you have no idea where it went.",
  },
  {
    icon: "🔍",
    title: "Search never works",
    description:
      'You vaguely remember the article was about "productivity" and you saw it on Reddit. Browser bookmarks have no way to search that. You give up and Google it again.',
  },
  {
    icon: "😮‍💨",
    title: "Your saves pile up until they’re useless",
    description:
      "A thousand bookmarks with no organisation is the same as zero bookmarks. You stop trusting your own system and stop saving altogether.",
  },
  {
    icon: "⏳",
    title: "No follow-through on time-sensitive saves",
    description:
      "You saved a job posting, a sale that ends Friday, a recipe for when you have guests over. No reminder. You forgot. Gone.",
  },
];

const solutions = [
  {
    accent: "#6C47FF",
    icon: "📥",
    title: "One place for everything",
    description:
      "Save from Instagram, YouTube, Reddit, Safari, Chrome, or any app using the share sheet. Two taps and it’s in Stashly — no copy-pasting, no switching apps.",
  },
  {
    accent: "#0EA5E9",
    icon: "🔎",
    title: "Search that actually works",
    description:
      "Type a word, a topic, a platform name. Stashly searches across titles, descriptions, tags, and notes in real time. You will find it in under 3 seconds.",
  },
  {
    accent: "#F97316",
    icon: "🏷️",
    title: "Tags and collections that scale",
    description:
      "Add tags at save time or later. Group links into named collections. Browse by platform. Your library stays organised no matter how much you save.",
  },
  {
    accent: "#0D9488",
    icon: "🔔",
    title: "Reminders for time-sensitive links",
    description:
      "Attach a reminder to any saved link. The sale, the booking window, the follow-up — Stashly nudges you at exactly the right moment.",
  },
  {
    accent: "#16A34A",
    icon: "✅",
    title: "Mark as done and keep moving",
    description:
      "Once you’ve read the article, bought the product, or applied for the job — mark it done. Your active list stays clean and focused on what still needs your attention.",
  },
];

const useCases = [
  { emoji: "🛍️", label: "Shopping",       desc: "Save product links and set a reminder when the sale drops." },
  { emoji: "✈️", label: "Travel",          desc: "Collect places, guides, and tips into a trip collection before you go." },
  { emoji: "📖", label: "Read later",      desc: "Save articles from Medium and Reddit without cluttering your browser." },
  { emoji: "🎬", label: "Watch later",     desc: "Build a weekend playlist of YouTube videos and documentaries." },
  { emoji: "🍜", label: "Food & dining",   desc: "Save restaurant picks and recipe ideas, organised by city or cuisine." },
  { emoji: "💼", label: "Job hunting",     desc: "Track job listings with reminders to follow up before they close." },
  { emoji: "🎨", label: "Inspiration",     desc: "Build mood boards from Pinterest, Behance, and Dribbble links." },
  { emoji: "📚", label: "Learning",        desc: "Organise tutorials, courses, and reference docs by topic or skill." },
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PersonalBookmarkManagerPage() {
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
        <section className="pt-32 pb-20" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide"
              style={{ backgroundColor: "#EDE9FE", color: "#6C47FF" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#6C47FF" }}
              />
              Personal bookmark manager
            </div>

            <h1
              className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl"
              style={{ color: "#0F0A1E" }}
            >
              The{" "}
              <span style={{ color: "#6C47FF" }}>personal bookmark manager</span>
              {" "}built for your phone
            </h1>

            <p
              className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed"
              style={{ color: "#4B5563" }}
            >
              Browser bookmarks were designed in 1993. Stashly is built for
              2026 — save from Instagram, TikTok, YouTube, or any app. Search
              in seconds. Share collections. Set reminders. Free on iOS and
              Android.
            </p>

            <div className="mt-8 flex justify-center">
              <AppStoreBadges size="lg" />
            </div>
            <p className="mt-3 text-xs" style={{ color: "#9CA3AF" }}>
              Free to download. Works on every app. iPhone and Android.
            </p>
          </div>
        </section>

        {/* ── The problem ──────────────────────────────────────────────────── */}
        <section className="py-20" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="mb-2 text-2xl font-bold tracking-tight md:text-3xl"
              style={{ color: "#0F0A1E" }}
            >
              Why browser bookmarks are not a bookmark manager
            </h2>
            <p className="mb-10 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Browser bookmarks were built for a world where you only saved
              things in one browser, on one computer. That world no longer exists.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {problems.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl p-5"
                  style={{ backgroundColor: "#F9F8FF", border: "1px solid #E8E5F5" }}
                >
                  <p className="mb-2 text-2xl" aria-hidden="true">{p.icon}</p>
                  <p className="mb-1.5 text-sm font-bold" style={{ color: "#0F0A1E" }}>{p.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The solution ─────────────────────────────────────────────────── */}
        <section className="py-20" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="mb-2 text-2xl font-bold tracking-tight md:text-3xl"
              style={{ color: "#0F0A1E" }}
            >
              What a proper personal bookmark manager looks like
            </h2>
            <p className="mb-10 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Stashly was built from scratch for mobile — the share sheet, not
              the browser extension. Here is what that enables.
            </p>

            <div className="flex flex-col gap-4">
              {solutions.map((s) => (
                <div
                  key={s.title}
                  className="flex gap-4 rounded-xl p-5"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E5F5" }}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl"
                    style={{ backgroundColor: `${s.accent}14` }}
                    aria-hidden="true"
                  >
                    {s.icon}
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold" style={{ color: "#0F0A1E" }}>{s.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Use cases grid ───────────────────────────────────────────────── */}
        <section className="py-20" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="mb-2 text-2xl font-bold tracking-tight md:text-3xl"
              style={{ color: "#0F0A1E" }}
            >
              Who uses a personal bookmark manager?
            </h2>
            <p className="mb-10 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              If you save things on your phone — even occasionally — Stashly
              will make that habit ten times more useful.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {useCases.map((u) => (
                <div
                  key={u.label}
                  className="flex items-start gap-4 rounded-xl p-5"
                  style={{ backgroundColor: "#F9F8FF", border: "1px solid #E8E5F5" }}
                >
                  <span className="text-2xl shrink-0" aria-hidden="true">{u.emoji}</span>
                  <div>
                    <p className="mb-1 text-sm font-bold" style={{ color: "#0F0A1E" }}>{u.label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{u.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features checklist ───────────────────────────────────────────── */}
        <section className="py-20" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="mb-2 text-2xl font-bold tracking-tight md:text-3xl"
              style={{ color: "#0F0A1E" }}
            >
              Everything Stashly includes — for free
            </h2>
            <p className="mb-10 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              No premium paywall for the core features. This is what you get
              when you download Stashly.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Save from any app via the share sheet",
                "Instagram, TikTok, YouTube, Reddit support",
                "Real-time full-text search",
                "Tags and multi-tag filtering",
                "Collections and folders",
                "Voice search",
                "Reminders on any saved link",
                "Mark links as done",
                "Share collections with a public link",
                "Import from Pocket, browser bookmarks, CSV",
                "iOS and Android native apps",
                "Auto-saves title, description, and thumbnail",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-3 rounded-lg px-4 py-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E5F5" }}>
                  <CheckIcon />
                  <span className="text-sm" style={{ color: "#0F0A1E" }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section className="py-20" style={{ backgroundColor: "#FFFFFF" }}>
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
                  style={{ backgroundColor: "#F9F8FF", border: "1px solid #E8E5F5" }}
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
              Start using a real personal bookmark manager
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "#9CA3AF" }}>
              Free on iPhone and Android. Save your first link in under a minute.
            </p>
            <div className="mt-8 flex justify-center">
              <AppStoreBadges size="lg" />
            </div>
            <p className="mt-4 text-xs" style={{ color: "#4B5563" }}>
              Free to download · iOS &amp; Android · No credit card required
            </p>
            <p className="mt-6 text-sm" style={{ color: "#6B7280" }}>
              Switching from Pocket?{" "}
              <Link
                href="/pocket-alternative"
                className="underline underline-offset-2"
                style={{ color: "#A87FFF" }}
              >
                See how to migrate your library
              </Link>
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
