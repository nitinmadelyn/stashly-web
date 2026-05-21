import { NextRequest, NextResponse } from "next/server";
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

interface PublicCollectionResponse {
  id: string;
  name: string;
  description: string | null;
  cover_emoji: string | null;
  cover_color: string | null;
  public_slug: string;
  links: PublicLink[];
}

// ─── Route ────────────────────────────────────────────────────────────────────

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
  }

  // Fetch the collection by public_slug — must be public
  const { data: collection, error: collectionError } = await supabaseAdmin
    .from("collections")
    .select("id, name, description, cover_emoji, cover_color, public_slug, is_public")
    .eq("public_slug", slug)
    .eq("is_public", true)
    .single();

  if (collectionError || !collection) {
    return NextResponse.json(
      { error: "Collection not found or no longer public." },
      { status: 404 },
    );
  }

  // Fetch all links belonging to this collection via collection_links join
  const { data: linkRows, error: linksError } = await supabaseAdmin
    .from("collection_links")
    .select(
      `link_id,
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
    .eq("collection_id", collection.id)
    .order("added_at", { ascending: false });

  if (linksError) {
    console.error("[api/c/slug] links fetch error:", linksError);
    return NextResponse.json(
      { error: "Failed to load links. Please try again." },
      { status: 500 },
    );
  }

  const links: PublicLink[] = (linkRows ?? [])
    .map((row) => {
      const l = (row as unknown as { links: PublicLink }).links;
      return {
        id:            l.id,
        url:           l.url,
        title:         l.title,
        description:   l.description,
        thumbnail_url: l.thumbnail_url,
        domain:        l.domain,
        platform:      l.platform,
      };
    })
    .filter(Boolean);

  const body: PublicCollectionResponse = {
    id:          collection.id,
    name:        collection.name,
    description: collection.description,
    cover_emoji: collection.cover_emoji,
    cover_color: collection.cover_color,
    public_slug: collection.public_slug,
    links,
  };

  return NextResponse.json(body, {
    status: 200,
    headers: {
      // Cache for 60 s at the CDN edge; revalidate in background
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
