import React, { useState, useEffect } from 'react';
import { useFetch } from '../assets/useFetch';
import '../CSS/index.scss';
import moment from 'moment';
import { LeftOutlined,RightOutlined,SearchOutlined,EyeOutlined,EditOutlined } from '@ant-design/icons';
import _ from 'lodash';
import  TextLinkExample  from './Navbar';
import Sidebar from './sidebar'; 
import PanelControl from "./Panel-Control";




export const App = () => {
  const { data } = useFetch("http://localhost:8080/api/clients");

  // MODAL

  const [modalShowV, setModalShowV] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(10);

  useEffect(() => {setCurrentPage(1);}, [searchTerm]);

  const handleRowClick = (rowData) => {setSelectedClient(rowData); console.log(selectedClient);};

  if (!data) {
    return <div>Cargando...</div>;
  }

  // Filtrar y paginar los datos
   const filteredData = data.filter((item) => {
    const searchText = searchTerm.toLowerCase(); // Convierte la búsqueda a minúsculas
    return (
      (item.documentNumber && item.documentNumber.toLowerCase().includes(searchText)) ||
      (item.firstName && item.firstName.toLowerCase().includes(searchText)) 
    );
  });
  

// COMPAGINACION DE DATOS
const indexOfLastClient = currentPage * clientsPerPage;
const indexOfFirstClient = indexOfLastClient - clientsPerPage;
const currentClients = filteredData.slice(indexOfFirstClient, indexOfLastClient);
const startIndex = (currentPage - 1) * clientsPerPage;
const endIndex = startIndex + clientsPerPage;
const currentClientsPage = currentClients.slice(startIndex, endIndex);
const pageNumbers = _.range(1, Math.ceil(filteredData.length / clientsPerPage) + 1);
const paginate = (pageNumber) => { setCurrentPage(pageNumber);};

while (currentClients.length < clientsPerPage) {
  currentClients.push({
    documentNumber: '',
    firstName:'',
    lastName:'',
    birthDate:'',
    state:'',
  });
}


  return ( 
    <>
    <TextLinkExample/>
    <Sidebar></Sidebar>
    <PanelControl selectedClient={selectedClient}  modalShowV={modalShowV} setModalShowV={setModalShowV} setSearchTerm={setSearchTerm}
/>

      <div className='App'>
       
       <div className='container-sm container-title'>
       <h4 className='title'>Clientes</h4>
       </div>
      
        
        <div className='container'>
        

        
          </div>

        <div className='card'>
          <table className='Tble'>
            <thead>
              <tr>
                <th className='titles'>RUT</th>
                <th className='titles'>Nombre completo</th>
                <th className='titles'>Tipo</th>
                <th className='titles'>Fecha de nacimiento</th>
                <th className='titles'>Creado El</th>
                <th className='titles'>Estado</th>
                <th className='titles'></th>
                
              </tr>
            </thead>
            <tbody>
              {currentClients.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  className={selectedClient && selectedClient.id === item.id ? 'selectedClient' : ''}
                >
                  <td className='containerCell'>{item.documentNumber}</td>
                  <td className='containerCell'>{`${item.firstName} ${item.lastName}`}</td>
                  <td className='containerCell'>{`${item.tipo_persona}`}</td>
                  <td className='containerCell'>{moment(item.birthDate).format('DD/MM/YYYY')}</td>
                  <td className='containerCell'>{`${item.fechaCreacion}`}</td> 
                  <td className='statusC' data-state={item.state ? 'Activo' : 'Inactivo'}>{item.state ? 'Activo' : 'Inactivo'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='pagination'>
          <button className='pagination-btn' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}><LeftOutlined className='icons' /> Previous</button>
          {pageNumbers.map((number) => (<button key={number} className={currentPage === number ? 'active' : 'inactive'} onClick={() => paginate(number)}>{number}</button>))}
          <button className='pagination-btn' onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>Next <RightOutlined className='icons' /></button>
        </div>
        </div>
      </div>

    </>
  );
};
