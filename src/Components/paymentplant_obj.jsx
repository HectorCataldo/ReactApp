import React, { useState, useEffect } from 'react';
import { useFetch }                   from '../assets/useFetch';
import _                              from 'lodash';
import { DataGrid }                   from '@mui/x-data-grid';
import Box                            from '@mui/material/Box';
import '../CSS/insr-obj-style.scss';

export const ObjPaymnt = () => {
  const { data:paymentdata  }  = useFetch("https://gist.githubusercontent.com/LeandroGabrielAltamiranoPereira/074eb42afbfca2158f56ef8eab70b571/raw/90721d2585e91c4a9614bb3a3039c3d2e2803942/paymentplan.json");  
  const [insureobjd     ,setInsrobjd       ] = useState(null);
  const [searchTerm     ,setSearchTerm     ] = useState('');
  const [currentPage    ,setCurrentPage    ] = useState(1);
  const [insrobjPerPage ,setinsrobjPerPage ] = useState(25);


  useEffect(() => {
    if (paymentdata) {
      const additionalinsureobj  = paymentdata.length - insrobjPerPage;        // Calcula la cantidad de clientes adicionales
      const newinsureobjsPerPage = insrobjPerPage     + additionalinsureobj;  // Incrementa clientsPerPage
      setinsrobjPerPage(newinsureobjsPerPage);                               // Actualiza clientsPerPage
    }
  }, [paymentdata]);


  if (!paymentdata ) {
    return <div>Cargando...</div>;
  }

  const filteredData = paymentdata.filter((item) => {
    const searchText = searchTerm.toLowerCase();
    return (
      (item.currency && item.currency.toString().toLowerCase().includes(searchText)) 

    );
  });

  const isRowEmpty = (row) => {
    return (
      !row.currency 
    );
  };


     const indexOfLastClient  = currentPage       * insrobjPerPage;
     const indexOfFirstClient = indexOfLastClient - insrobjPerPage;
     const currentClients     = filteredData.slice(indexOfFirstClient, indexOfLastClient);



     const coverage = [
        { width: 20, sortable: false, renderCell: (params) => { if   (isRowEmpty(params.row)) { return null; } else { return ( <input type="checkbox" checked={params.row.isSelected} onChange={() => {}}/> ); }},},
        { field: 'pplanId'           ,headerName: 'ID de Plan de pago'      ,width: 200 },
        { field: 'policyId'          ,headerName: 'ID de póliza'            ,width: 200 },
        { field: 'annexId'           ,headerName: 'ID de endoso'            ,width: 200 },
        { field: 'amount'            ,headerName: 'Monto'                   ,width: 200 },
        { field: 'currency'          ,headerName: 'Moneda'                  ,width: 200 },
        { field: 'due_date'          ,headerName: 'Fecha de Vencimiento'    ,width: 200 },
        { field: 'status'            ,headerName: 'Estado'                  ,width: 120 },
      ];


  return (
    <>
      <div className='App-cov'>
        <div className='container-sm container-title-br'>
           <h4 className='title-obj'>Plan de pago </h4>
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
