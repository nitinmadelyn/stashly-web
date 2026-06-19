const APPLE_URL =
  'https://apps.apple.com/us/app/stashly-save-search-share/id6771729320';
const ANDROID_URL =
  'https://play.google.com/store/apps/details?id=pro.stashly.mobile';

interface AppStoreBadgesProps {
  direction?: 'row' | 'column';
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP = {
  sm: { height: 36, minWidth: 118, pad: 14, iconSize: 16, iconH: 19, labelSize: 8, nameSize: 13 },
  md: { height: 44, minWidth: 144, pad: 18, iconSize: 20, iconH: 24, labelSize: 10, nameSize: 16 },
  lg: { height: 52, minWidth: 168, pad: 18, iconSize: 20, iconH: 24, labelSize: 10, nameSize: 16 },
};

export default function AppStoreBadges({
  direction = 'row',
  size = 'md',
}: AppStoreBadgesProps) {
  const s = SIZE_MAP[size];

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    height: s.height,
    minWidth: s.minWidth,
    paddingInline: s.pad,
    borderRadius: 10,
    backgroundColor: '#000000',
    border: '1px solid rgba(255,255,255,0.12)',
    textDecoration: 'none',
    flexShrink: 0,
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        flexWrap: 'wrap',
        gap: size === 'sm' ? 8 : 12,
        alignItems: 'center',
      }}
    >
      {/* Apple App Store */}
      <a
        href={APPLE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
        className="store-badge"
        style={badgeStyle}
      >
        <svg
          width={s.iconSize}
          height={s.iconH}
          viewBox="0 0 20 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M16.457 12.748c-.025-2.73 2.23-4.052 2.332-4.117-1.272-1.86-3.253-2.115-3.95-2.14-1.672-.17-3.285.99-4.135.99-.865 0-2.176-.97-3.585-.944-1.83.027-3.534 1.072-4.474 2.703-1.93 3.337-.492 8.257 1.368 10.954.93 1.32 2.02 2.795 3.457 2.742 1.397-.056 1.92-.891 3.607-.891 1.672 0 2.163.891 3.624.859 1.5-.027 2.443-1.338 3.36-2.666a12.26 12.26 0 0 0 1.528-3.086c-.033-.014-2.926-1.12-2.955-4.404ZM13.76 4.279C14.52 3.35 15.04 2.07 14.894.73c-1.113.047-2.46.74-3.257 1.67-.713.82-1.34 2.136-1.172 3.397 1.243.097 2.514-.633 3.296-1.518Z"
            fill="white"
          />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: s.labelSize, fontWeight: 400, lineHeight: 1.2, letterSpacing: '0.02em' }}>
            Download on the
          </span>
          <span style={{ color: '#FFFFFF', fontSize: s.nameSize, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            App Store
          </span>
        </div>
      </a>

      {/* Google Play */}
      <a
        href={ANDROID_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get it on Google Play"
        className="store-badge"
        style={badgeStyle}
      >
        <svg
          width={s.iconSize}
          height={s.iconH}
          viewBox="0 0 22 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="M1.5 1.15 13.4 12 1.5 22.85A1.5 1.5 0 0 1 .5 21.5v-19A1.5 1.5 0 0 1 1.5 1.15Z" fill="#EA4335" />
          <path d="M21.06 10.32 17.5 8.27 13.4 12l4.1 3.73 3.56-2.05a1.5 1.5 0 0 0 0-3.36Z" fill="#FBBC04" />
          <path d="M1.5 1.15 13.4 12 17.5 8.27 4.77.42A1.5 1.5 0 0 0 1.5 1.15Z" fill="#4285F4" />
          <path d="M1.5 22.85 13.4 12l4.1 3.73-12.73 7.85a1.5 1.5 0 0 1-3.27-.73Z" fill="#34A853" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: s.labelSize, fontWeight: 400, lineHeight: 1.2, letterSpacing: '0.02em' }}>
            Get it on
          </span>
          <span style={{ color: '#FFFFFF', fontSize: s.nameSize, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            Google Play
          </span>
        </div>
      </a>
    </div>
  );
}
