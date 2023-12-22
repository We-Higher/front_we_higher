import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MY_PORT, API_BASE_URL } from "./common/util";
import { StompSessionProvider } from "react-stomp-hooks";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StompSessionProvider url={`${API_BASE_URL}/ws-stomp`}>
    <App />
    </StompSessionProvider>
  </React.StrictMode>
);

reportWebVitals();
