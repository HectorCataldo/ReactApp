import React, { useState, useEffect }      from 'react';
import { useFetch }                        from '../../assets/useFetch';
import '../../CSS/modal-client.scss';
import _                                   from 'lodash';
import { DataGrid }                        from '@mui/x-data-grid';
import Box                                 from '@mui/material/Box';
import FormControl                         from '@mui/material/FormControl';
import InputLabel                          from '@mui/material/InputLabel';
import Input                               from '@mui/material/Input';
import InputAdornment                      from '@mui/material/InputAdornment';
import SearchIcon                          from '@mui/icons-material/Search';


export const Clientlist = () => {

  const { data:client }                     = useFetch("https://si-client-bkn.kps/api/v1/client/");
  const [selectedClient, setSelectedClient] = useState();
  const [searchTerm, setSearchTerm]         = useState('');
  const [currentPage, setCurrentPage]       = useState(1);
  const [clientsPerPage,setClientsPerPage]  = useState(25);
  const [searchValue, setSearchValue]       = useState('');


  useEffect(() => {
    // Actualizar clientsPerPage basado en la longitud de los datos
    if (client) {
      const additionalClients = client.length - clientsPerPage; // Calcula la cantidad de clientes adicionales
      const newClientsPerPage = clientsPerPage + additionalClients; // Incrementa clientsPerPage
      setClientsPerPage(newClientsPerPage); // Actualiza clientsPerPage
    }
  }, [client]);
  
  const pag = useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    
  }, [selectedClient]);

  const isRowEmpty = (row) => {
    return (
      !row.manId &&
      !row.sname &&
      !row.gname &&
      !row.egn
    );
  };

    if (!client) {
      return <div>Cargando...</div>;
    }

    const filteredData = client.data.filter((item) => {
      const searchText = searchTerm.toLowerCase();
      return (
        (String(item.manId) && String(item.manId).toLowerCase().includes(searchText)) ||
        (item.name && item.name.toLowerCase().includes(searchText)) 
        // (item.lastName && item.lastName.toLowerCase().includes(searchText))
      );
    });


    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = filteredData.map(
      (item) =>{
        if(!item){
          return console.log("NO EXISTEN ITEMS PARA DEPLOYAR");
        }
        return{
          ...item,
          id: item.manId,      
          manId: item.manId,
          manComp: item.manComp,
          egn: item.egn,
          name: item.name,
          gname: item.gname,
          sname: item.sname,
          fname: item.fname,
          sexo: item.sexo
        }
      },
      // console.log(item)
      )
      .filter(Boolean)
      // .slice(indexOfFirstClient, indexOfLastClient);
    console.log("filteredData: "+filteredData);

    console.log("Current_clients: "+currentClients);
  
    const columns = 
    [
      { field: 'manId',  headerName: 'ID', width: 100 },
      { field: 'egn', headerName: 'Número de Documento', width: 170 },
      { field: 'gname', headerName: 'Nombre', width: 200 },
      { field: 'sname', headerName: 'Apellido', width: 200 },
      { field: 'fname', headerName: 'Family Name', width: 200 },

    ];

    // Función para obtener la descripción del tipo de persona
const obtenerDescripcionTipoPersona = (codigoTipoPersona) => {
  switch (codigoTipoPersona) {
    case 2:
      return 'Jurídico';
    case 1:
      return 'Natural';
    default:
      return '';
  }
};

const obtenerDescripcionSexo = (codigoSexo) => {
  switch (codigoSexo) {
    case 0:
      return 'Compañía';
    case 1:
      return 'Masculino';
    case 2:
      return 'Femenino';
    default:
      return '';
  }
};

    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
   };

     const handleSearch = () => {
      setSearchTerm(searchValue);
    };  

  return (
    <>


        <Box className='boxgrid-mod'>
       
          <DataGrid
           
            className='dataGrid-mod'
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 15 }, }}}
            rows={currentClients}
            columns={columns}
            onRowClick={(params) => {
              setSelectedClient(params.row); 
              console.log("Usuario seleccionado:", params.row);
             }}  
          />
    
        </Box>

    </>
  );  
};
