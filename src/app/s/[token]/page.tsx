import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LinkRow {
  id: string;
  url: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  domain: string;
  platform: string;
}

interface SharedLinkRow {
  id: string;
  token: string;
  expires_at: string;
  links: LinkRow;
}

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getSharedLink(token: string): Promise<SharedLinkRow | null> {
  const { data, error } = await supabaseAdmin
    .from("shared_links")
    .select(
      `id,
       token,
       expires_at,
       links!inner(
         id,
         url,
         title,
         description,
         thumbnail_url,
         domain,
         platform
       )`,
    )
    .eq("token", token)
    .gt("expires_at", new Date().toISOString())
    .single();

  if (error || !data) return null;
  return data as unknown as SharedLinkRow;
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const row = await getSharedLink(token);
  if (!row) {
    return { title: "Link not found | Stashly" };
  }
  const link = row.links;
  return {
    title: link.title
      ? `${link.title} | Stashly`
      : `Shared link from ${link.domain} | Stashly`,
    description:
      link.description ??
      `Check out this link shared via Stashly: ${link.url}`,
    openGraph: {
      title: link.title || link.domain,
      description: link.description ?? undefined,
      images: link.thumbnail_url ? [{ url: link.thumbnail_url }] : [],
      url: `https://stashly.pro/s/${token}`,
    },
    twitter: {
      card: link.thumbnail_url ? "summary_large_image" : "summary",
      title: link.title || link.domain,
      description: link.description ?? undefined,
      images: link.thumbnail_url ? [link.thumbnail_url] : [],
    },
  };
}

// ─── Platform color map ───────────────────────────────────────────────────────

const PLATFORM_COLOR: Record<string, string> = {
  youtube:   "#FF0000",
  instagram: "#E1306C",
  tiktok:    "#FE2C55",
  twitter:   "#1DA1F2",
  reddit:    "#FF4500",
  linkedin:  "#0077B5",
  pinterest: "#E60023",
  facebook:  "#1877F2",
  web:       "#6C47FF",
  other:     "#6C47FF",
};

const PLATFORM_LABEL: Record<string, string> = {
  youtube:   "YouTube",
  instagram: "Instagram",
  tiktok:    "TikTok",
  twitter:   "X / Twitter",
  reddit:    "Reddit",
  linkedin:  "LinkedIn",
  pinterest: "Pinterest",
  facebook:  "Facebook",
  web:       "Web",
  other:     "Link",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SharedLinkPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const row = await getSharedLink(token);

  if (!row) notFound();

  const link         = row.links;
  const platformColor = PLATFORM_COLOR[link.platform] ?? "#6C47FF";
  const platformLabel = PLATFORM_LABEL[link.platform] ?? "Link";
  const expiresAt    = new Date(row.expires_at);
  const expiresLabel = expiresAt.toLocaleDateString("en-US", {
    month: "short",
    day:   "numeric",
    year:  "numeric",
  });

  return (
    <main className="min-h-screen bg-canvas-alt flex flex-col items-center justify-center px-4 py-16">
      {/* Card */}
      <div className="w-full max-w-lg bg-canvas rounded-2xl border border-border shadow-sm overflow-hidden">

        {/* Thumbnail */}
        {link.thumbnail_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={link.thumbnail_url}
            alt={link.title || link.domain}
            className="w-full aspect-video object-cover"
          />
        )}

        {/* Accent bar (when no thumbnail) */}
        {!link.thumbnail_url && (
          <div
            className="h-1 w-full"
            style={{ backgroundColor: platformColor }}
          />
        )}

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Platform badge */}
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
            style={{
              color:           platformColor,
              backgroundColor: `${platformColor}18`,
            }}
          >
            {platformLabel}
          </span>

          {/* Title */}
          <h1 className="text-xl font-bold text-ink leading-snug">
            {link.title || link.domain}
          </h1>

          {/* Description */}
          {link.description && (
            <p className="text-sm text-ink-muted leading-relaxed line-clamp-3">
              {link.description}
            </p>
          )}

          {/* Domain */}
          <p className="text-xs text-ink-faint truncate">{link.domain}</p>

          {/* CTA */}
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 h-12 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: platformColor }}
          >
            Open link
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Expiry notice */}
      <p className="mt-4 text-xs text-ink-faint text-center">
        This preview expires{" "}
        <time dateTime={row.expires_at}>{expiresLabel}</time>
      </p>

      {/* Stashly attribution */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-xs text-ink-faint">Shared via</p>
        <Link
          href="/"
          className="flex items-center gap-1.5 font-bold text-primary text-sm hover:opacity-80 transition-opacity"
        >
          ✦ Stashly
        </Link>
        <p className="text-xs text-ink-faint text-center max-w-xs">
          Save, search &amp; share your favourite links — all in one place.
        </p>
      </div>
    </main>
  );
}
