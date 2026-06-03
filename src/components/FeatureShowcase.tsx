import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  id: string;
  tag: string;
  title: string;
  description: string;
  screenshot: string;
  screenshotAlt: string;
  accentColor: string;
  detail?: React.ReactNode;
}

// ─── Import platforms list ────────────────────────────────────────────────────

const IMPORT_PLATFORMS = [
  { name: "Instagram",  bg: "#FFE4F3", fg: "#C13584" },
  { name: "Facebook",   bg: "#E4EDFF", fg: "#1877F2" },
  { name: "YouTube",    bg: "#FFE4E4", fg: "#CC0000" },
  { name: "TikTok",     bg: "#E4F3FF", fg: "#010101" },
  { name: "Twitter / X",bg: "#E4EDFF", fg: "#1D9BF0" },
  { name: "Reddit",     bg: "#FFE9E4", fg: "#FF4500" },
  { name: "LinkedIn",   bg: "#E4EDFF", fg: "#0A66C2" },
  { name: "Pinterest",  bg: "#FFE4E4", fg: "#E60023" },
  { name: "Spotify",    bg: "#E4F5E8", fg: "#1DB954" },
  { name: "Substack",   bg: "#FFF5E4", fg: "#FF6719" },
  { name: "Medium",     bg: "#F0F0F0", fg: "#000000" },
  { name: "GitHub",     bg: "#F0F0F0", fg: "#0F0A1E" },
  { name: "Notion",     bg: "#F0F0F0", fg: "#0F0A1E" },
  { name: "Any URL",    bg: "#EDE9FE", fg: "#6C47FF" },
];

// ─── Feature data ─────────────────────────────────────────────────────────────

const features: Feature[] = [
  {
    id: "import",
    tag: "Import",
    title: "Bring everything in from wherever you saved it",
    description:
      "Already have saves scattered across Instagram, Facebook, and browser bookmarks? Import them all into Stashly in one go. Every platform you use is covered.",
    screenshot: "/screenshots/feature-import.png",
    screenshotAlt: "Stashly import screen showing platform sources",
    accentColor: "#6C47FF",
    detail: (
      <div className="flex flex-wrap gap-2 mt-4">
        {IMPORT_PLATFORMS.map((p) => (
          <span
            key={p.name}
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: p.bg, color: p.fg }}
          >
            {p.name}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: "share",
    tag: "Share Collections",
    title: "Share with friends — they can import everything in one tap",
    description:
      "Curate a collection of links and share it via a public URL. Friends can browse without an account, or import the entire collection into their own Stashly with a single tap.",
    screenshot: "/screenshots/feature-share-collection.png",
    screenshotAlt: "Stashly shared collection view with import button",
    accentColor: "#0EA5E9",
  },
  {
    id: "reminder",
    tag: "Reminders",
    title: "Add a reminder so the right link finds you at the right time",
    description:
      "Save a link now, set a reminder for when it matters. A deal you want to check at payday, a recipe for the weekend, a job listing to follow up on — Stashly nudges you exactly when you need it.",
    screenshot: "/screenshots/feature-reminder.png",
    screenshotAlt: "Stashly reminder setup on a saved link",
    accentColor: "#F97316",
  },
  {
    id: "voice",
    tag: "Voice Search",
    title: "Search your entire stash with your voice",
    description:
      "Hands full? Just speak. Voice search scans across titles, tags, notes, and platforms in real time. Say the restaurant name, the topic, or even a vague description — it finds it.",
    screenshot: "/screenshots/feature-voice-search.png",
    screenshotAlt: "Stashly voice search in action",
    accentColor: "#0D9488",
  },
  {
    id: "markdone",
    tag: "Mark as Done",
    title: "Check it off once you've acted on it",
    description:
      "Applied for that job? Visited the restaurant? Watched the video? Mark the link as done and keep your stash clean. Your active list stays focused on what still needs your attention.",
    screenshot: "/screenshots/feature-mark-done.png",
    screenshotAlt: "Stashly mark as done action on a saved link",
    accentColor: "#16A34A",
  },
];

// ─── Phone mockup wrapper ─────────────────────────────────────────────────────

function PhoneFrame({
  src,
  alt,
  accentColor,
  priority = false,
}: {
  src: string;
  alt: string;
  accentColor: string;
  priority?: boolean;
}) {
  return (
    <div className="relative flex justify-center">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-8 rounded-[3rem] blur-3xl opacity-20"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />

      {/* Phone shell */}
      <div
        className="relative overflow-hidden rounded-[2.75rem]"
        style={{
          width: 260,
          height: 534,
          background: "#0F0A1E",
          boxShadow:
            "0 0 0 2px #2D2845, 0 32px 80px rgba(15,10,30,0.45), 0 8px 24px rgba(108,71,255,0.12)",
          padding: "9px",
          flexShrink: 0,
        }}
      >
        {/* Screen */}
        <div
          className="relative overflow-hidden rounded-[2.1rem] bg-white"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Dynamic island */}
          <div
            className="absolute top-3 left-1/2 z-10 -translate-x-1/2 rounded-full"
            style={{ width: 68, height: 18, backgroundColor: "#0F0A1E" }}
            aria-hidden="true"
          />

          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="260px"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />

          {/* Bottom fade */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-12"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(15,10,30,0.3))",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Feature row ─────────────────────────────────────────────────────────────

function FeatureRow({
  feature,
  reverse,
  priority = false,
}: {
  feature: Feature;
  reverse: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-12 lg:gap-20 ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      {/* Text side */}
      <div className="flex-1 flex flex-col justify-center">
        <span
          className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest"
          style={{ color: feature.accentColor }}
        >
          {feature.tag}
        </span>
        <h3
          className="text-2xl font-bold leading-snug tracking-tight md:text-3xl text-balance"
          style={{ color: "#0F0A1E" }}
        >
          {feature.title}
        </h3>
        <p
          className="mt-4 text-base leading-relaxed text-pretty"
          style={{ color: "#4B5563" }}
        >
          {feature.description}
        </p>
        {feature.detail && feature.detail}
      </div>

      {/* Phone side */}
      <div className="shrink-0">
        <PhoneFrame
          src={feature.screenshot}
          alt={feature.screenshotAlt}
          accentColor={feature.accentColor}
          priority={priority}
        />
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function FeatureShowcase() {
  return (
    <section
      id="feature-showcase"
      className="py-20 md:py-28"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-widest"
            style={{ color: "#6C47FF" }}
          >
            Everything you need
          </p>
          <h2
            className="text-balance text-3xl font-bold tracking-tight md:text-4xl"
            style={{ color: "#0F0A1E" }}
          >
            Built around how you actually use your phone
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed"
            style={{ color: "#4B5563" }}
          >
            Every feature in Stashly exists to make saving, finding, and acting
            on links feel effortless.
          </p>
        </div>

        {/* Feature rows */}
        <div className="flex flex-col gap-24 md:gap-32">
          {features.map((feature, index) => (
            <FeatureRow
              key={feature.id}
              feature={feature}
              reverse={index % 2 !== 0}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
