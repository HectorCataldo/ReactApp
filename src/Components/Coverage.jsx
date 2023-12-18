import React, { useState, useEffect } from 'react';
import { useFetch } from '../assets/useFetch';
import '../CSS/insr-obj-style.scss';
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

export const Coverage = () => {
  const { data:coveragedata  }  = useFetch("https://gist.githubusercontent.com/LeandroGabrielAltamiranoPereira/92788414fcfd7aee2155c1aa15855ae0/raw/b974adec72b0ef64b5ea13551f7a78ecef3b7e2f/cobertura.json");  
  const [insureobjd, setInsrobjd] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [insrobjPerPage,setinsrobjPerPage] = useState(25);
  const [searchValue, setSearchValue] = useState('');



  useEffect(() => {
    // Actualizar clientsPerPage basado en la longitud de los datos
    if (coveragedata) {
      const additionalinsureobj = coveragedata.length - insrobjPerPage; // Calcula la cantidad de clientes adicionales
      const newinsureobjsPerPage = insrobjPerPage + additionalinsureobj; // Incrementa clientsPerPage
      setinsrobjPerPage(newinsureobjsPerPage); // Actualiza clientsPerPage
    }
  }, [coveragedata]);

  const pag = useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  if (!coveragedata ) {
    return <div>Cargando...</div>;
  }



  const filteredData = coveragedata.filter((item) => {
    const searchText = searchTerm.toLowerCase();
    return (
      (item.coveragename && item.coveragename.toString().toLowerCase().includes(searchText)) 

    );
  });


  const isRowEmpty = (row) => {
    return (
      !row.coveragename 

    );
  };


    const indexOfLastClient = currentPage * insrobjPerPage;
    const indexOfFirstClient = indexOfLastClient - insrobjPerPage;
     const currentClients = filteredData.slice(indexOfFirstClient, indexOfLastClient);



     const coverage = [
        { width: 10, sortable: false, renderCell: (params) => {
            if   (isRowEmpty(params.row)) { return null; } 
            else { return ( <input type="checkbox" checked={params.row.isSelected} onChange={() => {}}/> ); }},},
        { field: 'idapen'            ,headerName: 'ID de apéndice'         ,width: 120 },
        { field: 'coveragename'      ,headerName: 'Nombre de cobertura'    ,width: 150 },
        { field: 'riskstatus'        ,headerName: 'Estado de riesgo'       ,width: 150 },
        { field: 'coveragevalue'     ,headerName: 'Valor asegurado'        ,width: 150 },
        { field: 'currencytype'      ,headerName: 'Moneda'                 ,width: 100 },
        { field: 'dimpremium'        ,headerName: 'Dimension de la prima'  ,width: 170 },
        { field: 'porcenttips'       ,headerName: 'Porcentaje de tarifa'   ,width: 150 },
        { field: 'prima'             ,headerName: 'Prima'                  ,width: 150 },
        { field: 'anuarypremium'     ,headerName: 'Prima Anual'            ,width: 150 },
        
      ];


    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
   };

     const handleSearch = () => {
      setSearchTerm(searchValue);
    };



  return (
    <>

  
      <div className='App-cov'>
        <div className='container-sm container-title-br'>
          <h4 className='title-obj'>Coberturas </h4>
        </div>

        <Box className='boxgrid-cov' >
          <DataGrid
            className='dataGrid-annex'
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 }, }}}
            rows={currentClients}
            columns={coverage}  
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
