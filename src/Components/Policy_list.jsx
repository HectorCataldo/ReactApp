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
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);


import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const Policylist = () => {
  const { data:policy } = useFetch("https://si-client-bkn.kps/api/v1/policy/");

  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage,setClientsPerPage] = useState(25);
  const [searchValue, setSearchValue] = useState('');
  const [isModifyOpen, setIsModifyOpen] = useState(false);



  useEffect(() => {
    // Actualizar clientsPerPage basado en la longitud de los datos
    if (policy) {
      const additionalClients = policy.data.length - clientsPerPage; // Calcula la cantidad de clientes adicionales
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
      !row.policynumber 
    );
  };

  if (!policy) {
    return <div>Cargando...</div>;
  }

  const filteredData = policy.data.filter((item) => {
    const searchText = searchTerm.toLowerCase();
    return (
      (item.policyId && item.policyId.toString().toLowerCase().includes(searchText)) ||
      (item.policynumber && item.policynumber.toString().toLowerCase().includes(searchText)) ||
      (item.cliente && item.cliente.toString().toLowerCase().includes(searchText)));});
      
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = filteredData.map(
      (item) =>{
        if(!item){
          return console.log("NO EXISTEN ITEMS PARA MOSTRAR");
        }
        return{
          ...item,
          id: item.policyId,      
          policyId: item.policyId,
          policyNo: item.policyNo,
          cliente: item.client.people.name,
          insrType: item.insrType.name,
          agent: item.agent.people.name,
          dateGiven: item.dateGiven,
          startpolicy: item.insrBegin,
          endpolicy: item.insrEnd,
          policyState: item.policyState.name
        }
      },
      // console.log(item)
      )
      .filter(Boolean)

    //Función para dar formato visual a las fechas traidas de Insis en la lista de pólizas
     const dateFormat = (params) => {      
        if (params.value) {
          return dayjs(params.value).utc().format("DD-MM-YYYY");
        }
        return 'NULL'; 
      }

    const columns = [
      { width: 20, sortable: false, renderCell: (params) => {
          if   (isRowEmpty(params.row)) { return null; } 
          else { return ( <input type="checkbox" checked={params.row.isSelected} onChange={() => {}}/> ); }},
      },
      { field: 'policyId', headerName: 'ID de Póliza', width: 150 },
      { field: 'policyNo', headerName: 'Número de Póliza', width: 150,
        renderCell:(params) => ( <a href={`/modifypolicy/${params.row.id}`} style={{ textDecoration: 'none' }}> {params.value} </a>)
      },
      { field: 'cliente', headerName: 'Cliente', width: 150},
      { field: 'insrType', headerName: 'Producto', width: 150, sortable: false,
        valueFormatter: (params) => {
          let stateValue = params.value;
          if (stateValue == 4050){
            stateValue = 'Invierno'
            return stateValue;
          }
        }
      },
      { field: 'agent', headerName: 'Agente', width: 150, sortable: false},
      { field:  'dateGiven', headerName: 'Fecha emisión',width: 150, 
          valueFormatter: dateFormat,
      },
      { field: 'startpolicy', headerName: 'Inicio de vigencia',width: 150,
        valueFormatter: dateFormat,
      },
      { field: 'endpolicy', headerName: 'Fin de Vigencia', width: 150,
        valueFormatter: dateFormat,
      },
      {field: 'policyState', headerName: 'Estado', width: 150,},
    ];

    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
   };

     const handleSearch = () => {
      setSearchTerm(searchValue);
    };

  return (
    <>
      <TextLinkExample />
      <Sidebar />
      <PanelControl/>
  
      <div className='App'>
        <div className='container-sm container-title'>
          <h4 className='title'>Pólizas</h4>
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
