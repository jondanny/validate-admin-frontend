import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthRoute from './routes/AuthRoutes';
import AppRoute from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthRoute />
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
