'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #E8E5F5' : '1px solid transparent',
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: '#6C47FF' }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 2h8a1 1 0 0 1 1 1v13l-5-3-5 3V3a1 1 0 0 1 1-1z"
                fill="white"
                stroke="white"
                strokeWidth="0.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: '#0F0A1E' }}
          >
            Stashly
          </span>
        </Link>

        {/* Nav links — hidden on mobile */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium transition-colors duration-150"
            style={{ color: '#4B5563' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#6C47FF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium transition-colors duration-150"
            style={{ color: '#4B5563' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#6C47FF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
          >
            How it works
          </a>
        </div>

        {/* CTA */}
        <a
          href="#waitlist"
          className="inline-flex h-9 items-center rounded-lg px-4 text-sm font-semibold text-white transition-all duration-150"
          style={{ backgroundColor: '#6C47FF' }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#5C3AE8')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#6C47FF')
          }
        >
          Join Waitlist
        </a>
      </nav>
    </header>
  );
}
