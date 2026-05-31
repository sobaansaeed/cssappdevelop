'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut, LogIn, UserPlus, Mail } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { userProfileService } from '@/lib/user-profile';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const { user, isAuthenticated, signIn, signUp, signInWithGoogle, signOut, resetPassword, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/newspapers', label: 'Newspapers' },
    { href: '/resources', label: 'Resources' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/exam-pattern', label: 'Exam Pattern' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // ── Auth Handlers (preserved) ──
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);
    try {
      const { error } = isSignUp
        ? await signUp(authEmail, authPassword)
        : await signIn(authEmail, authPassword);
      if (error) {
        setAuthError(error.message);
      } else {
        setShowAuthModal(false);
        setAuthEmail('');
        setAuthPassword('');
        setAuthError('');
      }
    } catch {
      setAuthError('An unexpected error occurred');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError('');
    setIsAuthLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) setAuthError(error.message);
    } catch {
      setAuthError('An unexpected error occurred');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordStatus('loading');
    setForgotPasswordMessage('');
    try {
      const { error } = await resetPassword(forgotPasswordEmail);
      if (error) {
        setForgotPasswordStatus('error');
        setForgotPasswordMessage(error.message);
      } else {
        setForgotPasswordStatus('success');
        setForgotPasswordMessage('Password reset email sent! Check your inbox.');
      }
    } catch {
      setForgotPasswordStatus('error');
      setForgotPasswordMessage('An unexpected error occurred');
    }
  };

  const handleLogout = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const isHomePage = pathname === '/';

  if (isLoading) {
    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isHomePage ? 'bg-transparent' : 'bg-navy'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gold"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isHomePage 
            ? scrolled 
              ? 'navbar-frosted' 
              : 'bg-transparent'
            : scrolled 
              ? 'bg-navy shadow-lg shadow-black/20' 
              : 'bg-navy'
        }`}
        style={{
          borderBottom: scrolled && !isHomePage ? '1px solid #C9A84C' : scrolled && isHomePage ? '1px solid rgba(255,255,255,0.18)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-1 group">
              {isHomePage ? (
                <div className="text-3xl tracking-tight text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  CSS KRO<sup className="text-xs">®</sup>
                </div>
              ) : (
                <>
                  <span className="font-display text-xl font-bold tracking-tight text-cream-light transition-colors group-hover:text-white">
                    CSS
                  </span>
                  <span className="font-display text-xl font-bold tracking-tight text-gold transition-colors group-hover:text-gold-light">
                    KRO
                  </span>
                </>
              )}
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors ${
                    isHomePage
                      ? isActive(item.href)
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                      : isActive(item.href)
                        ? 'text-gold nav-link active'
                        : 'text-cream/70 hover:text-cream nav-link'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* ── Desktop Right ── */}
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center gap-2 px-4 py-2 rounded transition-all duration-200 font-mono text-xs tracking-wide ${
                      isHomePage
                        ? 'liquid-glass text-foreground'
                        : 'border border-gold/30 text-gold hover:bg-gold/10'
                    }`}
                    style={{ borderRadius: isHomePage ? '9999px' : '4px' }}
                  >
                    <User className="h-3.5 w-3.5" />
                    <span>{userProfileService.getDisplayName(user)}</span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-navy-light border border-gold/20 py-2 shadow-xl" style={{ borderRadius: '4px' }}>
                      <div className="px-4 py-2 border-b border-gold/10">
                        <p className="text-sm font-body text-cream break-words">{user?.email}</p>
                        <p className="text-xs font-mono text-slate mt-0.5">Free User</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-cream/70 hover:text-cream hover:bg-white/5 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className={`px-6 py-2.5 text-sm cursor-pointer transition-all duration-300 ${
                    isHomePage
                      ? 'liquid-glass rounded-full text-foreground'
                      : 'border border-gold text-gold font-mono tracking-widest uppercase hover:bg-gold hover:text-navy'
                  }`}
                  style={{ borderRadius: isHomePage ? '9999px' : '4px' }}
                >
                  {isHomePage ? 'Begin Journey' : 'Start Preparing'}
                </button>
              )}
            </div>

            {/* ── Mobile Hamburger ── */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 transition-colors ${isHomePage ? 'text-foreground hover:text-muted-foreground' : 'text-cream hover:text-gold'}`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Full-Screen Overlay ── */}
        {isMenuOpen && (
          <div className={`md:hidden fixed inset-0 top-16 z-40 flex flex-col ${isHomePage ? 'bg-background' : 'bg-navy'}`}>
            <div className="flex-1 flex flex-col justify-center items-center gap-8 px-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-display text-3xl font-bold tracking-wide transition-colors ${
                    isActive(item.href) 
                      ? isHomePage ? 'text-foreground' : 'text-gold' 
                      : isHomePage ? 'text-muted-foreground hover:text-foreground' : 'text-cream/60 hover:text-cream'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className={`w-16 h-px my-4 ${isHomePage ? 'bg-border' : 'bg-gold/40'}`} />

              {isAuthenticated ? (
                <div className="text-center space-y-4">
                  <p className={`font-mono text-xs tracking-wide ${isHomePage ? 'text-muted-foreground' : 'text-gold'}`}>{user?.email}</p>
                  <button
                    onClick={handleLogout}
                    className={`flex items-center gap-2 transition-colors font-mono text-xs tracking-wide ${
                      isHomePage ? 'text-muted-foreground hover:text-foreground' : 'text-cream/60 hover:text-cream'
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsMenuOpen(false);
                  }}
                  className={`px-8 py-3 text-sm transition-all duration-300 ${
                    isHomePage
                      ? 'liquid-glass rounded-full text-foreground'
                      : 'border border-gold text-gold font-mono tracking-widest uppercase hover:bg-gold hover:text-navy'
                  }`}
                  style={{ borderRadius: isHomePage ? '9999px' : '4px' }}
                >
                  {isHomePage ? 'Begin Journey' : 'Start Preparing'}
                </button>
              )}
            </div>

            <div className="pb-8 text-center">
              <p className={`font-mono text-[10px] tracking-widest uppercase ${isHomePage ? 'text-muted-foreground/30' : 'text-cream/30'}`}>
                CSS KRO — Master CSS with Confidence
              </p>
            </div>
          </div>
        )}
      </nav>

      {/* ── Auth Modal ── */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-navy-light border border-gold/20 p-8 max-w-md w-full mx-4" style={{ borderRadius: '4px' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl font-bold text-cream">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </h3>
              <button onClick={() => setShowAuthModal(false)} className="text-cream/40 hover:text-cream transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {!showForgotPassword ? (
              <>
                {/* Google OAuth */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isAuthLoading}
                  className="w-full border border-cream/20 text-cream py-3 px-6 font-body text-sm transition-all hover:bg-white/5 flex items-center justify-center gap-2 mb-4"
                  style={{ borderRadius: '4px' }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-cream/10" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-navy-light text-cream/40 font-mono tracking-wide">OR</span>
                  </div>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-cream/50 mb-2 tracking-wide uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-navy border border-cream/15 text-cream font-body text-sm focus:border-gold focus:outline-none transition-colors"
                      placeholder="Enter your email"
                      required
                      style={{ borderRadius: '4px' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-xs font-mono text-cream/50 mb-2 tracking-wide uppercase">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-navy border border-cream/15 text-cream font-body text-sm focus:border-gold focus:outline-none transition-colors"
                      placeholder="Enter your password"
                      required
                      style={{ borderRadius: '4px' }}
                    />
                  </div>

                  {!isSignUp && (
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-xs font-mono text-gold/70 hover:text-gold transition-colors tracking-wide"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {authError && (
                    <div className="text-red-400 text-sm bg-red-900/20 border border-red-800/30 p-3 font-body" style={{ borderRadius: '4px' }}>
                      {authError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed text-navy py-3 px-6 font-mono text-sm tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                    style={{ borderRadius: '4px' }}
                  >
                    {isAuthLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-navy"></div>
                        <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                      </>
                    ) : (
                      <>
                        {isSignUp ? <UserPlus className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                        <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm font-body text-cream/50 hover:text-cream transition-colors"
                  >
                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h4 className="text-lg font-display font-bold text-cream mb-2">Reset Password</h4>
                  <p className="text-cream/50 text-sm font-body">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label htmlFor="forgot-email" className="block text-xs font-mono text-cream/50 mb-2 tracking-wide uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      id="forgot-email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-navy border border-cream/15 text-cream font-body text-sm focus:border-gold focus:outline-none transition-colors"
                      placeholder="Enter your email"
                      required
                      style={{ borderRadius: '4px' }}
                    />
                  </div>

                  {forgotPasswordStatus === 'success' && (
                    <div className="text-forest-light text-sm bg-forest/20 border border-forest/30 p-3 font-body" style={{ borderRadius: '4px' }}>
                      {forgotPasswordMessage}
                    </div>
                  )}

                  {forgotPasswordStatus === 'error' && (
                    <div className="text-red-400 text-sm bg-red-900/20 border border-red-800/30 p-3 font-body" style={{ borderRadius: '4px' }}>
                      {forgotPasswordMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={forgotPasswordStatus === 'loading'}
                    className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed text-navy py-3 px-6 font-mono text-sm tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                    style={{ borderRadius: '4px' }}
                  >
                    {forgotPasswordStatus === 'loading' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-navy"></div>
                        <span>Sending Reset Email...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4" />
                        <span>Send Reset Email</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotPasswordStatus('idle');
                      setForgotPasswordMessage('');
                      setForgotPasswordEmail('');
                    }}
                    className="text-sm font-body text-cream/50 hover:text-cream transition-colors"
                  >
                    Back to Sign In
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;