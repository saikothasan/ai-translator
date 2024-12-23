import React from 'react';
import TranslateForm from './components/TranslateForm';
import { CssBaseline } from '@mui/material';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TranslateForm />
      </div>
    </>
  );
};

export default App;
