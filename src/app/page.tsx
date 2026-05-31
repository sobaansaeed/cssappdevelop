'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, Newspaper, BookOpen, Clock, FileText } from 'lucide-react';

/* ──────────────────────────────────────────────
   Animated Counter Component
   ────────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
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

/* ──────────────────────────────────────────────
   Feature Row Component
   ────────────────────────────────────────────── */
function FeatureRow({
  numeral,
  title,
  description,
  href,
  linkText,
  reversed,
  icon: Icon,
}: {
  numeral: string;
  title: string;
  description: string;
  href: string;
  linkText: string;
  reversed: boolean;
  icon: React.FC<{ className?: string }>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${reversed ? 'lg:direction-rtl' : ''
        }`}
    >
      {/* Text Side */}
      <div className={`lg:col-span-7 space-y-6 ${reversed ? 'lg:order-2 lg:pl-8' : 'lg:order-1'}`}>
        <div className="flex items-baseline gap-4">
          <span className="font-display text-6xl lg:text-7xl font-bold text-gold/20 leading-none select-none">
            {numeral}
          </span>
          <div className="w-12 h-px bg-gold/40" />
        </div>
        <h3 className="font-display text-3xl lg:text-4xl font-bold text-navy leading-tight">
          {title}
        </h3>
        <p className="font-body text-lg text-slate leading-relaxed max-w-xl">
          {description}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-gold hover:text-gold-dark transition-colors group"
        >
          {linkText}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Visual Side */}
      <div className={`lg:col-span-5 ${reversed ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="relative bg-navy/5 border border-navy/10 p-12 flex items-center justify-center" style={{ borderRadius: '4px' }}>
          <div className="absolute inset-0 geo-grid opacity-50" style={{ borderRadius: '4px' }} />
          <Icon className="h-24 w-24 text-navy/15" />
          <div className="absolute top-4 right-4 w-3 h-3 border border-gold/30 rotate-45" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border border-gold/20 rotate-45" />
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   HOMEPAGE
   ══════════════════════════════════════════════ */
const HomePage: React.FC = () => {
  const [, setTick] = useState(0);

  // Force re-render after mount for SSR hydration safety
  useEffect(() => setTick(1), []);

  const successQuotes = [
    { quote: "CSS KRO's resources were instrumental in my preparation. The newspapers section alone saved me hours daily.", author: "Ayesha K., PAS 2024" },
    { quote: "The structured timeline kept me on track. I never missed a deadline during my preparation.", author: "Hassan R., PCS 2023" },
    { quote: "Best CSS preparation platform in Pakistan. The exam pattern breakdown is incredibly detailed.", author: "Fatima S., DMG 2024" },
    { quote: "From past papers to daily newspapers — everything a CSS aspirant needs is right here.", author: "Ahmed M., FSP 2023" },
    { quote: "The quality of resources on CSS KRO is unmatched. It feels like having a personal mentor.", author: "Zainab A., Police Service 2024" },
    { quote: "I recommend CSS KRO to every serious CSS aspirant. It transformed my preparation strategy.", author: "Usman T., Customs 2023" },
  ];

  return (
    <div className="overflow-hidden">

      {/* ═══════════════════════════════════════════
          VELORAH® CINEMATIC HERO
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 flex-1 min-h-screen">
          <div className="w-full max-w-7xl">
            {/* Eyebrow */}
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">
              Pakistan&apos;s Premier CSS Platform
            </p>

            {/* Main Headline */}
            <h1 
              className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] max-w-7xl mx-auto font-normal animate-fade-rise"
              style={{ 
                fontFamily: "'Instrument Serif', serif",
                letterSpacing: '-2.46px'
              }}
            >
              Master CSS <em className="not-italic text-muted-foreground">with Confidence</em>
            </h1>

            {/* Subtext */}
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mt-8 leading-relaxed animate-fade-rise-delay">
              Comprehensive exam preparation with daily newspapers, curated resources,
              past papers, and expert guidance — everything you need to clear the Central
              Superior Services examination.
            </p>

            {/* CTA Button */}
            <Link
              href="/resources"
              className="inline-block liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 cursor-pointer animate-fade-rise-delay-2"
            >
              Start Preparing
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHITE BACKGROUND SECTIONS (Legacy Style)
          ═══════════════════════════════════════════ */}

      {/* ─── STATS BAR ─── */}
      <section className="relative bg-cream py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-0 lg:divide-x lg:divide-navy/10">
            {[
              { target: 25000, suffix: '+', label: 'Students Served' },
              { target: 300, suffix: '+', label: 'Success Stories' },
              { target: 95, suffix: '%', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:px-12">
                <div className="font-mono text-5xl sm:text-6xl lg:text-7xl font-bold text-navy tracking-tight mb-3">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="font-mono text-[10px] text-slate tracking-[0.3em] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURE SECTIONS ─── */}
      <section className="bg-cream-light py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-32">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold/40" />
              <span className="font-mono text-[10px] text-gold tracking-[0.4em] uppercase">What We Offer</span>
              <div className="w-12 h-px bg-gold/40" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Everything for Your CSS Journey
            </h2>
          </div>

          <FeatureRow
            numeral="I"
            title="Daily Newspapers"
            description="Stay ahead of current affairs with curated editions from Pakistan's leading publications. Never miss a headline that could appear in your exam — updated daily, organized by source."
            href="/newspapers"
            linkText="Read Today's Papers"
            reversed={false}
            icon={Newspaper}
          />

          <FeatureRow
            numeral="II"
            title="Curated Resources"
            description="A comprehensive library of study materials organized by subject. Past papers, syllabi, notes, and guides — structured like a catalog so you find exactly what you need, instantly."
            href="/resources"
            linkText="Browse Resources"
            reversed={true}
            icon={BookOpen}
          />

          <FeatureRow
            numeral="III"
            title="Exam Timeline"
            description="Every deadline, every milestone, every important date mapped out for you. From application windows to result announcements — never be caught off guard during your preparation."
            href="/timeline"
            linkText="View Timeline"
            reversed={false}
            icon={Clock}
          />

          <FeatureRow
            numeral="IV"
            title="Exam Pattern & Scheme"
            description="Detailed breakdown of the CSS examination structure, marking schemes, optional and compulsory subjects — formatted like an official document for absolute clarity."
            href="/exam-pattern"
            linkText="Study the Pattern"
            reversed={true}
            icon={FileText}
          />
        </div>
      </section>

      {/* ─── SOCIAL PROOF MARQUEE ─── */}
      <section className="bg-navy py-16 overflow-hidden">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-8 h-px bg-gold/30" />
          <span className="font-mono text-[10px] text-gold/60 tracking-[0.4em] uppercase">What Our Students Say</span>
          <div className="w-8 h-px bg-gold/30" />
        </div>

        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy to-transparent z-10" />

          <div className="flex animate-marquee">
            {[...successQuotes, ...successQuotes].map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[400px] mx-4 px-8 py-6 border border-cream/8 bg-cream/[0.03]"
                style={{ borderRadius: '4px' }}
              >
                <div className="font-display text-3xl text-gold/30 leading-none mb-3">&ldquo;</div>
                <p className="font-body text-sm text-cream/60 italic leading-relaxed mb-4">
                  {item.quote}
                </p>
                <p className="font-mono text-[10px] text-gold/50 tracking-wider uppercase">
                  — {item.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRE-FOOTER CTA ─── */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-px bg-gold/40" />
              <span className="font-mono text-[10px] text-gold tracking-[0.3em] uppercase">Begin Today</span>
              <div className="w-12 h-px bg-gold/40" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6">
              Your Journey to the
              <br />
              Civil Services <span className="text-gold">Starts Here</span>
            </h2>
            <p className="font-body text-lg text-slate leading-relaxed max-w-xl mx-auto mb-10">
              Join 25,000+ students who chose CSS KRO as their preparation partner.
              Everything you need — all in one place.
            </p>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-10 py-4 bg-gold text-navy font-mono text-sm tracking-widest uppercase hover:bg-gold-light transition-all duration-300"
              style={{ borderRadius: '4px' }}
            >
              Start Preparing Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
