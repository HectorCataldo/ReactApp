
import React, { useState, useEffect } from 'react';
import { useFetch }                   from '../../assets/useFetch';
import _                              from 'lodash';
import  TextLinkExample               from '../Navbar/Navbar';
import Sidebar                        from '../Sidebar/sidebar'; 
import PanelControl                   from "../PanelControl/Panel-Control";
import { DataGrid }                   from '@mui/x-data-grid';
import Box                            from '@mui/material/Box';
import FormControl                    from '@mui/material/FormControl';
import InputLabel                     from '@mui/material/InputLabel';
import Input                          from '@mui/material/Input';
import InputAdornment                 from '@mui/material/InputAdornment';
import SearchIcon                     from '@mui/icons-material/Search';
import axios from 'axios';


export const Claimlist = () => {
  const [claim           ,setClaim          ] = useState();
  const [selectedClient  ,setSelectedClient ] = useState(null);
  const [searchTerm      ,setSearchTerm     ] = useState('');
  const [currentPage     ,setCurrentPage    ] = useState(1);
  const [clientsPerPage  ,setClientsPerPage ] = useState(25);
  const [searchValue     ,setSearchValue    ] = useState('');
  const [isModifyOpen    ,setIsModifyOpen   ] = useState(false);


  useEffect(() => {
    const claimApi = async () =>{
      try{
        const response = await axios.get(`https://gist.githubusercontent.com/LeandroGabrielAltamiranoPereira/fe71a15cf2701ca4bad3949ea971a5d2/raw/42385b224c4226f248a5072d43a45a71e9c4bef7/siniestros.json`);
        const data = response.data
        setClaim(data);
      }
      catch(error){
        console.error(`Error: ${error}`);
      }
    }
    claimApi();
    // Actualizar clientsPerPage basado en la longitud de los datos
    if (claim) {
      const additionalClients = claim.length   - clientsPerPage;    // Calcula la cantidad de clientes adicionales
      const newClientsPerPage = clientsPerPage + additionalClients; // Incrementa clientsPerPage
      setClientsPerPage(newClientsPerPage);                         // Actualiza clientsPerPage
    }}, [claim]);
  

  useEffect(() => {
  }, [selectedClient]);

  const isRowEmpty = (row) => {
    return (
      !row.claimnumber 

    );
  };

  if (!claim) {
    return <div>Cargando...</div>;
  }

    const filteredData = claim.filter((item) => {
    const searchText = searchTerm.toLowerCase();

    return (
      (item.policyid    &&  item.policyid.toString().toLowerCase().includes(searchText)) ||
      (item.claimnumber &&  item.claimnumber.toString().toLowerCase().includes(searchText)) ||
      (item.clientname  &&  item.clientname.toString().toLowerCase().includes(searchText)));});
      
    const indexOfLastClient  = currentPage       * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients     = filteredData.slice(indexOfFirstClient, indexOfLastClient);
  
    const columns = [
      { width: 20, sortable: false, renderCell: (params) => { if   (isRowEmpty(params.row)) { return null; } 
                                                              else { return ( <input type="checkbox" checked={params.row.isSelected} onChange={() => {}}/> ); }},},
      { field: 'claimid',            headerName: 'ID de Siniestro'    ,width: 140,  renderCell: (params) => ( <a href={`/Modifyclaim/${params.row.id}`} style={{ textDecoration: 'none' }}> {params.value} </a>)},  
      { field: 'claimnumber'         ,headerName: 'N° de Siniestro'   ,width: 140},
      { field: 'clientname'          ,headerName: 'Cliente'           ,width: 150},
      { field: 'policyid'            ,headerName: 'Id de Póliza'      ,width: 155},
      { field: 'policynumber'        ,headerName: 'Número de Póliza'  ,width: 155},
      { field: 'eventname'           ,headerName: 'Evento'            ,width: 150},
      { field: 'fechaCreacion'       ,headerName: 'Creado el'         ,width: 150},
      {field:  'status'              ,headerName: 'Estado'            ,width: 150,
        valueFormatter: (params) => {
          const stateValue = params.value;
          if (stateValue) {
            return stateValue ? 'Aceptada' : 'Pendiente';
          } else {
            return ''; 
          }
        },
        headerClassName: 'bold-header'
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
          <h4 className='title'>Siniestros</h4>
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
            onRowClick={(params) => { setSelectedClient(params.row);}}  
          />
        </Box>
      </div>
    </>
  );  
};
