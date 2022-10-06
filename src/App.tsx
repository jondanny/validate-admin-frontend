import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthRoute from './utils/AuthRoutes';
import AppRoute from './utils/AppRoutes';

function App() {
  return (
    <BrowserRouter>
        <AuthRoute />
        <AppRoute />
    </BrowserRouter>
  );
}

export default App;
