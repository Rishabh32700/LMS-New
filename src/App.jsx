import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

// Lazy load routes
const AppRoutes = lazy(() => import('./router'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
