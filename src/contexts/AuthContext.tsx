import React, { createContext, useContext, useEffect, useState } from 'react'

// Mock User type to match Supabase's basic structure
interface User {
  id: string;
  email: string | undefined;
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: any }>
  signUp: (email: string, password: string) => Promise<{ error?: any }>
  signInWithGoogle: () => Promise<{ error?: any }>
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check local storage for mock session
    const storedUser = localStorage.getItem('mock_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    // MOCK LOGIN: Always succeed
    const mockUser = { id: 'mock-user-123', email }
    localStorage.setItem('mock_user', JSON.stringify(mockUser))
    setUser(mockUser)
    return { error: undefined }
  }

  const signUp = async (email: string, password: string) => {
    // MOCK SIGNUP: Always succeed
    const mockUser = { id: 'mock-user-123', email }
    localStorage.setItem('mock_user', JSON.stringify(mockUser))
    setUser(mockUser)
    return { error: undefined }
  }

  const signInWithGoogle = async () => {
    // MOCK GOOGLE LOGIN: Always succeed
    const mockUser = { id: 'mock-user-google-123', email: 'google-user@example.com' }
    localStorage.setItem('mock_user', JSON.stringify(mockUser))
    setUser(mockUser)
    console.log('Google OAuth simulated successfully')
    return { error: undefined }
  }

  const signOut = async () => {
    localStorage.removeItem('mock_user')
    setUser(null)
  }

  const value = {
    user,
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