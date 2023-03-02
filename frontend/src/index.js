import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import AuthContext from './AuthContext';
import CompanyContext from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContext>
    <CompanyContext>
      <App />
    </CompanyContext>
  </AuthContext>
);
