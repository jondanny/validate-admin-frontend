import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthRoute from './AuthRoutes';
import AppRoute from './AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthRoute />
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
