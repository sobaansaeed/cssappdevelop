'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Target,
  BookOpen,
  Users,
  Award,
  ShieldCheck,
  Zap,
  ArrowRight,
  GraduationCap,
  FileCheck2,
  HeartHandshake
} from 'lucide-react';

export default function AboutPage() {
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
            OUR STORY & MISSION
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
            Built by Aspirants, <span className="italic text-accent-gold">For Aspirants</span>
          </h1>
          <p className="font-body text-base sm:text-lg leading-relaxed text-text-on-dark/80 max-w-2xl mx-auto">
            CSS KRO was created to level the playing field for civil service aspirants across Pakistan — bringing examiner-grade AI evaluations, verified past papers, and curated study materials to everyone, everywhere.
          </p>
        </div>
      </section>

      {/* ── 2. MISSION PILLARS ── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-semibold tracking-[0.2em] text-accent-primary uppercase mb-3">
              WHAT DRIVES US
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-text-primary">
              The Three Pillars of CSS KRO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8 text-accent-primary" />,
                title: 'Democratizing Access',
                description:
                  'High-quality CSS mentorship and resources should not be restricted to candidates in elite academies in Lahore or Islamabad. We make quality prep accessible nationwide.',
              },
              {
                icon: <Zap className="w-8 h-8 text-accent-gold" />,
                title: 'AI-Powered Precision',
                description:
                  'Instant, objective scoring tailored to FPSC examiner standards — giving candidates immediate feedback on grammar, structure, and analytical depth.',
              },
              {
                icon: <Users className="w-8 h-8 text-accent-primary" />,
                title: 'Community & Empowerment',
                description:
                  'An encouraging space where serious aspirants share insights, study smart, track their milestones, and conquer one of Pakistan’s most challenging examinations.',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(200,150,46,0.20)',
                  boxShadow: '0 4px 24px rgba(26,18,7,0.06)',
                }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-accent-primary/10">
                  {pillar.icon}
                </div>
                <h3 className="font-display text-2xl font-semibold text-text-primary mb-3">
                  {pillar.title}
                </h3>
                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. ORIGIN STORY ── */}
      <section className="py-20" style={{ background: '#EDE6D6' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <p className="font-body text-xs font-semibold tracking-[0.2em] text-accent-primary uppercase">
                THE CHALLENGE WE SOLVE
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text-primary leading-tight">
                Why Thousands Struggle With The CSS Essay
              </h2>
              <p className="font-body text-base text-text-muted leading-relaxed">
                Year after year, FPSC annual reports highlight the exact same tragedy: over 80% of candidates fail at the English Essay and Précis papers. The root cause is not lack of ambition — it is lack of consistent, timely, and objective feedback during their preparation months.
              </p>
              <p className="font-body text-base text-text-muted leading-relaxed">
                Traditional academies charge exorbitant fees and take weeks to check a single essay. CSS KRO replaces the bottleneck with an intelligent, 24/7 evaluation engine calibrated to FPSC expectations, coupled with authentic past papers and syllabi.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-text-primary font-body text-sm font-medium">
                  <FileCheck2 className="w-5 h-5 text-accent-primary" />
                  <span>Examiner-calibrated rubrics</span>
                </div>
                <div className="flex items-center gap-2 text-text-primary font-body text-sm font-medium">
                  <HeartHandshake className="w-5 h-5 text-accent-gold" />
                  <span>Transparent & fair pricing</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                className="p-8 rounded-2xl relative overflow-hidden"
                style={{
                  background: '#0B1E3D',
                  color: '#F0EAD6',
                  boxShadow: '0 12px 36px rgba(11,30,61,0.25)',
                }}
              >
                <div className="h-1 w-20 bg-accent-gold rounded-full mb-6" />
                <h3 className="font-display text-2xl font-semibold mb-4 text-white">
                  The FPSC Standard
                </h3>
                <p className="font-body text-sm text-text-on-dark/70 leading-relaxed mb-6">
                  &ldquo;A candidate is expected to reflect clear thinking, logical progression of thoughts, coherent arguments, and good command of written English.&rdquo;
                </p>
                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <span className="font-body text-xs text-accent-gold uppercase tracking-wider">Official Guideline</span>
                  <GraduationCap className="w-5 h-5 text-accent-gold" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. VALUES ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-body text-xs font-semibold tracking-[0.2em] text-accent-primary uppercase mb-3">
              FOUNDATIONAL PRINCIPLES
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-text-primary">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Award className="w-6 h-6 text-accent-primary" />,
                title: 'Excellence',
                desc: 'Uncompromising standard of resources, verified past papers, and accuracy.',
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-accent-gold" />,
                title: 'Authenticity',
                desc: 'Genuine syllabus scopes and exam patterns as decreed by the FPSC.',
              },
              {
                icon: <Zap className="w-6 h-6 text-accent-primary" />,
                title: 'Innovation',
                desc: 'Modern technological tools to give Pakistani students a competitive edge.',
              },
              {
                icon: <BookOpen className="w-6 h-6 text-accent-gold" />,
                title: 'Lifelong Learning',
                desc: 'Fostering critical thinking, civic insight, and scholarly discipline.',
              },
            ].map((val, i) => (
              <div
                key={i}
                className="p-6 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(200,150,46,0.18)',
                  boxShadow: '0 4px 20px rgba(26,18,7,0.05)',
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent-primary/10 mb-4">
                  {val.icon}
                </div>
                <h4 className="font-display text-xl font-semibold text-text-primary mb-2">
                  {val.title}
                </h4>
                <p className="font-body text-xs text-text-muted leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. STATS STRIP ── */}
      <section className="py-14 text-white" style={{ background: '#0B1E3D' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '10,000+', label: 'Active Aspirants' },
              { num: '2,500+', label: 'Solved & Verified Papers' },
              { num: '50,000+', label: 'Essays Evaluated' },
              { num: '100%', label: 'Dedicated to CSS' },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-gold">
                  {stat.num}
                </p>
                <p className="font-body text-xs sm:text-sm text-text-on-dark/70 tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA BANNER ── */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text-primary mb-4">
            Ready to Accelerate Your Preparation?
          </h2>
          <p className="font-body text-base text-text-muted mb-8 leading-relaxed">
            Submit your first essay today or explore our structured past papers repository.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/essay-checker"
              className="px-8 py-3.5 rounded-full font-body text-sm font-medium text-white transition-all duration-200 hover:scale-105 shadow-md flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #E8650A 0%, #C8962E 100%)' }}
            >
              <span>Try Essay Checker</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/past-papers"
              className="px-8 py-3.5 rounded-full font-body text-sm font-medium border-2 border-accent-primary text-accent-primary hover:bg-accent-primary/10 transition-all duration-200"
            >
              Browse Past Papers
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
