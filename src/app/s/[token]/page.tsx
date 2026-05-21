import type React from "react";
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ─── Shared logo ─────────────────────────────────────────────────────────────

function StashlyLogo() {
  return (
    <span className="flex items-center gap-2 shrink-0">
      <span
        className="flex items-center justify-center h-8 w-8 rounded-lg"
        style={{ backgroundColor: "#6C47FF" }}
      >
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M5 2h8a1 1 0 0 1 1 1v13l-5-3-5 3V3a1 1 0 0 1 1-1z"
            fill="white"
            stroke="white"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-sm font-bold tracking-tight" style={{ color: "#0F0A1E" }}>Stashly</span>
    </span>
  );
}

// ─── Platform icons ───────────────────────────────────────────────────────────

const PLATFORM_ICON: Record<string, React.ReactElement> = {
  youtube: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
    </svg>
  ),
  instagram: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1.0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
    </svg>
  ),
  tiktok: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.6 3.3A4.5 4.5 0 0 1 15.2 0h-3.3v16.4a2.7 2.7 0 0 1-2.7 2.3 2.7 2.7 0 0 1-2.7-2.7 2.7 2.7 0 0 1 2.7-2.7c.3 0 .5 0 .8.1V10a6 6 0 0 0-.8-.1 6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6V8.2a7.8 7.8 0 0 0 4.6 1.5V6.4a4.5 4.5 0 0 1-2.2-.3V3.3z" />
    </svg>
  ),
  twitter: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.2 2h3.5l-7.6 8.7L23 22h-7l-5.5-7.2L4 22H.5l8.2-9.3L1 2h7.2l5 6.6L18.2 2zm-1.2 18h1.9L7.1 4H5L17 20z" />
    </svg>
  ),
  reddit: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.0 6.8a1.3 1.3 0 0 1 1.3 1.3 1.3 1.3 0 0 1-1.3 1.3 1.3 1.3 0 0 1-1.3-1.3 1.3 1.3 0 0 1 1.3-1.3zM12 7.4c2.6 0 4.9.9 6.4 2.3a1.7 1.7 0 0 1 1 1.6 1.7 1.7 0 0 1-1.7 1.7c-.5 0-.9-.2-1.2-.5C15.5 11.6 13.9 11 12 11s-3.5.6-4.5 1.5c-.3.3-.7.5-1.2.5a1.7 1.7 0 0 1-1.7-1.7 1.7 1.7 0 0 1 1-1.6C7.1 8.3 9.4 7.4 12 7.4zm-3.8 5.6c.9 0 1.6.7 1.6 1.6s-.7 1.6-1.6 1.6-1.6-.7-1.6-1.6.7-1.6 1.6-1.6zm7.6 0c.9 0 1.6.7 1.6 1.6s-.7 1.6-1.6 1.6-1.6-.7-1.6-1.6.7-1.6 1.6-1.6zm-3.8 3.8c1.5 0 2.8.6 3.5 1.4l.1.2c0 .1-.1.1-.2.1a5.4 5.4 0 0 1-3.4.9 5.4 5.4 0 0 1-3.4-.9c-.1 0-.2-.1-.2-.1l.1-.2c.7-.8 2-1.4 3.5-1.4z" />
    </svg>
  ),
  linkedin: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.8-3-1.8 0-2.1 1.4-2.1 2.9v5.7H9.5V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2 2 2 0 0 1-2 2zm1.8 13H3.5V9h3.6v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.8v20.4C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.8V1.8C24 .8 23.2 0 22.2 0z" />
    </svg>
  ),
  pinterest: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 5.1 3.2 9.5 7.7 11.3-.1-.9-.1-2.4.1-3.4.2-.9 1.5-6.2 1.5-6.2s-.4-.8-.4-1.9c0-1.8 1-3.1 2.3-3.1 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.7-1 4.2-.3 1.3.6 2.3 1.8 2.3 2.1 0 3.7-2.2 3.7-5.5 0-2.9-2.1-4.9-5-4.9-3.4 0-5.4 2.6-5.4 5.2 0 1 .4 2.1.9 2.7.1.1.1.2.1.4l-.3 1.4c-.1.3-.3.4-.6.2-1.5-.7-2.5-2.9-2.5-4.7 0-3.8 2.8-7.3 8-7.3 4.2 0 7.5 3 7.5 7 0 4.1-2.6 7.5-6.2 7.5-1.2 0-2.3-.6-2.7-1.4l-.7 2.8c-.3 1-.9 2.2-1.4 3 1 .3 2.1.5 3.2.5 6.6 0 12-5.4 12-12S18.6 0 12 0z" />
    </svg>
  ),
  facebook: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1C0 18.1 4.4 23 10.1 24v-8.4H7.1v-3.5h3V9.6c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-1.9.9-1.9 1.9v2.2h3.3l-.5 3.5H14V24C19.6 23 24 18.1 24 12.1z" />
    </svg>
  ),
  web: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  other: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.5.7l3-3a5 5 0 0 0-7-7.1l-1.7 1.7" />
      <path d="M14 11a5 5 0 0 0-7.5-.7l-3 3a5 5 0 0 0 7 7.1l1.7-1.7" />
    </svg>
  ),
};

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

        {/* Branded placeholder (when no thumbnail) */}
        {!link.thumbnail_url && (
          <div
            className="relative w-full aspect-video flex flex-col items-center justify-center gap-3 select-none"
            style={{ background: `linear-gradient(135deg, ${hexToRgba(platformColor, 0.07)} 0%, ${hexToRgba(platformColor, 0.14)} 100%)` }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: platformColor }} />
            <span
              className="flex items-center justify-center h-10 w-10 rounded-xl"
              style={{ backgroundColor: hexToRgba(platformColor, 0.15) }}
              aria-hidden="true"
            >
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                <path
                  d="M5 2h8a1 1 0 0 1 1 1v13l-5-3-5 3V3a1 1 0 0 1 1-1z"
                  fill={platformColor}
                  stroke={platformColor}
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="text-xs font-medium text-center px-6 leading-snug" style={{ color: hexToRgba(platformColor, 0.75) }}>
              Preview not available on {platformLabel}
            </p>
          </div>
        )}

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Platform badge */}
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
            style={{
              color:           platformColor,
              backgroundColor: hexToRgba(platformColor, 0.1),
            }}
          >
            {PLATFORM_ICON[link.platform] ?? PLATFORM_ICON.other}
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
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <StashlyLogo />
        </Link>
        <p className="text-xs text-ink-faint text-center max-w-xs">
          Save, search &amp; share your favourite links — all in one place.
        </p>
      </div>
    </main>
  );
}
