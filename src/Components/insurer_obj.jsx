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

export const Insurer = () => {
  const { data:insureobjdata }  = useFetch("https://gist.githubusercontent.com/LeandroGabrielAltamiranoPereira/9d7665ceac24aedbc6661293a3744756/raw/9ef7a5a135a70fe7d3cdd803fcf67b6fd09ad883/objetosasegurados.json");
  const [insureobjd, setInsrobjd] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [insrobjPerPage,setinsrobjPerPage] = useState(25);
  const [searchValue, setSearchValue] = useState('');



  useEffect(() => {
    // Actualizar clientsPerPage basado en la longitud de los datos
    if (insureobjdata) {
      const additionalinsureobj = insureobjdata.length - insrobjPerPage; // Calcula la cantidad de clientes adicionales
      const newinsureobjsPerPage = insrobjPerPage + additionalinsureobj; // Incrementa clientsPerPage
      setinsrobjPerPage(newinsureobjsPerPage); // Actualiza clientsPerPage
    }
  }, [insureobjdata]);

  const pag = useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  if (!insureobjdata ) {
    return <div>Cargando...</div>;
  }



  const filteredData = insureobjdata.filter((item) => {
    const searchText = searchTerm.toLowerCase();
    return (
      (item.objname && item.objname.toString().toLowerCase().includes(searchText)) 

    );
  });


  const isRowEmpty = (row) => {
    return (
      !row.annexid   &&
      !row.objname   &&
      !row.objstatus 

    );
  };



    const indexOfLastClient = currentPage * insrobjPerPage;
    const indexOfFirstClient = indexOfLastClient - insrobjPerPage;
     const currentClients = filteredData.slice(indexOfFirstClient, indexOfLastClient);



    const insureobj = [
      { width: 20, sortable: false, renderCell: (params) => {
          if   (isRowEmpty(params.row)) { return null; } 
          else { return ( <input type="checkbox" checked={params.row.isSelected} onChange={() => {}}/> ); }}, },
      { field: 'annexid'            ,headerName: 'ID de endoso'   ,width: 160 },
      { field: 'objname'            ,headerName: 'Nombre del objeto'         ,width: 150 },
      { field: 'objstatus'          ,headerName: 'Estado de objeto'          ,width: 150 },
      { field: 'insuredvalue'       ,headerName: 'Suma Asegurada '           ,width: 150 },
      { field: 'currencytype'       ,headerName: 'Moneda'                    ,width: 120 },
      { field: 'tasa'               ,headerName: 'Tasa'                      ,width: 150 },
      { field: 'premium'            ,headerName: 'Prima'                     ,width: 150 },
      { field: 'corevalue'          ,headerName: 'Valor real'                ,width: 150 },
    ];



    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
   };

     const handleSearch = () => {
      setSearchTerm(searchValue);
    };



  return (
    <>
  
  
      <div className='App-insr'>
        <div className='container-sm container-title-br'>
          <h4 className='title'>Objetos asegurados</h4>
          {/* <div className="search-container">
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
          </div> */}
        </div>

        <Box className='boxgrid' sx={{ height: '90%', width: '500%' }}>
          <DataGrid
            className='dataGrid'
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 }, }}}
            rows={currentClients}
            columns={insureobj}  
            onRowClick={(params) => {
              setInsrobjd(params.row); 
              console.log("Usuario seleccionado:", params.row);
             }}  
          />
          
        </Box>

        
      </div>
    </>
  );  
};
