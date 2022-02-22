import React, { useEffect, useState } from 'react';
import { AuthForm } from './AuthForm';
import { Dashboard } from './Dashboard';
import { Editor } from './Editor';

export type PageStateTypes = 'Dashboard' | 'Editor';

const App: React.FC = () => {
  const [page, setPage] = useState<PageStateTypes | null>(null);

  useEffect(() => {
    if (localStorage.getItem('userId')) setPage('Dashboard');
  }, []);

  const showComponent = () => {
    switch (page) {
      case 'Dashboard':
        return <Dashboard setPage={setPage} />;
      case 'Editor':
        return <Editor setPage={setPage} />;
      default:
        return <AuthForm setPage={setPage} />;
    }
  };
  return showComponent();
};

export default App;
