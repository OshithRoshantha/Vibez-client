if (typeof global === "undefined") {
    var global = window;
}
  
  import './index.css';
  import 'bootstrap-icons/font/bootstrap-icons.css';
  import { createRoot } from 'react-dom/client';
  import App from './App.jsx';
  import { GoogleOAuthProvider } from '@react-oauth/google';
  
  createRoot(document.getElementById('root')).render(
      <GoogleOAuthProvider clientId="411825835909-6hbb6dnm05sai6bdccs2akf0s2qiot2m.apps.googleusercontent.com">
          <App />
      </GoogleOAuthProvider>
  );