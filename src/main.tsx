import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from 'theme/theme';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import AppRouter from 'routes/router';
import AuthContextProvider from 'Contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <BreakpointsProvider>
          <CssBaseline />
          <AppRouter />
        </BreakpointsProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
