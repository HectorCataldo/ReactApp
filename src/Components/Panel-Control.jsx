import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from 'react-router-dom';
import { CloseOutlined,SearchOutlined, SaveOutlined, ArrowLeftOutlined, EyeOutlined, EditOutlined, PlusOutlined, StopOutlined,CheckCircleOutlined } from '@ant-design/icons';
import '../CSS/Panel-Control.scss';

const PanelControl = (props) => {
  const location = useLocation();
  const isApClientsPage = location.pathname === "/ApClients";
  const isRegisterPage = location.pathname === "/registro";
  const isPolicylistpage = location.pathname === "/policylist";
  const isPolicycreatepage = location.pathname ==="/Policy";
  const isModifyClient = location.pathname.includes ("/modify/");
  const isModifyPolicy = location.pathname.includes ("/modifypolicy/");
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
      {isRegisterPage  && (
        <>
          <Button className="btn_back" onClick={handleGoBack}><ArrowLeftOutlined className="back-log" /></Button>
          <Button className="btn_create" type="Submit" onClick={handleSubmit}><SaveOutlined className="create-log" /> Guardar </Button>
          <Button className="btn_cancel" onClick={handleGoBack}><CloseOutlined className="cancel-log"  /> Cancelar </Button>
        </>
      )}

       {isPolicycreatepage  && (
        <>
          <Button className="btn_back" onClick={handleGoBack}><ArrowLeftOutlined className="back-log" /></Button>
          <Button className="btn_create" type="Submit" onClick={handleSubmit}><SaveOutlined className="create-log" /> Guardar </Button>
          <Button className="btn_cancel" onClick={handleGoBack}><CloseOutlined className="cancel-log"  /> Cancelar </Button>
        </>
      )} 
      {isModifyClient && (
        <>
          <Link to="/ApClients" > <Button className="btn_back"> <ArrowLeftOutlined className="back-log" /></Button> </Link>
          {ocultar && <Button className="btn_edit" onClick={editar}><EditOutlined className="edit-log"/> Editar</Button>}
          {!ocultar && <Button className="btn_create" type="Submit" onClick={handleSubmit}><SaveOutlined className="create-log" /> Guardar </Button>}
          {!ocultar && <Button className="btn_cancel" onClick={editar}><CloseOutlined className="cancel-log" /> Cancelar </Button>}
          {!ocultar  && state && <Button className="btn_desactive" onClick={handleState}><StopOutlined className="desactive-log"/> Desactivar</Button>}
          {!ocultar  && !state && <Button className="btn_desactive" onClick={handleState}><CheckCircleOutlined className="active-log"/> Activar</Button>}
        </>
      )}

      {isPolicylistpage && (
            <div className="container-buttons">
            <Link to="/"> <Button className="btn_back"> <ArrowLeftOutlined className="back-log" /></Button></Link>
            <Link to="/Policy" className="A"> <Button className='btn-crear' type='submit'><PlusOutlined className='icons' /> Agregar Poliza </Button></Link>
            </div>      
       )} 

      {isApClientsPage && (
        <>
         <div  className="stack-containers">
                <div className="container-buttons">
                <Button className="btn_back" onClick={handleGoBack}><ArrowLeftOutlined className="back-log" /></Button>               
                <Link to="/registro" className="A"> <Button className='btn-crear' type='submit'><PlusOutlined className='icons' /> Agregar Nuevo </Button></Link>
                </div>        
         </div>    
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
     
    </div>
  );
};

export default PanelControl;
