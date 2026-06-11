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
          {/* Logo + tagline + Instagram */}
          <div className="flex flex-col gap-3">
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
            <a
              href="https://www.instagram.com/stashlypro"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Stashly on Instagram"
              className="flex items-center gap-2 w-fit transition-colors duration-150"
              style={{ color: '#4B5563' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E1306C')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1.0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
              </svg>
              <span className="text-xs">@stashlypro</span>
            </a>
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
