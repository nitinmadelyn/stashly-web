import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostCard, { type Post } from "@/components/BlogPostCard";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Blog — Stashly",
  description:
    "Guides, tips, and deep dives on saving links, managing bookmarks, and getting more out of Stashly on iOS and Android.",
  metadataBase: new URL("https://stashly.pro"),
  alternates: { canonical: "https://stashly.pro/blog" },
  openGraph: {
    title: "Blog — Stashly",
    description:
      "Guides, tips, and deep dives on saving links, managing bookmarks, and getting more out of Stashly.",
    url: "https://stashly.pro/blog",
    siteName: "Stashly",
    type: "website",
  },
  robots: { index: true, follow: true },
};

// ─── Post data ────────────────────────────────────────────────────────────────

const posts: Post[] = [
  {
    slug: "instapaper-alternative",
    href: "/blog/instapaper-alternative",
    category: "Comparison",
    categoryColor: "#D97706",
    title: "Instapaper vs Stashly — which is better for saving links in 2026?",
    excerpt:
      "Instapaper doubled its price with no new features. It saves articles beautifully — but not YouTube videos, Instagram posts, or Reddit threads. Here's an honest comparison.",
    readingTime: "5 min read",
    publishedAt: "June 2026",
  },
  {
    slug: "raindrop-alternative",
    href: "/blog/raindrop-alternative",
    category: "Comparison",
    categoryColor: "#0EA5E9",
    title: "The best Raindrop.io alternative for mobile in 2026",
    excerpt:
      "Raindrop.io is polished on desktop but struggles on mobile — no Instagram/TikTok saving, iOS login bugs, broken iPad multitasking. Here's why Stashly works better for mobile-first users.",
    readingTime: "5 min read",
    publishedAt: "June 2026",
  },
  {
    slug: "personal-bookmark-manager",
    href: "/personal-bookmark-manager",
    category: "Guide",
    categoryColor: "#6C47FF",
    title: "The personal bookmark manager built for your phone",
    excerpt:
      "Browser bookmarks were designed in 1993. Here's what a proper personal bookmark manager looks like in 2026 — one that works across Instagram, YouTube, Reddit, and every other app on your phone.",
    readingTime: "5 min read",
    publishedAt: "June 2026",
  },
  {
    slug: "pocket-alternative",
    href: "/pocket-alternative",
    category: "Comparison",
    categoryColor: "#DC2626",
    title: "The best Pocket alternative in 2026",
    excerpt:
      "Pocket shut down in 2025. Here's an honest look at what Pocket did well, where it fell short, and how to migrate your entire saved library to Stashly in under 2 minutes.",
    readingTime: "6 min read",
    publishedAt: "June 2026",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        <section className="pt-32 pb-16" style={{ backgroundColor: "#F9F8FF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <p
              className="mb-3 text-sm font-semibold uppercase tracking-widest"
              style={{ color: "#6C47FF" }}
            >
              Blog
            </p>
            <h1
              className="text-3xl font-bold tracking-tight md:text-4xl"
              style={{ color: "#0F0A1E" }}
            >
              Guides and tips for saving smarter
            </h1>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: "#4B5563" }}
            >
              Deep dives on link saving, bookmark management, and getting more
              out of Stashly.
            </p>

            <div className="mt-10 flex flex-col gap-5">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
