'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Home, Newspaper, Book, Calendar, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/newspapers', label: 'Newspapers', icon: Newspaper },
    { href: '/resources', label: 'Resources', icon: Book },
    { href: '/timeline', label: 'Timeline', icon: Calendar },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <GraduationCap className="h-8 w-8" />
            <span className="text-xl font-bold">CSS KRO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/25'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md'
                  }`}
                >
                  <Icon className={`h-4 w-4 transition-transform duration-200 ${isActive(item.href) ? '' : 'group-hover:scale-110'}`} />
                  <span>{item.label}</span>
                  {isActive(item.href) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-10 animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`relative p-2.5 rounded-xl transition-all duration-200 ${
                isMenuOpen 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X className="h-5 w-5 transition-transform duration-200 rotate-0" />
                ) : (
                  <Menu className="h-5 w-5 transition-transform duration-200" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-2 bg-gradient-to-b from-gray-50 to-white">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`group flex items-center space-x-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 transform hover:scale-[1.02] ${
                    isActive(item.href)
                      ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/25'
                      : 'text-gray-700 hover:text-blue-600 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md border border-gray-100 hover:border-blue-200'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMenuOpen ? 'slideInUp 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <div className={`p-2 rounded-lg ${
                    isActive(item.href) 
                      ? 'bg-white/20' 
                      : 'bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200'
                  }`}>
                    <Icon className={`h-5 w-5 transition-transform duration-200 ${
                      isActive(item.href) ? 'text-white' : 'text-blue-600 group-hover:scale-110'
                    }`} />
                  </div>
                  <span className="flex-1">{item.label}</span>
                  {isActive(item.href) && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </div>
          
          {/* Mobile menu footer */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">CSS KRO - Your CSS Preparation Platform</p>
          </div>
        </div>
      )}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;