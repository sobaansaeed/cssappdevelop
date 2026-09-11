'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Search,
  HelpCircle,
  Sparkles,
  Zap,
  BookOpen,
  User,
  ArrowRight,
  Mail
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'all' | 'essay' | 'subscription' | 'papers' | 'account';
}

const FAQS: FAQItem[] = [
  // Essay Checker
  {
    category: 'essay',
    question: 'How does the AI Essay Checker evaluate my CSS essays?',
    answer:
      'Our AI is calibrated to FPSC (Federal Public Service Commission) grading criteria. It evaluates content depth & argument validity (35 marks), structure, logical progression & paragraph transitions (30 marks), and grammatical fluency, vocabulary & tone (25 marks). You receive an overall score out of 100, specific strengths, areas for improvement, and paragraph-by-paragraph remarks.',
  },
  {
    category: 'essay',
    question: 'How many essay checks do I get each month?',
    answer:
      'Every registered user receives 5 free essay checks per month. Credits automatically reset on the 1st of each calendar month. Premium subscribers get 50 credits per month with priority AI processing.',
  },
  {
    category: 'essay',
    question: 'Is my submitted essay stored or shared with anyone?',
    answer:
      'No. Your essay is processed in real-time and remains completely confidential. We do not sell, publicize, or use your submitted essays to train public models.',
  },
  {
    category: 'essay',
    question: 'Can I submit partial outlines or only full essays?',
    answer:
      'You can submit full essays, thesis statements with structured outlines, or individual body paragraphs. The evaluator requires a minimum of 50 characters to provide meaningful feedback.',
  },
  {
    category: 'essay',
    question: 'Which AI model powers the evaluation?',
    answer:
      'The engine runs on state-of-the-art high-throughput LLaMA 3.3 70B via ultra-low latency Groq processing, delivering comprehensive FPSC-style rubrics within seconds.',
  },

  // Subscription & Credits
  {
    category: 'subscription',
    question: 'What happens when I exhaust my 5 free monthly credits?',
    answer:
      'Once your 5 free credits are used, you can either wait until the 1st of next month for your credits to automatically refresh, or upgrade to the Premium plan which provides 50 checks per month.',
  },
  {
    category: 'subscription',
    question: 'What does the Premium Subscription include?',
    answer:
      'Premium includes 50 essay checks each month, priority AI processing speed, comprehensive breakdown analytics, examiner-style policy recommendations, and priority support.',
  },
  {
    category: 'subscription',
    question: 'What payment methods are supported for subscriptions?',
    answer:
      'We support all major debit/credit cards (Visa, Mastercard), as well as local Pakistani payment options including JazzCash and Easypaisa upon invoice generation.',
  },
  {
    category: 'subscription',
    question: 'Can I cancel my subscription at any time?',
    answer:
      'Yes, you can cancel your recurring subscription at any time with zero cancellation penalties. Your Premium benefits will remain active until the end of your current billing period.',
  },

  // Past Papers & Materials
  {
    category: 'papers',
    question: 'Are the past papers on CSS KRO authentic FPSC originals?',
    answer:
      'Yes. All past papers are verified against official Federal Public Service Commission examination archives covering compulsory and all optional subject groups across recent years.',
  },
  {
    category: 'papers',
    question: 'Can I download past papers for offline reading?',
    answer:
      'Yes! All papers in our archive can be viewed directly in our built-in PDF viewer or downloaded to your device for offline study.',
  },
  {
    category: 'papers',
    question: 'How frequently are new papers and resources updated?',
    answer:
      'Our team regularly uploads latest papers following each exam cycle, along with daily newspaper editorial roundups and syllabus updates as soon as notifications are issued by FPSC.',
  },

  // Account
  {
    category: 'account',
    question: 'Do I need an account to browse past papers and syllabus?',
    answer:
      'No. Past papers, syllabi, exam pattern guides, and study materials are freely browsable without an account. An account is only required to use the AI Essay Checker so your monthly credits can be tracked.',
  },
  {
    category: 'account',
    question: 'How do I reset my password if I forget it?',
    answer:
      'Click on "Sign In" and select "Forgot password?". Enter your registered email address and we will immediately email you a secure link to set a new password.',
  },
  {
    category: 'account',
    question: 'Can I sign in using my Google account?',
    answer:
      'Yes! We provide one-click Google OAuth authentication alongside standard email and password sign-in for seamless access.',
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'essay' | 'subscription' | 'papers' | 'account'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set([0, 1]));

  const filteredFAQs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleIndex = (index: number) => {
    const next = new Set(openIndexes);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setOpenIndexes(next);
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
            HELP CENTER &amp; KNOWLEDGE BASE
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
            Frequently Asked <span className="italic text-accent-gold">Questions</span>
          </h1>
          <p className="font-body text-base sm:text-lg leading-relaxed text-text-on-dark/80 max-w-2xl mx-auto mb-8">
            Find immediate answers regarding the AI Essay Checker, monthly credits, subscriptions, past papers, and account settings.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by keyword (e.g. credits, essay scoring, past papers)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/95 text-text-primary placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ── 2. CATEGORY TABS ── */}
      <section className="py-8 border-b border-gray-200/70" style={{ background: '#EDE6D6' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {(
              [
                { id: 'all', label: 'All Topics', icon: <HelpCircle className="w-4 h-4" /> },
                { id: 'essay', label: 'Essay Checker', icon: <Sparkles className="w-4 h-4" /> },
                { id: 'subscription', label: 'Credits & Pro', icon: <Zap className="w-4 h-4" /> },
                { id: 'papers', label: 'Past Papers', icon: <BookOpen className="w-4 h-4" /> },
                { id: 'account', label: 'Account', icon: <User className="w-4 h-4" /> },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full font-body text-xs sm:text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                  activeCategory === tab.id
                    ? 'bg-accent-primary text-white shadow-md'
                    : 'bg-white/80 text-text-muted hover:text-text-primary hover:bg-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. ACCORDION LIST ── */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16 bg-white/60 rounded-2xl border border-gray-200">
              <HelpCircle className="w-12 h-12 text-accent-gold mx-auto mb-3" />
              <p className="font-display text-xl text-text-primary font-semibold mb-1">
                No matching questions found
              </p>
              <p className="font-body text-sm text-text-muted">
                Try searching for different keywords or view all topics.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, idx) => {
                const isOpen = openIndexes.has(idx);
                return (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.92)',
                      border: '1px solid rgba(200,150,46,0.20)',
                      boxShadow: '0 4px 16px rgba(26,18,7,0.04)',
                    }}
                  >
                    <button
                      onClick={() => toggleIndex(idx)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:text-accent-primary transition-colors gap-4"
                    >
                      <span className="font-display text-lg sm:text-xl font-semibold text-text-primary">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 text-accent-gold"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-1 border-t border-gray-100 font-body text-sm text-text-muted leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}

          {/* Still have questions CTA */}
          <div
            className="mt-16 p-8 rounded-2xl text-center"
            style={{
              background: '#0B1E3D',
              color: '#F0EAD6',
              boxShadow: '0 12px 36px rgba(11,30,61,0.18)',
            }}
          >
            <Mail className="w-10 h-10 text-accent-gold mx-auto mb-4" />
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-2">
              Still have questions?
            </h3>
            <p className="font-body text-sm text-text-on-dark/75 mb-6 max-w-md mx-auto leading-relaxed">
              Cannot find the answer you are looking for? Please contact our team and we will be delighted to assist you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-medium text-white transition-all duration-200 hover:scale-105 shadow-md"
              style={{ background: 'linear-gradient(135deg, #E8650A 0%, #C8962E 100%)' }}
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
