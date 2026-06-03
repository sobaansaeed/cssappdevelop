'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signUp(formData.email, formData.password);
      if (error) {
        setError(error.message || 'An error occurred. Please try again.');
      } else {
        setSuccess(true);
        setTimeout(() => { window.location.href = '/'; }, 2000);
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setIsLoading(true);
      setError('');
      const { error } = await signInWithGoogle();
      if (error) setError(error.message || 'Google sign up failed.');
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

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={bgStyle}>
        <div className="w-full max-w-sm text-center">
          <div className="rounded-2xl p-10 bg-white" style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 bg-[#0B1E3D]/5">
              <CheckCircle className="w-7 h-7 text-[#0B1E3D]" />
            </div>
            <h2 className="text-[#0B1E3D] text-xl font-semibold mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Account Created
            </h2>
            <p className="text-[#0B1E3D]/50 text-sm">
              Welcome to CSS KRO. Redirecting you home…
            </p>
            <div className="mt-6 w-5 h-5 border-2 border-[#0B1E3D]/20 border-t-[#0B1E3D] rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={bgStyle}>
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="rounded-2xl p-8 bg-white" style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}>
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
            <p className="text-[#0B1E3D]/50 text-sm mt-1">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs text-[#0B1E3D]/50 uppercase tracking-widest mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-transparent border-b border-[#0B1E3D]/20 text-[#0B1E3D] placeholder:text-[#0B1E3D]/30 text-sm py-2 focus:outline-none focus:border-[#0B1E3D]/60 transition-colors"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs text-[#0B1E3D]/50 uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent border-b border-[#0B1E3D]/20 text-[#0B1E3D] placeholder:text-[#0B1E3D]/30 text-sm py-2 focus:outline-none focus:border-[#0B1E3D]/60 transition-colors"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs text-[#0B1E3D]/50 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="w-full bg-transparent border-b border-[#0B1E3D]/20 text-[#0B1E3D] placeholder:text-[#0B1E3D]/30 text-sm py-2 pr-8 focus:outline-none focus:border-[#0B1E3D]/60 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#0B1E3D]/30 hover:text-[#0B1E3D]/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs text-[#0B1E3D]/50 uppercase tracking-widest mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className="w-full bg-transparent border-b border-[#0B1E3D]/20 text-[#0B1E3D] placeholder:text-[#0B1E3D]/30 text-sm py-2 pr-8 focus:outline-none focus:border-[#0B1E3D]/60 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#0B1E3D]/30 hover:text-[#0B1E3D]/60 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              id="signup-submit-btn"
              className="w-full mt-2 h-12 rounded-full bg-[#0B1E3D] text-white text-sm font-semibold hover:bg-[#0B1E3D]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#0B1E3D]/10" />
            <span className="text-[#0B1E3D]/30 text-xs">or</span>
            <div className="flex-1 h-px bg-[#0B1E3D]/10" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={isLoading}
            id="signup-google-btn"
            className="w-full h-12 rounded-full border border-[#0B1E3D]/20 text-[#0B1E3D] text-sm font-medium hover:bg-[#0B1E3D]/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Footer link */}
          <p className="text-center text-[#0B1E3D]/40 text-xs mt-6">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-[#0B1E3D]/70 hover:text-[#0B1E3D] transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-white/30 text-xs hover:text-white/60 transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
