'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  FileText, 
  BookOpen, 
  PenTool, 
  Info,
  Star,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

// ═══════════════════════════════════════════
// TYPES & DATA
// ═══════════════════════════════════════════

interface Topic {
  name: string;
  scope: string;
  importance: number; // 1-5 stars
}

interface CompulsoryPaper {
  id: string;
  number: string;
  name: string;
  marks: number;
  topics: Topic[];
  examinerNote: string;
}

interface OptionalSubject {
  id: string;
  name: string;
  group: 'A' | 'B' | 'C' | 'D';
  marks: number;
  topicsPreview: string[];
  topics: Topic[];
  examinerNote: string;
}

const compulsoryPapers: CompulsoryPaper[] = [
  {
    id: 'english-essay',
    number: '01',
    name: 'English Essay',
    marks: 100,
    topics: [
      { name: 'Essay Structure & Organization', scope: 'Introduction, body paragraphs, conclusion, logical flow', importance: 5 },
      { name: 'Argumentation & Critical Analysis', scope: 'Building arguments, counter-arguments, evidence-based reasoning', importance: 5 },
      { name: 'CSS-Relevant Topics', scope: 'Current affairs, governance, social issues, international relations', importance: 5 },
      { name: 'Language & Style', scope: 'Vocabulary, grammar, coherence, formal academic tone', importance: 4 },
      { name: 'Time Management', scope: 'Planning, drafting, revising within exam time constraints', importance: 4 },
    ],
    examinerNote: 'Examiners look for clarity of thought, logical structure, and sophisticated language. Avoid memorized essays—demonstrate original thinking and CSS-relevant awareness.'
  },
  {
    id: 'english-precis',
    number: '02',
    name: 'English Précis & Composition',
    marks: 100,
    topics: [
      { name: 'Précis Writing', scope: 'Condensing passages to 1/3 length while retaining core meaning', importance: 5 },
      { name: 'Grammar & Syntax', scope: 'Sentence correction, parts of speech, tenses, voice', importance: 4 },
      { name: 'Comprehension', scope: 'Reading passages and answering analytical questions', importance: 4 },
      { name: 'Translation (Urdu to English)', scope: 'Accurate translation maintaining tone and meaning', importance: 4 },
      { name: 'Vocabulary & Idioms', scope: 'Synonyms, antonyms, one-word substitutions, common idioms', importance: 3 },
    ],
    examinerNote: 'Precision and brevity are key. Examiners reward candidates who can distill complex ideas without losing nuance.'
  },
  {
    id: 'general-science',
    number: '03',
    name: 'General Science & Ability',
    marks: 100,
    topics: [
      { name: 'Basic Sciences', scope: 'Physics, chemistry, biology fundamentals at intermediate level', importance: 4 },
      { name: 'Everyday Science', scope: 'Scientific principles in daily life, health, environment', importance: 5 },
      { name: 'Logical Reasoning', scope: 'Analogies, sequences, pattern recognition, deductive reasoning', importance: 4 },
      { name: 'Mental Ability', scope: 'Quantitative reasoning, data interpretation, problem-solving', importance: 4 },
      { name: 'Computer & IT Basics', scope: 'Basic computer knowledge, internet, digital literacy', importance: 3 },
    ],
    examinerNote: 'This paper tests practical scientific knowledge and analytical thinking. Focus on concepts over rote memorization.'
  },
  {
    id: 'current-affairs',
    number: '04',
    name: 'Current Affairs',
    marks: 100,
    topics: [
      { name: 'National Affairs', scope: 'Pakistan politics, economy, governance, social issues', importance: 5 },
      { name: 'International Relations', scope: 'Global politics, diplomacy, regional conflicts, alliances', importance: 5 },
      { name: 'Economic Developments', scope: 'Trade, finance, development policies, economic indicators', importance: 4 },
      { name: 'Foreign Policy', scope: 'Pakistan&apos;s relations with neighbors and major powers', importance: 5 },
      { name: 'Global Issues', scope: 'Climate change, terrorism, human rights, migration', importance: 4 },
    ],
    examinerNote: 'Stay updated with the last 12-18 months of major events. Examiners value analytical depth over mere factual recall.'
  },
  {
    id: 'pakistan-affairs',
    number: '05',
    name: 'Pakistan Affairs',
    marks: 100,
    topics: [
      { name: 'Pakistan Movement', scope: 'Historical background, key events, personalities, ideology', importance: 4 },
      { name: 'Constitutional Development', scope: '1956, 1962, 1973 constitutions, amendments, judicial review', importance: 5 },
      { name: 'Foreign Policy', scope: 'Relations with neighbors, major powers, international organizations', importance: 5 },
      { name: 'Socio-Economic Issues', scope: 'Poverty, education, health, population, urbanization', importance: 4 },
      { name: 'Governance & Administration', scope: 'Federal structure, provincial autonomy, local government', importance: 4 },
    ],
    examinerNote: 'Deep understanding of Pakistan\'s constitutional and political evolution is essential. Link historical events to contemporary challenges.'
  },
  {
    id: 'islamiat',
    number: '06',
    name: 'Islamiat',
    marks: 100,
    topics: [
      { name: 'Islamic Principles & Beliefs', scope: 'Tawheed, prophethood, life after death, pillars of Islam', importance: 5 },
      { name: 'Quranic Studies', scope: 'Major themes, selected verses, interpretation principles', importance: 5 },
      { name: 'Hadith & Sunnah', scope: 'Selected Ahadith, their application in modern life', importance: 4 },
      { name: 'Islamic History', scope: 'Life of Prophet (PBUH), Khulafa-e-Rashideen, Islamic civilization', importance: 4 },
      { name: 'Islamic Jurisprudence', scope: 'Sources of law, schools of thought, contemporary issues', importance: 4 },
    ],
    examinerNote: 'Non-Muslim candidates may opt for Comparative Religion. Examiners look for understanding of Islamic principles and their contemporary relevance.'
  },
];

const optionalSubjects: OptionalSubject[] = [
  // Group A
  {
    id: 'political-science',
    name: 'Political Science',
    group: 'A',
    marks: 100,
    topicsPreview: ['Political theory & ideologies', 'Comparative politics', 'International relations'],
    topics: [
      { name: 'Political Theory', scope: 'Classical and modern political thought, ideologies', importance: 5 },
      { name: 'Comparative Politics', scope: 'Political systems, institutions, governance models', importance: 4 },
      { name: 'International Relations', scope: 'Theories, global politics, diplomacy', importance: 5 },
    ],
    examinerNote: 'Strong analytical skills and understanding of political systems are essential.'
  },
  {
    id: 'international-relations',
    name: 'International Relations',
    group: 'A',
    marks: 100,
    topicsPreview: ['IR theories', 'Global politics', 'Foreign policy analysis'],
    topics: [
      { name: 'IR Theories', scope: 'Realism, liberalism, constructivism, critical theories', importance: 5 },
      { name: 'Global Politics', scope: 'Power dynamics, international organizations, global governance', importance: 5 },
      { name: 'Foreign Policy', scope: 'Decision-making, diplomacy, strategic studies', importance: 4 },
    ],
    examinerNote: 'Current global affairs knowledge is crucial. Link theory to contemporary events.'
  },
  {
    id: 'public-administration',
    name: 'Public Administration',
    group: 'A',
    marks: 100,
    topicsPreview: ['Administrative theory', 'Public policy', 'Governance & reforms'],
    topics: [
      { name: 'Administrative Theory', scope: 'Classical, behavioral, modern approaches', importance: 4 },
      { name: 'Public Policy', scope: 'Policy formulation, implementation, evaluation', importance: 5 },
      { name: 'Governance', scope: 'Good governance, reforms, e-governance', importance: 5 },
    ],
    examinerNote: 'Practical understanding of administrative processes and reforms is valued.'
  },
  // Group B
  {
    id: 'economics',
    name: 'Economics',
    group: 'B',
    marks: 100,
    topicsPreview: ['Microeconomics', 'Macroeconomics', 'Development economics'],
    topics: [
      { name: 'Microeconomics', scope: 'Demand-supply, market structures, consumer behavior', importance: 4 },
      { name: 'Macroeconomics', scope: 'National income, inflation, fiscal & monetary policy', importance: 5 },
      { name: 'Development Economics', scope: 'Growth theories, poverty, inequality, Pakistan economy', importance: 5 },
    ],
    examinerNote: 'Apply economic concepts to Pakistan\'s economic challenges and policy issues.'
  },
  {
    id: 'business-administration',
    name: 'Business Administration',
    group: 'B',
    marks: 100,
    topicsPreview: ['Management principles', 'Marketing & finance', 'Organizational behavior'],
    topics: [
      { name: 'Management', scope: 'Planning, organizing, leading, controlling', importance: 4 },
      { name: 'Marketing & Finance', scope: 'Marketing strategies, financial management, accounting basics', importance: 4 },
      { name: 'Organizational Behavior', scope: 'Motivation, leadership, team dynamics', importance: 4 },
    ],
    examinerNote: 'Focus on practical business concepts and their application in public sector.'
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Forestry',
    group: 'B',
    marks: 100,
    topicsPreview: ['Crop production', 'Soil & water management', 'Forestry & environment'],
    topics: [
      { name: 'Crop Production', scope: 'Major crops, cultivation practices, pest management', importance: 4 },
      { name: 'Soil & Water', scope: 'Soil science, irrigation, water conservation', importance: 4 },
      { name: 'Forestry', scope: 'Forest management, biodiversity, environmental conservation', importance: 4 },
    ],
    examinerNote: 'Understanding of Pakistan\'s agricultural challenges and sustainable practices is key.'
  },
  // Group C
  {
    id: 'history-pak-india',
    name: 'History of Pakistan & India',
    group: 'C',
    marks: 100,
    topicsPreview: ['Mughal period', 'British colonial rule', 'Pakistan movement'],
    topics: [
      { name: 'Mughal Empire', scope: 'Rise, administration, decline, cultural legacy', importance: 4 },
      { name: 'British Rule', scope: 'Colonial policies, resistance movements, socio-economic impact', importance: 5 },
      { name: 'Pakistan Movement', scope: 'Muslim nationalism, key events, partition', importance: 5 },
    ],
    examinerNote: 'Analytical understanding of historical events and their contemporary relevance is essential.'
  },
  {
    id: 'islamic-history',
    name: 'Islamic History & Culture',
    group: 'C',
    marks: 100,
    topicsPreview: ['Early Islamic period', 'Islamic civilization', 'Muslim empires'],
    topics: [
      { name: 'Early Islam', scope: 'Prophet\'s era, Khulafa-e-Rashideen, Umayyad & Abbasid', importance: 5 },
      { name: 'Islamic Civilization', scope: 'Science, art, architecture, literature', importance: 4 },
      { name: 'Muslim Empires', scope: 'Ottoman, Safavid, Mughal empires', importance: 4 },
    ],
    examinerNote: 'Understanding of Islamic civilization\'s contributions to world history is valued.'
  },
  {
    id: 'british-history',
    name: 'British History',
    group: 'C',
    marks: 100,
    topicsPreview: ['Tudor & Stuart period', 'Industrial revolution', 'British Empire'],
    topics: [
      { name: 'Tudor & Stuart', scope: 'Monarchy, religious conflicts, constitutional development', importance: 4 },
      { name: 'Industrial Revolution', scope: 'Economic transformation, social changes, global impact', importance: 4 },
      { name: 'British Empire', scope: 'Colonial expansion, administration, decline', importance: 4 },
    ],
    examinerNote: 'Understanding of British constitutional and imperial history is important.'
  },
  // Group D
  {
    id: 'sociology',
    name: 'Sociology',
    group: 'D',
    marks: 100,
    topicsPreview: ['Sociological theories', 'Social institutions', 'Social change'],
    topics: [
      { name: 'Sociological Theory', scope: 'Classical and contemporary theories, key thinkers', importance: 5 },
      { name: 'Social Institutions', scope: 'Family, education, religion, economy', importance: 4 },
      { name: 'Social Change', scope: 'Modernization, globalization, social movements', importance: 5 },
    ],
    examinerNote: 'Apply sociological concepts to understand Pakistani society and social issues.'
  },
  {
    id: 'psychology',
    name: 'Psychology',
    group: 'D',
    marks: 100,
    topicsPreview: ['Psychological theories', 'Cognitive & developmental psychology', 'Applied psychology'],
    topics: [
      { name: 'Psychological Theories', scope: 'Behavioral, cognitive, psychoanalytic approaches', importance: 4 },
      { name: 'Cognitive & Developmental', scope: 'Learning, memory, human development stages', importance: 4 },
      { name: 'Applied Psychology', scope: 'Clinical, organizational, educational psychology', importance: 4 },
    ],
    examinerNote: 'Understanding of human behavior and psychological principles is essential.'
  },
  {
    id: 'geography',
    name: 'Geography',
    group: 'D',
    marks: 100,
    topicsPreview: ['Physical geography', 'Human geography', 'Regional geography'],
    topics: [
      { name: 'Physical Geography', scope: 'Landforms, climate, natural resources', importance: 4 },
      { name: 'Human Geography', scope: 'Population, urbanization, economic geography', importance: 4 },
      { name: 'Regional Geography', scope: 'Pakistan geography, South Asia, world regions', importance: 5 },
    ],
    examinerNote: 'Map reading and understanding of geographical concepts with focus on Pakistan is important.'
  },
];

const groupColors = {
  A: { bg: 'bg-teal-600', text: 'text-teal-600', border: 'border-teal-600' },
  B: { bg: 'bg-rust', text: 'text-rust', border: 'border-rust' },
  C: { bg: 'bg-forest', text: 'text-forest', border: 'border-forest' },
  D: { bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-600' },
};

// ═══════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════

const PaperAccordionRow: React.FC<{ paper: CompulsoryPaper }> = ({ paper }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`mb-4 overflow-hidden transition-all duration-300 ${
        isOpen ? 'bg-accent-primary/5 border-l-4 border-accent-primary' : 'bg-white/75 border-l-4 border-transparent'
      }`}
      style={{
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(200,150,46,0.20)',
        borderRadius: '12px',
      }}
    >
      {/* Closed State Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/30 transition-colors"
      >
        <div className="flex items-center gap-6">
          <span className="font-display text-3xl font-semibold text-accent-primary/30">
            {paper.number}
          </span>
          <div className="text-left">
            <h3 className="font-display text-xl font-medium text-text-primary">
              {paper.name}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-accent-primary text-white text-xs font-body rounded-full">
            {paper.marks} Marks
          </span>
          <span className="px-3 py-1 bg-navy text-cream text-xs font-body rounded-full">
            Required
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-5 w-5 text-accent-primary" />
          </motion.div>
        </div>
      </button>

      {/* Expanded State */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {paper.topics.map((topic, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-accent-primary mt-1">·</span>
                    <div>
                      <h4 className="font-body text-sm font-semibold text-text-primary">
                        {topic.name}
                      </h4>
                      <p className="font-body text-xs text-text-muted italic mt-0.5">
                        {topic.scope}
                      </p>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < topic.importance
                                ? 'fill-accent-gold text-accent-gold'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Examiner's Note */}
              <div className="mb-4 p-4 bg-accent-primary/10 border-l-2 border-accent-primary rounded">
                <p className="font-body text-sm text-text-primary">
                  <span className="font-semibold">Examiner's Note:</span> {paper.examinerNote}
                </p>
              </div>

              {/* Resource Shortcuts */}
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 border border-accent-primary text-accent-primary text-sm font-body rounded-full hover:bg-accent-primary/10 transition-colors flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Past Papers →
                </button>
                <button className="px-4 py-2 border border-accent-primary text-accent-primary text-sm font-body rounded-full hover:bg-accent-primary/10 transition-colors flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Notes →
                </button>
                <button className="px-4 py-2 border border-accent-primary text-accent-primary text-sm font-body rounded-full hover:bg-accent-primary/10 transition-colors flex items-center gap-2">
                  <PenTool className="h-4 w-4" />
                  Practice Essay →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const OptionalSubjectCard: React.FC<{ subject: OptionalSubject }> = ({ subject }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = groupColors[subject.group];

  return (
    <motion.div
      className="bg-white/75 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-l-4 hover:border-accent-primary cursor-pointer"
      style={{
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(200,150,46,0.20)',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(26,18,7,0.08)',
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Group Badge */}
      <div className="mb-3">
        <span className={`px-3 py-1 ${colors.bg} text-white text-xs font-body rounded-full`}>
          Group {subject.group}
        </span>
      </div>

      {/* Subject Name */}
      <h3 className="font-display text-2xl font-medium text-text-primary mb-2">
        {subject.name}
      </h3>

      {/* Marks */}
      <p className="font-body text-sm text-text-muted mb-4">
        {subject.marks} Marks
      </p>

      {/* Topics Preview */}
      <ul className="space-y-2 mb-4">
        {subject.topicsPreview.map((topic, idx) => (
          <li key={idx} className="font-body text-sm text-text-muted flex items-start gap-2">
            <span className="text-accent-primary mt-0.5">·</span>
            <span>{topic}</span>
          </li>
        ))}
      </ul>

      {/* Expanded Topics */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-4"
          >
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-body text-sm font-semibold text-text-primary mb-3">Full Topics:</h4>
              <div className="space-y-3">
                {subject.topics.map((topic, idx) => (
                  <div key={idx}>
                    <h5 className="font-body text-sm font-semibold text-text-primary">{topic.name}</h5>
                    <p className="font-body text-xs text-text-muted italic">{topic.scope}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Links */}
      <div className="flex flex-col gap-2">
        <button className="text-accent-primary text-sm font-body hover:underline text-left flex items-center gap-1">
          {isExpanded ? 'Hide Topics ↑' : 'View Full Topics ↓'}
        </button>
        <a href="/past-papers" className="text-accent-primary text-sm font-body hover:underline flex items-center gap-1">
          Related Past Papers →
        </a>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════

export default function SyllabusPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>('english-essay');

  const allSubjects = [
    ...compulsoryPapers.map(p => ({ ...p, type: 'compulsory' as const })),
    ...optionalSubjects.map(s => ({ ...s, type: 'optional' as const }))
  ];

  const currentSubject = allSubjects.find(s => s.id === selectedSubject);

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
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ffffff' stroke-width='0.5' opacity='0.12'%3E%3Cpath d='M0 0h100v100H0z'/%3E%3Cpath d='M0 50h100M50 0v100'/%3E%3Cpath d='M0 25h100M0 75h100M25 0v100M75 0v100'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            CSS 2025 SYLLABUS
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-5xl lg:text-7xl font-semibold text-white mb-4"
          >
            The CSS <span className="text-accent-primary">Blueprint</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-body text-base text-text-on-dark/70 max-w-2xl mx-auto mb-8"
          >
            Every compulsory and optional subject — topics, scope, and what the examiners actually want.
          </motion.p>

          {/* Stat Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              '6 Compulsory Papers',
              'Optional: Choose 4 of 12',
              '1200 Total Marks'
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
          2. EXAM OVERVIEW STRIP
          ═══════════════════════════════════════════ */}
      <section
        className="py-8"
        style={{
          background: 'linear-gradient(135deg, #E8650A 0%, #C8962E 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Written Exam', value: 'Competitive' },
              { label: 'Twice a Year', value: 'Feb + Oct/Nov' },
              { label: 'Age: 21–30', value: 'Relaxations apply' },
              { label: 'FPSC Conducted', value: 'Federal Body' },
            ].map((fact, idx) => (
              <div key={idx} className="relative">
                {idx > 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-white/25" />
                )}
                <p className="font-body text-xs uppercase tracking-wide text-white/70 mb-2">
                  {fact.label}
                </p>
                <p className="font-display text-2xl font-semibold text-white">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. COMPULSORY PAPERS SECTION
          ═══════════════════════════════════════════ */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="eyebrow text-accent-primary mb-4">COMPULSORY SUBJECTS</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-text-primary mb-4">
              Papers Every Candidate Must Sit
            </h2>
            <p className="font-body text-base text-text-muted max-w-2xl mx-auto">
              These 6 papers are mandatory for all CSS candidates. Total marks: 600
            </p>
          </div>

          {/* Papers Accordion */}
          <div>
            {compulsoryPapers.map((paper) => (
              <PaperAccordionRow key={paper.id} paper={paper} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. OPTIONAL SUBJECTS SECTION
          ═══════════════════════════════════════════ */}
      <section className="py-16" style={{ background: '#EDE6D6' }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="eyebrow text-accent-primary mb-4">OPTIONAL SUBJECTS</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-text-primary mb-4">
              Choose Your Strengths
            </h2>
            <p className="font-body text-base text-text-muted max-w-2xl mx-auto mb-8">
              Select 4 optional subjects from the list below. Each paper carries 100 marks. Total: 400 marks.
            </p>

            {/* Info Card */}
            <div
              className="max-w-3xl mx-auto p-4 bg-accent-primary/10 border-l-4 border-accent-primary rounded flex items-start gap-3"
            >
              <Info className="h-5 w-5 text-accent-primary flex-shrink-0 mt-0.5" />
              <p className="font-body text-sm text-text-primary text-left">
                Candidates must choose 4 optional subjects. No two subjects from the same group may be selected.
                Check the FPSC grouping rules before finalizing your combination.
              </p>
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {optionalSubjects.map((subject) => (
              <OptionalSubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. MARKS BREAKDOWN VISUAL
          ═══════════════════════════════════════════ */}
      <section className="py-20" style={{ background: '#0B1E3D' }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="eyebrow text-accent-gold mb-4">MARKS DISTRIBUTION</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-white mb-8">
              The Full Picture
            </h2>
          </div>

          {/* Total Marks Label */}
          <div className="text-center mb-4">
            <p className="font-display text-3xl font-semibold text-white">1000 Marks</p>
            <p className="font-body text-sm text-text-on-dark/60">Written Examination</p>
          </div>

          {/* Stacked Bar */}
          <div className="mb-4">
            <div className="h-16 rounded-lg overflow-hidden flex">
              <div
                className="flex items-center justify-center text-white font-body text-sm font-semibold"
                style={{
                  width: '60%',
                  background: 'linear-gradient(135deg, #E8650A 0%, #C8962E 100%)',
                }}
              >
                Compulsory: 600
              </div>
              <div
                className="flex items-center justify-center text-white font-body text-sm font-semibold"
                style={{
                  width: '40%',
                  background: '#1A5C6B',
                }}
              >
                Optional: 400
              </div>
            </div>
          </div>

          {/* Note */}
          <p className="text-center font-body text-sm text-text-on-dark/60 mb-12">
            Viva Voce (personality test) adds up to 300 marks after written exam. Grand total: 1300 marks.
          </p>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Written Exam', value: '1000', subtitle: 'Compulsory + Optional', color: 'text-white' },
              { label: 'Viva Voce', value: '300', subtitle: 'Examiner interview', color: 'text-white' },
              { label: 'Grand Total', value: '1300', subtitle: 'Final Merit', color: 'text-accent-primary' },
            ].map((card, idx) => (
              <div
                key={idx}
                className="p-6 text-center"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '12px',
                }}
              >
                <p className="font-body text-xs uppercase tracking-wide text-text-on-dark/70 mb-2">
                  {card.label}
                </p>
                <p className={`font-display text-5xl font-semibold ${card.color} mb-2`}>
                  {card.value}
                </p>
                <p className="font-body text-sm text-text-on-dark/60">
                  {card.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. SUBJECT DEEP-DIVE NAVIGATOR
          ═══════════════════════════════════════════ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="eyebrow text-accent-primary mb-4">TOPIC EXPLORER</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-text-primary mb-4">
              Go Deep on Any Subject
            </h2>
          </div>

          {/* Two-Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel - Subject List */}
            <div
              className="lg:col-span-4 p-6"
              style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(200,150,46,0.20)',
                borderRadius: '12px',
                maxHeight: '600px',
                overflowY: 'auto',
              }}
            >
              <h3 className="font-body text-xs uppercase tracking-wide text-text-muted mb-4">
                All Subjects
              </h3>
              <div className="space-y-2">
                {allSubjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className={`w-full text-left px-4 py-3 rounded transition-all ${
                      selectedSubject === subject.id
                        ? 'bg-accent-primary/10 border-l-4 border-accent-primary text-accent-primary'
                        : 'text-text-primary hover:text-accent-primary hover:bg-accent-primary/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {subject.type === 'compulsory' ? (
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-current flex-shrink-0" />
                      )}
                      <span className="font-body text-sm font-medium">{subject.name}</span>
                    </div>
                    <span className="text-xs text-text-muted ml-6">
                      {subject.type === 'compulsory' ? 'Compulsory' : `Optional · Group ${(subject as OptionalSubject).group}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Panel - Topic Detail */}
            <div
              className="lg:col-span-8 p-8"
              style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(200,150,46,0.20)',
                borderRadius: '12px',
              }}
            >
              {currentSubject && (
                <>
                  {/* Subject Header */}
                  <div className="mb-6">
                    <h2 className="font-display text-4xl font-semibold text-text-primary mb-3">
                      {currentSubject.name}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-navy text-cream text-xs font-body rounded-full">
                        {currentSubject.type === 'compulsory' ? 'Compulsory' : `Optional · Group ${(currentSubject as OptionalSubject).group}`}
                      </span>
                      <span className="px-3 py-1 bg-accent-primary text-white text-xs font-body rounded-full">
                        {currentSubject.marks} Marks
                      </span>
                    </div>
                  </div>

                  {/* Topics List */}
                  <div className="mb-6">
                    <h3 className="font-body text-sm font-semibold text-text-primary mb-4 uppercase tracking-wide">
                      Topics Covered
                    </h3>
                    <div className="space-y-4">
                      {currentSubject.topics.map((topic, idx) => (
                        <div key={idx} className="flex gap-4">
                          <span className="font-display text-2xl font-semibold text-accent-primary/30">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <div className="flex-1">
                            <h4 className="font-body text-base font-semibold text-text-primary mb-1">
                              {topic.name}
                            </h4>
                            <p className="font-body text-sm text-text-muted mb-2">
                              {topic.scope}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-text-muted">CSS Weight:</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < topic.importance
                                        ? 'fill-accent-gold text-accent-gold'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Examiner's Note */}
                  <div className="mb-6 p-4 bg-accent-primary/10 border-l-4 border-accent-primary rounded">
                    <h4 className="font-body text-sm font-semibold text-text-primary mb-2">
                      What examiners look for in {currentSubject.name}:
                    </h4>
                    <p className="font-body text-sm text-text-primary italic">
                      {currentSubject.examinerNote}
                    </p>
                  </div>

                  {/* Quick Links */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="/past-papers"
                      className="px-4 py-2 border border-accent-primary text-accent-primary text-sm font-body rounded-full hover:bg-accent-primary/10 transition-colors flex items-center gap-2"
                    >
                      Past Papers →
                    </a>
                    <a
                      href="/resources"
                      className="px-4 py-2 border border-accent-primary text-accent-primary text-sm font-body rounded-full hover:bg-accent-primary/10 transition-colors flex items-center gap-2"
                    >
                      Study Notes →
                    </a>
                    <a
                      href="/essay-checker"
                      className="px-4 py-2 border border-accent-primary text-accent-primary text-sm font-body rounded-full hover:bg-accent-primary/10 transition-colors flex items-center gap-2"
                    >
                      Practice Essay →
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. PREPARATION TIPS STRIP
          ═══════════════════════════════════════════ */}
      <section
        className="py-16"
        style={{
          background: 'linear-gradient(135deg, #E8650A 0%, #C8962E 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Start Compulsory First',
                body: 'Master the 6 mandatory papers before choosing optionals.',
              },
              {
                title: "Don't Neglect Islamiat",
                body: 'High-scoring aspirants treat it as an opportunity, not a formality.',
              },
              {
                title: 'Balance Your Optionals',
                body: 'Pick subjects where your interest + scoring potential intersect.',
              },
            ].map((tip, idx) => (
              <div key={idx} className="text-center relative">
                {idx > 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-24 w-px bg-white/20" />
                )}
                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  {tip.title}
                </h3>
                <p className="font-body text-sm text-white/80">
                  {tip.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. RELATED RESOURCES CALLOUT
          ═══════════════════════════════════════════ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FileText className="h-8 w-8" />,
                title: 'Past Papers',
                description: 'Browse papers by subject',
                link: '/past-papers',
              },
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: 'Study Resources',
                description: 'Find books & notes per subject',
                link: '/resources',
              },
              {
                icon: <PenTool className="h-8 w-8" />,
                title: 'Essay Checker',
                description: 'Test your writing with AI feedback',
                link: '/essay-checker',
              },
            ].map((card, idx) => (
              <a
                key={idx}
                href={card.link}
                className="p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-l-4 hover:border-accent-primary group"
                style={{
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(200,150,46,0.20)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 24px rgba(26,18,7,0.08)',
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-primary/10 text-accent-primary mb-4">
                  {card.icon}
                </div>
                <h3 className="font-display text-2xl font-medium text-text-primary mb-2">
                  {card.title}
                </h3>
                <p className="font-body text-sm text-text-muted mb-4">
                  {card.description}
                </p>
                <span className="inline-flex items-center gap-2 text-accent-primary text-sm font-body group-hover:underline">
                  Go to {card.title} <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
