'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Newspaper, Calendar, FileText, Users, Trophy, TrendingUp } from 'lucide-react';

const HomePage: React.FC = () => {
  const [counters, setCounters] = useState({
    papers: 0,
    subjects: 0,
    resources: 0
  });

  useEffect(() => {
    const targets = { papers: 500, subjects: 50, resources: 1000 };
    const duration = 2000; // 2 seconds
    const increment = 50; // Update every 50ms

    const intervals = Object.keys(targets).map(key => {
      const target = targets[key as keyof typeof targets];
      const step = target / (duration / increment);
      
      return setInterval(() => {
        setCounters(prev => {
          const current = prev[key as keyof typeof counters];
          const next = Math.min(current + step, target);
          
          return {
            ...prev,
            [key]: Math.floor(next)
          };
        });
      }, increment);
    });

    // Clear intervals after animation completes
    setTimeout(() => {
      intervals.forEach(clearInterval);
      setCounters(targets);
    }, duration);

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Master CSS with{' '}
                <span className="text-yellow-300">Confidence</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Your comprehensive platform for CSS exam preparation with newspapers, resources, past papers, and expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/resources"
                  className="inline-flex items-center px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-200 transform hover:scale-105"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="/newspapers"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-200"
                >
                  Read Newspapers
                  <Newspaper className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-300 mb-2">
                  {counters.papers}+
                </div>
                <div className="text-sm lg:text-base text-blue-100">Past Papers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-300 mb-2">
                  {counters.subjects}+
                </div>
                <div className="text-sm lg:text-base text-blue-100">Subjects</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-300 mb-2">
                  {counters.resources}+
                </div>
                <div className="text-sm lg:text-base text-blue-100">Resources</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for CSS Success with CSS KRO
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive study materials, current affairs, and exam resources all in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/newspapers" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-blue-600 rounded-lg p-3 w-fit mb-6">
                  <Newspaper className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Daily Newspapers</h3>
                <p className="text-gray-600 mb-4">
                  Stay updated with current affairs from leading Pakistani newspapers
                </p>
                <div className="text-blue-600 font-medium group-hover:text-blue-700">
                  Read Now →
                </div>
              </div>
            </Link>

            <Link href="/resources" className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-green-600 rounded-lg p-3 w-fit mb-6">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Study Resources</h3>
                <p className="text-gray-600 mb-4">
                  Complete archive of past papers, syllabus, and study materials
                </p>
                <div className="text-green-600 font-medium group-hover:text-green-700">
                  Explore →
                </div>
              </div>
            </Link>

            <Link href="/timeline" className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-purple-600 rounded-lg p-3 w-fit mb-6">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Exam Timeline</h3>
                <p className="text-gray-600 mb-4">
                  Important dates, deadlines, and exam schedule
                </p>
                <div className="text-purple-600 font-medium group-hover:text-purple-700">
                  View Timeline →
                </div>
              </div>
            </Link>

            <div className="group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-orange-600 rounded-lg p-3 w-fit mb-6">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Exam Pattern</h3>
                <p className="text-gray-600 mb-4">
                  Detailed exam pattern, marking scheme, and guidelines
                </p>
                <div className="text-orange-600 font-medium group-hover:text-orange-700">
                  Coming Soon →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Join Thousands of Successful CSS Aspirants with CSS KRO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">25,000+</h3>
              <p className="text-gray-600">Active Students</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">300+</h3>
              <p className="text-gray-600">Success Stories</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your CSS Journey with CSS KRO?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students who are preparing for CSS exams with CSS KRO&apos;s comprehensive platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/resources"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              Start Learning Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/newspapers"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              Read Today&apos;s News
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;