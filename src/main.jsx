import * as React                                 from 'react';
import { createRoot }                             from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Principal }                              from '../src/Components/Principal';
import { App }                                    from './Components/Client/Client_list';
import { Registro }                               from './Components/Client/Create_Client';
import { Modify }                                 from './Components/Client/Modify_Client'; 
import { Policylist }                             from './Components/Policy/Policy_list';
import { Policy }                                 from './Components/Policy/Create_policy';
import { Modifypolicy }                           from './Components/Policy/Modify_policy';
import { Login }                                  from './Components/Login';
import { Coverage }                               from './Components/Coverage';
import { Insurer }                                from './Components/insurer_obj';
import { Quotation }                              from './Components/Quotation/Create_Quotation';
import { Quotationlist }                          from './Components/Quotation/Quotation_list';
import { Modifyquotation }                        from './Components/Quotation/Modify_quotation';
import { Claim }                                  from './Components/Claim/Create_Claim';
import { Claimlist }                              from './Components/Claim_list';
import { Modifyclaim }                            from './Components/Claim/Modify_Claim';
import { Objmodal }                               from './Components/insrobj_modal';
import { Objannex }                               from './Components/annex_obj';
import { ObjPaymnt }                              from './Components/paymentplant_obj';
import { Correos }                                from './Components/contact_cor';
import { Telefonos }                              from './Components/contact_tel';
import { Direcciones }                            from './Components/contact_dir';
import { Modaltel }                               from './Components/modal_tel';
import { Modalcor }                               from './Components/modal_cor';
import { Modaldir }                               from './Components/modal_dir';
import { ModalClient }                            from './Components/modalclient';
import { Clientlist }                             from './Components/clientlist';
import { PANTALLA }                               from './Components/Client/pantalla-de-humo';
import './Components/Client/CSS/index.scss';
// ventanas modales 



const AppRouter = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/"                     element={<Principal />} />
          <Route path='/Login'                element={<Login/>}/>
          <Route path='/PANTALLA'             element={<PANTALLA/>}/>

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
          <Route path='/Correos'              element={<Correos/>}/>
          <Route path='/Telefonos'            element={<Telefonos/>}/>
          <Route path='/Direcciones'          element={<Direcciones/>}/>
          <Route path='/Clientlist'           element={<Clientlist/>}/>
          
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
            <Route path="/modaltel"             element={<Modaltel/>}/>
            <Route path="/modalcor"             element={<Modalcor/>}/> 
            <Route path="/modaldir"             element={<Modaldir/>}/>       
            <Route path="/modalclient"          element={<ModalClient/>}/>


            
            
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<AppRouter />);
