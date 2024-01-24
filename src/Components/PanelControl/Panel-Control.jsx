import React, { useState }   from "react";
import Button                from "react-bootstrap/Button";
import { Link, useLocation } from 'react-router-dom';
import { CloseOutlined, SaveOutlined, ArrowLeftOutlined, EditOutlined, PlusOutlined, StopOutlined,CheckCircleOutlined } from '@ant-design/icons';
import '../../CSS/Panel-Control.scss';

const PanelControl = (props) => {
  const location = useLocation();
  // CLIENTE
  const isApClientsPage = location.pathname === "/ApClients";
  const isRegisterPage  = location.pathname === "/registro";
  const isModifyClient  = location.pathname.includes ("/modify/");
  // POLIZA
  const isPolicylistpage   = location.pathname === "/policylist";
  const isPolicycreatepage = location.pathname ==="/Policy";
  const isModifyPolicy     = location.pathname.includes ("/modifypolicy/");
  const isPolicyModifypage = location.pathname.includes ("/Modifypolicy/");
 // COTIZACION 
  const isQuotationlistpage    = location.pathname === "/Quotationlist";
  const isQuotationcreatepage  = location.pathname === "/Quotation";
  const isQuiotationModifypage = location.pathname.includes ("/Modifyquotation/");



  // SINIESTROS 

  const isClaimlistpage   = location.pathname === "/Claimlist";
  const isClaimcreatepage = location.pathname === "/Claim";
  const isClaimModifypage = location.pathname.includes ("/Modifyclaim/");

  const {handleSubmit} = props;
  const {handleEdit} = props;
  const {handleState} = props;
  const {state} = props;
  const handleGoBack = () => {
    window.history.back();
  };
  const [ocultar, setOcultar] = useState(true);

  const editar = ()=>{    
    if(ocultar){
      setOcultar(false);
    }
    else{
      setOcultar(true);
    }
    handleEdit();
  }
  

  return (
    <div className="Panel-Control">

      {/*LISTAS */}
      {isApClientsPage && (
        <>
         <div  className="stack-containers">
                <div className="container-buttons">
                <Button className="btn_back" onClick={handleGoBack} ><ArrowLeftOutlined className="back-log" /></Button>               
                <Link to="/registro" className="A"> <Button className='btn-crear' type='submit'><PlusOutlined className='icons' /> Agregar Cliente </Button></Link>
                </div>        
         </div>    
        </> 
      )}

      {isPolicylistpage && (
            <div className="container-buttons">
            <Link to="/"> <Button className="btn_back" onClick={handleGoBack}> <ArrowLeftOutlined className="back-log" /></Button></Link>
            <Link to="/Policy" className="A"> <Button className='btn-crear' type='submit'><PlusOutlined className='icons' /> Agregar Póliza </Button></Link>
            </div>      
       )} 

      {isQuotationlistpage && (
            <div className="container-buttons">
            <Link to="/"> <Button className="btn_back" onClick={handleGoBack}> <ArrowLeftOutlined className="back-log" /></Button></Link>
            <Link to="/Quotation" className="A"> <Button className='btn-crear' type='submit'><PlusOutlined className='icons' /> Agregar Cotización </Button></Link>
            </div>      
       )} 
     
     {isClaimlistpage && (
            <div className="container-buttons">
            <Link to="/"> <Button className="btn_back" onClick={handleGoBack}> <ArrowLeftOutlined className="back-log" /></Button></Link>
            <Link to="/Claim" className="A"> <Button className='btn-crear' type='submit'><PlusOutlined className='icons' /> Agregar Siniestro </Button></Link>
            </div>      
       )} 
           {/*Registros y Formularios */}


     {isRegisterPage  && (
        <>
          <Button className="btn_back" onClick={handleGoBack}><ArrowLeftOutlined className="back-log" /></Button>
          <Button className="btn_create" type="Submit" onClick={handleSubmit}><SaveOutlined className="create-log" /> Guardar </Button>
          <Button className="btn_cancel" onClick={handleGoBack}><CloseOutlined className="cancel-log"  /> Cancelar </Button>
        </>
      )}

       {isPolicycreatepage  && (
        <>
          <Button className="btn_back" onClick={handleGoBack} ><ArrowLeftOutlined className="back-log" /></Button>
          <Button className="btn_create" type="Submit" onClick={handleSubmit}><SaveOutlined className="create-log" /> Guardar </Button>
          <Button className="btn_cancel" onClick={handleGoBack}><CloseOutlined className="cancel-log"  /> Cancelar </Button>
        </>
      )} 

       {isQuotationcreatepage  && (
        <>
          <Button className="btn_back" onClick={handleGoBack} ><ArrowLeftOutlined className="back-log" /></Button>
          <Button className="btn_create" type="Submit" onClick={handleSubmit}><SaveOutlined className="create-log" /> Guardar </Button>
          <Button className="btn_cancel" onClick={handleGoBack}><CloseOutlined className="cancel-log"  /> Cancelar </Button>
        </>
      )} 

      {isClaimcreatepage  && (
        <>
          <Button className="btn_back" onClick={handleGoBack} ><ArrowLeftOutlined className="back-log" /></Button>
          <Button className="btn_create" type="Submit" onClick={handleSubmit}><SaveOutlined className="create-log" /> Guardar </Button>
          <Button className="btn_cancel" onClick={handleGoBack}><CloseOutlined className="cancel-log"  /> Cancelar </Button>
        </>
      )} 
      
         {/*VENTANAS DE MODIFICAR */}

      {isModifyClient && (
        <>
          <Link to="/ApClients" > <Button className="btn_back" onClick={handleGoBack}> <ArrowLeftOutlined className="back-log" /></Button> </Link>
          {ocultar && <Button className="btn_edit" onClick={editar}><EditOutlined className="edit-log"/> Editar</Button>}
          {!ocultar && <Button className="btn_create" type="Submit" onClick={handleSubmit}><SaveOutlined className="create-log" /> Guardar </Button>}
          {!ocultar && <Button className="btn_cancel" onClick={editar}><CloseOutlined className="cancel-log" /> Cancelar </Button>}
          {!ocultar  && state && <Button className="btn_desactive" onClick={handleState}><StopOutlined className="desactive-log"/> Desactivar</Button>}
          {!ocultar  && !state && <Button className="btn_desactive" onClick={handleState}><CheckCircleOutlined className="active-log"/> Activar</Button>}
        </>
      )}

      
      {isPolicyModifypage && (
        <>
          <Link to="/ApClients" > <Button className="btn_back" onClick={handleGoBack}> <ArrowLeftOutlined className="back-log" /></Button> </Link>
          {ocultar && <Button className="btn_edit" onClick={editar}><EditOutlined className="edit-log"/> Editar</Button>}
          {!ocultar && <Button className="btn_create" type="Submit" onClick={handleSubmit}><SaveOutlined className="create-log" /> Guardar </Button>}
          {!ocultar && <Button className="btn_cancel" onClick={editar}><CloseOutlined className="cancel-log" /> Cancelar </Button>}
          {!ocultar  && state && <Button className="btn_desactive" onClick={handleState}><StopOutlined className="desactive-log"/> Desactivar</Button>}
          {!ocultar  && !state && <Button className="btn_desactive" onClick={handleState}><CheckCircleOutlined className="active-log"/> Activar</Button>}
        </>
      )}
      {isModifyPolicy && (
        <>
          <Link to="/policylist" > <Button className="btn_back"> <ArrowLeftOutlined className="back-log" /></Button> </Link>
          {ocultar && <Button className="edit" onClick={editar}><EditOutlined className="edit-log"/> Editar</Button>}
          {!ocultar && <Button className="btn_create" type="Submit" onClick={handleSubmit}><SaveOutlined className="create-log" /> Guardar </Button>}
          {!ocultar && <Button className="btn_cancel" onClick={editar}><CloseOutlined className="cancel-log" /> Cancelar </Button>}
          
        </>
      )}
     

      {isQuiotationModifypage && (
        <>
          <Link to="/ApClients" > <Button className="btn_back" onClick={handleGoBack}> <ArrowLeftOutlined className="back-log" /></Button> </Link>
          {ocultar && <Button className="btn_edit" onClick={editar}><EditOutlined className="edit-log"/> Editar</Button>}
          {!ocultar && <Button className="btn_create" type="Submit" onClick={handleSubmit}><SaveOutlined className="create-log" /> Guardar </Button>}
          {!ocultar && <Button className="btn_cancel" onClick={editar}><CloseOutlined className="cancel-log" /> Cancelar </Button>}
          {!ocultar  && state && <Button className="btn_desactive" onClick={handleState}><StopOutlined className="desactive-log"/> Desactivar</Button>}
          {!ocultar  && !state && <Button className="btn_desactive" onClick={handleState}><CheckCircleOutlined className="active-log"/> Activar</Button>}
        </>
      )}

      {isClaimModifypage && (
        <>
          <Link to="/ApClients" > <Button className="btn_back" onClick={handleGoBack}> <ArrowLeftOutlined className="back-log" /></Button> </Link>
          {ocultar && <Button className="btn_edit" onClick={editar}><EditOutlined className="edit-log"/> Editar</Button>}
          {!ocultar && <Button className="btn_create" type="Submit" onClick={handleSubmit}><SaveOutlined className="create-log" /> Guardar </Button>}
          {!ocultar && <Button className="btn_cancel" onClick={editar}><CloseOutlined className="cancel-log" /> Cancelar </Button>}
          {!ocultar  && state && <Button className="btn_desactive" onClick={handleState}><StopOutlined className="desactive-log"/> Desactivar</Button>}
          {!ocultar  && !state && <Button className="btn_desactive" onClick={handleState}><CheckCircleOutlined className="active-log"/> Activar</Button>}
        </>
      )}

    </div>
  );
};

export default PanelControl;
