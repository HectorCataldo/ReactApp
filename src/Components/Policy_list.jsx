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

export const Policylist = () => {
  const { data:policy } = useFetch("https://gist.githubusercontent.com/LeandroGabrielAltamiranoPereira/77279958e557ad12f4df8796260cf21a/raw/24d7911737d5b5b53ae973c8e30486405ded9fc5/policylist.json");

  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage,setClientsPerPage] = useState(25);
  const [searchValue, setSearchValue] = useState('');
  const [isModifyOpen, setIsModifyOpen] = useState(false);



  useEffect(() => {
    // Actualizar clientsPerPage basado en la longitud de los datos
    if (policy) {
      const additionalClients = policy.length - clientsPerPage; // Calcula la cantidad de clientes adicionales
      const newClientsPerPage = clientsPerPage + additionalClients; // Incrementa clientsPerPage
      setClientsPerPage(newClientsPerPage); // Actualiza clientsPerPage
    }
  }, [policy]);
  
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

  if (!policy) {
    return <div>Cargando...</div>;
  }

  const filteredData = policy.filter((item) => {
    const searchText = searchTerm.toLowerCase();
    return (
      (item.policyid && item.policyid.toString().toLowerCase().includes(searchText)) ||
      (item.policynumber && item.policynumber.toString().toLowerCase().includes(searchText)) ||
      (item.cliente && item.cliente.toString().toLowerCase().includes(searchText))
    );
  });


    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = filteredData.slice(indexOfFirstClient, indexOfLastClient);
  
    const columns = [
      { width: 20, sortable: false, renderCell: (params) => {
          if   (isRowEmpty(params.row)) { return null; } 
          else { return ( <input type="checkbox" checked={params.row.isSelected} onChange={() => {}}/> ); }},
      },
      { field: 'policyid', headerName: 'ID de Póliza', width: 150 },
      { field: 'policynumber', headerName: 'Número de Póliza', width: 150},
      { field: 'clientname', headerName: 'Cliente', width: 150},
      { field: 'product', headerName: 'Producto', width: 150, sortable: false},
      { field: 'agents', headerName: 'Agente', width: 150, sortable: false},
      { field:  'dateemision', headerName: 'Fecha emisión',width: 150},
      { field: 'startpolicy', headerName: 'Inicio de vigencia',width: 150,},
      { field: 'endpolicy', headerName: 'Fin de Vigencia', width: 150 },
      {field: 'status', headerName: 'Estado', width: 150,
        valueFormatter: (params) => {
          const stateValue = params.value;
          if (stateValue) {
            return stateValue ? 'Activo' : 'Inactivo';
          } else {
            return ''; // Devuelve una cadena vacía si el valor es NaN o nulo
          }
        },
      },
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
          <h4 className='title'>Póliza</h4>
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
