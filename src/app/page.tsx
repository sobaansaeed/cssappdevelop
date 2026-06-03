'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { 
  Newspaper, 
  FileText, 
  BookOpen, 
  PenTool, 
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';

/* ══════════════════════════════════════════════
   ANIMATED COUNTER COMPONENT
   ══════════════════════════════════════════════ */
function AnimatedCounter({ 
  target, 
  suffix = '', 
  duration = 2 
}: { 
  target: number; 
  suffix?: string; 
  duration?: number 
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.floor(v).toLocaleString());

  useEffect(() => {
    if (isInView) {
      animate(motionValue, target, { duration, ease: 'easeOut' });
    }
  }, [isInView, motionValue, target, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = v + suffix;
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ══════════════════════════════════════════════
   STARFIELD COMPONENT
   ══════════════════════════════════════════════ */
function Starfield() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   HOMEPAGE
   ══════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div className="overflow-hidden">
      
      {/* ═══════════════════════════════════════════
          1. HERO SECTION - CINEMATIC VIDEO
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Fullscreen Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-32">
          <motion.p
            className="eyebrow text-accent-gold mb-6 animate-fade-rise"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            PAKISTAN&apos;S PREMIER CSS PLATFORM
          </motion.p>

          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-normal max-w-7xl animate-fade-rise"
            style={{
              fontFamily: "'Instrument Serif', serif",
              lineHeight: 0.95,
              letterSpacing: '-2.46px',
            }}
          >
            Master CSS with{' '}
            <em className="not-italic text-muted-foreground">Confidence</em>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
            Comprehensive exam preparation with daily newspapers, curated resources, 
            past papers, and expert guidance — everything you need to clear the Central 
            Superior Services examination.
          </p>

          <Link
            href="/resources"
            className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] transition-transform cursor-pointer inline-block animate-fade-rise-delay-2"
          >
            Begin Journey
          </Link>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          2. STATS BAR
          ═══════════════════════════════════════════ */}
      <section 
        className="py-20 lg:py-24"
        style={{ background: '#0B1E3D' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            {[
              { target: 10000, suffix: '+', label: 'Students' },
              { target: 2500, suffix: '+', label: 'Past Papers' },
              { target: 5, suffix: ' Years', label: 'of Excellence' },
              { target: 98, suffix: '%', label: 'Success Rate' },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="text-center relative"
              >
                {i > 0 && (
                  <div className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 w-px h-16 bg-accent-gold/30" />
                )}
                <div className="font-display text-5xl lg:text-6xl font-semibold text-white mb-2">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="font-body text-xs text-text-on-dark/60 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. FEATURES SECTION
          ═══════════════════════════════════════════ */}
      <section 
        className="py-20 lg:py-32"
        style={{ background: '#F5F0E8' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="eyebrow text-accent-primary mb-4">
              EVERYTHING YOU NEED
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium text-text-primary mb-4">
              Your Complete CSS Arsenal
            </h2>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Newspaper,
                title: 'Daily Newspapers',
                description: 'Curated editorials from Dawn, The News, Express Tribune — summarized for CSS relevance',
                link: '/newspapers',
                linkText: 'Explore'
              },
              {
                icon: FileText,
                title: 'Past Papers',
                description: '20+ years of CSS past papers, organized by year and subject',
                link: '/past-papers',
                linkText: 'Explore'
              },
              {
                icon: BookOpen,
                title: 'Study Resources',
                description: 'Topic-wise notes, recommended books, syllabus breakdowns',
                link: '/resources',
                linkText: 'Explore'
              },
              {
                icon: PenTool,
                title: 'Essay Checker',
                description: 'AI-powered feedback on your essays — score, structure, and improvement tips',
                link: '/essay-checker',
                linkText: 'Explore'
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="light-card p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: 'rgba(232, 101, 10, 0.1)' }}
                >
                  <feature.icon className="w-8 h-8 text-accent-primary" />
                </div>
                <h3 className="font-display text-2xl font-medium text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-base text-text-muted mb-4" style={{ lineHeight: 1.65 }}>
                  {feature.description}
                </p>
                <Link 
                  href={feature.link}
                  className="inline-flex items-center gap-2 font-body text-sm font-medium text-accent-primary hover:text-accent-hover transition-colors"
                >
                  {feature.linkText} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. DAILY NEWSPAPER PREVIEW
          ═══════════════════════════════════════════ */}
      <section 
        className="py-20 lg:py-32"
        style={{ background: '#EDE6D6' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <p className="eyebrow text-accent-primary mb-4">
                DAILY UPDATES
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-medium text-text-primary mb-6">
                Stay Current, Stay Ahead
              </h2>
              <p className="font-body text-lg text-text-muted mb-8" style={{ lineHeight: 1.7 }}>
                Fresh newspaper summaries every morning — Dawn, Express Tribune, The News. 
                Highlighted for CSS exam relevance so you never miss what matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/newspapers" className="btn-primary inline-block">
                  Read Today&apos;s Papers
                </Link>
                <Link href="/newspapers" className="btn-ghost inline-block">
                  View Archive
                </Link>
              </div>
            </motion.div>

            {/* Right: Preview Cards */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              {[
                { paper: 'Dawn', headline: 'Economic Reforms: A Path Forward', date: 'Today' },
                { paper: 'The News', headline: 'Foreign Policy Challenges in 2025', date: 'Today' },
                { paper: 'Express Tribune', headline: 'Education System Overhaul Proposed', date: 'Today' },
              ].map((article, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-6"
                  style={{ 
                    background: 'rgba(11, 30, 61, 0.95)',
                    transform: `rotate(${i === 0 ? -1 : i === 1 ? 0 : 1}deg)`
                  }}
                  whileHover={{ transform: 'rotate(0deg) scale(1.02)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-body text-sm font-semibold text-accent-gold">
                      {article.paper}
                    </span>
                    <span className="font-body text-xs text-text-on-dark/60">
                      {article.date}
                    </span>
                  </div>
                  <h4 className="font-display text-xl font-medium text-white mb-2">
                    {article.headline}
                  </h4>
                  <p className="font-body text-sm text-text-on-dark/70 mb-4">
                    Key insights and analysis relevant to CSS current affairs...
                  </p>
                  <Link 
                    href="/newspapers"
                    className="font-body text-sm font-medium text-accent-gold hover:text-accent-primary transition-colors"
                  >
                    Read More →
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. PAST PAPERS SHOWCASE
          ═══════════════════════════════════════════ */}
      <section 
        className="py-20 lg:py-32"
        style={{ background: '#0B1E3D' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="eyebrow text-accent-gold mb-4">
              COMPREHENSIVE ARCHIVE
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium text-white mb-4">
              Every Paper. Every Year.
            </h2>
            <p className="font-body text-lg text-text-on-dark/75 max-w-3xl mx-auto">
              Access the complete CSS past papers library — from 2000 to present. 
              Filter by subject, year, or topic.
            </p>
          </div>

          {/* Subject Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              'English Essay',
              'Current Affairs',
              'Pakistan Affairs',
              'Islamiat',
              'General Science',
              'Political Science',
              'History'
            ].map((subject, i) => (
              <motion.button
                key={i}
                className="px-6 py-2 rounded-full border border-accent-gold/30 text-accent-gold font-body text-sm hover:bg-accent-primary hover:text-white hover:border-accent-primary transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {subject}
              </motion.button>
            ))}
          </div>

          {/* Year Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[2024, 2023, 2022, 2021, 2020, 2019].map((year, i) => (
              <motion.div
                key={year}
                className="glass-card p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="font-display text-4xl font-semibold text-white mb-2">
                  {year}
                </div>
                <p className="font-body text-sm text-text-on-dark/60 mb-4">
                  25+ papers available
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Essay', 'Current Affairs', 'Islamiat'].map((subject, j) => (
                    <span 
                      key={j}
                      className="px-2 py-1 text-xs font-body bg-white/10 text-text-on-dark/80 rounded"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
                <Link 
                  href="/past-papers"
                  className="inline-flex items-center gap-2 font-body text-sm font-medium text-accent-gold hover:text-accent-primary transition-colors"
                >
                  Download <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/past-papers" className="btn-ghost inline-block text-white border-white hover:bg-white/10">
              Browse Full Archive
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. ESSAY CHECKER CTA
          ═══════════════════════════════════════════ */}
      <section 
        className="py-20 lg:py-32 relative overflow-hidden"
        style={{ background: '#F5F0E8' }}
      >
        {/* Gradient Wash */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10"
          style={{ 
            background: 'linear-gradient(90deg, transparent, #E8650A)' 
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left: Text (60%) */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <p className="eyebrow text-accent-primary mb-4">
                AI-POWERED
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-medium text-text-primary mb-6">
                Get Your Essays Scored Instantly
              </h2>
              <p className="font-body text-lg text-text-muted mb-6" style={{ lineHeight: 1.7 }}>
                Submit your CSS essay and receive detailed AI feedback — overall score, 
                argument strength, structure analysis, CSS examiner perspective, and 
                specific improvement suggestions.
              </p>

              {/* Feature List */}
              <div className="space-y-3 mb-8">
                {[
                  'Overall score out of 100',
                  'Paragraph-by-paragraph feedback',
                  'Language & grammar check',
                  'CSS-specific examiner notes'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-accent-primary flex-shrink-0" />
                    <span className="font-body text-base text-text-primary">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/essay-checker" className="btn-primary inline-block">
                Try Essay Checker
              </Link>
            </motion.div>

            {/* Right: Visual (40%) */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <div className="light-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-body text-sm font-semibold text-text-primary">
                    Essay Analysis
                  </span>
                  <div 
                    className="px-4 py-2 rounded-full font-display text-2xl font-semibold"
                    style={{ background: 'rgba(232, 101, 10, 0.1)', color: '#E8650A' }}
                  >
                    74/100
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="font-body text-sm text-text-muted">
                      Strong introduction with clear thesis
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="font-body text-sm text-text-muted">
                      Good use of relevant examples
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="font-body text-sm text-text-muted">
                      Conclusion could be more impactful
                    </p>
                  </div>
                </div>
                <div 
                  className="mt-6 px-4 py-2 rounded-lg text-center font-body text-sm font-medium"
                  style={{ background: 'rgba(232, 101, 10, 0.1)', color: '#E8650A' }}
                >
                  Grade: B+
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. TESTIMONIALS
          ═══════════════════════════════════════════ */}
      <section 
        className="py-20 lg:py-32"
        style={{ background: '#F5F0E8' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="eyebrow text-accent-primary mb-4">
              STUDENT STORIES
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium text-text-primary">
              From Aspirants to Officers
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
              {
                quote: "CSS KRO&apos;s resources were instrumental in my preparation. The newspapers section alone saved me hours daily.",
                name: "Ayesha Khan",
                batch: "CSS 2023 — Cleared"
              },
              {
                quote: "The structured timeline kept me on track. I never missed a deadline during my preparation journey.",
                name: "Hassan Raza",
                batch: "CSS 2023 — Cleared"
              },
              {
                quote: "Best CSS preparation platform in Pakistan. The exam pattern breakdown is incredibly detailed and helpful.",
                name: "Fatima Siddiqui",
                batch: "CSS 2024 — Cleared"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                className="light-card p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="font-display text-5xl text-accent-gold/30 mb-4">&ldquo;</div>
                <p className="font-body text-base text-text-primary italic mb-6" style={{ lineHeight: 1.65 }}>
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-body text-sm font-semibold text-text-primary">
                    {testimonial.name}
                  </p>
                  <div 
                    className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-body font-medium"
                    style={{ background: 'rgba(232, 101, 10, 0.1)', color: '#E8650A' }}
                  >
                    {testimonial.batch}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. FINAL CTA SECTION
          ═══════════════════════════════════════════ */}
      <section 
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{ background: '#0B1E3D' }}
      >
        {/* Subtle Star Pattern */}
        <div className="absolute inset-0 opacity-15">
          <Starfield />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative Element */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <Star className="w-6 h-6 text-accent-gold" />
            </div>

            <h2 className="font-display text-4xl lg:text-6xl font-semibold text-white mb-6">
              Your CSS Journey <br />Starts Tonight
            </h2>
            <p className="font-body text-lg text-text-on-dark/70 mb-10 max-w-2xl mx-auto">
              Join thousands of aspirants preparing smarter, not harder.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/resources" className="btn-primary inline-block">
                Start Preparing
              </Link>
              <Link href="/resources" className="btn-ghost inline-block text-white border-white hover:bg-white/10">
                Explore Resources
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
