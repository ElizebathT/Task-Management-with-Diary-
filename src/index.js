import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './redux/store'
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient()
root.render(
  <QueryClientProvider client={queryClient}>
  <React.StrictMode>
  <ReactQueryDevtools initialIsOpen={false} />
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
  </QueryClientProvider>
);