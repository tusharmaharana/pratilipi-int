import React from 'react';
import { AuthForm } from './AuthForm';
import { Dashboard } from './Dashboard';

const App: React.FC = () => {
  if (!localStorage.getItem('userId')) return <AuthForm />;
  return <Dashboard />;
};

export default App;
