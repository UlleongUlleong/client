import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { worker } from './mocks/browser.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
function renderApp() {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  );
  const queryClient = new QueryClient();
  root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
}
if (process.env.NODE_ENV === 'development') {
  worker.start().then(() => {
    renderApp();
  });
} else {
  renderApp();
}
