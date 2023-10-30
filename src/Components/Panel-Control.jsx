import React from "react";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from 'react-router-dom';
import { CloseOutlined,SearchOutlined, SaveOutlined, ArrowLeftOutlined, EyeOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import '../CSS/Panel-Control.scss';

const PanelControl = (props) => {
  const location = useLocation();
  const isApClientsPage = location.pathname === "/ApClients";
  const isRegisterPage = location.pathname === "/registro";
  const isPolicyregisterpage = location.pathname === "/policylist"
  const { selectedClient,  modalShowV, setModalShowV, handleSubmit,searchTerm,setSearchTerm,objetos } = props;

  return (
    <div className="Panel-Control">
      {isRegisterPage && (
        <>
          <Link to="/ApClients" > <Button className="btn_back"> <ArrowLeftOutlined className="back-log" /></Button> </Link>
          <Button className="btn_create" type="Submit" onClick={handleSubmit}><SaveOutlined className="create-log" /> Guardar </Button>
          <Button className="btn_cancel"><CloseOutlined className="cancel-log" /> Cancelar </Button>
        </>
      )}

     {isPolicyregisterpage && (
            <div className="container-buttons">
            <Link to="/">         <Button className="btn_back"> <ArrowLeftOutlined className="back-log" /></Button></Link>
            <Link to="/Policy" className="A"> <Button className='btn-crear' type='submit'><PlusOutlined className='icons' /> Agregar Poliza </Button></Link>
            </div>      
       )}

      {isApClientsPage && (
        <>
         <div  className="stack-containers">
                <div className="container-buttons">
                <Link to="/">         <Button className="btn_back"> <ArrowLeftOutlined className="back-log" /></Button></Link>
                <Link to="/registro" className="A"> <Button className='btn-crear' type='submit'><PlusOutlined className='icons' /> Agregar Nuevo </Button></Link>
                </div>        
         </div>    
        </> 
      )}

    

     
    </div>
  );
};

export default PanelControl;
