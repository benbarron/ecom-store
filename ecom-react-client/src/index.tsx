import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import './assets/scss/main.scss';

axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const root = (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={'Loading'}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools //
          initialIsOpen={true}
          position='bottom-left'
        />
      )}
    </QueryClientProvider>
  </React.StrictMode>
);

// window.onerror = (e: any) => {
//   axios.post('http://localhost:8080/api/logger/error', e);
// };

ReactDOM.render(root, document.getElementById('root'));
