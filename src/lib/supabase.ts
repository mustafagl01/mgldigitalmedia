import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug: Log all environment variables
console.log('🔍 Supabase Debug Info:')
console.log('VITE_SUPABASE_URL:', supabaseUrl)
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'MISSING')
console.log('Window origin:', typeof window !== 'undefined' ? window.location.origin : 'SSR')
console.log('All Vite env vars:', import.meta.env)

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Force auth settings to use production URLs
    redirectTo: 'https://mgldigitalmedia.com/',
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})