// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import main App component
import App from './App';

// Import global styles
import './index.css';

// Create root element and render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
