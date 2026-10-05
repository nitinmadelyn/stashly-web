import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppStoreBadges from "@/components/AppStoreBadges";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "TikTok Saved 500 Videos For You. Good Luck Finding Any of Them.",
  description:
    "TikTok's Favourites tab has no search, no tags, and videos disappear when creators delete them. Here's how to actually save TikTok videos you'll find later.",
  metadataBase: new URL("https://stashly.pro"),
  alternates: { canonical: "https://stashly.pro/blog/tiktok-saved-videos" },
  openGraph: {
    title: "TikTok Saved 500 Videos For You. Good Luck Finding Any of Them.",
    description:
      "No search. No tags. Videos vanish when creators delete them. TikTok's Favourites tab is a black hole — here's how to escape it.",
    url: "https://stashly.pro/blog/tiktok-saved-videos",
    siteName: "Stashly",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok Saved 500 Videos For You. Good Luck Finding Any of Them.",
    description:
      "No search. No tags. Videos vanish when creators delete them. TikTok Favourites is a black hole — here's how to escape it.",
  },
  robots: { index: true, follow: true },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "TikTok Saved 500 Videos For You. Good Luck Finding Any of Them.",
  description:
    "TikTok Favourites has no search, no tags, and videos disappear when creators delete them. Here's how to save TikTok videos so you can actually find them later.",
  url: "https://stashly.pro/blog/tiktok-saved-videos",
  datePublished: "2026-07-03",
  dateModified: "2026-07-03",
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
      name: "Why can't I search my TikTok saved videos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TikTok's Favourites tab has no search functionality. You can only scroll through your saved videos chronologically. TikTok added Collections in 2022 as a workaround, but you still cannot search within a collection — you can only scroll. For any real search capability, you need to save the TikTok link to an external app like Stashly.",
      },
    },
    {
      "@type": "Question",
      name: "Why did my TikTok saved videos disappear?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TikTok saved videos disappear when the original creator deletes the video, makes their account private, or gets banned. TikTok does not store a copy of the video for you — it only saves a reference to the original. If the original is gone, your saved version is gone too. Saving the link to Stashly at least preserves the title, description, and your own notes even if the video is later removed.",
      },
    },
    {
      "@type": "Question",
      name: "How do I save TikTok videos so I can find them later?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most reliable method is to save the TikTok link to a dedicated link-saving app. In TikTok, tap the Share button on any video, then tap 'Copy Link'. Open Stashly and paste — or set up Stashly in your share sheet so you can save in two taps without leaving TikTok. You can then tag, search, and organise your saved TikToks in Stashly.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a limit to TikTok Favourites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TikTok does not publish an official Favourites limit, but users report being blocked from saving more videos after hitting an undisclosed threshold. TikTok sometimes shows messages like 'you're adding favourites too fast'. There is no such limit in Stashly — save as many links as you want.",
      },
    },
    {
      "@type": "Question",
      name: "Can I organise my TikTok saved videos into categories?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TikTok Collections let you group saved videos into named folders, but there is still no way to search within them. Stashly lets you add tags (e.g. 'recipes', 'workouts', 'travel') and create named collections, all of which are fully searchable in real time.",
      },
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TikTokSavedVideosPage() {
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
                style={{ backgroundColor: "#FCE7F3", color: "#BE185D" }}
              >
                TikTok
              </span>
            </div>

            <h1
              className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl"
              style={{ color: "#0F0A1E" }}
            >
              TikTok saved 500 videos for you.{" "}
              <span style={{ color: "#6C47FF" }}>Good luck finding any of them.</span>
            </h1>

            <p className="mt-5 text-pretty text-lg leading-relaxed" style={{ color: "#4B5563" }}>
              You tap the bookmark icon. TikTok says "saved to Favourites."
              And then that video joins 499 others in a chronological list you
              will scroll through forever and never find again. Sound familiar?
            </p>

            <div className="mt-3 flex items-center gap-4 text-xs" style={{ color: "#9CA3AF" }}>
              <span>July 2026</span>
              <span>·</span>
              <span>4 min read</span>
            </div>
          </div>
        </section>

        {/* ── The core problem ─────────────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-4 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              TikTok Favourites is a black hole
            </h2>
            <p className="mb-6 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Here is the thing nobody tells you when you first tap that
              bookmark icon: TikTok's Favourites tab was not designed to help
              you find things. It was designed to keep you on TikTok.
            </p>
            <p className="mb-6 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Saving a video is satisfying in the moment. It feels like you're
              filing it away for later. But "later" on TikTok is just
              scrolling backwards through a chronological list with no way
              to search, no way to filter, and no way to find that workout
              video you saved four months ago unless you happen to scroll
              past it.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#4B5563" }}>
              TikTok added Collections in 2022 as a half-measure — you can
              now organise saved videos into named folders. But you still
              cannot search within a collection. You are still just scrolling.
              With extra steps.
            </p>
          </div>
        </section>

        {/* ── Problems list ────────────────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-8 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              Every problem with TikTok Favourites
            </h2>
            <div className="flex flex-col gap-5">
              {[
                {
                  number: "01",
                  title: "No search. At all.",
                  body: "There is no search bar inside your Favourites or Collections. None. You cannot type \"pasta recipe\" and find the video you saved. You scroll. And scroll. Until you give up and just search TikTok again hoping the algorithm resurfaces it — which it might not.",
                },
                {
                  number: "02",
                  title: "Videos vanish when creators delete them",
                  body: "TikTok doesn't store a copy of the video for you. It stores a link to the original. The moment the creator deletes the video, makes their account private, or gets banned — your saved version disappears too. You saved that recipe. The creator deleted their account. Gone. No warning, no backup, nothing.",
                },
                {
                  number: "03",
                  title: "You hit a save limit and TikTok won't tell you what it is",
                  body: "TikTok has an undisclosed Favourites limit. Users report being blocked from saving more videos with messages like \"you're adding favourites too fast\" or saves simply not appearing. The exact cap is never communicated, and TikTok support isn't helpful when you hit it.",
                },
                {
                  number: "04",
                  title: "Favourites randomly disappear",
                  body: "Multiple users report their entire Favourites list — or specific Collections — vanishing overnight with no explanation. TikTok support takes days to respond and often provides no resolution. There is no export, no backup, no recovery path.",
                },
                {
                  number: "05",
                  title: "No tags, no notes, no context",
                  body: "When you save a video on TikTok, you cannot add a note to remind yourself why you saved it. Six months later: \"Why did I save this? What was I planning to do with it?\" The video has no context. Your past self saved it for a reason you've completely forgotten.",
                },
                {
                  number: "06",
                  title: "You can't share your saved videos as a collection",
                  body: "Found 20 great workout videos and want to share them with a friend? TikTok has no way to share a curated collection of your saved videos. You'd have to send each link individually — or just give up.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="flex gap-5 rounded-2xl p-6"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E5F5" }}
                >
                  <span
                    className="shrink-0 text-2xl font-black leading-none"
                    style={{ color: "#E8E5F5" }}
                    aria-hidden="true"
                  >
                    {item.number}
                  </span>
                  <div>
                    <p className="mb-2 text-base font-bold" style={{ color: "#0F0A1E" }}>{item.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{item.body}</p>
                  </div>
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
                Save TikTok links you can actually find later
              </p>
              <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                Search by topic, tag by category, never lose a video again.
              </p>
            </div>
            <div className="shrink-0">
              <AppStoreBadges size="sm" />
            </div>
          </div>
        </section>

        {/* ── The fix ──────────────────────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-4 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              The fix: save the link, not just the favourite
            </h2>
            <p className="mb-6 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Instead of tapping TikTok's bookmark, share the link to Stashly.
              Two taps. The video link goes into your Stashly library where
              you can actually do something useful with it.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {[
                {
                  accent: "#6C47FF",
                  icon: "🔍",
                  title: "Search everything instantly",
                  body: "Type \"pasta\" and every TikTok you've saved with that word in the title or your notes appears immediately. No scrolling. No guessing.",
                },
                {
                  accent: "#F97316",
                  icon: "🏷️",
                  title: "Tag as you save",
                  body: "Add tags like 'recipes', 'workouts', 'travel inspo', 'outfit ideas' at save time. Filter your entire library by tag in one tap.",
                },
                {
                  accent: "#0D9488",
                  icon: "🔔",
                  title: "Set a reminder",
                  body: "Found a recipe to try this weekend? A workout challenge to start on Monday? Set a reminder on the link. Stashly notifies you at exactly the right time.",
                },
                {
                  accent: "#0EA5E9",
                  icon: "📁",
                  title: "Build searchable collections",
                  body: "Group TikToks into named collections — 'Quick dinners', 'Morning routines', 'Places to visit'. Share the collection with anyone via a public link.",
                },
                {
                  accent: "#16A34A",
                  icon: "✅",
                  title: "Mark as done when you've watched it",
                  body: "Actually watched the tutorial? Made the recipe? Mark it done and move on. Your list stays focused on what you still want to act on.",
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

        {/* ── How to do it ─────────────────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-2 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              How to save TikTok videos to Stashly
            </h2>
            <p className="mb-10 text-base leading-relaxed" style={{ color: "#4B5563" }}>
              Two taps. No leaving TikTok.
            </p>
            <div className="flex flex-col gap-0">
              {[
                {
                  step: "01",
                  title: "Download Stashly",
                  description: "Install Stashly on your iPhone or Android. It takes under a minute to set up your free account.",
                },
                {
                  step: "02",
                  title: "In TikTok, tap Share on any video",
                  description: "Tap the arrow share button on the right side of any TikTok video. The share menu will appear.",
                },
                {
                  step: "03",
                  title: "Tap Stashly in the share sheet",
                  description: "Stashly appears in your phone's share sheet alongside other apps. Tap it and the link is saved — title, thumbnail, and all.",
                },
                {
                  step: "04",
                  title: "Add a tag or note (optional)",
                  description: "Before saving, add a tag like 'recipes' or a quick note to remind yourself why you saved it. Your future self will thank you.",
                },
              ].map((s, i, arr) => {
                const isLast = i === arr.length - 1;
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

        {/* ── Comparison ───────────────────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-8 text-2xl font-bold tracking-tight" style={{ color: "#0F0A1E" }}>
              TikTok Favourites vs saving to Stashly
            </h2>
            <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid #E8E5F5" }}>
              <div className="grid grid-cols-3 px-5 py-3 text-xs font-semibold uppercase tracking-widest" style={{ backgroundColor: "#0F0A1E", color: "#9CA3AF" }}>
                <span></span>
                <span className="text-center" style={{ color: "#A87FFF" }}>Stashly</span>
                <span className="text-center">TikTok Favourites</span>
              </div>
              {[
                { label: "Search saved videos",        stashly: "✓ Full search",    tiktok: "✗ None"              },
                { label: "Tags",                       stashly: "✓ Add any tags",   tiktok: "✗ Not available"     },
                { label: "Notes on saves",             stashly: "✓ Yes",            tiktok: "✗ No"                },
                { label: "Video stays if deleted",     stashly: "✓ Link is yours",  tiktok: "✗ Gone forever"      },
                { label: "Reminders",                  stashly: "✓ Set any date",   tiktok: "✗ Not available"     },
                { label: "Share as collection",        stashly: "✓ Public link",    tiktok: "✗ Not available"     },
                { label: "Mark as done / watched",     stashly: "✓ Yes",            tiktok: "✗ No"                },
                { label: "Save limit",                 stashly: "✓ Unlimited",      tiktok: "✗ Hidden cap"        },
                { label: "Works with other apps too",  stashly: "✓ Any app",        tiktok: "✗ TikTok only"       },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className="grid grid-cols-3 items-center px-5 py-3.5 text-sm"
                  style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F9F8FF", borderTop: "1px solid #F3F4F6" }}
                >
                  <span style={{ color: "#0F0A1E" }}>{row.label}</span>
                  <span className="text-center text-xs font-semibold" style={{ color: "#6C47FF" }}>{row.stashly}</span>
                  <span className="text-center text-xs" style={{ color: "#9CA3AF" }}>{row.tiktok}</span>
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
                <div key={item.name} className="rounded-xl p-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E5F5" }}>
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
              Stop losing TikToks you actually wanted to keep
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "#9CA3AF" }}>
              Stashly is free on iPhone and Android. Save any TikTok in two taps
              and find it in seconds — not after scrolling for ten minutes.
            </p>
            <div className="mt-8 flex justify-center">
              <AppStoreBadges size="lg" />
            </div>
            <p className="mt-4 text-xs" style={{ color: "#4B5563" }}>
              Free to download · iOS &amp; Android · No credit card required
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
              <Link href="/blog/instapaper-alternative" className="underline underline-offset-2" style={{ color: "#A87FFF" }}>
                Instapaper alternative
              </Link>
              <span style={{ color: "#4B5563" }}>·</span>
              <Link href="/blog/raindrop-alternative" className="underline underline-offset-2" style={{ color: "#A87FFF" }}>
                Raindrop alternative
              </Link>
              <span style={{ color: "#4B5563" }}>·</span>
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
