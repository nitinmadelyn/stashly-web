const platforms = [
  { name: "YouTube", emoji: "▶", bg: "#FFE4E4", fg: "#CC0000" },
  { name: "Instagram", emoji: "📷", bg: "#FFE4F3", fg: "#C13584" },
  { name: "TikTok", emoji: "♪", bg: "#E4F3FF", fg: "#010101" },
  { name: "Twitter / X", emoji: "𝕏", bg: "#E4EDFF", fg: "#1D9BF0" },
  { name: "Reddit", emoji: "👾", bg: "#FFE9E4", fg: "#FF4500" },
  { name: "LinkedIn", emoji: "💼", bg: "#E4EDFF", fg: "#0A66C2" },
  { name: "Spotify", emoji: "🎵", bg: "#E4F5E8", fg: "#1DB954" },
  { name: "Pinterest", emoji: "📌", bg: "#FFE4E4", fg: "#E60023" },
  { name: "Substack", emoji: "✉", bg: "#FFF5E4", fg: "#FF6719" },
  { name: "GitHub", emoji: "⌥", bg: "#F0F0F0", fg: "#0F0A1E" },
  { name: "Notion", emoji: "◻", bg: "#F0F0F0", fg: "#0F0A1E" },
  { name: "Any URL", emoji: "🔗", bg: "#EDE9FE", fg: "#6C47FF" },
];

export default function Platforms() {
  return (
    <section
      className="py-16 md:py-20"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <p
          className="mb-10 text-center text-sm font-semibold uppercase tracking-widest"
          style={{ color: "#9CA3AF" }}
        >
          Works with every platform you use
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-transform duration-150 hover:-translate-y-0.5"
              style={{
                backgroundColor: p.bg,
                color: p.fg,
              }}
            >
              <span aria-hidden="true">{p.emoji}</span>
              <span>{p.name}</span>
            </div>
          ))}
        </div>

        <p
          className="mt-8 text-center text-sm"
          style={{ color: "#9CA3AF" }}
        >
          If it has a URL, Stashly can save it.
        </p>
      </div>
    </section>
  );
}
