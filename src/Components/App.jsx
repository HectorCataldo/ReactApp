import React, { useState, useEffect } from 'react';
import { useFetch } from '../assets/useFetch';
import '../CSS/index.scss';
import _ from 'lodash';
import  TextLinkExample  from './Navbar';
import Sidebar from './sidebar'; 
import PanelControl from "./Panel-Control";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Modify from './Modify_register';

export const App = () => {
  const { data } = useFetch("http://localhost:8080/api/clients");

  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(20);
  const [searchValue, setSearchValue] = useState('');
  const [isModifyOpen, setIsModifyOpen] = useState(false);


  
  const pag = useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    
  }, [selectedClient]);

  const isRowEmpty = (row) => {
    return (
      !row.documentNumber &&
      !row.firstName &&
      !row.lastName &&
      !row.birthDate &&
      !row.state
    );
  };

  if (!data) {
    return <div>Cargando...</div>;
  }

    const filteredData = data.filter((item) => {
    const searchText = searchTerm.toLowerCase();
    return (
      (item.documentNumber && item.documentNumber.toLowerCase().includes(searchText)) ||
      (item.firstName && item.firstName.toLowerCase().includes(searchText)) ||
      (item.lastName && item.lastName.toLowerCase().includes(searchText))
    );
    });

    const selectedV = 'prueba de datos'
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = filteredData.slice(indexOfFirstClient, indexOfLastClient);
  
    const columns = [
    { width: 20, sortable: false, renderCell: (params) => {
        if   (isRowEmpty(params.row)) { return null; } 
        else { return ( <input type="checkbox" checked={params.row.isSelected} onChange={() => {}}/> ); }},
    },
    { field: 'documentNumber', headerName: 'RUT', width: 200 },
    { field: 'fullName', headerName: 'Nombre Completo', width: 200, sortable: false,
      valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`,
      renderCell: (params) => ( <a href={`/modify/${params.row.id}`} style={{ textDecoration: 'none' }}> {params.value} </a>),
    },
    {
      field: 'birthDate',
      headerName: 'Fecha de nacimiento',
      width: 200,
      valueFormatter: (params) => {
    
        const date = new Date(params.value);
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
  
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
        return formattedDate;
      },

    },
    { field: 'fechaCreacion', headerName: 'Fecha de Creación', width: 200 },
    { field: 'tipo_persona', headerName: 'Tipo Persona', width: 200 },
    { field: 'state', headerName: 'Estado', width: 200 ,valueFormatter:(params)=>{return params.value? 'Activo':'Inactivo';}, },
  ];

    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
   };

     const handleSearch = () => {
      setSearchTerm(searchValue);
    };

  let uniqueIdCounter = 0;

  while (currentClients.length < clientsPerPage) {
    currentClients.push({
      id: `fake-${uniqueIdCounter++}`,
      documentNumber: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      state: '',
    });
  }

  return (
    <>
      <TextLinkExample />
      <Sidebar />
      <PanelControl/>
  
      <div className='App'>
        <div className='container-sm container-title'>
          <h4 className='title'>Clientes</h4>
          <div className="search-container">
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">Buscar</InputLabel>
              <Input className="inBuscar" value={searchValue} onChange={handleSearchChange} onKeyDown={(e) => { if (e.key === 'Enter') { handleSearch(); }}}
                startAdornment={ 
                <InputAdornment position="start">
                <button className='btn-search' 
                        onClick={handleSearch}> 
                       <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                </button>
                </InputAdornment>}/>
            </FormControl>
          </div>
        </div>

        <Box className='boxgrid' sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            className='dataGrid'
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 15 }, }}}
            rows={currentClients}
            columns={columns}  
            onRowClick={(params) => {
              setSelectedClient(params.row); 
              console.log("Usuario seleccionado:", params.row);
             }}  
          />
          {isModifyOpen && selectedClient && <Modify selectedClient={selectedClient} />}
        </Box>
      </div>
    </>
  );  
};
