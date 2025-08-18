import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { AuthProvider } from '@/lib/auth-context';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Layout;