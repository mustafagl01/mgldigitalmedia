import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#1e293b', color: 'white', minHeight: '100vh' }}>
      <h1>MGL Digital AI - Test Page</h1>
      <p>If you can see this, React is working correctly.</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  );
}

export default App;