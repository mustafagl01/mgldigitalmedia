import React from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#1e293b', color: 'white', minHeight: '100vh' }}>
      <h1>{t('header.title')} - OAuth Fixed Test</h1>
      <p>LanguageContext: Working ✅</p>
      <p>AuthContext: {user ? `Logged in as ${user.email}` : 'Not logged in'} ✅</p>
      <p>Google OAuth URLs cleaned up!</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;