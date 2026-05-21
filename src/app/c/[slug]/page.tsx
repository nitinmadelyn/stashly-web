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
          className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full w-fit"
          style={{ color, backgroundColor: `${color}18` }}
        >
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
