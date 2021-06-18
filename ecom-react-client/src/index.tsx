import React, { Fragment, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ReactDOM from 'react-dom';
import FallbackPage from './components/fallback';
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
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={FallbackPage}>
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
  </Provider>
);

ReactDOM.render(root, document.getElementById('root'));
