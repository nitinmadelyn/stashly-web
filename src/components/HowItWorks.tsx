const steps = [
  {
    step: '01',
    title: 'Share from any app',
    description:
      "Browsing Instagram, YouTube, or TikTok and spot something worth keeping? Tap the Share button and select Stashly from the share sheet. That's it — you're done.",
    detail: 'Works on iOS and Android, from any app or browser.',
  },
  {
    step: '02',
    title: 'Tag and organize',
    description:
      'Stashly auto-fills the title and preview from the link. Add your own tags, pick a category, and optionally write a note. The whole thing takes under 10 seconds.',
    detail: 'Smart tag suggestions based on your existing tags.',
  },
  {
    step: '03',
    title: 'Find it instantly, always',
    description:
      'Search your entire library in real time. Filter by platform, category, or tag. Even if you saved it months ago with barely any info, it will surface.',
    detail: 'Searches title, tags, description, platform and URL together.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28"
      style={{ backgroundColor: '#F9F8FF' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-widest"
            style={{ color: '#6C47FF' }}
          >
            How it works
          </p>
          <h2
            className="text-balance text-3xl font-bold tracking-tight md:text-4xl"
            style={{ color: '#0F0A1E' }}
          >
            From scroll to stash in 10 seconds
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed"
            style={{ color: '#4B5563' }}
          >
            Stashly is built around the way you actually use your phone. The
            saving habit has to be effortless, or it never sticks.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Connector line — desktop only */}
          <div
            className="absolute top-10 left-1/6 right-1/6 hidden h-px md:block"
            style={{ backgroundColor: '#E8E5F5' }}
            aria-hidden="true"
          />

          {steps.map((s, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step number circle */}
              <div
                className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold"
                style={{
                  backgroundColor: '#EDE9FE',
                  color: '#6C47FF',
                  border: '3px solid #6C47FF',
                }}
              >
                {s.step}
              </div>

              <h3
                className="mb-3 text-lg font-bold"
                style={{ color: '#0F0A1E' }}
              >
                {s.title}
              </h3>
              <p
                className="mb-3 text-sm leading-relaxed text-pretty"
                style={{ color: '#4B5563' }}
              >
                {s.description}
              </p>
              <p className="text-xs font-medium" style={{ color: '#A87FFF' }}>
                {s.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Benchmark callout */}
        <div
          className="mx-auto mt-16 max-w-2xl rounded-2xl px-8 py-6 text-center"
          style={{
            backgroundColor: '#EDE9FE',
            border: '1px solid #D8D0FF',
          }}
        >
          <p className="text-base font-semibold" style={{ color: '#0F0A1E' }}>
            The benchmark:{' '}
            <span style={{ color: '#6C47FF' }}>
              save any link in under 10 seconds
            </span>
            , find any link in under 2.
          </p>
          <p className="mt-1 text-sm" style={{ color: '#4B5563' }}>
            That is the experience we obsess over with every feature decision.
          </p>
        </div>
      </div>
    </section>
  );
}
