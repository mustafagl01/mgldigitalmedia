import React from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

function AppContent() {
  const { t } = useLanguage();
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#1e293b', color: 'white', minHeight: '100vh' }}>
      <h1>{t('header.title')} - Test with Language Context</h1>
      <p>If you can see this, LanguageContext is working.</p>
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