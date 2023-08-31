import React from 'react';
import { createRoot } from 'react-dom'; // Cambio en la importación de createRoot
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Principal } from './Principal';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')).render( // Usar createRoot en lugar de ReactDOM.render
  <React.StrictMode>
    <Router>
      <Routes>               
        <Route path="/" element={<Principal />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
