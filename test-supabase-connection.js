import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mpobhyzqjrgdrsmretyi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wb2JoeXpxanJnZHJzbXJldHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzAyMDUsImV4cCI6MjA3MjE0NjIwNX0.cHEWdDo60JwUJoOwYc21MF4EJ2lt2rMMH7kfFVgNQuM'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('Testing Supabase connection...')
  
  // Test basic connection
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .limit(1)

    if (error) {
      console.log('Error (expected if table does not exist):', error.message)
    } else {
      console.log('Success! Leads table exists:', data)
    }
  } catch (err) {
    console.log('Connection error:', err)
  }

  // Test auth
  try {
    const { data: session } = await supabase.auth.getSession()
    console.log('Auth test successful:', session?.session ? 'User logged in' : 'No active session')
  } catch (err) {
    console.log('Auth test error:', err)
  }
}

testConnection()