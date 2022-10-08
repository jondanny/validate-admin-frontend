import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthRoute from './routes/AuthRoutes';
import AppRoute from './routes/AppRoutes';
import { colorContext as ColorContext, initialUserState } from './utils/contexts/app-contexts'
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient()
  return (
    <ColorContext.Provider value={{...initialUserState}}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthRoute />
          <AppRoute />
        </BrowserRouter>
      </QueryClientProvider>
    </ColorContext.Provider>
  );
}

export default App;
