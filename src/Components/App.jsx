import React, { useState, useEffect } from 'react';
import { useFetch } from '../assets/useFetch';
import '../CSS/index.scss';
import _ from 'lodash';
import  TextLinkExample  from './Navbar';
import Sidebar from './sidebar'; 
import PanelControl from "./Panel-Control";
import { DataGrid } from '@mui/x-data-grid'; // Importa DataGrid de Material-UI




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
  
  const columns = [
    { field: 'documentNumber', headerName: 'RUT', width: 150 },
    {
      field: 'fullName',
      headerName: 'Nombre Completo',
      width: 200,
      sortable: false,
      valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`,
      renderCell: (params) => (
        <a
          href={`/modify/${params.row.id}`}
          style={{ textDecoration: 'none' }}
        >
          {params.value}
        </a>
      ),
    },    
    { field: 'birthDate', headerName: 'Fecha de nacimiento', width: 150 },
    { field: 'fechaCreacion', headerName: 'Fecha de Creación', width: 150 },
    { field: 'tipo_persona', headerName: 'Tipo Persona', width: 150 },
    { field: 'state', headerName: 'Estado', width: 150 },

  ];
  
// COMPAGINACION DE DATOS
const indexOfLastClient = currentPage * clientsPerPage;
const indexOfFirstClient = indexOfLastClient - clientsPerPage;
const currentClients = filteredData.slice(indexOfFirstClient, indexOfLastClient);
const startIndex = (currentPage - 1) * clientsPerPage;
const endIndex = startIndex + clientsPerPage;

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
      
      
       <div className='card'>
         
            <DataGrid
              rows={currentClients}
              columns={columns}
              initialState={{pagination: { paginationModel: { page: 10, pageSize: 10 }, }, }}
              pageSizeOptions={[10, 15]}
              onRowClick={(params) => handleRowClick(params.row)}
              checkboxSelection
            />
        </div>
      </div>

    </>
  );
};
