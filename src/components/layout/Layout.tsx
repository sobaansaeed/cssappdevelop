'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { AuthProvider } from '@/lib/auth-context';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <AuthProvider>
      <div className="min-h-screen">
        {/* New navbar on all pages */}
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Layout;