import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: AuthError }>
  signUp: (email: string, password: string) => Promise<{ error?: AuthError }>
  signInWithGoogle: () => Promise<{ error?: AuthError }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email)
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      console.error('Sign in error:', error)
      return { error }
    }
    
    return { error: undefined }
  }

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) {
      console.error('Sign up error:', error)
      return { error }
    }
    
    return { error: undefined }
  }

  const signInWithGoogle = async () => {
    // NUCLEAR OPTION: Force production URL no matter what
    const FORCE_PRODUCTION_URL = 'https://mgldigitalmedia.com/'
    
    console.log('🚀 Google OAuth starting with redirect:', FORCE_PRODUCTION_URL)
    console.log('Current window.location.origin:', window.location.origin)
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: FORCE_PRODUCTION_URL,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      },
    })
    
    if (error) {
      console.error('Google sign in error:', error)
      return { error }
    }
    
    console.log('Google OAuth initiated successfully')
    return { error: undefined }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Sign out error:', error)
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}