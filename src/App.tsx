import React from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

function AppContent() {
  const { t } = useLanguage();
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#1e293b', color: 'white', minHeight: '100vh' }}>
      <h1>{t('header.title')} - Without AuthContext</h1>
      <p>LanguageContext: Working ✅</p>
      <p>AuthContext: Skipped (testing OAuth issue)</p>
      <p>Google Console OAuth conflict might be the issue!</p>
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