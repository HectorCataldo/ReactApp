import React from "react";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from 'react-router-dom';
import { CloseOutlined,SearchOutlined, SaveOutlined, ArrowLeftOutlined, EyeOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import '../CSS/Panel-Control.scss';


const PanelControl = (props) => {
  const location = useLocation();
  const isApClientsPage = location.pathname === "/ApClients";
  const isRegisterPage = location.pathname === "/registro";
  const { selectedClient,  modalShowV, setModalShowV, handleSubmit,searchTerm,setSearchTerm,objetos } = props;

  return (
    <div className="Panel-Control">
      {isRegisterPage && (
        <>
          <Link to="/ApClients"> <Button className="btn_back"> <ArrowLeftOutlined className="back-log" /></Button> </Link>
          <Button className="btn_create" type="Submit" onClick={handleSubmit}><SaveOutlined className="create-log" /> Guardar </Button>
          <Button className="btn_cancel"><CloseOutlined className="cancel-log" /> Cancelar </Button>
        </>
      )}

      {isApClientsPage && (
        <>
         <div  className="stack-containers">
                <div className="container-buttons">
                <Link to="/">         <Button className="btn_back"> <ArrowLeftOutlined className="back-log" /></Button></Link>
                <Link to="/registro"> <Button className='btn-crear' type='submit'><PlusOutlined className='icons' /> Agregar Nuevo </Button></Link>
                <Link to="/modify">   <Button className="btn-modificar" type='submit' disabled={!selectedClient}> <EditOutlined /> Modificar </Button></Link>
                <button className={`btn-modificar ${modalShowV ? 'selected' : ''}`} type='submit' onClick={() => setModalShowV(true)} disabled={!selectedClient}> <EyeOutlined /> Ver </button>
                </div>

                {/* <div className="search-container">
                <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">Buscar</InputLabel>
                <Input className="inBuscar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} startAdornment={ <InputAdornment position="start"><SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> </InputAdornment>} />
                </FormControl>
                </div> */}

               
         </div>
      
         
         
        </> 
      )}

    

     
    </div>
  );
};

export default PanelControl;
