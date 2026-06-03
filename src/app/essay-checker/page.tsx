'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  BookOpen,
  ChevronDown,
  Copy,
  Share2,
  RotateCcw,
  PenTool,
  BrainCircuit,
  AlignLeft,
  Pen,
  GraduationCap,
  ArrowRight,
  ArrowDown,
  FileText,
  Bot,
  BarChart3,
  Zap,
  Lock
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { deductCredit } from '@/lib/credits';

// ═══════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════

interface EssayFeedback {
  score: number;
  grade: string;
  summary: string;
  contentScore: number;
  structureScore: number;
  languageScore: number;
  strengths: string[];
  improvements: string[];
  contentFeedback: string[];
  structureFeedback: string[];
  languageFeedback: string[];
  examinerNotes: string[];
  paragraphFeedback: Array<{
    preview: string;
    rating: number;
    note: string;
  }>;
}

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// ═══════════════════════════════════════════
// SAMPLE ESSAY DATA
// ═══════════════════════════════════════════

const SAMPLE_ESSAY = `Climate Change: A Global Challenge Requiring Immediate Action

Climate change represents one of the most pressing challenges facing humanity in the 21st century. Rising global temperatures, extreme weather events, and environmental degradation threaten not only our ecosystems but also economic stability and social cohesion. This essay argues that immediate, coordinated international action is essential to mitigate the worst effects of climate change and secure a sustainable future for coming generations.

The scientific consensus on climate change is overwhelming. According to the Intergovernmental Panel on Climate Change (IPCC), human activities have unequivocally caused global warming, with temperatures rising approximately 1.1°C above pre-industrial levels. This warming has triggered cascading effects: melting polar ice caps, rising sea levels, and increasingly frequent natural disasters. Developing nations, despite contributing least to emissions, bear the brunt of these impacts through droughts, floods, and agricultural disruption.

However, critics argue that aggressive climate policies could harm economic growth, particularly in developing countries that rely on fossil fuels for industrialization. While this concern merits consideration, it overlooks the economic opportunities presented by green technology and renewable energy sectors. Countries like Denmark and Costa Rica demonstrate that economic prosperity and environmental sustainability are not mutually exclusive.

To address this crisis effectively, a multi-pronged approach is necessary. First, nations must honor and strengthen commitments made under the Paris Agreement, ensuring that global temperature rise remains below 2°C. Second, developed countries should provide financial and technological support to developing nations for climate adaptation and mitigation. Third, investment in renewable energy infrastructure must be accelerated to phase out fossil fuel dependence.

In conclusion, climate change demands urgent, collective action. The window for preventing catastrophic warming is narrowing, and delay will only compound the crisis. Policymakers must prioritize long-term sustainability over short-term economic gains, recognizing that a habitable planet is the foundation of all prosperity.`;

export default function EssayCheckerPage() {
  const { user, isAuthenticated, isLoading: authLoading, credits, refreshCredits } = useAuth();
  const [essay, setEssay] = useState('');
  const [topic, setTopic] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [feedback, setFeedback] = useState<EssayFeedback | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedFAQs, setExpandedFAQs] = useState<Set<number>>(new Set());
  const [creditError, setCreditError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const toolRef = useRef<HTMLDivElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [essay]);

  // Word and sentence count
  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const sentenceCount = essay.trim() ? essay.split(/[.!?]+/).filter(s => s.trim()).length : 0;
  const readTime = Math.ceil(wordCount / 200);

  const handleSubmit = async () => {
    if (!essay.trim() || wordCount < 50) return;
    if (!isAuthenticated || !user) return;
    if (credits <= 0) {
      setCreditError('No credits left. Credits reset on the 1st of every month.');
      return;
    }

    setCreditError('');
    setLoadingState('loading');
    setFeedback(null);

    // Deduct credit first
    const newBalance = await deductCredit(user.id);
    if (newBalance === -1) {
      setCreditError('No credits left. Credits reset on the 1st of every month.');
      setLoadingState('idle');
      return;
    }
    await refreshCredits();

    try {
      const response = await fetch('/api/check-essay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ essay, topic }),
      });

      if (!response.ok) throw new Error('Failed to analyze essay');

      const data = await response.json();
      setFeedback(data);
      setLoadingState('success');
    } catch (error) {
      console.error('Error:', error);
      setLoadingState('error');
    }
  };

  const handleTryAgain = () => {
    setFeedback(null);
    setLoadingState('idle');
    setExpandedSections(new Set());
  };

  const handleLoadSample = () => {
    setEssay(SAMPLE_ESSAY);
    setTopic('Climate Change: A Global Challenge');
    if (toolRef.current) {
      toolRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const toggleFAQ = (index: number) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedFAQs(newExpanded);
  };

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
        className="relative py-16 pt-28"
        style={{
          background: '#0B1E3D',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.10'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="eyebrow text-accent-gold mb-6"
          >
            AI-POWERED FEEDBACK
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl lg:text-6xl font-semibold text-white mb-4"
          >
            Know Exactly Where You Stand
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-body text-base text-text-on-dark/70 max-w-xl mx-auto"
          >
            Paste your CSS essay. Get a score, structure analysis, and examiner-style feedback in seconds.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. HOW IT WORKS
          ═══════════════════════════════════════════ */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
            {[
              { icon: <PenTool className="h-6 w-6" />, title: 'Write or Paste', subtitle: 'Your essay' },
              { icon: <Bot className="h-6 w-6" />, title: 'AI Analyzes', subtitle: 'Your text' },
              { icon: <BarChart3 className="h-6 w-6" />, title: 'Get Feedback', subtitle: 'Scored & detailed' },
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-accent-primary mb-3"
                    style={{ background: 'rgba(232,101,10,0.10)' }}
                  >
                    {step.icon}
                  </div>
                  <h3 className="font-body text-sm font-semibold text-text-primary mb-1">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs text-text-muted">
                    {step.subtitle}
                  </p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block text-text-muted">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
                {idx < 2 && (
                  <div className="md:hidden text-text-muted">
                    <ArrowDown className="h-5 w-5" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. MAIN ESSAY CHECKER TOOL
          ═══════════════════════════════════════════ */}
      <section ref={toolRef} className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT PANEL - Essay Input */}
            <div
              className="p-8"
              style={{
                background: 'rgba(255,255,255,0.90)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(200,150,46,0.20)',
                borderRadius: '12px',
                boxShadow: '0 4px 24px rgba(26,18,7,0.08)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-medium text-text-primary">
                  Your Essay
                </h2>
                <span className="font-body text-sm text-text-muted">
                  {wordCount} words
                </span>
              </div>

              {/* Topic Input */}
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Essay topic or question (optional)"
                className="w-full mb-4 pb-2 font-body text-sm text-text-primary placeholder:text-text-muted border-b border-gray-300 focus:border-accent-primary focus:outline-none transition-colors"
              />

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                placeholder="Begin writing your essay here...

Tip: A strong CSS essay opens with a clear thesis, develops arguments with evidence, and closes with a policy recommendation."
                className="w-full min-h-[400px] font-body text-base text-text-primary placeholder:text-text-muted placeholder:italic leading-relaxed focus:outline-none resize-none"
                style={{ lineHeight: '1.75' }}
              />

              {/* Stats Bar */}
              <div className="flex items-center gap-4 text-text-muted font-body text-xs mb-6">
                <span>{wordCount} words</span>
                <span>·</span>
                <span>{sentenceCount} sentences</span>
                <span>·</span>
                <span>~{readTime} min read</span>
              </div>

              {/* Credit Badge */}
              {isAuthenticated && !authLoading && (
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap size={14} className={credits > 0 ? 'text-amber-500' : 'text-red-400'} />
                    <span className={`font-body text-sm font-medium ${credits > 0 ? 'text-text-primary' : 'text-red-500'}`}>
                      {credits} / 5 credits remaining
                    </span>
                  </div>
                  <span className="font-body text-xs text-text-muted">resets monthly</span>
                </div>
              )}

              {/* Credit error */}
              {creditError && (
                <p className="text-red-500 text-sm mb-4 bg-red-50 rounded-lg px-4 py-3 border border-red-200">
                  {creditError}
                </p>
              )}

              {/* Submit Button */}
              {isAuthenticated ? (
                <button
                  onClick={handleSubmit}
                  disabled={loadingState === 'loading' || wordCount < 50 || credits <= 0}
                  className="w-full h-14 rounded-full font-body text-base font-medium text-white flex items-center justify-center gap-3 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02]"
                  style={{
                    background: loadingState === 'loading' || wordCount < 50 || credits <= 0
                      ? '#ccc'
                      : 'linear-gradient(135deg, #E8650A 0%, #C8962E 100%)',
                  }}
                >
                  {loadingState === 'loading' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      <span>Analyzing your essay...</span>
                    </>
                  ) : credits <= 0 ? (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>No Credits Left</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      <span>Check My Essay</span>
                    </>
                  )}
                </button>
              ) : (
                /* Not signed in — sign in prompt button */
                <Link
                  href="/auth/signin"
                  className="w-full h-14 rounded-full font-body text-base font-medium text-white flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #E8650A 0%, #C8962E 100%)' }}
                >
                  <Lock className="h-5 w-5" />
                  <span>Sign in to Check Essay</span>
                </Link>
              )}

              {/* Below Button Text */}
              <p className="text-center font-body text-xs text-text-muted mt-4">
                {isAuthenticated
                  ? '1 credit used per essay check · 5 free credits per month'
                  : 'Sign in required · 5 free credits every month · No payment needed'}
              </p>
            </div>

            {/* RIGHT PANEL - Feedback Results */}
            <FeedbackPanel
              loadingState={loadingState}
              feedback={feedback}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              onTryAgain={handleTryAgain}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. WRITING TIPS
          ═══════════════════════════════════════════ */}
      <section className="py-16" style={{ background: '#EDE6D6' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="eyebrow text-accent-primary mb-4">CSS WRITING TIPS</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-text-primary">
              Write Like an Examiner Expects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Start With a Thesis', body: 'Your opening paragraph must state your position clearly.' },
              { num: '02', title: 'Structure in Threes', body: 'Introduction, 3–5 body paragraphs, conclusion. CSS examiners value logical flow.' },
              { num: '03', title: 'Evidence Every Claim', body: 'Back arguments with statistics, examples, or expert opinion.' },
              { num: '04', title: 'Address Counter-Arguments', body: 'Show intellectual depth by acknowledging opposing views.' },
              { num: '05', title: 'Conclude With Policy', body: 'CSS essays should end with actionable recommendations.' },
              { num: '06', title: 'Edit for Concision', body: 'Remove filler sentences. Clarity over complexity.' },
            ].map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative p-6"
                style={{
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(200,150,46,0.20)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 24px rgba(26,18,7,0.08)',
                }}
              >
                <div className="absolute top-4 left-4 font-display text-5xl font-semibold text-accent-primary/20">
                  {tip.num}
                </div>
                <div className="mt-12">
                  <h3 className="font-body text-base font-semibold text-text-primary mb-2">
                    {tip.title}
                  </h3>
                  <p className="font-body text-sm text-text-muted">
                    {tip.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. SAMPLE ESSAY PREVIEW
          ═══════════════════════════════════════════ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="eyebrow text-accent-primary mb-4">SEE IT IN ACTION</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-text-primary mb-4">
              Sample Essay & Feedback
            </h2>
            <p className="font-body text-base text-text-muted">
              See how the Essay Checker works on a real example.
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={handleLoadSample}
              className="px-8 py-4 border-2 border-accent-primary text-accent-primary font-body text-base rounded-full hover:bg-accent-primary/10 transition-colors inline-flex items-center gap-2"
            >
              <FileText className="h-5 w-5" />
              Load Sample Essay
            </button>
            <p className="font-body text-sm text-text-muted mt-4">
              This will populate the essay checker above with a sample essay
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. FAQ SECTION
          ═══════════════════════════════════════════ */}
      <section className="py-16" style={{ background: '#EDE6D6' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-text-primary">
              Common Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How does the AI score my essay?',
                a: 'Our AI analyzes your essay across multiple dimensions: content quality, structural coherence, language proficiency, and CSS-specific requirements. It evaluates argument strength, evidence usage, and writing clarity.'
              },
              {
                q: 'How many essays can I check?',
                a: 'Every account gets 5 free essay checks per month. Credits reset automatically on the 1st of each month. Additional credits will be available through our premium plans (coming soon).'
              },
              {
                q: 'Is my essay stored or saved anywhere?',
                a: 'No. Your essay is processed in real-time and not stored on our servers. We prioritize your privacy and do not retain any submitted content after analysis.'
              },
              {
                q: 'What subjects and topics does it support?',
                a: 'The Essay Checker works with any CSS-relevant topic including current affairs, governance, international relations, economics, and social issues.'
              },
              {
                q: 'How accurate is the AI feedback compared to a real examiner?',
                a: 'While AI provides valuable insights on structure, language, and argumentation, it should complement—not replace—human feedback. Use it as a practice tool to identify areas for improvement.'
              },
              {
                q: 'Can I check the same essay multiple times?',
                a: 'Yes — each submission uses 1 credit. You can revise and resubmit your essay to track improvement across multiple checks.'
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border-b border-gray-300 last:border-b-0"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-4 flex items-center justify-between text-left hover:text-accent-primary transition-colors"
                >
                  <span className="font-body text-base font-medium text-text-primary pr-4">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedFAQs.has(idx) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-text-muted flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedFAQs.has(idx) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-sm text-text-muted pb-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

// ═══════════════════════════════════════════
// FEEDBACK PANEL COMPONENT
// ═══════════════════════════════════════════

interface FeedbackPanelProps {
  loadingState: LoadingState;
  feedback: EssayFeedback | null;
  expandedSections: Set<string>;
  toggleSection: (section: string) => void;
  onTryAgain: () => void;
}

function FeedbackPanel({ loadingState, feedback, expandedSections, toggleSection, onTryAgain }: FeedbackPanelProps) {
  const scoreRef = useRef<HTMLDivElement>(null);
  const [displayScore, setDisplayScore] = useState(0);

  // Animate score counter
  useEffect(() => {
    if (feedback && loadingState === 'success') {
      let startTime: number;
      const duration = 1500;
      const targetScore = feedback.score;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setDisplayScore(Math.floor(progress * targetScore));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [feedback, loadingState]);

  return (
    <div
      className="p-8 min-h-[600px]"
      style={{
        background: 'rgba(255,255,255,0.90)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(200,150,46,0.20)',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(26,18,7,0.08)',
      }}
    >
      {/* IDLE STATE */}
      {loadingState === 'idle' && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <BookOpen className="h-16 w-16 text-accent-primary/40 mb-4" />
          <p className="font-body text-base text-text-muted mb-2">
            Your feedback will appear here
          </p>
          <p className="font-body text-sm text-text-muted max-w-sm">
            Submit your essay to receive a detailed score and examiner-style analysis.
          </p>
        </div>
      )}

      {/* LOADING STATE */}
      {loadingState === 'loading' && (
        <div className="space-y-6">
          {[80, 60, 100, 80, 60].map((width, idx) => (
            <div
              key={idx}
              className="h-4 rounded animate-pulse"
              style={{
                background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                width: `${width}%`,
              }}
            />
          ))}
        </div>
      )}

      {/* ERROR STATE */}
      {loadingState === 'error' && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <p className="font-body text-base text-text-primary mb-2">
            Analysis failed
          </p>
          <p className="font-body text-sm text-text-muted mb-6">
            Please try again or check your internet connection.
          </p>
          <button
            onClick={onTryAgain}
            className="px-6 py-2 border-2 border-accent-primary text-accent-primary font-body text-sm rounded-full hover:bg-accent-primary/10 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* SUCCESS STATE */}
      {loadingState === 'success' && feedback && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          {/* Score Banner */}
          <div
            className="p-6 rounded-t-lg mb-6 -mx-8 -mt-8"
            style={{
              background: 'linear-gradient(135deg, #E8650A 0%, #C8962E 100%)',
            }}
          >
            <div className="flex items-center justify-between">
              <div ref={scoreRef}>
                <span className="font-display text-7xl font-semibold text-white">
                  {displayScore}
                </span>
                <span className="font-display text-3xl font-light text-white/70">
                  /100
                </span>
              </div>
              <div className="px-4 py-2 bg-white rounded-full">
                <span className="font-body text-2xl font-bold text-accent-primary">
                  {feedback.grade}
                </span>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center justify-end gap-2">
                  <span className="font-body text-xs text-white/70">Content:</span>
                  <span className="font-body text-sm font-semibold text-white">{feedback.contentScore}/35</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="font-body text-xs text-white/70">Structure:</span>
                  <span className="font-body text-sm font-semibold text-white">{feedback.structureScore}/30</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="font-body text-xs text-white/70">Language:</span>
                  <span className="font-body text-sm font-semibold text-white">{feedback.languageScore}/25</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Summary */}
          <p className="font-body text-base text-text-primary mb-6 leading-relaxed">
            {feedback.summary}
          </p>

          {/* Strengths & Improvements */}
          <div className="mb-6 space-y-4">
            <div>
              <p className="font-body text-xs uppercase tracking-wide text-green-600 mb-2">Strengths</p>
              <div className="flex flex-wrap gap-2">
                {feedback.strengths.map((strength, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-50 text-green-700 text-xs font-body rounded-full border border-green-200"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-wide text-amber-600 mb-2">Areas to Improve</p>
              <div className="flex flex-wrap gap-2">
                {feedback.improvements.map((improvement, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-body rounded-full border border-amber-200"
                  >
                    {improvement}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Breakdown Accordions */}
          <DetailedBreakdown
            feedback={feedback}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={onTryAgain}
              className="w-full px-6 py-3 border-2 border-accent-primary text-accent-primary font-body text-sm rounded-full hover:bg-accent-primary/10 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-2 border border-gray-300 text-text-primary font-body text-sm rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Copy className="h-4 w-4" />
                Copy
              </button>
              <button className="px-4 py-2 border border-gray-300 text-text-primary font-body text-sm rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
// DETAILED BREAKDOWN COMPONENT
// ═══════════════════════════════════════════

interface DetailedBreakdownProps {
  feedback: EssayFeedback;
  expandedSections: Set<string>;
  toggleSection: (section: string) => void;
}

function DetailedBreakdown({ feedback, expandedSections, toggleSection }: DetailedBreakdownProps) {
  const sections = [
    {
      id: 'content',
      icon: <BrainCircuit className="h-5 w-5" />,
      title: 'Content & Arguments',
      score: feedback.contentScore,
      maxScore: 35,
      items: feedback.contentFeedback,
    },
    {
      id: 'structure',
      icon: <AlignLeft className="h-5 w-5" />,
      title: 'Structure & Flow',
      score: feedback.structureScore,
      maxScore: 30,
      items: feedback.structureFeedback,
    },
    {
      id: 'language',
      icon: <Pen className="h-5 w-5" />,
      title: 'Language & Style',
      score: feedback.languageScore,
      maxScore: 25,
      items: feedback.languageFeedback,
    },
    {
      id: 'examiner',
      icon: <GraduationCap className="h-5 w-5" />,
      title: 'CSS Examiner Notes',
      score: null,
      maxScore: null,
      items: feedback.examinerNotes,
    },
  ];

  return (
    <div className="space-y-3 mb-6">
      {sections.map((section) => (
        <div
          key={section.id}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-accent-primary/5 transition-colors"
            style={{
              background: expandedSections.has(section.id) ? 'rgba(232,101,10,0.06)' : 'white',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="text-accent-primary">
                {section.icon}
              </div>
              <span className="font-body text-sm font-medium text-text-primary">
                {section.title}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {section.score !== null && (
                <span className="px-3 py-1 bg-accent-primary text-white text-xs font-body rounded-full">
                  {section.score}/{section.maxScore}
                </span>
              )}
              <motion.div
                animate={{ rotate: expandedSections.has(section.id) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-4 w-4 text-text-muted" />
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {expandedSections.has(section.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 py-4 bg-white border-t border-gray-200">
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="font-body text-sm text-text-primary flex items-start gap-2">
                        <span className="text-accent-primary mt-1">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Paragraph Breakdown */}
      {feedback.paragraphFeedback && feedback.paragraphFeedback.length > 0 && (
        <div className="mt-6">
          <h4 className="font-body text-sm font-semibold text-text-primary mb-3">
            Paragraph Breakdown
          </h4>
          <div className="space-y-2">
            {feedback.paragraphFeedback.map((para, idx) => (
              <div
                key={idx}
                className="p-3 bg-gray-50 rounded border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-xs text-text-muted">
                    Para {idx + 1}: {para.preview.substring(0, 50)}...
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-primary"
                        style={{ width: `${para.rating * 10}%` }}
                      />
                    </div>
                    <span className="font-body text-xs text-text-muted">
                      {para.rating}/10
                    </span>
                  </div>
                </div>
                <p className="font-body text-xs text-text-muted">
                  {para.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
