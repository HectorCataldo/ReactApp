import React, { useState, useEffect } from 'react';
import { useFetch } from '../assets/useFetch';
import '../CSS/insr-obj-style.scss';
import _ from 'lodash';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';


export const Objannex = () => {
  const { data:annexdata  }  = useFetch("https://gist.githubusercontent.com/LeandroGabrielAltamiranoPereira/ef9a72021cb881f72e43e74b6aaf0cc0/raw/239d61d108e4c02bf9d492f7846781b607eb67c8/annex.json");  
  const [insureobjd, setInsrobjd] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [insrobjPerPage,setinsrobjPerPage] = useState(25);




  useEffect(() => {
    // Actualizar clientsPerPage basado en la longitud de los datos
    if (annexdata) {
      const additionalinsureobj = annexdata.length - insrobjPerPage; // Calcula la cantidad de clientes adicionales
      const newinsureobjsPerPage = insrobjPerPage + additionalinsureobj; // Incrementa clientsPerPage
      setinsrobjPerPage(newinsureobjsPerPage); // Actualiza clientsPerPage
    }
  }, [annexdata]);

  const pag = useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  if (!annexdata ) {
    return <div>Cargando...</div>;
  }



  const filteredData = annexdata.filter((item) => {
    const searchText = searchTerm.toLowerCase();
    return (
      (item.annex_id && item.annex_id.toString().toLowerCase().includes(searchText)) 

    );
  });


  const isRowEmpty = (row) => {
    return (
      !row.annex_id 
    );
  };


    const indexOfLastClient = currentPage * insrobjPerPage;
    const indexOfFirstClient = indexOfLastClient - insrobjPerPage;
     const currentClients = filteredData.slice(indexOfFirstClient, indexOfLastClient);



     const coverage = [
        { width: 20, sortable: false, renderCell: (params) => { if   (isRowEmpty(params.row)) { return null; } else { return ( <input type="checkbox" checked={params.row.isSelected} onChange={() => {}}/> ); }},},
        { field: 'annex_id'         ,headerName: 'ID de endoso'                 ,width: 120 },
        { field: 'annexno'          ,headerName: 'Número de endoso'             ,width: 150 },
        { field: 'annextype'        ,headerName: 'Tipo de endoso'               ,width: 130 },
        { field: 'annexdate'        ,headerName: 'Fecha de emision de endoso'   ,width: 200 },
        { field: 'annexstart'       ,headerName: 'Fecha de inicio'              ,width: 110 },
        { field: 'annexend'         ,headerName: 'Fecha de fin'                 ,width: 120 },
        { field: 'annexstatus'      ,headerName: 'Estado de endoso'             ,width: 150 },
        { field: 'annexsubstatus'   ,headerName: 'Estado Axuliar de endoso'     ,width: 180 },
        { field: 'annexreason'      ,headerName: 'Razón de endoso'              ,width: 150 },
        
      ];


   



  return (
    <>

  
      <div className='App-cov'>
        <div className='container-sm container-title'>
          <h4 className='title'>Endoso </h4>
        </div>

        <Box className='boxgrid-cov' >
          <DataGrid
            className='dataGrid'
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
