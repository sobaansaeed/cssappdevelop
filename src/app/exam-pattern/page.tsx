'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  FileText,
  PenTool,
  BookOpen,
  Clock,
  AlertCircle,
  CheckSquare,
  BookText,
  Calendar,
  ArrowRight,
  Users,
  ClipboardCheck,
  MessageSquare,
  PenLine,
  X,
  Check
} from 'lucide-react';

// ═══════════════════════════════════════════
// TYPES & DATA
// ═══════════════════════════════════════════

interface Paper {
  number: string;
  subject: string;
  type: 'compulsory' | 'optional';
  marks: number;
  duration: string;
  questionType: 'Essay-type' | 'MCQs' | 'Both';
  passMarkPercent: number;
}

const papers: Paper[] = [
  { number: '01', subject: 'English Essay', type: 'compulsory', marks: 100, duration: '3 hrs', questionType: 'Essay-type', passMarkPercent: 33 },
  { number: '02', subject: 'English Précis & Composition', type: 'compulsory', marks: 100, duration: '3 hrs', questionType: 'Both', passMarkPercent: 33 },
  { number: '03', subject: 'General Science & Ability', type: 'compulsory', marks: 100, duration: '2 hrs', questionType: 'MCQs', passMarkPercent: 33 },
  { number: '04', subject: 'Current Affairs', type: 'compulsory', marks: 100, duration: '3 hrs', questionType: 'Essay-type', passMarkPercent: 33 },
  { number: '05', subject: 'Pakistan Affairs', type: 'compulsory', marks: 100, duration: '3 hrs', questionType: 'Essay-type', passMarkPercent: 33 },
  { number: '06', subject: 'Islamiat', type: 'compulsory', marks: 100, duration: '2 hrs', questionType: 'Both', passMarkPercent: 33 },
  { number: '07', subject: 'Optional I', type: 'optional', marks: 100, duration: '3 hrs', questionType: 'Essay-type', passMarkPercent: 40 },
  { number: '08', subject: 'Optional II', type: 'optional', marks: 100, duration: '3 hrs', questionType: 'Essay-type', passMarkPercent: 40 },
  { number: '09', subject: 'Optional III', type: 'optional', marks: 100, duration: '3 hrs', questionType: 'Essay-type', passMarkPercent: 40 },
  { number: '10', subject: 'Optional IV', type: 'optional', marks: 100, duration: '3 hrs', questionType: 'Essay-type', passMarkPercent: 40 },
];

const questionTypePillColors = {
  'Essay-type': 'bg-teal-600 text-white',
  'MCQs': 'bg-rust text-white',
  'Both': 'bg-purple-600 text-white',
};

// ═══════════════════════════════════════════
// COUNT-UP ANIMATION HOOK
// ═══════════════════════════════════════════

const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return { count, ref };
};

// ═══════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════

export default function ExamPatternPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
      style={{ background: '#F5F0E8' }}
    >
      {/* ═══════════════════════════════════════════
          1. PAGE HERO
          ═══════════════════════════════════════════ */}
      <section
        className="relative py-20"
        style={{
          background: '#0B1E3D',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="eyebrow text-accent-gold mb-6"
          >
            CSS EXAM STRUCTURE
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-5xl lg:text-7xl font-semibold text-white mb-4"
          >
            Crack the <span className="text-accent-primary">Code</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-body text-base text-text-on-dark/70 max-w-2xl mx-auto mb-8"
          >
            Every stage, every paper, every mark — the complete CSS exam structure decoded for serious aspirants.
          </motion.p>

          {/* Stat Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              '3 Stages',
              '1000 Written Marks',
              '300 Viva Marks',
              '~200 Seats'
            ].map((stat, idx) => (
              <div
                key={idx}
                className="px-6 py-3 text-cream font-body text-sm"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(200,150,46,0.30)',
                  borderRadius: '999px',
                }}
              >
                {stat}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. EXAM STAGES OVERVIEW
          ═══════════════════════════════════════════ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="eyebrow text-accent-primary mb-4">THE THREE STAGES</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-text-primary mb-4">
              A Three-Stage Elimination
            </h2>
            <p className="font-body text-base text-text-muted">
              Clear all three to earn your CSS badge.
            </p>
          </div>

          {/* Stages Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative">
            {[
              {
                number: '01',
                icon: <FileText className="h-8 w-8" />,
                title: 'Written Exam',
                marks: '1000 Marks',
                description: '~6,000–10,000 candidates compete across 10 papers over 2 weeks',
                status: 'Competitive',
                delay: 0.1,
              },
              {
                number: '02',
                icon: <ClipboardCheck className="h-8 w-8" />,
                title: 'Psychological Assessment',
                marks: 'Pass / Fail',
                description: 'Medical fitness check included. Qualifying in nature.',
                status: 'Qualifying',
                delay: 0.2,
              },
              {
                number: '03',
                icon: <MessageSquare className="h-8 w-8" />,
                title: 'Viva Voce',
                marks: '300 Marks',
                description: 'Personality test by CSS Board panel. Final merit determination.',
                status: 'Final',
                delay: 0.3,
              },
            ].map((stage, idx) => (
              <React.Fragment key={idx}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: stage.delay, duration: 0.5 }}
                  className="relative p-8"
                  style={{
                    background: 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(200,150,46,0.20)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 24px rgba(26,18,7,0.08)',
                  }}
                >
                  {/* Stage Number */}
                  <div className="absolute top-6 right-6 font-display text-6xl font-semibold text-accent-primary/20">
                    {stage.number}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-primary/10 text-accent-primary mb-4">
                    {stage.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-3xl font-medium text-text-primary mb-3">
                    {stage.title}
                  </h3>

                  {/* Marks */}
                  <p className="font-display text-4xl font-semibold text-accent-primary mb-4">
                    {stage.marks}
                  </p>

                  {/* Description */}
                  <p className="font-body text-sm text-text-muted mb-6">
                    {stage.description}
                  </p>

                  {/* Status Pill */}
                  <span className="inline-block px-4 py-1.5 bg-navy text-cream text-xs font-body rounded-full">
                    {stage.status}
                  </span>
                </motion.div>

                {/* Arrow (desktop only) */}
                {idx < 2 && (
                  <div className="hidden lg:flex items-center justify-center">
                    <ArrowRight className="h-8 w-8 text-accent-primary" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. WRITTEN EXAM DEEP DIVE
          ═══════════════════════════════════════════ */}
      <section className="py-16" style={{ background: '#EDE6D6' }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="eyebrow text-accent-primary mb-4">WRITTEN EXAMINATION</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-text-primary mb-4">
              Stage 1 — The Written Battle
            </h2>
            <p className="font-body text-base text-text-muted">
              10 papers over approximately 2 weeks. Every mark counts.
            </p>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto mb-6">
            <div
              className="min-w-full"
              style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(200,150,46,0.20)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              {/* Table Header */}
              <div className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-accent-gold/30" style={{ background: '#F5F0E8' }}>
                <div className="font-body text-xs uppercase tracking-wide text-text-muted">Paper</div>
                <div className="font-body text-xs uppercase tracking-wide text-text-muted">Subject</div>
                <div className="font-body text-xs uppercase tracking-wide text-text-muted">Marks</div>
                <div className="font-body text-xs uppercase tracking-wide text-text-muted">Duration</div>
                <div className="font-body text-xs uppercase tracking-wide text-text-muted">Question Type</div>
                <div className="font-body text-xs uppercase tracking-wide text-text-muted">Pass Mark</div>
              </div>

              {/* Table Rows */}
              {papers.map((paper, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-6 gap-4 px-6 py-4 border-l-4 border-transparent hover:border-accent-primary hover:bg-accent-primary/5 transition-all duration-200"
                  style={{
                    background: idx % 2 === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(245,240,232,0.5)',
                  }}
                >
                  {/* Paper Number */}
                  <div className="font-display text-xl font-medium text-accent-primary">
                    {paper.number}
                  </div>

                  {/* Subject */}
                  <div>
                    <div className="font-display text-lg font-medium text-text-primary">
                      {paper.subject}
                    </div>
                    <div className="font-body text-xs text-text-muted italic">
                      ({paper.type === 'compulsory' ? 'Compulsory' : 'Optional'})
                    </div>
                  </div>

                  {/* Marks */}
                  <div>
                    <span className="font-body text-lg font-semibold text-text-primary">{paper.marks}</span>
                    <span className="ml-2 px-2 py-0.5 bg-accent-primary text-white text-xs rounded-full">
                      marks
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-text-primary">
                    <Clock className="h-4 w-4" />
                    <span className="font-body text-sm">{paper.duration}</span>
                  </div>

                  {/* Question Type */}
                  <div>
                    <span className={`px-3 py-1 text-xs font-body rounded-full ${questionTypePillColors[paper.questionType]}`}>
                      {paper.questionType}
                    </span>
                  </div>

                  {/* Pass Mark */}
                  <div>
                    <div className="font-body text-sm font-semibold text-text-primary mb-1">
                      {paper.passMarkPercent}%
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-primary"
                        style={{ width: `${paper.passMarkPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Note */}
          <div
            className="p-6 border-l-4 border-accent-primary flex items-start gap-4"
            style={{
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(8px)',
              borderRadius: '12px',
            }}
          >
            <AlertCircle className="h-6 w-6 text-accent-primary flex-shrink-0 mt-0.5" />
            <p className="font-body text-sm text-text-primary">
              <span className="font-semibold">Aggregate rule:</span> Candidates must score 40% overall AND 33% in each
              compulsory paper. Failing any single compulsory paper = disqualification, regardless of total aggregate.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. MARKS ANATOMY SECTION
          ═══════════════════════════════════════════ */}
      <MarksAnatomySection />

      {/* ═══════════════════════════════════════════
          5. QUESTION TYPES EXPLAINED
          ═══════════════════════════════════════════ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="eyebrow text-accent-primary mb-4">QUESTION FORMAT</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-text-primary mb-4">
              What You&apos;ll Actually Face
            </h2>
          </div>

          {/* Question Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <PenLine className="h-8 w-8" />,
                title: 'Essay-Type Questions',
                badge: 'Majority of papers',
                body: 'Long-form written answers. CSS examiners assess depth of knowledge, argument quality, and writing clarity.',
                specs: [
                  'Typically 5–6 questions, attempt 3–4',
                  '20–25 marks per question',
                  'No word limit specified — but quality over quantity',
                  'Marks deducted for irrelevance',
                ],
                tip: 'Tip: Open with a definition or thesis. Structure each answer in 3 parts: context, analysis, recommendation.',
              },
              {
                icon: <CheckSquare className="h-8 w-8" />,
                title: 'Multiple Choice Questions',
                badge: 'General Science & Ability, Islamiat',
                body: 'Objective questions with 4 options. No negative marking in most papers — but confirm per year&apos;s instructions.',
                specs: [
                  '100 MCQs in some papers',
                  '1 mark each',
                  'Time-pressured — ~1 minute per question',
                  'Mix of factual recall and application',
                ],
                tip: 'Tip: Eliminate obviously wrong options first. Don&apos;t leave blanks — there is typically no penalty for guessing.',
              },
              {
                icon: <BookText className="h-8 w-8" />,
                title: 'Précis & Composition',
                badge: 'English Précis paper',
                body: 'Condensing a passage to 1/3 of its length while retaining all key points. Tests language command and comprehension.',
                specs: [
                  'Précis: usually 30–40 marks',
                  'Comprehension passage: 20 marks',
                  'Grammar/translation: 20–30 marks',
                  'Strict word count enforcement',
                ],
                tip: 'Tip: Use indirect speech and your own words. Preserve all key arguments. Title the précis.',
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="p-8"
                style={{
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(200,150,46,0.20)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 24px rgba(26,18,7,0.08)',
                }}
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-primary/10 text-accent-primary mb-4">
                  {card.icon}
                </div>

                {/* Title & Badge */}
                <h3 className="font-display text-2xl font-medium text-text-primary mb-2">
                  {card.title}
                </h3>
                <span className="inline-block px-3 py-1 bg-accent-primary/10 text-accent-primary text-xs font-body rounded-full mb-4">
                  {card.badge}
                </span>

                {/* Body */}
                <p className="font-body text-sm text-text-muted mb-4">
                  {card.body}
                </p>

                {/* Specs */}
                <ul className="space-y-2 mb-4">
                  {card.specs.map((spec, i) => (
                    <li key={i} className="font-body text-sm text-text-primary flex items-start gap-2">
                      <span className="text-accent-primary mt-1">·</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                {/* Tip Box */}
                <div className="p-4 bg-accent-primary/5 border-l-4 border-accent-primary rounded">
                  <p className="font-body text-sm text-text-primary italic">
                    {card.tip}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
