import './index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="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">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
