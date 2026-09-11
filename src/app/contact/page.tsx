'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  MapPin
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setResponseMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setResponseMsg(data.message || 'Thank you! Your message has been sent.');
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
        setResponseMsg(data.error || 'Failed to send your message. Please try again.');
      }
    } catch {
      setStatus('error');
      setResponseMsg('A network error occurred. Please check your connection or email us directly.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
      style={{ background: '#F5F0E8' }}
    >
      {/* ── 1. HERO SECTION ── */}
      <section
        className="relative py-20 pt-32 text-center"
        style={{
          background: '#0B1E3D',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <p className="font-body text-xs font-semibold tracking-[0.2em] text-accent-gold uppercase mb-4">
            SUPPORT & FEEDBACK
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
            We&apos;re Here to <span className="italic text-accent-gold">Help You Succeed</span>
          </h1>
          <p className="font-body text-base sm:text-lg leading-relaxed text-text-on-dark/80 max-w-2xl mx-auto">
            Have a question about the AI essay evaluation, subscriptions, or past papers? Send us a message and our support team will respond promptly.
          </p>
        </div>
      </section>

      {/* ── 2. QUICK CONTACT CARDS ── */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="p-6 rounded-xl flex items-start gap-4 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(200,150,46,0.25)',
                boxShadow: '0 8px 30px rgba(26,18,7,0.06)',
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent-primary/10 text-accent-primary flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-text-muted font-medium mb-1">
                  Direct Email
                </p>
                <p className="font-display text-lg font-semibold text-text-primary">
                  support@csskro.com
                </p>
                <p className="font-body text-xs text-text-muted mt-1">
                  For inquiries &amp; essay support
                </p>
              </div>
            </div>

            <div
              className="p-6 rounded-xl flex items-start gap-4 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(200,150,46,0.25)',
                boxShadow: '0 8px 30px rgba(26,18,7,0.06)',
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent-gold/10 text-accent-gold flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-text-muted font-medium mb-1">
                  Response Window
                </p>
                <p className="font-display text-lg font-semibold text-text-primary">
                  Within 24 Hours
                </p>
                <p className="font-body text-xs text-text-muted mt-1">
                  Monday to Saturday support
                </p>
              </div>
            </div>

            <div
              className="p-6 rounded-xl flex items-start gap-4 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(200,150,46,0.25)',
                boxShadow: '0 8px 30px rgba(26,18,7,0.06)',
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent-primary/10 text-accent-primary flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-text-muted font-medium mb-1">
                  Headquarters
                </p>
                <p className="font-display text-lg font-semibold text-text-primary">
                  Islamabad, Pakistan
                </p>
                <p className="font-body text-xs text-text-muted mt-1">
                  Serving aspirants countrywide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. CONTACT FORM & FAQ SUMMARY ── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7">
              <div
                className="p-8 sm:p-10 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.90)',
                  border: '1px solid rgba(200,150,46,0.20)',
                  boxShadow: '0 8px 32px rgba(26,18,7,0.06)',
                }}
              >
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary mb-2">
                  Send Us a Message
                </h2>
                <p className="font-body text-sm text-text-muted mb-8 leading-relaxed">
                  Fill out the details below and our team will get back to you promptly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-text-primary font-semibold mb-2">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sobaan Saeed"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:border-accent-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-text-primary font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:border-accent-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-text-primary font-semibold mb-2">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Essay Checker Support">Essay Checker Support &amp; Scoring</option>
                      <option value="Subscription & Billing">Subscription &amp; Premium Upgrade</option>
                      <option value="Past Papers & Syllabus">Past Papers &amp; Syllabus Resource Request</option>
                      <option value="Bug Report">Technical Issue / Bug Report</option>
                      <option value="Partnership">Academic Partnership / Academy Collaboration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-text-primary font-semibold mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us how we can assist you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:border-accent-primary transition-colors leading-relaxed"
                    />
                  </div>

                  {status === 'success' && (
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="font-body text-sm text-green-800">{responseMsg}</p>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="font-body text-sm text-red-800">{responseMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 rounded-full font-body text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #E8650A 0%, #C8962E 100%)' }}
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Helpful Links & Quick Answers */}
            <div className="lg:col-span-5 space-y-6">
              <div
                className="p-8 rounded-2xl"
                style={{
                  background: '#EDE6D6',
                  border: '1px solid rgba(200,150,46,0.25)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <HelpCircle className="w-6 h-6 text-accent-primary" />
                  <h3 className="font-display text-2xl font-semibold text-text-primary">
                    Instant Answers
                  </h3>
                </div>
                <p className="font-body text-sm text-text-muted mb-6 leading-relaxed">
                  Before reaching out, check our frequently asked questions for immediate answers:
                </p>

                <ul className="space-y-4 font-body text-sm">
                  {[
                    { q: 'How do free monthly essay credits work?', href: '/faq#credits' },
                    { q: 'How does the AI grade essays on CSS criteria?', href: '/faq#essay-checker' },
                    { q: 'What payment methods are supported for Pro?', href: '/faq#subscription' },
                    { q: 'Are all past papers authentic FPSC originals?', href: '/faq#past-papers' },
                  ].map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className="flex items-center justify-between text-text-primary hover:text-accent-primary transition-colors group p-2 rounded hover:bg-white/50"
                      >
                        <span className="font-medium pr-2">{item.q}</span>
                        <ArrowRight className="w-4 h-4 text-accent-gold group-hover:translate-x-1 transition-transform flex-shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-300">
                  <Link
                    href="/faq"
                    className="inline-flex items-center gap-2 font-body text-sm font-semibold text-accent-primary hover:underline"
                  >
                    <span>View All FAQs</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div
                className="p-6 rounded-2xl text-white"
                style={{ background: '#0B1E3D' }}
              >
                <h4 className="font-display text-xl font-semibold text-accent-gold mb-2">
                  Prefer direct correspondence?
                </h4>
                <p className="font-body text-xs text-text-on-dark/70 leading-relaxed mb-4">
                  For official matters, write to our editorial and development team directly at:
                </p>
                <a
                  href="mailto:support@csskro.com"
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white hover:text-accent-gold transition-colors underline"
                >
                  <Mail className="w-4 h-4" />
                  support@csskro.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
