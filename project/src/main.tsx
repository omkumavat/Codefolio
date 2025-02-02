import  React  from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './Context/AuthProvider.tsx';
createRoot(document.getElementById('root')!).render(
  <AuthProvider>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </AuthProvider>
);
