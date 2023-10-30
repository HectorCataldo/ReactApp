import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Principal } from '../src/Components/Principal';
import { App } from './Components/App';
import { Registro } from './Components/Create_register';
import { Modify } from './Components/Modify_register';
import { Policylist } from './Components/Policy_list';
import { Policy } from './Components/Create_policy';
import './CSS/index.scss';



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>               
        <Route path="/" element={<Principal />} />
        <Route path="/ApClients" element={<App />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/modify" element={<Modify />} />
        <Route path='/policylist' element={<Policylist/>}/>
        <Route path='/Policy' element={<Policy/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);
