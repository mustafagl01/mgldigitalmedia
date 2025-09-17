import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signInWithGoogle = async () => {
    console.log('AuthContext: Google signIn called');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        console.error('AuthContext: Google signIn error:', error);
      } else {
        console.log('AuthContext: Google OAuth redirect başlatıldı');
      }
      
      return { error };
    } catch (criticalError) {
      console.error('AuthContext: Critical Google signIn error:', criticalError);
      return { error: criticalError };
    }
  };

  const signOut = async () => {
    console.log('AuthContext: signOut called');
    try {
      console.log('AuthContext: Calling supabase.auth.signOut()');
      const { error } = await supabase.auth.signOut();
      console.log('AuthContext: signOut response received, error:', error);
      
      if (error) {
        console.error('AuthContext: Supabase signOut error details:', error);
        // Error olsa bile logout işlemini tamamlayalım
        if (error.message && 
            (error.message.includes('session_not_found') || 
             error.message.includes('user_not_found') || 
             error.message.includes('Auth session missing') ||
             error.message.includes('session_missing'))) {
          console.warn('AuthContext: Non-critical signOut error - still clearing local state:', error.message);
          // Bu tür errorlarda da logout işlemini tamamla
        } else {
          console.error('AuthContext: Critical signOut error:', error);
          // Kritik errorlarda bile state'i temizle ama error'u da fırlat
        }
      }
      
      // Error olsa bile local state'i temizle
      console.log('AuthContext: Force clearing local user/session state');
      setUser(null);
      setSession(null);
      
      console.log('AuthContext: signOut completed - user logged out');
      
      // Sadece gerçekten kritik errorlarda throw yap
      if (error && error.message && 
          !error.message.includes('session_not_found') && 
          !error.message.includes('user_not_found') && 
          !error.message.includes('Auth session missing') &&
          !error.message.includes('session_missing') &&
          !error.message.includes('invalid_session')) {
        throw error;
      }
      
    } catch (criticalError) {
      console.error('AuthContext: Critical signOut error:', criticalError);
      // Error olsa bile state'i temizle
      console.log('AuthContext: Force clearing state despite error');
      setUser(null);
      setSession(null);
      
      // Sadece gerçekten kritik durumlarda throw yap
      if (criticalError && criticalError.message && 
          !criticalError.message.includes('session') &&
          !criticalError.message.includes('auth')) {
        throw criticalError;
      }
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};