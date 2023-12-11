import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/style.bundle.css';
import './css/plugins.bundle.css';
import './css/App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
