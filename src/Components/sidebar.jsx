import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomeOutlined,UserOutlined,CopyOutlined,FileTextOutlined,FileExcelOutlined,StockOutlined,FireOutlined,ScheduleOutlined,SafetyCertificateOutlined} from '@ant-design/icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        
      <li>
          <Link to="/">
            <HomeOutlined /> Inicio {/* Utiliza HomeOutlined dentro del enlace */}
          </Link>
        </li>

        <div className="linea"></div>
        <li> 
          <Link to="/ApClients"> <UserOutlined />Clientes</Link> 
          </li>
        <div className="linea"></div>
        <li> <Link to="/configuracion"> <CopyOutlined />Cotizaciones</Link> </li>
        <div className="linea"></div>
        <li><Link  to="/policylist"> <FileTextOutlined />Pólizas</Link> </li>
        <div className="linea"></div>
        <li> <Link to="/clientes"><FileExcelOutlined />Endosos</Link> </li>
        <div className="linea"></div>
        <li> <Link to="/configuracion"><StockOutlined />Cobranzas</Link> </li>
        <div className="linea"></div>
        <li><Link  to="/"><FireOutlined />Siniestros</Link> </li>
        <div className="linea"></div>
        <li> <Link to="/clientes"> <ScheduleOutlined />Reservas</Link> </li>
        <div className="linea"></div>
        <li> <Link to="/configuracion"> <SafetyCertificateOutlined />Reaseguro</Link> </li>
        <div className="linea"></div>
        
      </ul>
    </div>
  );
};

export default Sidebar;
