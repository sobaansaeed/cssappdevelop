'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ChevronDown, LogOut, Zap } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Essay Evaluation', href: '/essay-checker' },
  { label: 'Newspapers', href: '/newspapers' },
  { label: 'Resources', href: '/resources' },
];

function getInitials(user: { email?: string; user_metadata?: { full_name?: string; name?: string } }) {
  const name = user.user_metadata?.full_name || user.user_metadata?.name;
  if (name) {
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  return (user.email?.[0] ?? 'U').toUpperCase();
}

function getFirstName(user: { email?: string; user_metadata?: { full_name?: string; name?: string } }) {
  const name = user.user_metadata?.full_name || user.user_metadata?.name;
  if (name) return name.split(' ')[0];
  return user.email?.split('@')[0] ?? 'User';
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, credits, signOut } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track scroll position for smooth expansion effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Set initial value
    setScrollY(window.scrollY);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await signOut();
  };

  const creditsLabel = credits === -1 ? '—' : credits;
  const initials = user ? getInitials(user) : '';
  const firstName = user ? getFirstName(user) : '';

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav
        className="mx-auto mt-4 h-14 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] px-6"
        style={{
          maxWidth: scrollY > 50 ? '950px' : 'calc(100% - 24px)',
          width: '100%',
          transition: 'max-width 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="h-full flex items-center justify-between gap-4">
          {/* Logo - Left Zone */}
          <div className="flex shrink-0">
            <Link href="/" className="flex items-center">
              <div
                className="text-xl tracking-tight text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                CSS KRO<sup className="text-xs">®</sup>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links - Center Zone */}
          <div className="hidden md:flex items-center justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger - Right Zone */}
          <div className="flex items-center justify-end gap-4 shrink-0">
            {/* ── Auth CTA zone ── */}
            {isAuthenticated && user ? (
              /* Signed-in: avatar + name + dropdown (desktop only) */
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors border border-white/15"
                  aria-label="User menu"
                >
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                    {initials}
                  </div>
                  <span className="text-white text-sm font-medium max-w-[100px] truncate">
                    {firstName}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-white/60 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#0B1E3D] border border-white/10 shadow-2xl py-2 overflow-hidden">
                    {/* Credits row */}
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Essay Credits</p>
                      <div className="flex items-center gap-2">
                        <Zap size={14} className="text-amber-400" />
                        <span className="text-white font-semibold text-sm">
                          {creditsLabel} / 5
                        </span>
                        <span className="text-white/40 text-xs ml-auto">resets monthly</span>
                      </div>
                      {/* Credits bar */}
                      <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-amber-400 transition-all"
                          style={{ width: `${((credits === -1 ? 5 : credits) / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Sign out */}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Signed-out (or loading): Begin Journey — always visible on desktop */
              <Link
                href="/auth/signin"
                className="hidden md:inline-flex text-sm font-semibold px-4 py-1.5 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-200"
              >
                Begin Journey
              </Link>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex md:hidden text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out mx-auto max-w-5xl mt-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {!isLoading && (
            isAuthenticated && user ? (
              <>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                      {initials}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{firstName}</p>
                      <p className="text-white/50 text-xs flex items-center gap-1">
                        <Zap size={10} className="text-amber-400" />
                        {creditsLabel} / 5 essay credits
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setMobileOpen(false); handleSignOut(); }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/auth/signin"
                onClick={() => setMobileOpen(false)}
                className="mt-2 text-center text-sm font-semibold px-5 py-2.5 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-200"
              >
                Begin Journey
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}