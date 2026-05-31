import React from 'react';
import Link from 'next/link';
import { Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#0B1E3D' }} className="text-text-on-dark">
      {/* Gold Rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1: Brand */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-1">
              <span className="font-display text-2xl font-bold text-cream-light">CSS</span>
              <span className="font-display text-2xl font-bold text-accent-gold">KRO</span>
            </Link>
            <p className="font-body text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(240, 234, 214, 0.7)' }}>
              Master CSS with Confidence — Pakistan&apos;s premier CSS civil services exam preparation platform.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-on-dark/60 hover:text-accent-gold transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-on-dark/60 hover:text-accent-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div className="space-y-5">
            <h4 className="font-body text-sm font-semibold tracking-wide text-accent-gold uppercase">Platform</h4>
            <ul className="space-y-3">
              {[
                { href: '/newspapers', label: 'Daily News' },
                { href: '/past-papers', label: 'Past Papers' },
                { href: '/resources', label: 'Resources' },
                { href: '/essay-checker', label: 'Essay Checker' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm transition-colors duration-200"
                    style={{ color: 'rgba(240, 234, 214, 0.7)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#F0EAD6'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(240, 234, 214, 0.7)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="space-y-5">
            <h4 className="font-body text-sm font-semibold tracking-wide text-accent-gold uppercase">Support</h4>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
                { href: '/faq', label: 'FAQ' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm transition-colors duration-200"
                    style={{ color: 'rgba(240, 234, 214, 0.7)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#F0EAD6'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(240, 234, 214, 0.7)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-5">
            <h4 className="font-body text-sm font-semibold tracking-wide text-accent-gold uppercase">Newsletter</h4>
            <p className="font-body text-sm" style={{ color: 'rgba(240, 234, 214, 0.7)' }}>
              Get CSS prep tips and updates delivered to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent-gold transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-accent-gold hover:bg-accent-primary text-white font-body text-sm font-medium rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(240, 234, 214, 0.1)' }}>
          <p className="font-body text-xs tracking-wide" style={{ color: 'rgba(240, 234, 214, 0.5)' }}>
            © {currentYear} CSSKRO · All Rights Reserved
          </p>
          <div className="flex items-center gap-4">
            <Link 
              href="/privacy" 
              className="font-body text-xs transition-colors"
              style={{ color: 'rgba(240, 234, 214, 0.5)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#F0EAD6'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(240, 234, 214, 0.5)'}
            >
              Privacy
            </Link>
            <span style={{ color: 'rgba(240, 234, 214, 0.3)' }}>·</span>
            <Link 
              href="/terms" 
              className="font-body text-xs transition-colors"
              style={{ color: 'rgba(240, 234, 214, 0.5)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#F0EAD6'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(240, 234, 214, 0.5)'}
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;