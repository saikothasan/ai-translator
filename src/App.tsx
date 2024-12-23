import React from 'react';
import TranslateForm from './components/TranslateForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <TranslateForm />
    </div>
  );
};

export default App;
