'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Download, FileText, Calendar, Star, Book, GraduationCap, Target, TrendingUp } from 'lucide-react';
import SubscriberCounter from '@/components/SubscriberCounter';

// Animated Counter Component
const AnimatedCounter: React.FC<{ 
  target: number; 
  duration?: number; 
  suffix?: string;
  className?: string;
}> = ({ target, duration = 2000, suffix = '', className = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * easeOutCubic));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, target, duration]);

  return (
    <div ref={counterRef} className={className}>
      {count}{suffix}
    </div>
  );
};

const ResourcesPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribing(true);
    setSubscribeStatus(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'resources'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubscribeStatus({
          success: true,
          message: 'Successfully subscribed! You\'ll receive updates soon.'
        });
        setEmail('');
      } else {
        setSubscribeStatus({
          success: false,
          message: data.message || 'Failed to subscribe. Please try again.'
        });
      }
    } catch (error) {
      setSubscribeStatus({
        success: false,
        message: 'An error occurred. Please try again.'
      });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">CSS KRO Study Resources</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive study materials, past papers, syllabus, and exam guidelines for CSS preparation with CSS KRO
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Resource Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/past-papers" className="group">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 group-hover:scale-105 cursor-pointer">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Past Papers</h3>
              <p className="text-gray-600 mb-4">Complete archive of CSS exam papers from 2010 to 2024</p>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center"><FileText className="h-4 w-4 mr-1" />500+ Papers</span>
                <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />15 Years</span>
              </div>
            </div>
          </Link>

          <Link href="/syllabus" className="group">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 group-hover:scale-105 cursor-pointer">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Book className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Syllabus</h3>
              <p className="text-gray-600 mb-4">Detailed CSS syllabus with compulsory and optional subjects</p>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center"><Book className="h-4 w-4 mr-1" />50+ Subjects</span>
                <span className="flex items-center"><Star className="h-4 w-4 mr-1" />Updated 2024</span>
              </div>
            </div>
          </Link>

          <Link href="/exam-pattern" className="group">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 group-hover:scale-105 cursor-pointer">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exam Pattern</h3>
              <p className="text-gray-600 mb-4">Detailed exam pattern, marking scheme, and guidelines</p>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center"><Target className="h-4 w-4 mr-1" />Latest Pattern</span>
                <span className="flex items-center"><GraduationCap className="h-4 w-4 mr-1" />FPSC Official</span>
              </div>
            </div>
          </Link>

          <Link href="/study-materials" className="group">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 group-hover:scale-105 cursor-pointer">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Download className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Materials</h3>
              <p className="text-gray-600 mb-4">Subject-wise study guides, notes, and reference materials</p>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center"><Download className="h-4 w-4 mr-1" />1000+ Files</span>
                <span className="flex items-center"><Star className="h-4 w-4 mr-1" />Free Access</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Enhanced Overview Section */}
        <div className="relative overflow-hidden mb-8">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 rounded-xl"></div>
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl"></div>
          
          <div className="relative bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-xl border border-blue-100 shadow-xl animate-pulse-slow">
            <div className="p-4 sm:p-8">
              {/* Header with animation */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  <TrendingUp className="h-6 w-6 text-blue-600 animate-pulse" />
                  <h2 className="text-xl sm:text-3xl font-bold">Resource Overview</h2>
                </div>
                <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
                  Your complete CSS preparation hub with comprehensive resources and materials
                </p>
              </div>

              {/* Stats Grid - Perfect Mobile Alignment */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
                {/* Past Papers */}
                <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[140px] sm:min-h-[180px] flex flex-col justify-center">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-2 w-10 h-10 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <FileText className="h-5 w-5 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <AnimatedCounter 
                    target={500} 
                    suffix="+" 
                    className="text-lg sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent leading-tight"
                  />
                  <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Past Papers</div>
                </div>

                {/* Subjects */}
                <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border border-green-100 hover:border-green-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[140px] sm:min-h-[180px] flex flex-col justify-center">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full p-2 w-10 h-10 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <Book className="h-5 w-5 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <AnimatedCounter 
                    target={50} 
                    suffix="+" 
                    className="text-lg sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent leading-tight"
                  />
                  <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Subjects</div>
                </div>

                {/* Years Coverage */}
                <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[140px] sm:min-h-[180px] flex flex-col justify-center">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full p-2 w-10 h-10 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <Calendar className="h-5 w-5 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <AnimatedCounter 
                    target={15} 
                    className="text-lg sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent leading-tight"
                  />
                  <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Years Coverage</div>
                </div>

                {/* Resources */}
                <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border border-orange-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[140px] sm:min-h-[180px] flex flex-col justify-center">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-2 w-10 h-10 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <Download className="h-5 w-5 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <AnimatedCounter 
                    target={1000} 
                    suffix="+" 
                    className="text-lg sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent leading-tight"
                  />
                  <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Resources</div>
                </div>
              </div>

              {/* Features Grid - Perfect Mobile Layout with Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                <Link href="/past-papers" className="group bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[80px] flex items-center">
                  <div className="flex items-center space-x-3 sm:space-x-4 w-full">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-2.5 sm:p-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <FileText className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1 leading-tight">Past Papers Archive</h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-tight">Complete collection of examination papers from 15 years</p>
                    </div>
                  </div>
                </Link>

                <Link href="/syllabus" className="group bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[80px] flex items-center">
                  <div className="flex items-center space-x-3 sm:space-x-4 w-full">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-2.5 sm:p-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Book className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1 leading-tight">Complete Syllabus</h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-tight">Latest syllabus for all compulsory and optional subjects</p>
                    </div>
                  </div>
                </Link>

                <Link href="/exam-pattern" className="group bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[80px] flex items-center">
                  <div className="flex items-center space-x-3 sm:space-x-4 w-full">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-2.5 sm:p-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Target className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1 leading-tight">Exam Pattern</h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-tight">Detailed exam patterns and comprehensive marking schemes</p>
                    </div>
                  </div>
                </Link>

                <Link href="/study-materials" className="group bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[80px] flex items-center">
                  <div className="flex items-center space-x-3 sm:space-x-4 w-full">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-2.5 sm:p-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Download className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1 leading-tight">Study Materials</h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-tight">Comprehensive study guides and reference materials</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Email Subscription Section */}
        <div className="relative overflow-hidden">
          {/* Background with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl"></div>
          <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
          
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full animate-bounce delay-500"></div>
          
          <div className="relative p-8 sm:p-12 text-center">
            {/* Icon */}
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 flex items-center justify-center">
              <svg className="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              Stay Updated with CSS KRO
            </h2>
            
            {/* Subheading */}
            <p className="text-blue-100 text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Get the latest CSS exam resources, study materials, and exclusive content delivered straight to your inbox
            </p>

            {/* Email Form */}
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 sm:py-4 rounded-lg sm:rounded-r-none bg-white/95 backdrop-blur-sm border border-white/20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-base"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={subscribing}
                    className="bg-white hover:bg-gray-100 text-blue-600 font-semibold px-6 py-3 sm:py-4 rounded-lg sm:rounded-l-none transition-all duration-300 hover:shadow-lg hover:scale-105 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {subscribing ? 'Subscribing...' : 'Subscribe Now'}
                  </button>
                </div>
                
                {/* Success/Error Messages */}
                {subscribeStatus && (
                  <div className={`text-center p-3 rounded-lg text-sm ${
                    subscribeStatus.success 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {subscribeStatus.message}
                  </div>
                )}
              </form>
            </div>
              
            {/* Trust indicators */}
            <div className="flex items-center justify-center space-x-6 mt-6 text-blue-100 text-sm">
              <div className="flex items-center space-x-1">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Free Updates</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>No Spam</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Unsubscribe Anytime</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 mt-10 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  <SubscriberCounter className="text-2xl sm:text-3xl font-bold text-white" suffix="+" />
                </div>
                <div className="text-blue-200 text-xs sm:text-sm">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  <AnimatedCounter target={100} suffix="+" className="text-2xl sm:text-3xl font-bold text-white" />
                </div>
                <div className="text-blue-200 text-xs sm:text-sm">Resources Shared</div>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  <AnimatedCounter target={98} suffix="%" className="text-2xl sm:text-3xl font-bold text-white" />
                </div>
                <div className="text-blue-200 text-xs sm:text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;