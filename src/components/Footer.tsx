'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-12"
      style={{
        backgroundColor: '#0A0515',
        borderTop: '1px solid #1A1030',
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ backgroundColor: '#6C47FF' }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 2h8a1 1 0 0 1 1 1v13l-5-3-5 3V3a1 1 0 0 1 1-1z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <span className="text-sm font-bold" style={{ color: '#FFFFFF' }}>
                Stashly
              </span>
              <span className="ml-2 text-xs" style={{ color: '#4B5563' }}>
                Save. Search. Share.
              </span>
            </div>
          </div>

          {/* Links */}
          <div
            className="flex items-center gap-6 text-xs"
            style={{ color: '#4B5563' }}
          >
            <a
              href="/privacy"
              className="transition-colors duration-150 hover:text-white"
              style={{ color: '#4B5563' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="transition-colors duration-150"
              style={{ color: '#4B5563' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
            >
              Terms
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs" style={{ color: '#4B5563' }}>
            © {currentYear} Stashly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
