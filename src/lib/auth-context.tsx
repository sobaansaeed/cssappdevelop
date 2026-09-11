'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { getOrCreateCredits } from './credits';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  credits: number;
  refreshCredits: () => Promise<void>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [credits, setCredits] = useState<number>(-1); // -1 = not loaded yet

  const loadCredits = useCallback(async (userId: string) => {
    try {
      const { credits } = await getOrCreateCredits(userId);
      setCredits(credits);
    } catch {
      setCredits(0);
    }
  }, []);

  const refreshCredits = useCallback(async () => {
    if (user) await loadCredits(user.id);
  }, [user, loadCredits]);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) await loadCredits(session.user.id);
      setIsLoading(false);
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadCredits(session.user.id);
        } else {
          setCredits(-1);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [loadCredits]);

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const trimmedEmail = email.trim().toLowerCase();

      // 1. Create auto-confirmed account via server-side API
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password, fullName }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { error: new Error(data.error || 'Failed to create account') };
      }

      // 2. Immediately sign in the user to establish a client-side session
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (signInError) {
        return { error: signInError };
      }

      if (signInData.session) {
        setSession(signInData.session);
        setUser(signInData.user);
        if (signInData.user) await loadCredits(signInData.user.id);
      }

      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const trimmedEmail = email.trim().toLowerCase();
      let { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (error && (error.message?.toLowerCase().includes('email not confirmed') || ('status' in error && error.status === 400 && error.message?.toLowerCase().includes('not confirmed')))) {
        try {
          const confirmRes = await fetch('/api/auth/confirm-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: trimmedEmail }),
          });
          if (confirmRes.ok) {
            const retry = await supabase.auth.signInWithPassword({
              email: trimmedEmail,
              password,
            });
            data = retry.data;
            error = retry.error;
          }
        } catch {
          // ignore error and return original
        }
      }

      if (error) {
        return { error };
      }

      if (data.session) {
        setSession(data.session);
        setUser(data.user);
        if (data.user) await loadCredits(data.user.id);
      }

      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: { access_type: 'offline', prompt: 'consent' },
        },
      });
      if (error) return { error };
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setCredits(-1);
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  const value: AuthContextType = {
    user,
    session,
    isAuthenticated: !!user,
    isLoading,
    credits,
    refreshCredits,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};