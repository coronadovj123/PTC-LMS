import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Siguraduhin na may index.css ka sa src folder

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);