import React, { useState, useEffect }     from 'react';
import        { DataGrid }                from '@mui/x-data-grid';
import Box                                from '@mui/material/Box';
import axios                              from 'axios';
import        { useParams }               from 'react-router-dom';

export const Coverage = () => {
  const {id} = useParams();
  const [coversList, setCoverList] = useState([]);

  useEffect(()=>{
   const coversApi = async () => {
    const apiList = [];
    let annid = null;
    try{
      const response = await axios.get(`https://si-client-bkn.kps/api/v1/policy/${id}`);
      const data =  response.data.data.policyAnnex;
      annid = data.annexId;
      console.log(annid);

      for (let i = 0; i < data.length; i++) {
        const e         = data[i]        ;
        const eInsuredO = e.insuredObject;

        for (let i2 = 0; i2 < eInsuredO.length; i2++) {
          const e2      = eInsuredO[i2];
          const eCovers = e2.covers;

          for (let i3 = 0; i3 < eCovers.length; i3++) {
            const e3          = eCovers[i3];
            const CoverObject = {
              id           : (i3+ 1)            ,
              idapen       : e2.annexId         ,
              coveragename : e3.cover.name      ,
              riskstatus   : e3.riskState       ,
              coveragevalue: e3.rateFullPremium ,
              currencytype : e3.avCurrency      ,
              dimpremium   : "USD"              ,
              porcenttips  : e3.tariffPercent   ,
              prima        : e3.premium         ,
              anuarypremium: e3.annualPremium   ,
            }
            apiList.push(CoverObject);
          }
        }
      }
      setCoverList(apiList);
    }
    catch(error){
      console.error("Error " + error);
    }
   }
   coversApi();
  },[])

if (!coversList ) {
    return <div>Cargando...</div>;
  }


  const isRowEmpty = (row) => {
    return (
      !row.coveragename 

    );
  };
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
            rows={coversList}
            columns={coverage}  
            onRowClick={(params) => {
              setInsrobjd(params.row); 
              console.log("Fila seleccionada:", params.row);
             }}  
          />
          
        </Box>

        
      </div>
    </>
  );  
};
