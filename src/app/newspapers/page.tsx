'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter,
  Calendar,
  Clock,
  ArrowRight,
  Lightbulb,
  Star,
  BookOpen
} from 'lucide-react';

/* ══════════════════════════════════════════════
   TYPES & DATA
   ══════════════════════════════════════════════ */

interface Article {
  id: string;
  newspaper: 'Dawn' | 'The News' | 'Express Tribune';
  headline: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: number;
  cssRelevance: 'high' | 'medium' | 'low';
  isFeatured?: boolean;
}

// Realistic placeholder data
const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    newspaper: 'Dawn',
    headline: 'Economic Reforms: Navigating Pakistan\'s Fiscal Challenges',
    excerpt: 'As Pakistan grapples with mounting economic pressures, experts weigh in on the structural reforms needed to stabilize the economy and restore investor confidence in the coming fiscal year.',
    date: '2025-06-02',
    tags: ['Economy', 'Governance'],
    readTime: 6,
    cssRelevance: 'high',
    isFeatured: true
  },
  {
    id: '2',
    newspaper: 'The News',
    headline: 'Foreign Policy Realignment: Balancing Regional Powers',
    excerpt: 'Pakistan\'s diplomatic strategy faces new challenges as it seeks to maintain balanced relations with major powers while addressing regional security concerns.',
    date: '2025-06-02',
    tags: ['Foreign Policy', 'International'],
    readTime: 5,
    cssRelevance: 'high'
  },
  {
    id: '3',
    newspaper: 'Express Tribune',
    headline: 'Education System Overhaul: A Long-Awaited Reform',
    excerpt: 'The government announces comprehensive education reforms aimed at improving literacy rates and aligning curriculum with modern job market demands.',
    date: '2025-06-02',
    tags: ['Society', 'Governance'],
    readTime: 4,
    cssRelevance: 'medium'
  },
  {
    id: '4',
    newspaper: 'Dawn',
    headline: 'Climate Change Impact on Agricultural Productivity',
    excerpt: 'New research highlights the devastating effects of climate change on Pakistan\'s agricultural sector, calling for immediate policy interventions.',
    date: '2025-06-02',
    tags: ['Environment', 'Economy'],
    readTime: 5,
    cssRelevance: 'high'
  },
  {
    id: '5',
    newspaper: 'The News',
    headline: 'Digital Transformation in Public Services',
    excerpt: 'Government initiatives to digitize public services show promising results, but challenges in implementation and accessibility remain.',
    date: '2025-06-02',
    tags: ['Science & Tech', 'Governance'],
    readTime: 4,
    cssRelevance: 'medium'
  },
  {
    id: '6',
    newspaper: 'Express Tribune',
    headline: 'Security Challenges in Border Regions',
    excerpt: 'Analysis of ongoing security operations and their implications for regional stability and cross-border relations.',
    date: '2025-06-02',
    tags: ['Security', 'Pakistan Affairs'],
    readTime: 6,
    cssRelevance: 'high'
  },
  {
    id: '7',
    newspaper: 'Dawn',
    headline: 'Healthcare Infrastructure: Bridging the Urban-Rural Divide',
    excerpt: 'Examining the disparities in healthcare access between urban and rural areas and proposed solutions to ensure equitable medical services.',
    date: '2025-06-02',
    tags: ['Society', 'Governance'],
    readTime: 5,
    cssRelevance: 'medium'
  },
  {
    id: '8',
    newspaper: 'The News',
    headline: 'Energy Crisis: Renewable Solutions on the Horizon',
    excerpt: 'Pakistan explores renewable energy alternatives to address chronic power shortages and reduce dependence on imported fuel.',
    date: '2025-06-02',
    tags: ['Economy', 'Environment'],
    readTime: 4,
    cssRelevance: 'high'
  },
  {
    id: '9',
    newspaper: 'Express Tribune',
    headline: 'Judicial Reforms and Access to Justice',
    excerpt: 'Proposed reforms aim to expedite court proceedings and improve access to justice for marginalized communities.',
    date: '2025-06-02',
    tags: ['Governance', 'Society'],
    readTime: 5,
    cssRelevance: 'medium'
  },
  {
    id: '10',
    newspaper: 'Dawn',
    headline: 'Trade Relations: Expanding Export Markets',
    excerpt: 'Pakistan seeks to diversify its export portfolio and strengthen trade ties with emerging markets in Asia and Africa.',
    date: '2025-06-02',
    tags: ['Economy', 'International'],
    readTime: 4,
    cssRelevance: 'medium'
  },
  {
    id: '11',
    newspaper: 'The News',
    headline: 'Water Scarcity: A Looming National Crisis',
    excerpt: 'Experts warn of severe water shortages in the coming decades, urging immediate action on water conservation and management.',
    date: '2025-06-02',
    tags: ['Environment', 'Pakistan Affairs'],
    readTime: 6,
    cssRelevance: 'high'
  },
  {
    id: '12',
    newspaper: 'Express Tribune',
    headline: 'Women\'s Empowerment in the Workforce',
    excerpt: 'Progress and challenges in increasing female labor force participation and ensuring workplace equality.',
    date: '2025-06-02',
    tags: ['Society', 'Economy'],
    readTime: 5,
    cssRelevance: 'medium'
  }
];

const SUBJECT_TAGS = [
  'All Topics',
  'Economy',
  'Foreign Policy',
  'Governance',
  'Science & Tech',
  'Environment',
  'Society',
  'Security',
  'Pakistan Affairs',
  'International'
];

const NEWSPAPERS = ['All', 'Dawn', 'The News', 'Express Tribune'];

/* ══════════════════════════════════════════════
   NEWSPAPER BADGE COMPONENT
   ══════════════════════════════════════════════ */
function NewspaperBadge({ newspaper }: { newspaper: string }) {
  const colors = {
    'Dawn': 'bg-teal-700 text-white',
    'The News': 'bg-red-900 text-white',
    'Express Tribune': 'bg-blue-800 text-white'
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-body font-semibold uppercase tracking-wide ${colors[newspaper as keyof typeof colors] || 'bg-gray-700 text-white'}`}>
      {newspaper}
    </span>
  );
}

/* ══════════════════════════════════════════════
   ARTICLE CARD COMPONENT
   ══════════════════════════════════════════════ */
function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="light-card p-6 h-full flex flex-col">
      {/* Top bar with newspaper badge */}
      <div className="flex items-center justify-between mb-4">
        <NewspaperBadge newspaper={article.newspaper} />
        {article.cssRelevance === 'high' && (
          <Star className="w-4 h-4 text-accent-primary fill-accent-primary" />
        )}
      </div>

      {/* Headline */}
      <h3 className="font-display text-xl font-medium text-text-primary mb-3 line-clamp-2">
        {article.headline}
      </h3>

      {/* Excerpt */}
      <p className="font-body text-sm text-text-muted mb-4 line-clamp-3 flex-grow">
        {article.excerpt}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {article.tags.slice(0, 3).map((tag, i) => (
          <span 
            key={i}
            className="px-2 py-1 text-xs font-body rounded border border-border-light text-text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border-light">
        <div className="flex items-center gap-2 text-xs font-body text-text-muted">
          <Clock className="w-3.5 h-3.5" />
          <span>{article.readTime} min read</span>
        </div>
        <Link 
          href={`/newspapers/${article.id}`}
          className="flex items-center gap-1 text-sm font-body font-medium text-accent-primary hover:text-accent-hover transition-colors"
        >
          Read <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════ */
export default function NewspapersPage() {
  const [selectedNewspaper, setSelectedNewspaper] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>(['All Topics']);
  const [showCSSOnly, setShowCSSOnly] = useState(false);
  const [visibleArticles, setVisibleArticles] = useState(9);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Filter articles
  const filteredArticles = MOCK_ARTICLES.filter(article => {
    // Newspaper filter
    if (selectedNewspaper !== 'All' && article.newspaper !== selectedNewspaper) {
      return false;
    }

    // Tag filter
    if (!selectedTags.includes('All Topics')) {
      const hasMatchingTag = article.tags.some(tag => selectedTags.includes(tag));
      if (!hasMatchingTag) return false;
    }

    // CSS relevance filter
    if (showCSSOnly && article.cssRelevance !== 'high') {
      return false;
    }

    return true;
  });

  const featuredArticle = filteredArticles.find(a => a.isFeatured) || filteredArticles[0];
  const regularArticles = filteredArticles.filter(a => !a.isFeatured);

  const handleTagToggle = (tag: string) => {
    if (tag === 'All Topics') {
      setSelectedTags(['All Topics']);
    } else {
      const newTags = selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags.filter(t => t !== 'All Topics'), tag];
      
      setSelectedTags(newTags.length === 0 ? ['All Topics'] : newTags);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
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
          1. PAGE HERO (Compact)
          ═══════════════════════════════════════════ */}
      <section 
        className="relative py-20"
        style={{ 
          background: '#0B1E3D',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Eyebrow with date */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="eyebrow text-accent-gold">TODAY&apos;S DIGEST</span>
            <span className="text-accent-gold/60">—</span>
            <span className="eyebrow text-accent-gold">{formatDate(currentDate)}</span>
          </div>

          {/* Decorative line */}
          <div className="w-20 h-px bg-accent-gold mx-auto mb-6" />

          {/* Heading */}
          <h1 className="font-display text-5xl lg:text-6xl font-semibold text-white mb-4">
            The Morning Brief
          </h1>

          {/* Subtitle */}
          <p className="font-body text-lg text-text-on-dark/70 max-w-2xl mx-auto">
            Curated from Dawn, The News & Express Tribune — filtered for CSS relevance.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. FILTER / DATE NAVIGATION BAR (Sticky)
          ═══════════════════════════════════════════ */}
      <div 
        className="sticky top-16 z-40 border-b"
        style={{ 
          background: '#F5F0E8',
          borderColor: 'var(--border-light)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Left: Date navigation */}
            <div className="flex items-center gap-3">
              <button 
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                onClick={() => setCurrentDate(new Date(currentDate.getTime() - 86400000))}
              >
                <ChevronLeft className="w-5 h-5 text-text-primary" />
              </button>
              <span className="font-body text-sm font-medium text-text-primary min-w-[140px] text-center">
                {formatDate(currentDate)}
              </span>
              <button 
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                onClick={() => setCurrentDate(new Date(currentDate.getTime() + 86400000))}
              >
                <ChevronRight className="w-5 h-5 text-text-primary" />
              </button>
            </div>

            {/* Center: Paper filter pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {NEWSPAPERS.map((paper) => (
                <button
                  key={paper}
                  onClick={() => setSelectedNewspaper(paper)}
                  className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${
                    selectedNewspaper === paper
                      ? 'bg-accent-primary text-white'
                      : 'border border-text-primary/20 text-text-primary hover:bg-accent-primary/10'
                  }`}
                >
                  {paper}
                </button>
              ))}
            </div>

            {/* Right: Search and filter */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-black/5 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-text-primary" />
              </button>
              <button className="p-2 hover:bg-black/5 rounded-lg transition-colors">
                <Filter className="w-5 h-5 text-text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          3. SUBJECT TAG FILTER ROW
          ═══════════════════════════════════════════ */}
      <div 
        className="border-b overflow-x-auto scrollbar-hide"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 min-w-max">
            {SUBJECT_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-body transition-all whitespace-nowrap ${
                  selectedTags.includes(tag)
                    ? 'bg-accent-primary text-white shadow-md'
                    : 'bg-black/5 border border-border-light text-text-primary hover:bg-accent-primary/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* ═══════════════════════════════════════════
            4. FEATURED ARTICLE
            ═══════════════════════════════════════════ */}
        {featuredArticle && (
          <div className="mb-12">
            <div className="light-card p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                {/* Left: Content (60%) */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-accent-primary text-white text-xs font-body font-semibold uppercase tracking-wide rounded-full">
                      Featured
                    </span>
                    <NewspaperBadge newspaper={featuredArticle.newspaper} />
                  </div>

                  <h2 className="font-display text-3xl lg:text-4xl font-medium text-text-primary">
                    {featuredArticle.headline}
                  </h2>

                  <p className="font-body text-base text-text-muted line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-4 text-sm font-body text-text-muted">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(featuredArticle.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {featuredArticle.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-black/5 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredArticle.readTime} min read</span>
                    </div>
                  </div>

                  <Link href={`/newspapers/${featuredArticle.id}`} className="btn-primary inline-block">
                    Read Full Article <ArrowRight className="inline w-4 h-4 ml-1" />
                  </Link>
                </div>

                {/* Right: Visual (40%) */}
                <div className="lg:col-span-2">
                  <div 
                    className="relative h-64 lg:h-80 rounded-lg overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #E8650A 0%, #C8962E 100%)'
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-6xl font-semibold text-white/20 italic">
                        {featuredArticle.newspaper}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <NewspaperBadge newspaper={featuredArticle.newspaper} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            5. CSS RELEVANCE CALLOUT
            ═══════════════════════════════════════════ */}
        <div 
          className="mb-12 p-6 rounded-lg border-l-4"
          style={{ 
            background: 'rgba(232, 101, 10, 0.06)',
            borderColor: '#E8650A'
          }}
        >
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div className="flex items-start gap-4 flex-1">
              <Lightbulb className="w-9 h-9 text-accent-primary flex-shrink-0" />
              <div>
                <h3 className="font-display text-2xl font-medium text-text-primary mb-2">
                  CSS Relevance Filter
                </h3>
                <p className="font-body text-sm text-text-muted">
                  Each article is tagged with its CSS relevance score. Look for the orange star ★ on cards — those are high-priority reads.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body text-sm text-text-primary">
                Show CSS-priority only
              </span>
              <button
                onClick={() => setShowCSSOnly(!showCSSOnly)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  showCSSOnly ? 'bg-accent-primary' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    showCSSOnly ? 'transform translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            6. ARTICLES GRID
            ═══════════════════════════════════════════ */}
        {regularArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {regularArticles.slice(0, visibleArticles).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Load More Button */}
            {visibleArticles < regularArticles.length && (
              <div className="text-center">
                <button
                  onClick={() => setVisibleArticles(prev => prev + 6)}
                  className="btn-ghost inline-block"
                >
                  Load More Articles
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-text-muted/40 mx-auto mb-4" />
            <h3 className="font-display text-2xl font-medium text-text-primary mb-2">
              No articles found
            </h3>
            <p className="font-body text-base text-text-muted mb-6">
              No articles match your current filters. Try adjusting your selection.
            </p>
            <button
              onClick={() => {
                setSelectedNewspaper('All');
                setSelectedTags(['All Topics']);
                setShowCSSOnly(false);
              }}
              className="btn-ghost inline-block"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            7. ARCHIVE CALENDAR STRIP
            ═══════════════════════════════════════════ */}
        <div 
          className="mt-16 py-12 -mx-6 px-6"
          style={{ background: '#EDE6D6' }}
        >
          <div className="max-w-7xl mx-auto">
            <p className="eyebrow text-accent-primary mb-6 text-center">
              BROWSE BY DATE
            </p>
            
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 min-w-max justify-center pb-2">
                {Array.from({ length: 30 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - i);
                  const isToday = i === 0;
                  
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentDate(date)}
                      className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-all ${
                        isToday
                          ? 'bg-accent-primary text-white shadow-md'
                          : 'bg-white border border-border-light text-text-primary hover:border-accent-primary'
                      }`}
                    >
                      <span className="text-xs font-body uppercase">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                      <span className="text-lg font-display font-semibold">
                        {date.getDate()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            8. NEWSLETTER SIGNUP STRIP
            ═══════════════════════════════════════════ */}
        <div 
          className="mt-16 -mx-6 px-6 py-16"
          style={{ background: '#0B1E3D' }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left: Text */}
              <div>
                <h3 className="font-display text-3xl lg:text-4xl font-medium text-white mb-3">
                  Get The Morning Brief in Your Inbox
                </h3>
                <p className="font-body text-sm text-text-on-dark/70">
                  Daily at 7am Pakistan time.
                </p>
              </div>

              {/* Right: Form */}
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-accent-gold transition-colors font-body text-sm"
                />
                <button className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
