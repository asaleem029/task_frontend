import 'react-toastify/dist/ReactToastify.css';

import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename="/admin">
        <Suspense>
          <App />
          <ToastContainer autoClose={3000}/>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
