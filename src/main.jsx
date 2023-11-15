import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Principal } from '../src/Components/Principal';
import { App } from './Components/App';
import { Registro } from './Components/Create_register';
import { Modify } from './Components/Modify_register'; // Asegúrate de importar correctamente el componente Modify
import { Policylist } from './Components/Policy_list';
import { Policy } from './Components/Create_policy';
import { Modifypolicy } from './Components/Modify_policy';
import { Login } from './Components/Login';
import './CSS/index.scss';

const AppRouter = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/ApClients" element={<App/>} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/modify/:id" element={<Modify/>} />
          <Route path='/policylist' element={<Policylist/>}/>
          <Route path='/Policy' element={<Policy/>}/>
          <Route path='/Login' element={<Login/>}></Route>
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<AppRouter />);
