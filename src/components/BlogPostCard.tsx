import Link from "next/link";

export interface Post {
  slug: string;
  href: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  readingTime: string;
  publishedAt: string;
}

export default function BlogPostCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.href}
      className="blog-card group block rounded-2xl p-6"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E5F5" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor: `${post.categoryColor}14`,
            color: post.categoryColor,
          }}
        >
          {post.category}
        </span>
        <span className="text-xs" style={{ color: "#9CA3AF" }}>
          {post.publishedAt}
        </span>
        <span className="text-xs" style={{ color: "#9CA3AF" }}>·</span>
        <span className="text-xs" style={{ color: "#9CA3AF" }}>
          {post.readingTime}
        </span>
      </div>

      <h2
        className="blog-card-title mb-3 text-lg font-bold leading-snug tracking-tight"
        style={{ color: "#0F0A1E" }}
      >
        {post.title}
      </h2>

      <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
        {post.excerpt}
      </p>

      <div
        className="mt-5 flex items-center gap-1.5 text-xs font-semibold"
        style={{ color: "#6C47FF" }}
      >
        Read article
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M3 7h8M7.5 4l3.5 3-3.5 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
}
