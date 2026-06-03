'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Essay Evaluation', href: '/essay-checker' },
  { label: 'Newspapers', href: '/newspapers' },
  { label: 'Resources', href: '/resources' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 lg:px-10">
      <nav className="mt-4 mx-auto max-w-5xl h-14 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] px-6">
        <div className="h-full grid grid-cols-3 items-center">
          {/* Logo - Left Zone */}
          <div className="flex justify-start">
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
          <div className="hidden md:flex items-center justify-center gap-8">
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
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/auth/signin"
              className="hidden md:inline-flex text-sm font-semibold px-4 py-1.5 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-200"
            >
              Begin Journey
            </Link>
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
          <Link
            href="/auth/signin"
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-center text-sm font-semibold px-5 py-2.5 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-200"
          >
            Begin Journey
          </Link>
        </div>
      </div>
    </header>
  );
}