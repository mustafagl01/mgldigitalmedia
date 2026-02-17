import React, { createContext, useContext, useEffect, useState } from 'react'

// User and Session types
interface User {
  id: string
  email: string
  email_verified: boolean
  name?: string
  image?: string
}

interface Session {
  token: string
  expiresAt: number
}

interface AuthError {
  message: string
  status?: number
}

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: AuthError }>
  signUp: (email: string, password: string, name?: string) => Promise<{ error?: AuthError }>
  signInWithGoogle: () => Promise<{ error?: AuthError }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error?: AuthError }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// API base URL - change this to your Cloudflare Worker URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-worker.your-subdomain.workers.dev'

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

  // Fetch session on mount and handle OAuth callback
  useEffect(() => {
    const initAuth = async () => {
      // Check for OAuth callback in URL
      const urlParams = new URLSearchParams(window.location.search)
      const oauthToken = urlParams.get('token')
      const provider = urlParams.get('provider')

      if (oauthToken && provider === 'google') {
        // Set the OAuth token
        localStorage.setItem('mgl_auth_token', oauthToken)

        // Clear URL params
        window.history.replaceState({}, '', window.location.pathname)

        // Fetch user data with new token
        try {
          const response = await fetch(`${API_BASE_URL}/api/auth/session`, {
            headers: { 'Authorization': `Bearer ${oauthToken}` }
          })

          if (response.ok) {
            const data = await response.json()
            if (data.user) {
              setUser(data.user)
              setSession({
                token: oauthToken,
                expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
              })
            }
          }
        } catch (error) {
          console.error('Failed to fetch OAuth user:', error)
        }

        setLoading(false)
        return
      }

      // Normal session fetch
      const storedToken = localStorage.getItem('mgl_auth_token')
      if (!storedToken) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/session`, {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          if (data.user) {
            setUser(data.user)
            setSession({
              token: storedToken,
              expiresAt: data.session?.expiresAt || Date.now() + 7 * 24 * 60 * 60 * 1000
            })
          } else {
            // Invalid session, clear token
            localStorage.removeItem('mgl_auth_token')
          }
        }
      } catch (error) {
        console.error('Failed to fetch session:', error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: { message: data.error || 'Login failed', status: response.status } }
      }

      setUser(data.user)
      setSession({
        token: data.sessionToken,
        expiresAt: data.expiresAt
      })
      localStorage.setItem('mgl_auth_token', data.sessionToken)

      return { error: undefined }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: { message: 'Network error occurred' } }
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: { message: data.error || 'Registration failed', status: response.status } }
      }

      setUser(data.user)
      setSession({
        token: data.sessionToken,
        expiresAt: data.expiresAt
      })
      localStorage.setItem('mgl_auth_token', data.sessionToken)

      return { error: undefined }
    } catch (error) {
      console.error('Sign up error:', error)
      return { error: { message: 'Network error occurred' } }
    }
  }

  const signInWithGoogle = async () => {
    // Redirect to Google OAuth flow
    const googleAuthUrl = `${API_BASE_URL}/api/auth/signin/google`
    window.location.href = googleAuthUrl
    return { error: undefined }
  }

  const signOut = async () => {
    try {
      if (session?.token) {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.token}`
          }
        })
      }
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setUser(null)
      setSession(null)
      localStorage.removeItem('mgl_auth_token')
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: { message: data.error || 'Password reset failed', status: response.status } }
      }

      return { error: undefined }
    } catch (error) {
      console.error('Password reset error:', error)
      return { error: { message: 'Network error occurred' } }
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
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
