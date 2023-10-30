import React, { useState, useEffect } from 'react';
import { useFetch } from '../assets/useFetch';
import '../CSS/index.scss';
import _ from 'lodash';
import  TextLinkExample  from './Navbar';
import Sidebar from './sidebar'; 
import PanelControl from "./Panel-Control";
import { DataGrid } from '@mui/x-data-grid'; // Importa DataGrid de Material-UI
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';



export const Policylist = () => {
  const { data } = useFetch("http://localhost:8080/api/clients");

  // MODAL

  const [modalShowV, setModalShowV] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(20);

  useEffect(() => {setCurrentPage(1);}, [searchTerm]);

  const handleRowClick = (rowData) => {setSelectedClient(rowData); console.log(selectedClient);};

  if (!data) {
    return <div>Cargando...</div>;
  }

  // Filtrar y paginar los datos
   const filteredData = data.filter((item) => {
    const searchText = searchTerm.toLowerCase(); 
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
      renderCell: (params) => (<a href={`/modify/${params.row.id}`} style={{ textDecoration: 'none' }}> {params.value} </a>),
},    
    { field: 'birthDate', headerName: 'Fecha de nacimiento', width: 150 },
    { field: 'fechaCreacion', headerName: 'Fecha de Creación', width: 150 },
    { field: 'tipo_persona', headerName: 'Tipo Persona', width: 150 },
    { field: 'state', headerName: 'Estado', width: 150 },

  ];
  
// COMPAGINACION DE DATOS
const indexOfLastClient = currentPage * clientsPerPage;
const indexOfFirstClient = indexOfLastClient - clientsPerPage + 1 ;
const currentClients = filteredData.slice(indexOfFirstClient, indexOfLastClient);
const startIndex = (currentPage - 1) * clientsPerPage;
const endIndex = startIndex + clientsPerPage;


const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};


// Definir un contador para generar ids únicos para filas ficticias
let uniqueIdCounter = 0;

// Generar filas ficticias con ids únicos
while (currentClients.length < clientsPerPage) {
  currentClients.push({
    id: `fake-${uniqueIdCounter++}`, // Asigna un id único
    documentNumber: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    state: '',
  });
}



  return ( 
    <>
    <TextLinkExample/>
    <Sidebar></Sidebar>
    <PanelControl selectedClient={selectedClient}  modalShowV={modalShowV} setModalShowV={setModalShowV} 
/>

      <div className='App'>
       <div className='container-sm container-title'>
       <h4 className='title'>Polizas</h4>

       <div className="search-container">
                <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">Buscar</InputLabel>
                <Input className="inBuscar" value={searchTerm} onChange={handleSearchChange} startAdornment={ <InputAdornment position="start"><SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> </InputAdornment>} />
                </FormControl>
                </div> 
       </div>
       
   



       <div className='card'>
         <Box sx={{height:1200 , width:'100%'}}>
            <DataGrid
              className='dataGrid'
              rows={currentClients}
              columns={columns}
              initialState={{pagination: { paginationModel: { page: 0, pageSize: 13}, }, }}
              pageSizeOptions={[13]}
              onRowClick={(params) => handleRowClick(params.row)}
              checkboxSelection
            />
            </Box>
        </div>
      </div>

    </>
  );
};