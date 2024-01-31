import React, { useState, useEffect } from 'react';
import { useFetch }                   from '../../assets/useFetch';
import _                              from 'lodash';
import { DataGrid }                   from '@mui/x-data-grid';
import Box                            from '@mui/material/Box';
import AddCircleIcon                  from '@mui/icons-material/AddCircle';
import { Modaltel }                   from './modal_tel';
import '../../CSS/contact-style.scss';
import axios from 'axios';

export const Telefonos = () => {

  const [telefono        ,setTelefono       ] = useState();
  const [insureobjd      ,setInsrobjd       ] = useState(null);
  const [searchTerm      ,setSearchTerm     ] = useState('');
  const [currentPage     ,setCurrentPage    ] = useState(1);
  const [insrobjPerPage  ,setinsrobjPerPage ] = useState(25);
  const [searchValue     ,setSearchValue    ] = useState('');
  const [modalShow       ,setModalShow      ] = useState(false);



  useEffect(() => {
    const telApi = async () =>{
      try {
        const response = await axios.get(`https://gist.githubusercontent.com/LeandroGabrielAltamiranoPereira/9d7665ceac24aedbc6661293a3744756/raw/9ef7a5a135a70fe7d3cdd803fcf67b6fd09ad883/objetosasegurados.json`);
        const data = response.data;
        setTelefono(data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    }
    telApi();
    // Actualizar clientsPerPage basado en la longitud de los datos
    if (telefono) {
      const additionalinsureobj  = telefono.length - insrobjPerPage; // Calcula la cantidad de clientes adicionales
      const newinsureobjsPerPage = insrobjPerPage  + additionalinsureobj; // Incrementa clientsPerPage
      setinsrobjPerPage(newinsureobjsPerPage); // Actualiza clientsPerPage
    }
  }, [telefono]);

  const pag = useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  if (!telefono ) {
    return <div>Cargando...</div>;
  }



  const filteredData = telefono.filter((item) => {
    const searchText = searchTerm.toLowerCase();
    return (
      (item.objname && item.objname.toString().toLowerCase().includes(searchText)) 

    );
  });

    const indexOfLastClient  = currentPage       * insrobjPerPage;
    const indexOfFirstClient = indexOfLastClient - insrobjPerPage;
    const currentClients     = filteredData.slice(indexOfFirstClient, indexOfLastClient);

    const insureobj = [
  
      { field: 'annexid' ,headerName: 'telefono' ,width: 100 },
      {  headerName: 'Acciones',
         width: 80, renderHeader: () => (<button className='btn-add' onClick={()=> setModalShow(true)} ><AddCircleIcon /></button>)
        ,disableColumnMenu:true 
        ,disableColumnSort: true,},
    ];


  return (
    <>
  
  
      <div className='App-tel'>
        <Box className='boxgrid-a'  xs={12} md={8}>
          <DataGrid
            
            disableColumnSort
            className='dataGrid-tel'
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
      <Modaltel show={modalShow} onHide={() => setModalShow(false)}/>
    </>
  );  
};
