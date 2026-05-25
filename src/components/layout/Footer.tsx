import React from 'react';
import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream">
      {/* Gold Rule */}
      <div className="gold-rule" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1">
              <span className="font-display text-2xl font-bold text-cream-light">CSS</span>
              <span className="font-display text-2xl font-bold text-gold">KRO</span>
            </Link>
            <p className="font-body text-sm text-cream/50 leading-relaxed max-w-xs">
              Pakistan&apos;s premier CSS civil services exam preparation platform — built for serious aspirants.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <h4 className="font-display text-sm font-bold tracking-wide text-gold uppercase">Navigate</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/newspapers', label: 'Newspapers' },
                { href: '/resources', label: 'Resources' },
                { href: '/timeline', label: 'Timeline' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/40 hover:text-cream transition-colors duration-200 editorial-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-5">
            <h4 className="font-display text-sm font-bold tracking-wide text-gold uppercase">Resources</h4>
            <ul className="space-y-3">
              {[
                { href: '/resources#past-papers', label: 'Past Papers' },
                { href: '/resources#syllabus', label: 'Syllabus' },
                { href: '/resources#materials', label: 'Study Materials' },
                { href: '/exam-pattern', label: 'Exam Pattern' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/40 hover:text-cream transition-colors duration-200 editorial-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="font-display text-sm font-bold tracking-wide text-gold uppercase">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gold/60" />
                <span className="font-mono text-xs text-cream/50 tracking-wide">info@csskro.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold/60" />
                <span className="font-mono text-xs text-cream/50 tracking-wide">Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] text-cream/25 tracking-widest uppercase">
            &copy; {currentYear} CSS KRO. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-cream/25 tracking-widest uppercase">
            Master CSS with Confidence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;