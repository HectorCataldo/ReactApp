import React, { useState, useEffect } from 'react';
import { useFetch } from '../assets/useFetch';
import '../CSS/contact-style.scss';
import _ from 'lodash';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Modalcor } from './modal_cor';

export const Correos = () => {
  const { data:Correos }  = useFetch("https://gist.githubusercontent.com/LeandroGabrielAltamiranoPereira/9d7665ceac24aedbc6661293a3744756/raw/9ef7a5a135a70fe7d3cdd803fcf67b6fd09ad883/objetosasegurados.json");
  const [insureobjd, setInsrobjd] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [insrobjPerPage,setinsrobjPerPage] = useState(25);
  const [searchValue, setSearchValue] = useState('');
  const [modalShow, setModalShow] = useState(false);



  useEffect(() => {
    // Actualizar clientsPerPage basado en la longitud de los datos
    if (Correos) {
      const additionalinsureobj = Correos.length - insrobjPerPage; // Calcula la cantidad de clientes adicionales
      const newinsureobjsPerPage = insrobjPerPage + additionalinsureobj; // Incrementa clientsPerPage
      setinsrobjPerPage(newinsureobjsPerPage); // Actualiza clientsPerPage
    }
  }, [Correos]);

  const pag = useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  if (!Correos ) {
    return <div>Cargando...</div>;
  }



  const filteredData = Correos.filter((item) => {
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
  
      { field: 'annexid' ,headerName: 'Correo' ,width: 100 },
      {  headerName: 'Acciones',
         width: 80, renderHeader: () => (<button className='btn-add' onClick={()=> setModalShow(true)} ><AddCircleIcon /></button>)
        ,disableColumnMenu:true 
        ,disableColumnSort: true,},
    ];







  return (
    <>
  
  
      <div className='App-cor'>
        <Box className='boxgrid-a' >
          <DataGrid
           
            disableColumnSort
            className='dataGrid-cor'
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 3 }, }}}
            rows={currentClients}
            columns={insureobj}  
            onRowClick={(params) => {
              setInsrobjd(params.row); 
              console.log("Usuario seleccionado:", params.row);
             }}  
          />
          
        </Box>

        
      </div>
      <Modalcor show={modalShow} onHide={() => setModalShow(false)}/>
    </>
  );  
};
