import React, { useState, useEffect } from 'react';
import '../Client/CSS/index.scss';
import _                              from 'lodash';
import  TextLinkExample               from '../Navbar/Navbar';
import Sidebar                        from '../Sidebar/sidebar'; 
import PanelControl                   from "../PanelControl/Panel-Control";
import { DataGrid }                   from '@mui/x-data-grid';
import Box                            from   '@mui/material/Box';
import FormControl                    from '@mui/material/FormControl';
import InputLabel                     from '@mui/material/InputLabel';
import Input                          from '@mui/material/Input';
import InputAdornment                 from '@mui/material/InputAdornment';
import SearchIcon                     from '@mui/icons-material/Search';
import Modify                         from './Modify_Client';
import axios from 'axios';

export const App = () => {
  const [client, setClient] = useState([]);

  useEffect(()=>{
    const clientApi = async ()=>{
      try{
        const response = await axios.get(`https://si-client-bkn.kps/api/v1/client/`);
        const data = response.data.data;
        setClient(data);
      }
      catch(error){
        console.error("Error " + error);
      }    
    }
    clientApi();
  },[])
  
  const [selectedClient ,setSelectedClient ] = useState();
  const [searchTerm     ,setSearchTerm     ] = useState('');
  const [currentPage    ,setCurrentPage    ] = useState(1);
  const [clientsPerPage ,setClientsPerPage ] = useState(25);
  const [searchValue    ,setSearchValue    ] = useState('');
  const [isModifyOpen   ,setIsModifyOpen   ] = useState(false);

  useEffect(() => {
    // Actualizar clientsPerPage basado en la longitud de los datos
    if (client) {
      const additionalClients = client.length - clientsPerPage; // Calcula la cantidad de clientes adicionales
      const newClientsPerPage = clientsPerPage + additionalClients; // Incrementa clientsPerPage
      setClientsPerPage(newClientsPerPage); // Actualiza clientsPerPage
    }
  }, [client]);
  
  const pag = useEffect(() => {setCurrentPage(1);}, [searchTerm]);

  useEffect(() => { }, [selectedClient]);

  const filteredData = client.filter((item) => {
    const searchText = searchTerm.toLowerCase();
    return ((String(item.manId) && String(item.manId).toLowerCase().includes(searchText)) ||
           (item.name && item.name.toLowerCase().includes(searchText)));
    });


    const indexOfLastClient  = currentPage       * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = filteredData.map(
      (item) =>{
        if(!item){
          return console.log("NO EXISTEN ITEMS PARA DEPLOYAR");
        }
          return{
            ...item,
            id:      item.manId,      
            manId:   item.manId,
            manComp: item.manComp,
            egn:     item.egn,
            name:    item.name,
            gname:   item.gname,
            sname:   item.sname,
            fname:   item.fname,
            sexo:    item.sexo
          }},
          )
        .filter(Boolean)

    // Valida que cuando este vacia la lista no se muestre el checkbox
    const isRowEmpty = (row) => { return ( !row.manId )};
    
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

    const columns = 
    [
      { width: 20, sortable: false, renderCell: (params) => { if   (isRowEmpty(params.row)) { return null; } 
                                                              else { return ( <input type="checkbox" checked={params.row.isSelected} onChange={() => {}}/> ); }},},
      { field: 'manId'  ,headerName: 'ID'                 , width: 200 },
      { field: 'manComp',headerName: 'Tipo de Persona'    , width: 200, renderCell: (params) => { const tipoPersonaDescripcion = obtenerDescripcionTipoPersona(params.value); return <span>{tipoPersonaDescripcion}</span>; },},
      { field: 'egn'    ,headerName: 'Número de Documento', width: 200 },
      { field: 'name'   ,headerName: 'Nombre Completo'    , width: 200, sortable: false, renderCell:(params) => ( <a href={`/modify/${params.row.id}`} style={{ textDecoration: 'none' }}> {params.value} </a>),},
      { field: 'gname'  ,headerName: 'Nombre'             , width: 200 },
      { field: 'sname'  ,headerName: 'Apellido'           , width: 200 },
      { field: 'fname'  ,headerName: 'Family Name'        , width: 200 },
      { field: 'sexo'   ,headerName: 'Sexo '              , width: 200,  renderCell: (params) => { const sexoDescripcion = obtenerDescripcionSexo(params.value);  return <span>{sexoDescripcion}</span>;}, },
    ];


    const handleSearchChange = (event) => {
          setSearchValue(event.target.value);
    };

    const handleSearch = () => {
          setSearchTerm(searchValue);
    };  

  return (
    <>
      <TextLinkExample />      
      <Sidebar />
      <PanelControl/>
  
      <div className='App'>
        <div className='container-sm container-title'>
          <h4 className='title'>Clientes</h4>
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

        <Box className='boxgrid' sx={{ height: '100%', width: '100%' , fontWeight: '600'}}>
       
          <DataGrid
            className='dataGrid'
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 15 }, }}}
            rows={currentClients}
            columns={columns}
            onRowClick={(params) => {setSelectedClient(params.row);}}  
          />
        </Box>
      </div>
    </>
  );  
};
