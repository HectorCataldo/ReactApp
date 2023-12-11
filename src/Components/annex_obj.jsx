import React, { useState, useEffect } from 'react';
import { useFetch } from '../assets/useFetch';
import '../CSS/insr-obj-style.scss';
import _ from 'lodash';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export const Objannex = (props) => {
  const {id} = useParams();
  console.log(id);
  const [insureobjd, setInsrobjd]         = useState(null);
  const [searchTerm, setSearchTerm]       = useState('');
  const [currentPage, setCurrentPage]     = useState(1);
  const [annex, setAnnex] = useState({
    id         :1,
    annex_id   :null,
    annexno    :null,
    annextype  :null,
    annexdate  :null,
    annexstart :null,
    annexend   :null,
    annexstatus:null,
    annexsubsta:null,
    annexreason:null
  });

  

  useEffect(() => {
    //Llamada y set de datos de la Api hacia const annex:
    const annexData = async () => {
      try{
        const response = await axios.get(`https://si-client-bkn.kps/api/v1/policy/${id}`);
        const data = response.data.data.policyAnnex;
        if(data && data.length > 0){
          const firstAnnex = data[0];
          const dataAnnex = {
            id          : firstAnnex.annexId,
            annex_id    : firstAnnex.annexId,
            annexno     : null,
            annextype   : firstAnnex.insrType,
            annexdate   : null,
            annexstart  : null,
            annexend    : null,
            annexstatus : null,
            annexsubsta : null,
            annexreason : null
          };
          setAnnex(dataAnnex);
        }
      }
      catch(error){
        console.error('Error al hacer la solicitud:', error);
      }
    };
    annexData();
/*
    // Actualizar clientsPerPage basado en la longitud de los datos    
    const additionalinsureobj = annexdata.length - insrobjPerPage; // Calcula la cantidad de clientes adicionales
    const newinsureobjsPerPage = insrobjPerPage + additionalinsureobj; // Incrementa clientsPerPage
    setinsrobjPerPage(newinsureobjsPerPage); // Actualiza clientsPerPage
*/
  }, []);

  console.log(annex);

  const pag = useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  // if (!annexdata ) {
  //   return <div>Cargando...</div>;
  // }

  const isRowEmpty = (row) => {
    return (
      !row.annex_id 
    );
  };

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
        <div className='container-sm container-title-br'>
          <h4 className='title'>Endoso </h4>
        </div>

        <Box className='boxgrid-cov' >
          <DataGrid
            className='dataGrid'
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 }, }}}
            rows={[annex]}
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
