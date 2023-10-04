import React from 'react';
import { createRoot } from 'react-dom/client'; // Cambio en la importación de createRoot
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Principal } from '../src/Components/Principal';
import { App } from './Components/App';
import { Registro } from './Components/Create_register';
import { Modify } from './Components/Modify_register';

import './CSS/index.css';


createRoot(document.getElementById('root')).render( // Usar createRoot en lugar de ReactDOM.render
  <React.StrictMode>
    <Router>
      <Routes>               
        <Route path="/" element={<Principal />} />
        <Route path="/ApClients" element={<App />} />
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/modify" element={<Modify/>}/>
        
      </Routes>
    </Router>
  </React.StrictMode>
);
