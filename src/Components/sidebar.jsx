import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomeOutlined,UserOutlined,CopyOutlined,FileTextOutlined,FileExcelOutlined,StockOutlined,FireOutlined,ScheduleOutlined,SafetyCertificateOutlined} from '@ant-design/icons';



const Sidebar = () => {
  const location = useLocation();

  const isActive = (paths) => {
    return paths.some((path) => location.pathname === path);
  };

  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/" className={isActive(['/']) ? 'active' : ''}><HomeOutlined /> Inicio</Link></li>
        <div className="linea"></div>
        <li><Link to="/ApClients" className={isActive(['/ApClients', '/registro']) ? 'active' : ''}><UserOutlined /> Clientes</Link></li>
        <div className="linea"></div>
        <li><Link to="/Quotationlist" className={isActive(['/Quotationlist','/Quotation']) ? 'active' : ''}><CopyOutlined /> Cotizaciones</Link></li>
        <div className="linea"></div>
        <li><Link to="/policylist" className={isActive(['/policylist','/Policy']) ? 'active' : ''}><FileTextOutlined /> Pólizas</Link></li>
        <div className="linea"></div>
        <li><Link to="/Objannex" className={isActive(['/Objannex']) ? 'active' : ''}><FileExcelOutlined /> Endosos</Link></li>
        <div className="linea"></div>
        <li><Link to="/configuracion" className={isActive(['/configuracion']) ? 'active' : ''}><StockOutlined /> Cobranzas</Link></li>
        <div className="linea"></div>
        <li><Link to="/Claimlist" className={isActive(['/Claimlist','/Claim']) ? 'active' : ''}><FireOutlined /> Siniestros</Link></li>
        <div className="linea"></div>
        <li><Link to="/Objpaymnt" className={isActive(['/clientes']) ? 'active' : ''}><ScheduleOutlined /> Reservas</Link></li>
        <div className="linea"></div>
        <li><Link to="/configuracion" className={isActive(['/configuracion']) ? 'active' : ''}><SafetyCertificateOutlined /> Reaseguro</Link></li>
        <div className="linea"></div>
      </ul>
    </div>
  );
};

export default Sidebar;
