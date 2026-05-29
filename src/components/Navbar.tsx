'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const APPLE_URL =
  'https://apps.apple.com/us/app/stashly-save-search-share/id6771729320';
const ANDROID_URL =
  'https://play.google.com/store/apps/details?id=pro.stashly.mobile';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
      setDropdownOpen(false);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function onClickOutside() {
      setDropdownOpen(false);
    }
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, [dropdownOpen]);

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

        {/* Download CTA with dropdown */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-4 text-sm font-semibold text-white transition-all duration-150"
            style={{ backgroundColor: '#6C47FF' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#5C3AE8')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#6C47FF')
            }
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            Download App
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              style={{
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.15s ease',
              }}
            >
              <path
                d="M3 5l4 4 4-4"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 rounded-xl overflow-hidden"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 8px 32px rgba(15,10,30,0.14), 0 0 0 1px #E8E5F5',
                minWidth: 200,
              }}
            >
              <a
                href={APPLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-100"
                style={{ color: '#0F0A1E' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#F9F8FF')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'transparent')
                }
                onClick={() => setDropdownOpen(false)}
              >
                {/* Apple logo */}
                <svg width="18" height="22" viewBox="0 0 20 24" fill="none" aria-hidden="true">
                  <path
                    d="M16.457 12.748c-.025-2.73 2.23-4.052 2.332-4.117-1.272-1.86-3.253-2.115-3.95-2.14-1.672-.17-3.285.99-4.135.99-.865 0-2.176-.97-3.585-.944-1.83.027-3.534 1.072-4.474 2.703-1.93 3.337-.492 8.257 1.368 10.954.93 1.32 2.02 2.795 3.457 2.742 1.397-.056 1.92-.891 3.607-.891 1.672 0 2.163.891 3.624.859 1.5-.027 2.443-1.338 3.36-2.666a12.26 12.26 0 0 0 1.528-3.086c-.033-.014-2.926-1.12-2.955-4.404ZM13.76 4.279C14.52 3.35 15.04 2.07 14.894.73c-1.113.047-2.46.74-3.257 1.67-.713.82-1.34 2.136-1.172 3.397 1.243.097 2.514-.633 3.296-1.518Z"
                    fill="#0F0A1E"
                  />
                </svg>
                App Store (iOS)
              </a>
              <div style={{ height: 1, backgroundColor: '#F3F4F6' }} />
              <a
                href={ANDROID_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-100"
                style={{ color: '#0F0A1E' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#F9F8FF')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'transparent')
                }
                onClick={() => setDropdownOpen(false)}
              >
                {/* Play icon */}
                <svg width="18" height="20" viewBox="0 0 22 24" fill="none" aria-hidden="true">
                  <path d="M1.5 1.15 13.4 12 1.5 22.85A1.5 1.5 0 0 1 .5 21.5v-19A1.5 1.5 0 0 1 1.5 1.15Z" fill="#EA4335" />
                  <path d="M21.06 10.32 17.5 8.27 13.4 12l4.1 3.73 3.56-2.05a1.5 1.5 0 0 0 0-3.36Z" fill="#FBBC04" />
                  <path d="M1.5 1.15 13.4 12 17.5 8.27 4.77.42A1.5 1.5 0 0 0 1.5 1.15Z" fill="#4285F4" />
                  <path d="M1.5 22.85 13.4 12l4.1 3.73-12.73 7.85a1.5 1.5 0 0 1-3.27-.73Z" fill="#34A853" />
                </svg>
                Google Play (Android)
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
