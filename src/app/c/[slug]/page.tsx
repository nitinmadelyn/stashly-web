import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PublicLink {
  id: string;
  url: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  domain: string;
  platform: string;
}

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

interface CollectionRow {
  id: string;
  name: string;
  description: string | null;
  cover_emoji: string | null;
  public_slug: string;
  public_shared_at: string | null;
}

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getPublicCollection(
  slug: string,
): Promise<{ collection: CollectionRow; links: PublicLink[] } | null> {
  const { data: collection, error: colErr } = await supabaseAdmin
    .from("collections")
    .select("id, name, description, cover_emoji, public_slug, public_shared_at")
    .eq("public_slug", slug)
    .eq("is_public", true)
    .single();

  if (colErr || !collection) return null;

  // Enforce 7-day expiry: treat the collection as gone if the share has expired.
  if (collection.public_shared_at) {
    const elapsed = Date.now() - new Date(collection.public_shared_at).getTime();
    if (elapsed >= SEVEN_DAYS_MS) return null;
  }

  const { data: linkRows, error: linksErr } = await supabaseAdmin
    .from("collection_links")
    .select(
      `links!inner(
        id,
        url,
        title,
        description,
        thumbnail_url,
        domain,
        platform
      )`,
    )
    .eq("collection_id", collection.id)
    .order("added_at", { ascending: false });

  if (linksErr) return null;

  const links: PublicLink[] = (linkRows ?? []).map(
    (row) => (row as unknown as { links: PublicLink }).links,
  );

  return { collection: collection as CollectionRow, links };
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPublicCollection(slug);
  if (!result) return { title: "Collection not found | Stashly" };

  const { collection, links } = result;
  const count = links.length;
  const desc =
    collection.description ??
    `${count} link${count !== 1 ? "s" : ""} in this collection.`;

  return {
    title: `${collection.cover_emoji ? `${collection.cover_emoji} ` : ""}${collection.name} | Stashly`,
    description: desc,
    openGraph: {
      title: collection.name,
      description: desc,
      url: `https://stashly.pro/c/${slug}`,
    },
    twitter: {
      card: "summary",
      title: collection.name,
      description: desc,
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

// ─── Shared logo markup ───────────────────────────────────────────────────────

function StashlyLogo({ size = "sm" }: { size?: "sm" | "base" }) {
  const iconSize  = size === "base" ? 20 : 16;
  const boxClass  = size === "base" ? "h-9 w-9 rounded-lg" : "h-7 w-7 rounded-md";
  const textClass = size === "base" ? "text-base font-bold tracking-tight" : "text-sm font-bold tracking-tight";
  return (
    <span className="flex items-center gap-2 shrink-0">
      <span
        className={`flex items-center justify-center ${boxClass}`}
        style={{ backgroundColor: "#6C47FF" }}
      >
        <svg width={iconSize} height={iconSize} viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M5 2h8a1 1 0 0 1 1 1v13l-5-3-5 3V3a1 1 0 0 1 1-1z"
            fill="white"
            stroke="white"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={textClass} style={{ color: "#0F0A1E" }}>Stashly</span>
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

// ─── LinkCard component ───────────────────────────────────────────────────────

function LinkCard({ link }: { link: PublicLink }) {
  const color = PLATFORM_COLOR[link.platform] ?? "#6C47FF";
  const label = PLATFORM_LABEL[link.platform] ?? "Link";

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-canvas rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow"
    >
      {link.thumbnail_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={link.thumbnail_url}
          alt={link.title || link.domain}
          className="w-full aspect-video object-cover"
          loading="lazy"
        />
      ) : (
        /* Branded placeholder — shown when the platform doesn't provide a preview image */
        <div
          className="relative w-full aspect-video flex flex-col items-center justify-center gap-3 select-none"
          style={{ background: `linear-gradient(135deg, ${hexToRgba(color, 0.07)} 0%, ${hexToRgba(color, 0.14)} 100%)` }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: color }} />

          {/* Stashly bookmark logo */}
          <span
            className="flex items-center justify-center h-10 w-10 rounded-xl"
            style={{ backgroundColor: hexToRgba(color, 0.15) }}
            aria-hidden="true"
          >
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path
                d="M5 2h8a1 1 0 0 1 1 1v13l-5-3-5 3V3a1 1 0 0 1 1-1z"
                fill={color}
                stroke={color}
                strokeWidth="0.5"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          {/* "No preview" label */}
          <p className="text-xs font-medium text-center px-6 leading-snug" style={{ color: hexToRgba(color, 0.75) }}>
            Preview not available on {label}
          </p>
        </div>
      )}

      <div className="p-4 flex flex-col gap-2">
        <span
          className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full w-fit"
          style={{ color, backgroundColor: hexToRgba(color, 0.1) }}
        >
          {PLATFORM_ICON[link.platform] ?? PLATFORM_ICON.other}
          {label}
        </span>

        <p className="text-sm font-semibold text-ink leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {link.title || link.domain}
        </p>

        {link.description && (
          <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">
            {link.description}
          </p>
        )}

        <p className="text-xs text-ink-faint truncate mt-auto">{link.domain}</p>
      </div>
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PublicCollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getPublicCollection(slug);

  if (!result) notFound();

  const { collection, links } = result;

  // Deep-link into the Stashly app to import this collection
  const importDeepLink = `stashly://import?collection=${encodeURIComponent(slug)}`;

  return (
    <main className="min-h-screen bg-canvas-alt">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-canvas border-b border-border backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/" className="shrink-0 hover:opacity-80 transition-opacity">
            <StashlyLogo size="sm" />
          </Link>
          <a
            href={importDeepLink}
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold bg-primary text-white px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Save to Stashly
          </a>
        </div>
      </header>

      {/* Collection hero */}
      <section className="max-w-3xl mx-auto px-4 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-2">
          {collection.cover_emoji && (
            <span className="text-4xl leading-none" aria-hidden="true">
              {collection.cover_emoji}
            </span>
          )}
          <h1 className="text-2xl font-bold text-ink">{collection.name}</h1>
        </div>

        {collection.description && (
          <p className="text-sm text-ink-muted leading-relaxed mt-1">
            {collection.description}
          </p>
        )}

        <p className="mt-3 text-xs text-ink-faint">
          {links.length} {links.length === 1 ? "link" : "links"}
        </p>
      </section>

      {/* Links grid */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        {links.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔗</p>
            <p className="text-sm text-ink-muted">No links in this collection yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {links.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        )}
      </section>

      {/* Footer CTA */}
      <footer className="border-t border-border py-10 bg-canvas">
        <div className="max-w-3xl mx-auto px-4 flex flex-col items-center gap-3 text-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <StashlyLogo size="base" />
          </Link>
          <p className="text-sm text-ink-muted max-w-sm">
            Save, search &amp; share your favourite links — all in one place.
          </p>
          <a
            href={importDeepLink}
            className="mt-1 inline-flex items-center gap-2 text-sm font-semibold bg-primary text-white px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Import this collection into Stashly
          </a>
        </div>
      </footer>
    </main>
  );
}
