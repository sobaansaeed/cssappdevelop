'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  Download,
  Eye,
  X,
  FileText,
  Calendar,
  BookOpen,
  ArrowRight
} from 'lucide-react';

/* ══════════════════════════════════════════════
   TYPES & DATA
   ══════════════════════════════════════════════ */

interface Paper {
  id: string;
  subject: string;
  category: 'Language' | 'Affairs' | 'Science' | 'Social';
  year: number;
  paperNumber: string;
  format: string;
  size: string;
  marks: number;
  link: string;
}

const SUBJECTS = [
  'All',
  'English Essay',
  'English Précis',
  'Current Affairs',
  'Pakistan Affairs',
  'Islamiat',
  'General Science',
  'Political Science',
  'History of Pakistan',
  'Geography',
  'Economics',
  'Sociology',
  'Psychology',
  'International Relations'
];

// Mock Data - 20+ papers across multiple subjects and years
const MOCK_PAPERS: Paper[] = [
  // 2024
  { id: '1', subject: 'English Essay', category: 'Language', year: 2024, paperNumber: 'Paper I', format: 'PDF', size: '2.3 MB', marks: 100, link: '#' },
  { id: '2', subject: 'English Précis', category: 'Language', year: 2024, paperNumber: 'Paper II', format: 'PDF', size: '1.8 MB', marks: 100, link: '#' },
  { id: '3', subject: 'Current Affairs', category: 'Affairs', year: 2024, paperNumber: 'Paper I', format: 'PDF', size: '2.5 MB', marks: 100, link: '#' },
  { id: '4', subject: 'Pakistan Affairs', category: 'Affairs', year: 2024, paperNumber: 'Paper I', format: 'PDF', size: '2.1 MB', marks: 100, link: '#' },
  { id: '5', subject: 'Islamiat', category: 'Social', year: 2024, paperNumber: 'Paper I', format: 'PDF', size: '1.9 MB', marks: 100, link: '#' },
  { id: '6', subject: 'General Science', category: 'Science', year: 2024, paperNumber: 'Paper I', format: 'PDF', size: '2.4 MB', marks: 100, link: '#' },
  
  // 2023
  { id: '7', subject: 'English Essay', category: 'Language', year: 2023, paperNumber: 'Paper I', format: 'PDF', size: '2.2 MB', marks: 100, link: '#' },
  { id: '8', subject: 'English Précis', category: 'Language', year: 2023, paperNumber: 'Paper II', format: 'PDF', size: '1.7 MB', marks: 100, link: '#' },
  { id: '9', subject: 'Current Affairs', category: 'Affairs', year: 2023, paperNumber: 'Paper I', format: 'PDF', size: '2.6 MB', marks: 100, link: '#' },
  { id: '10', subject: 'Pakistan Affairs', category: 'Affairs', year: 2023, paperNumber: 'Paper I', format: 'PDF', size: '2.0 MB', marks: 100, link: '#' },
  { id: '11', subject: 'Political Science', category: 'Social', year: 2023, paperNumber: 'Paper I', format: 'PDF', size: '2.3 MB', marks: 100, link: '#' },
  { id: '12', subject: 'Economics', category: 'Social', year: 2023, paperNumber: 'Paper I', format: 'PDF', size: '2.1 MB', marks: 100, link: '#' },
  
  // 2022
  { id: '13', subject: 'English Essay', category: 'Language', year: 2022, paperNumber: 'Paper I', format: 'PDF', size: '2.4 MB', marks: 100, link: '#' },
  { id: '14', subject: 'Current Affairs', category: 'Affairs', year: 2022, paperNumber: 'Paper I', format: 'PDF', size: '2.7 MB', marks: 100, link: '#' },
  { id: '15', subject: 'Pakistan Affairs', category: 'Affairs', year: 2022, paperNumber: 'Paper I', format: 'PDF', size: '2.2 MB', marks: 100, link: '#' },
  { id: '16', subject: 'Islamiat', category: 'Social', year: 2022, paperNumber: 'Paper I', format: 'PDF', size: '2.0 MB', marks: 100, link: '#' },
  { id: '17', subject: 'History of Pakistan', category: 'Social', year: 2022, paperNumber: 'Paper I', format: 'PDF', size: '2.5 MB', marks: 100, link: '#' },
  
  // 2021
  { id: '18', subject: 'English Essay', category: 'Language', year: 2021, paperNumber: 'Paper I', format: 'PDF', size: '2.1 MB', marks: 100, link: '#' },
  { id: '19', subject: 'Current Affairs', category: 'Affairs', year: 2021, paperNumber: 'Paper I', format: 'PDF', size: '2.4 MB', marks: 100, link: '#' },
  { id: '20', subject: 'General Science', category: 'Science', year: 2021, paperNumber: 'Paper I', format: 'PDF', size: '2.3 MB', marks: 100, link: '#' },
  { id: '21', subject: 'International Relations', category: 'Social', year: 2021, paperNumber: 'Paper I', format: 'PDF', size: '2.6 MB', marks: 100, link: '#' },
  
  // 2020
  { id: '22', subject: 'English Essay', category: 'Language', year: 2020, paperNumber: 'Paper I', format: 'PDF', size: '2.0 MB', marks: 100, link: '#' },
  { id: '23', subject: 'Pakistan Affairs', category: 'Affairs', year: 2020, paperNumber: 'Paper I', format: 'PDF', size: '2.3 MB', marks: 100, link: '#' },
  { id: '24', subject: 'Sociology', category: 'Social', year: 2020, paperNumber: 'Paper I', format: 'PDF', size: '2.2 MB', marks: 100, link: '#' }
];

const POPULAR_SUBJECTS = [
  { name: 'English Essay', count: 5, years: '2020-2024', icon: BookOpen },
  { name: 'English Précis', count: 3, years: '2022-2024', icon: FileText },
  { name: 'Current Affairs', count: 5, years: '2020-2024', icon: Calendar },
  { name: 'Pakistan Affairs', count: 5, years: '2020-2024', icon: BookOpen },
  { name: 'Islamiat', count: 3, years: '2020-2024', icon: BookOpen },
  { name: 'General Science', count: 3, years: '2020-2024', icon: BookOpen }
];

/* ══════════════════════════════════════════════
   SUBJECT BADGE COMPONENT
   ══════════════════════════════════════════════ */
function SubjectBadge({ category }: { category: string }) {
  const colors = {
    'Language': 'bg-green-700 text-white',
    'Affairs': 'bg-orange-700 text-white',
    'Science': 'bg-blue-700 text-white',
    'Social': 'bg-purple-700 text-white'
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-body font-semibold uppercase tracking-wide ${colors[category as keyof typeof colors] || 'bg-gray-700 text-white'}`}>
      {category}
    </span>
  );
}

/* ══════════════════════════════════════════════
   PAPER CARD COMPONENT
   ══════════════════════════════════════════════ */
function PaperCard({ paper, onPreview }: { paper: Paper; onPreview: (paper: Paper) => void }) {
  return (
    <div className="light-card p-6 h-full flex flex-col group relative overflow-hidden">
      {/* Hover border effect */}
      <div className="absolute left-0 top-0 bottom-0 w-0 bg-accent-primary transition-all duration-300 group-hover:w-1" />
      
      <div className="relative">
        {/* Subject badge */}
        <div className="mb-4">
          <SubjectBadge category={paper.category} />
        </div>

        {/* Subject name */}
        <h3 className="font-display text-xl font-medium text-text-primary mb-2 line-clamp-2">
          {paper.subject}
        </h3>

        {/* Meta */}
        <p className="font-body text-sm text-text-muted mb-4">
          CSS {paper.year} · {paper.paperNumber}
        </p>

        {/* Details */}
        <div className="flex items-center gap-3 text-xs font-body text-text-muted mb-6 pb-4 border-b border-border-light">
          <span className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" />
            {paper.format}
          </span>
          <span>·</span>
          <span>{paper.size}</span>
          <span>·</span>
          <span>Marks: {paper.marks}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a 
            href={paper.link}
            className="flex-1 btn-primary text-center text-sm py-2 flex items-center justify-center gap-2"
            download
          >
            <Download className="w-4 h-4" />
            Download
          </a>
          <button
            onClick={() => onPreview(paper)}
            className="px-4 py-2 border border-accent-primary text-accent-primary rounded-full text-sm font-body font-medium hover:bg-accent-primary/10 transition-colors flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════ */
export default function PastPapersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [yearFrom, setYearFrom] = useState(2000);
  const [yearTo, setYearTo] = useState(2024);
  const [viewMode, setViewMode] = useState<'year' | 'subject'>('year');
  const [previewPaper, setPreviewPaper] = useState<Paper | null>(null);

  // Filter papers
  const filteredPapers = MOCK_PAPERS.filter(paper => {
    const matchesSearch = searchQuery === '' || 
      paper.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || paper.subject === selectedSubject;
    const matchesYear = paper.year >= yearFrom && paper.year <= yearTo;
    
    return matchesSearch && matchesSubject && matchesYear;
  });

  // Group papers
  const groupedPapers = viewMode === 'year'
    ? filteredPapers.reduce((acc, paper) => {
        if (!acc[paper.year]) acc[paper.year] = [];
        acc[paper.year].push(paper);
        return acc;
      }, {} as Record<number, Paper[]>)
    : filteredPapers.reduce((acc, paper) => {
        if (!acc[paper.subject]) acc[paper.subject] = [];
        acc[paper.subject].push(paper);
        return acc;
      }, {} as Record<string, Paper[]>);

  const sortedGroups = Object.keys(groupedPapers).sort((a, b) => 
    viewMode === 'year' ? Number(b) - Number(a) : a.localeCompare(b)
  );

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSubject('All');
    setYearFrom(2000);
    setYearTo(2024);
  };

  const hasActiveFilters = searchQuery !== '' || selectedSubject !== 'All' || yearFrom !== 2000 || yearTo !== 2024;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
      style={{ background: '#F5F0E8' }}
    >
      {/* ═══════════════════════════════════════════
          1. PAGE HERO (Compact)
          ═══════════════════════════════════════════ */}
      <section 
        className="relative py-16"
        style={{ 
          background: '#0B1E3D',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.10'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <p className="eyebrow text-accent-gold mb-6">
            CSS EXAM ARCHIVE
          </p>

          {/* Heading */}
          <h1 className="font-display text-5xl lg:text-6xl font-semibold text-white mb-4">
            Every Paper. Every Year.
          </h1>

          {/* Subtitle */}
          <p className="font-body text-base text-text-on-dark/70 max-w-2xl mx-auto mb-8">
            25+ years of CSS past papers — organized, searchable, free to download.
          </p>

          {/* Stat pills */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {[
              { label: '25+ Years', value: '25+' },
              { label: '120+ Papers', value: '120+' },
              { label: '15 Subjects', value: '15' }
            ].map((stat, i) => (
              <div 
                key={i}
                className="glass-card px-6 py-3 border border-accent-gold/30"
              >
                <span className="font-body text-sm text-text-on-dark/90">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. SEARCH & FILTER PANEL (Sticky)
          ═══════════════════════════════════════════ */}
      <div className="sticky top-16 z-40" style={{ background: '#F5F0E8' }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border border-border-card shadow-md">
            {/* Row 1: Main filters */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
              {/* Search input */}
              <div className="md:col-span-6 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search papers, subjects, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-border-card rounded-lg font-body text-sm focus:outline-none focus:border-accent-primary transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Year range */}
              <div className="md:col-span-2">
                <select
                  value={yearFrom}
                  onChange={(e) => setYearFrom(Number(e.target.value))}
                  className="w-full py-3 px-4 border border-border-card rounded-lg font-body text-sm focus:outline-none focus:border-accent-primary transition-colors"
                >
                  {Array.from({ length: 25 }, (_, i) => 2000 + i).map(year => (
                    <option key={year} value={year}>From: {year}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <select
                  value={yearTo}
                  onChange={(e) => setYearTo(Number(e.target.value))}
                  className="w-full py-3 px-4 border border-border-card rounded-lg font-body text-sm focus:outline-none focus:border-accent-primary transition-colors"
                >
                  {Array.from({ length: 25 }, (_, i) => 2000 + i).map(year => (
                    <option key={year} value={year}>To: {year}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="md:col-span-2">
                <select className="w-full py-3 px-4 border border-border-card rounded-lg font-body text-sm focus:outline-none focus:border-accent-primary transition-colors">
                  <option>Newest First</option>
                  <option>Oldest First</option>
                  <option>Subject A-Z</option>
                </select>
              </div>
            </div>

            {/* Row 2: Subject pills */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 min-w-max">
                {SUBJECTS.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all whitespace-nowrap ${
                      selectedSubject === subject
                        ? 'bg-accent-primary text-white'
                        : 'border border-border-light text-text-primary hover:bg-accent-primary/10'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          3. RESULTS SUMMARY BAR
          ═══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm font-body text-text-muted">
            <span>Showing {filteredPapers.length} papers</span>
            {hasActiveFilters && (
              <>
                <span>·</span>
                <span>Filtered by: {selectedSubject} · {yearFrom}–{yearTo}</span>
              </>
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm font-body font-medium text-accent-primary hover:text-accent-hover transition-colors"
            >
              Clear Filters <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* ═══════════════════════════════════════════
            4. VIEW TOGGLE
            ═══════════════════════════════════════════ */}
        <div className="flex items-center justify-end mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('year')}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${
                viewMode === 'year'
                  ? 'bg-accent-primary text-white'
                  : 'border border-border-light text-text-primary hover:bg-accent-primary/10'
              }`}
            >
              By Year
            </button>
            <button
              onClick={() => setViewMode('subject')}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${
                viewMode === 'subject'
                  ? 'bg-accent-primary text-white'
                  : 'border border-border-light text-text-primary hover:bg-accent-primary/10'
              }`}
            >
              By Subject
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            5. PAPERS GRID
            ═══════════════════════════════════════════ */}
        {filteredPapers.length > 0 ? (
          <div className="space-y-12">
            {sortedGroups.map((group) => (
              <div key={group}>
                {/* Group Header */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-4 mb-2">
                    <h2 className="font-display text-4xl font-semibold text-text-primary">
                      {group}
                    </h2>
                    <div className="flex-1 h-px bg-accent-gold/30" />
                  </div>
                  <p className="font-body text-sm text-text-muted">
                    {groupedPapers[group].length} papers available
                  </p>
                </div>

                {/* Papers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {groupedPapers[group].map((paper) => (
                    <PaperCard 
                      key={paper.id} 
                      paper={paper} 
                      onPreview={setPreviewPaper}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-text-muted/40 mx-auto mb-4" />
            <h3 className="font-display text-2xl font-medium text-text-primary mb-2">
              No papers found
            </h3>
            <p className="font-body text-base text-text-muted mb-6">
              No papers match your current filters. Try adjusting your selection.
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary inline-block"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          6. SUBJECT SPOTLIGHT SECTION
          ═══════════════════════════════════════════ */}
      <section 
        className="py-20 mt-16"
        style={{ background: '#EDE6D6' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="eyebrow text-accent-primary mb-4">
              POPULAR SUBJECTS
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium text-text-primary">
              Dive Deep Into Any Subject
            </h2>
          </div>

          {/* Subject Tiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_SUBJECTS.map((subject, i) => (
              <div 
                key={i}
                className="light-card p-8 group relative overflow-hidden cursor-pointer"
              >
                {/* Hover border effect */}
                <div className="absolute left-0 top-0 bottom-0 w-0 bg-accent-primary transition-all duration-300 group-hover:w-1" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-4">
                    <subject.icon className="w-8 h-8 text-accent-primary" />
                  </div>

                  {/* Name */}
                  <h3 className="font-display text-2xl font-medium text-text-primary mb-2">
                    {subject.name}
                  </h3>

                  {/* Count & Years */}
                  <p className="font-body text-sm text-text-muted mb-1">
                    {subject.count} papers
                  </p>
                  <p className="font-body text-xs text-text-muted mb-4">
                    {subject.years}
                  </p>

                  {/* Arrow */}
                  <div className="flex justify-end">
                    <ArrowRight className="w-5 h-5 text-accent-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. DOWNLOAD INSTRUCTIONS CALLOUT
          ═══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div 
          className="p-8 rounded-lg border-l-4"
          style={{ 
            background: 'rgba(232, 101, 10, 0.05)',
            borderColor: '#E8650A'
          }}
        >
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
              <Download className="w-6 h-6 text-accent-primary" />
            </div>
            <div>
              <h4 className="font-display text-2xl font-medium text-text-primary mb-3">
                How to Download
              </h4>
              <p className="font-body text-base text-text-muted">
                Click the Download button on any paper. PDFs open in a new tab. 
                No login required. All papers are free.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          8. ESSAY CHECKER CTA STRIP
          ═══════════════════════════════════════════ */}
      <section 
        className="py-16"
        style={{ background: '#0B1E3D' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Text */}
            <div>
              <p className="eyebrow text-accent-gold mb-4">
                NEXT STEP
              </p>
              <h3 className="font-display text-3xl lg:text-4xl font-medium text-white mb-4">
                Practiced Enough? Test Your Writing.
              </h3>
              <p className="font-body text-base text-text-on-dark/70">
                Submit an essay on any past paper topic and get instant AI-powered feedback.
              </p>
            </div>

            {/* Right: CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Link href="/essay-checker" className="btn-primary inline-block text-center">
                Try Essay Checker <ArrowRight className="inline w-4 h-4 ml-1" />
              </Link>
              <Link href="/resources" className="btn-ghost text-white border-white hover:bg-white/10 inline-block text-center">
                Browse Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. PREVIEW MODAL
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {previewPaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(11, 30, 61, 0.85)', backdropFilter: 'blur(8px)' }}
            onClick={() => setPreviewPaper(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border-light">
                <div>
                  <h3 className="font-display text-2xl font-medium text-text-primary">
                    {previewPaper.subject}
                  </h3>
                  <p className="font-body text-sm text-text-muted">
                    CSS {previewPaper.year} · {previewPaper.paperNumber}
                  </p>
                </div>
                <button
                  onClick={() => setPreviewPaper(null)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-text-primary" />
                </button>
              </div>

              {/* Preview Area */}
              <div className="p-6">
                <div 
                  className="w-full bg-gray-100 rounded-lg flex items-center justify-center"
                  style={{ height: '60vh' }}
                >
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-text-muted/40 mx-auto mb-4" />
                    <p className="font-body text-base text-text-muted">
                      PDF Preview
                    </p>
                    <p className="font-body text-sm text-text-muted/70 mt-2">
                      {previewPaper.subject} - CSS {previewPaper.year}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-border-light">
                <a
                  href={previewPaper.link}
                  className="btn-primary w-full text-center flex items-center justify-center gap-2"
                  download
                >
                  <Download className="w-5 h-5" />
                  Download Full Paper
                </a>
                <p className="text-center font-body text-sm text-text-muted mt-3">
                  Free to download. No account needed.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
