'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen,
  FileText,
  Download,
  Play,
  Star,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

/* ══════════════════════════════════════════════
   TYPES & DATA
   ══════════════════════════════════════════════ */

interface Resource {
  id: string;
  type: 'BOOK' | 'NOTES' | 'SYLLABUS' | 'GUIDE' | 'VIDEO';
  title: string;
  author?: string;
  description: string;
  subject: string;
  format: string;
  size?: string;
  relevance: number;
  link: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  rating: number;
  gradient: string;
}

interface Video {
  id: string;
  title: string;
  channel: string;
  duration: string;
  subject: string;
  thumbnail: string;
}

// Mock Data
const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    type: 'BOOK',
    title: 'Mastering English Essay Writing for CSS',
    author: 'Dr. Ahmad Hassan',
    description: 'Comprehensive guide covering essay structure, argumentation techniques, and 50+ sample essays on diverse topics.',
    subject: 'English Essay',
    format: 'PDF',
    size: '12 MB',
    relevance: 5,
    link: '#'
  },
  {
    id: '2',
    type: 'NOTES',
    title: 'Current Affairs Digest 2024-2025',
    author: 'CSS KRO Editorial Team',
    description: 'Monthly compilation of major national and international events with CSS exam perspective and analysis.',
    subject: 'Current Affairs',
    format: 'PDF',
    size: '8 MB',
    relevance: 5,
    link: '#'
  },
  {
    id: '3',
    type: 'SYLLABUS',
    title: 'Pakistan Affairs Complete Syllabus Breakdown',
    author: 'FPSC Official',
    description: 'Official syllabus with topic-wise breakdown, recommended readings, and exam pattern analysis.',
    subject: 'Pakistan Affairs',
    format: 'PDF',
    size: '2 MB',
    relevance: 5,
    link: '#'
  },
  {
    id: '4',
    type: 'GUIDE',
    title: 'Islamiat Study Guide with Key Concepts',
    author: 'Prof. Muhammad Iqbal',
    description: 'Structured guide covering all Islamiat topics with Quranic references, Hadith, and historical context.',
    subject: 'Islamiat',
    format: 'PDF',
    size: '6 MB',
    relevance: 4,
    link: '#'
  }
];

const MOCK_BOOKS: Book[] = [
  { id: '1', title: 'Pakistan: A Modern History', author: 'Ian Talbot', subject: 'Pakistan Affairs', rating: 5, gradient: 'from-teal-600 to-teal-800' },
  { id: '2', title: 'The Struggle for Pakistan', author: 'Ayesha Jalal', subject: 'Pakistan Affairs', rating: 5, gradient: 'from-blue-600 to-blue-800' },
  { id: '3', title: 'International Relations', author: 'Joshua S. Goldstein', subject: 'International Relations', rating: 4, gradient: 'from-purple-600 to-purple-800' },
  { id: '4', title: 'Political Science', author: 'Andrew Heywood', subject: 'Political Science', rating: 5, gradient: 'from-orange-600 to-orange-800' },
  { id: '5', title: 'Economics Principles', author: 'N. Gregory Mankiw', subject: 'Economics', rating: 4, gradient: 'from-green-600 to-green-800' }
];

const MOCK_VIDEOS: Video[] = [
  { id: '1', title: 'CSS Essay Writing Masterclass', channel: 'CSS Academy', duration: '45:30', subject: 'English Essay', thumbnail: 'from-red-500 to-orange-500' },
  { id: '2', title: 'Pakistan Affairs Complete Course', channel: 'Prep Hub', duration: '2:15:00', subject: 'Pakistan Affairs', thumbnail: 'from-blue-500 to-cyan-500' },
  { id: '3', title: 'Current Affairs Analysis 2025', channel: 'CSS KRO', duration: '1:30:00', subject: 'Current Affairs', thumbnail: 'from-purple-500 to-pink-500' }
];

const CATEGORIES = ['All Resources', 'Books', 'Topic Notes', 'Syllabus', 'Study Plans', 'Videos'];
const SUBJECTS = ['English Essay', 'Current Affairs', 'Pakistan Affairs', 'Islamiat'];

/* ══════════════════════════════════════════════
   RESOURCE TYPE BADGE COMPONENT
   ══════════════════════════════════════════════ */
function ResourceTypeBadge({ type }: { type: string }) {
  const colors = {
    'BOOK': 'bg-teal-700 text-white',
    'NOTES': 'bg-orange-700 text-white',
    'SYLLABUS': 'bg-blue-900 text-white',
    'GUIDE': 'bg-green-700 text-white',
    'VIDEO': 'bg-purple-700 text-white'
  };

  return (
    <span className={`inline-block px-3 py-1 rounded text-xs font-body font-semibold uppercase tracking-wide ${colors[type as keyof typeof colors] || 'bg-gray-700 text-white'}`}>
      {type}
    </span>
  );
}

/* ══════════════════════════════════════════════
   RESOURCE CARD COMPONENT
   ══════════════════════════════════════════════ */
function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="light-card p-6 h-full flex flex-col group relative overflow-hidden">
      {/* Hover border effect */}
      <div className="absolute left-0 top-0 bottom-0 w-0 bg-accent-primary transition-all duration-300 group-hover:w-1" />
      
      <div className="relative">
        {/* Type badge */}
        <div className="mb-4">
          <ResourceTypeBadge type={resource.type} />
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-medium text-text-primary mb-2 line-clamp-2">
          {resource.title}
        </h3>

        {/* Author */}
        {resource.author && (
          <p className="font-body text-sm text-text-muted mb-3">
            by {resource.author}
          </p>
        )}

        {/* Description */}
        <p className="font-body text-sm text-text-muted mb-4 line-clamp-2 flex-grow">
          {resource.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs font-body text-text-muted mb-4 pb-4 border-b border-border-light">
          <span>{resource.format}</span>
          {resource.size && <span>· {resource.size}</span>}
          <span className="flex items-center gap-1">
            {Array.from({ length: resource.relevance }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-accent-primary text-accent-primary" />
            ))}
          </span>
        </div>

        {/* Footer */}
        <Link 
          href={resource.link}
          className="flex items-center gap-2 text-sm font-body font-medium text-accent-primary hover:text-accent-hover transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download Resource</span>
        </Link>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════ */
export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All Resources');

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
        className="relative py-20"
        style={{ 
          background: '#0B1E3D',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.10'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <p className="eyebrow text-accent-gold mb-6">
            STUDY MATERIAL
          </p>

          {/* Heading */}
          <h1 className="font-display text-5xl lg:text-6xl font-semibold text-white mb-4">
            Everything You Need to Prepare
          </h1>

          {/* Subtitle */}
          <p className="font-body text-base text-text-on-dark/70 max-w-2xl mx-auto">
            Recommended books, topic notes, syllabus guides, and curated study paths — all in one place.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. RESOURCE CATEGORY TABS (Sticky)
          ═══════════════════════════════════════════ */}
      <div 
        className="sticky top-16 z-40 border-b"
        style={{ 
          background: '#F5F0E8',
          borderColor: 'var(--border-light)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide py-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative pb-2 font-body text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'text-text-primary font-semibold'
                    : 'text-text-muted hover:text-accent-primary'
                }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* ═══════════════════════════════════════════
            3. HERO RESOURCE - "START HERE" GUIDE
            ═══════════════════════════════════════════ */}
        <div className="mb-16">
          <div className="light-card p-10">
            {/* Tag */}
            <div className="mb-6">
              <span className="px-3 py-1 bg-accent-primary text-white text-xs font-body font-semibold uppercase tracking-wide rounded-full">
                Recommended Start
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left: Content */}
              <div className="space-y-6">
                <h2 className="font-display text-3xl lg:text-4xl font-medium text-text-primary">
                  The Complete CSS Preparation Roadmap
                </h2>

                <p className="font-body text-base text-text-muted">
                  Not sure where to begin? This structured guide walks you through the full CSS syllabus, 
                  recommended reading order, and monthly study plan from zero to exam-ready.
                </p>

                {/* Features list */}
                <div className="space-y-3">
                  {[
                    'Full syllabus breakdown',
                    'Month-by-month study plan',
                    'Book recommendations per subject',
                    'Revision strategy'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-primary flex-shrink-0" />
                      <span className="font-body text-sm text-text-primary">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <button className="btn-primary">
                    Download Free Guide
                  </button>
                  <div className="flex items-center gap-2 text-sm font-body text-text-muted">
                    <FileText className="w-4 h-4" />
                    <span>PDF · 24 pages · Updated 2025</span>
                  </div>
                </div>
              </div>

              {/* Right: Visual */}
              <div className="relative">
                <div 
                  className="h-80 rounded-lg flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #E8650A 0%, #C8962E 100%)'
                  }}
                >
                  <div className="text-center p-8">
                    <p className="font-display text-5xl font-semibold text-white/90 italic mb-4">
                      CSS Prep<br />Roadmap<br />2025
                    </p>
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-body font-semibold uppercase tracking-wide rounded-full">
                        Free Download
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            4. SUBJECT RESOURCE SECTIONS
            ═══════════════════════════════════════════ */}
        {SUBJECTS.map((subject, index) => (
          <div 
            key={subject}
            className="mb-16 py-12"
            style={{ 
              background: index % 2 === 0 ? '#F5F0E8' : '#EDE6D6',
              marginLeft: '-1.5rem',
              marginRight: '-1.5rem',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem'
            }}
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-accent-primary" />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-medium text-text-primary">
                    {subject}
                  </h3>
                  <p className="font-body text-sm text-text-muted">
                    {MOCK_RESOURCES.filter(r => r.subject === subject).length} resources available
                  </p>
                </div>
              </div>
              <Link 
                href={`/resources/${subject.toLowerCase().replace(' ', '-')}`}
                className="flex items-center gap-2 text-sm font-body font-medium text-accent-primary hover:text-accent-hover transition-colors"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Resource Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_RESOURCES
                .filter(r => r.subject === subject)
                .slice(0, 3)
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════
          5. BOOKS SPOTLIGHT
          ═══════════════════════════════════════════ */}
      <section 
        className="py-20"
        style={{ background: '#0B1E3D' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="eyebrow text-accent-gold mb-4">
              ESSENTIAL READING
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium text-white mb-4">
              The CSS Scholar&apos;s Bookshelf
            </h2>
            <p className="font-body text-base text-text-on-dark/70 max-w-2xl mx-auto">
              Personally vetted books for each CSS subject — ranked by exam relevance.
            </p>
          </div>

          {/* Book Shelf - Horizontal Scroll */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4 min-w-max">
              {MOCK_BOOKS.map((book) => (
                <div key={book.id} className="glass-card p-6 w-64 flex-shrink-0">
                  {/* Book Spine Visual */}
                  <div 
                    className={`h-48 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${book.gradient}`}
                  >
                    <p className="font-display text-lg font-semibold text-white text-center px-4">
                      {book.title}
                    </p>
                  </div>

                  {/* Book Info */}
                  <h4 className="font-display text-lg font-medium text-white mb-2 line-clamp-2">
                    {book.title}
                  </h4>
                  <p className="font-body text-sm text-text-on-dark/70 mb-3">
                    {book.author}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 border border-accent-gold/30 text-accent-gold text-xs font-body rounded">
                      {book.subject}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: book.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent-primary text-accent-primary" />
                    ))}
                  </div>
                  <Link 
                    href="#"
                    className="text-sm font-body font-medium text-accent-gold hover:text-accent-primary transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. SYLLABUS SECTION
          ═══════════════════════════════════════════ */}
      <section 
        className="py-20"
        style={{ background: '#F5F0E8' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="eyebrow text-accent-primary mb-4">
              OFFICIAL SYLLABUS
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium text-text-primary">
              Know What&apos;s Being Tested
            </h2>
          </div>

          {/* Syllabus Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                subject: 'English Essay & Précis',
                topics: [
                  'Essay writing on contemporary issues',
                  'Précis writing and comprehension',
                  'Grammar and vocabulary'
                ]
              },
              {
                subject: 'Current Affairs',
                topics: [
                  'National and international events',
                  'Political developments',
                  'Economic and social issues'
                ]
              },
              {
                subject: 'Pakistan Affairs',
                topics: [
                  'History of Pakistan Movement',
                  'Constitutional development',
                  'Foreign policy and relations'
                ]
              },
              {
                subject: 'Islamiat',
                topics: [
                  'Basic Islamic teachings',
                  'Islamic history and civilization',
                  'Contemporary Islamic issues'
                ]
              }
            ].map((syllabus, i) => (
              <div key={i} className="light-card p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-accent-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-medium text-text-primary mb-4">
                      {syllabus.subject}
                    </h3>
                    <ul className="space-y-2">
                      {syllabus.topics.map((topic, j) => (
                        <li key={j} className="flex items-start gap-2 font-body text-sm text-text-muted">
                          <span className="text-accent-primary mt-1">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-border-light">
                  <button className="btn-ghost text-sm py-2 px-4">
                    View Full Syllabus
                  </button>
                  <Link 
                    href="#"
                    className="text-sm font-body font-medium text-accent-primary hover:text-accent-hover transition-colors"
                  >
                    Download PDF
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. STUDY PLAN SECTION
          ═══════════════════════════════════════════ */}
      <section 
        className="py-20"
        style={{ background: '#EDE6D6' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="eyebrow text-accent-primary mb-4">
              STRUCTURED PREP
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium text-text-primary">
              Study Plans Built for CSS
            </h2>
          </div>

          {/* Study Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Quick Revision',
                duration: '30',
                unit: 'Days',
                for: 'Students retaking the exam',
                color: 'bg-teal-600',
                includes: [
                  'Daily revision schedule',
                  'Key topics summary',
                  'Practice questions',
                  'Mock test series'
                ]
              },
              {
                name: 'Standard Prep',
                duration: '6',
                unit: 'Months',
                for: 'First-time aspirants',
                color: 'bg-accent-primary',
                includes: [
                  'Week-by-week breakdown',
                  'Subject-wise coverage',
                  'Reading recommendations',
                  'Monthly assessments'
                ]
              },
              {
                name: 'Intensive',
                duration: '1',
                unit: 'Year',
                for: 'Starting from scratch',
                color: 'bg-accent-gold',
                includes: [
                  'Comprehensive coverage',
                  'Foundation building',
                  'Advanced preparation',
                  'Multiple revision cycles'
                ]
              }
            ].map((plan, i) => (
              <div key={i} className="light-card overflow-hidden">
                {/* Top accent strip */}
                <div className={`h-2 ${plan.color}`} />
                
                <div className="p-8">
                  {/* Icon */}
                  <div className="mb-6">
                    <Calendar className={`w-8 h-8 ${plan.color.replace('bg-', 'text-')}`} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-medium text-text-primary mb-2">
                    {plan.name}
                  </h3>

                  {/* Duration */}
                  <div className="mb-4">
                    <span className={`font-display text-5xl font-semibold ${plan.color.replace('bg-', 'text-')}`}>
                      {plan.duration}
                    </span>
                    <span className="font-body text-sm text-text-muted ml-2">
                      {plan.unit}
                    </span>
                  </div>

                  {/* For */}
                  <p className="font-body text-sm text-text-muted mb-6">
                    {plan.for}
                  </p>

                  {/* Includes */}
                  <div className="space-y-2 mb-6">
                    {plan.includes.map((item, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent-primary flex-shrink-0 mt-0.5" />
                        <span className="font-body text-sm text-text-primary">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="btn-ghost w-full text-sm py-2">
                    Download Plan PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. VIDEO RESOURCES ROW
          ═══════════════════════════════════════════ */}
      <section 
        className="py-20"
        style={{ background: '#F5F0E8' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="eyebrow text-accent-primary mb-4">
              VIDEO GUIDES
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium text-text-primary">
              Watch & Learn
            </h2>
          </div>

          {/* Video Cards - Horizontal Scroll */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4">
              {MOCK_VIDEOS.map((video) => (
                <div key={video.id} className="light-card p-0 w-80 flex-shrink-0 overflow-hidden">
                  {/* Thumbnail */}
                  <div 
                    className={`relative h-48 bg-gradient-to-br ${video.thumbnail} flex items-center justify-center`}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-accent-primary ml-1" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h4 className="font-display text-xl font-medium text-text-primary mb-2 line-clamp-2">
                      {video.title}
                    </h4>
                    <p className="font-body text-sm text-text-muted mb-3">
                      {video.channel}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent-primary" />
                        <span className="font-body text-sm text-accent-primary">
                          {video.duration}
                        </span>
                      </div>
                      <span className="px-2 py-1 bg-black/5 text-text-muted text-xs font-body rounded">
                        {video.subject}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. CONTRIBUTE CALLOUT
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
                COMMUNITY
              </p>
              <h3 className="font-display text-3xl lg:text-4xl font-medium text-white mb-4">
                Have a Resource to Share?
              </h3>
              <p className="font-body text-base text-text-on-dark/70">
                Help fellow CSS aspirants by contributing notes, summaries, or guides. 
                All contributors are credited.
              </p>
            </div>

            {/* Right: CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <button className="btn-ghost text-white border-white hover:bg-white/10">
                Submit a Resource
              </button>
              <Link 
                href="#"
                className="flex items-center justify-center gap-2 text-accent-gold hover:text-accent-primary transition-colors font-body text-sm font-medium"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
