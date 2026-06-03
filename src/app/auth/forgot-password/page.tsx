'use client';

import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email) {
      setError('Please enter your email address');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await resetPassword(email);
      if (error) {
        setError(error.message || 'An error occurred. Please try again.');
      } else {
        setSuccess(true);
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const bgStyle = {
    background: '#0B1E3D',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };

  const cardShadow = { boxShadow: '0 24px 64px rgba(0,0,0,0.25)' };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={bgStyle}>
        <div className="w-full max-w-sm text-center">
          <div className="rounded-2xl p-10 bg-white" style={cardShadow}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 bg-[#0B1E3D]/5">
              <CheckCircle className="w-7 h-7 text-[#0B1E3D]" />
            </div>
            <h2 className="text-[#0B1E3D] text-xl font-semibold mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Check Your Inbox
            </h2>
            <p className="text-[#0B1E3D]/50 text-sm mb-6">
              A reset link has been sent to <span className="text-[#0B1E3D]/80">{email}</span>
            </p>
            <Link
              href="/auth/signin"
              className="inline-flex h-11 px-8 rounded-full bg-[#0B1E3D] text-white text-sm font-semibold hover:bg-[#0B1E3D]/90 transition-all items-center justify-center"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={bgStyle}>
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="rounded-2xl p-8 bg-white" style={cardShadow}>
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/">
              <div
                className="text-2xl tracking-tight text-[#0B1E3D] mb-1 inline-block"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                CSS KRO<sup className="text-xs">®</sup>
              </div>
            </Link>
            <p className="text-[#0B1E3D]/50 text-sm mt-1">Reset your password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs text-[#0B1E3D]/50 uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent border-b border-[#0B1E3D]/20 text-[#0B1E3D] placeholder:text-[#0B1E3D]/30 text-sm py-2 focus:outline-none focus:border-[#0B1E3D]/60 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              id="forgot-password-submit-btn"
              className="w-full mt-2 h-12 rounded-full bg-[#0B1E3D] text-white text-sm font-semibold hover:bg-[#0B1E3D]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          <p className="text-center text-[#0B1E3D]/40 text-xs mt-6">
            Remember it?{' '}
            <Link href="/auth/signin" className="text-[#0B1E3D]/70 hover:text-[#0B1E3D] transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-white/30 text-xs hover:text-white/60 transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
