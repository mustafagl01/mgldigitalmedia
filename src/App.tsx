import React, { useEffect, useState } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

function AppContent() {
  const { t } = useLanguage();
  const [supabaseStatus, setSupabaseStatus] = useState('Testing...');
  
  useEffect(() => {
    // Test Supabase environment variables
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl) {
      setSupabaseStatus('❌ VITE_SUPABASE_URL missing');
      return;
    }
    
    if (!supabaseAnonKey) {
      setSupabaseStatus('❌ VITE_SUPABASE_ANON_KEY missing');
      return;
    }
    
    setSupabaseStatus(`✅ Supabase vars found: ${supabaseUrl.substring(0, 30)}...`);
  }, []);
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#1e293b', color: 'white', minHeight: '100vh' }}>
      <h1>{t('header.title')} - Environment Variables Test</h1>
      <p>LanguageContext: Working ✅</p>
      <p>Supabase Status: {supabaseStatus}</p>
      <p>This will show if Supabase env vars are missing in production</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;