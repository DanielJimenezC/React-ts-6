import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ErrorBoundary from './ErrorBoundry';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById('root')
);
