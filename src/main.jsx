import React                                      from 'react';
import { createRoot }                             from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Principal }                              from '../src/Components/Principal';
import { App }                                    from './Components/App';
import { Registro }                               from './Components/Create_register';
import { Modify }                                 from './Components/Modify_register'; 
import { Policylist }                             from './Components/Policy_list';
import { Policy }                                 from './Components/Create_policy';
import { Modifypolicy }                           from './Components/Modify_policy';
import { Login }                                  from './Components/Login';
import { Coverage }                               from './Components/Coverage';
import { Insurer }                                from './Components/insurer_obj';
import { Quotation }                              from './Components/Create_Quotation';
import { Quotationlist }                          from './Components/Quotation_list';
import { Modifyquotation }                        from './Components/Modify_quotation';
import { Claim }                                  from './Components/Create_Claim';
import { Claimlist }                              from './Components/Claim_list';
import { Modifyclaim }                            from './Components/Modify_Claim';
import { Objmodal }                               from './Components/insrobj_modal';
import { Objannex }                               from './Components/annex_obj';
import { ObjPaymnt }                              from './Components/paymentplant_obj';
import './CSS/index.scss';
// ventanas modales 



const AppRouter = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/"                     element={<Principal />} />
          <Route path='/Login'                element={<Login/>}/>

          {/*CLIENTE */}
          <Route path="/ApClients"            element={<App/>} />
          <Route path="/registro"             element={<Registro />} />
          <Route path="/modify/:id"           element={<Modify/>} />

            {/*POLIZA */}
          <Route path='/policylist'           element={<Policylist/>}/>
          <Route path='/Policy'               element={<Policy/>}/>
          <Route path="/Modifypolicy/:id"     element={<Modifypolicy/>}/>

            {/*LISTAS */}
          <Route path='/Coverage'             element={<Coverage/>}/>
          <Route path='/Insurer'              element={<Insurer/>}/>
          <Route path='/Objannex'             element={<Objannex/>}/>
          <Route path='/Objpaymnt'            element={<ObjPaymnt/>}/>
            {/* COTIZACIONES */}
          <Route path='/Quotation'            element={<Quotation/>}/>
          <Route path='/Quotationlist'        element={<Quotationlist/>}/>
          <Route path="/Modifyquotation/:id"  element={<Modifyquotation/>}/>

            {/*SINIESTROS */}

           <Route path='/Claim'                element={<Claim/>}/>      
           <Route path='/Claimlist'            element={<Claimlist/>}/>    
           <Route path="/Modifyclaim/:id"      element={<Modifyclaim/>}/>


            {/*MODALS*/}
            <Route path="/objmodal/:id"         element={<Objmodal/>}/>

           
            
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<AppRouter />);
