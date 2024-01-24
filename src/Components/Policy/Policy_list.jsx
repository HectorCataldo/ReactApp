import React, { useState, useEffect }       from 'react';
import '../Client/CSS/index.scss';
import _                                    from 'lodash';
import  TextLinkExample                     from '../Navbar';
import Sidebar                              from '../Sidebar/sidebar'; 
import PanelControl                         from "../PanelControl/Panel-Control";
import { DataGrid}                          from '@mui/x-data-grid';
import Box                                  from '@mui/material/Box';
import FormControl                          from '@mui/material/FormControl';
import InputLabel                           from '@mui/material/InputLabel';
import Input                                from '@mui/material/Input';
import InputAdornment                       from '@mui/material/InputAdornment';
import SearchIcon                           from '@mui/icons-material/Search';
import Modify                               from '../Client/Modify_Client';
import dayjs                                from 'dayjs';
import utc                                  from 'dayjs/plugin/utc';
import timezone                             from 'dayjs/plugin/timezone';
import axios                                from 'axios';
import { ButtonExport }                     from '../ButtonExport';
import { Button }                           from 'react-bootstrap';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
dayjs.extend(utc);
dayjs.extend(timezone);

export const Policylist = () => {
  const [policy, setPolicy] = useState([]);

  useEffect(() =>{
    const policyList = async () => {
      try{
        const response = await axios.get(`https://si-client-bkn.kps/api/v1/policy/`);
        const data = response.data.data;
        setPolicy(data);
      }
      catch(error){
        console.error("Error " + error);
      }
    }
    policyList();
  }
  ,[])

  const [selectedClient  ,setSelectedClient ]  = useState(null);
  const [searchTerm      ,setSearchTerm     ]  = useState('');
  const [currentPage     ,setCurrentPage    ]  = useState(1);
  const [clientsPerPage  ,setClientsPerPage ]  = useState(25);
  const [searchValue     ,setSearchValue    ]  = useState('');
  const [isModifyOpen    ,setIsModifyOpen   ]  = useState(false);


  useEffect(() => {
    if (policy) {
      const additionalClients = policy.length  - clientsPerPage; // Calcula la cantidad de clientes adicionales
      const newClientsPerPage = clientsPerPage + additionalClients; // Incrementa clientsPerPage
      setClientsPerPage(newClientsPerPage); // Actualiza clientsPerPage
    }
  }, [policy]);
  
  const pag = useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

    useEffect(() => { }, [selectedClient]);

    const isRowEmpty = (row) => {
      return ( !row.policyId );
    };

    if (!policy) {
      return <div>Cargando...</div>;
    }

    const filteredData = policy.filter((item) => {
      const searchText = searchTerm.toLowerCase();
      return (
        (item.policyId     && item.policyId.toString().toLowerCase().includes(searchText))     ||
        (item.policynumber && item.policynumber.toString().toLowerCase().includes(searchText)) ||
        (item.cliente      && item.cliente.toString().toLowerCase().includes(searchText))
      );
    });


      
    const indexOfLastClient  = currentPage       * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients     = filteredData.map(
      (item) => {
        if (!item) {
          return console.log("NO EXISTEN ITEMS PARA MOSTRAR");
        }
        return {
          ...item,
          id:          item.policyId,
          policyId:    item.policyId,
          policyNo:    item.policyNo,
          cliente:     item.client.people.name,
          insrType:    item.insrType.name,
          agent:       item.agent.people.name,
          dateGiven:   item.dateGiven,
          id:          item.policyId,      
          policyId:    item.policyId,
          policyNo:    item.policyNo,
          cliente:     item.client.people.name,
          insrType:    item.insrType.name,
          agent:       item.agent.people.name,
          dateGiven:   item.dateGiven,
          startpolicy: item.insrBegin,
          endpolicy:   item.insrEnd,
          policyState: item.policyState.name
        };
      })
      .filter(Boolean);


    const dateFormat = (params) => {
      if (params.value) {
        return dayjs(params.value).utc().format("DD-MM-YYYY");
      }
      return 'NULL';
    };



    // Lista de estados que deshabilitan el botón
    const disabledStates = ['Quotation', 'Prepare Application','Open For Modification','Registered (contract)']; 

    const isExportDisabled = (policyState) => {
      return disabledStates.includes(policyState);
    };

    const columns = [
      { width: 20, sortable: false, renderCell: (params) => { if (isRowEmpty(params.row)) { return null; } else { return (<input type="checkbox" checked={params.row.isSelected} onChange={() => { }} />); } }, },
      { field: 'policyId', headerName: 'ID de Póliza', width: 120 },
      { field: 'policyNo', headerName: 'Número de Póliza', width: 150, renderCell: (params) => (<a href={`/modifypolicy/${params.row.id}`} style={{ textDecoration: 'none' }}> {params.value} </a>)},
      { field: 'cliente' , headerName: 'Cliente', width: 160 },
      { field: 'insrType', headerName: 'Producto', width: 250, sortable: false,
        valueFormatter: (params) => {
          let stateValue = params.value;
          if (stateValue == 4050) {
            stateValue = 'Invierno';
            return stateValue;
          }
        }
      },
      { field: 'agent', headerName: 'Agente', width: 150, sortable: false },
      {
        field: 'dateGiven', headerName: 'Fecha emisión', width: 150,
        valueFormatter: dateFormat,
      },
      {
        field: 'startpolicy', headerName: 'Inicio de vigencia', width: 150,
        valueFormatter: dateFormat,
      },
      {
        field: 'endpolicy', headerName: 'Fin de Vigencia', width: 150,
        valueFormatter: dateFormat,
      },
      { field: 'policyState', headerName: 'Estado', width: 200, },
      {
        field: 'export', headerName: 'Póliza', width: 110,
        renderCell: (params) => (<Button className='btn-export'  disabled={isExportDisabled(params.row.policyState)}><SimCardDownloadIcon /></Button>),
      },
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
        <PanelControl />

        <div className='App'>
          <div className=' container-title-pol'>
            <div className="search-container">
            <h4 className='title-pol'>Pólizas</h4>
              <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">Buscar</InputLabel>
                <Input className="inBuscar" value={searchValue} onChange={handleSearchChange} onKeyDown={(e) => { if (e.key === 'Enter') { handleSearch(); } }}
                  startAdornment={
                    <InputAdornment position="start">
                      <button className='btn-search'
                        onClick={handleSearch}>
                        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      </button>
                    </InputAdornment>}/>
              </FormControl>
            </div>
            <div className='export-container'>
                  <ButtonExport filteredData={filteredData}></ButtonExport>
                </div>
          </div>

          <Box className='boxgrid' sx={{ height: '100%', width: '100%' }}>
            <DataGrid
              className='dataGrid'
              initialState={{ pagination: { paginationModel: { page: 0, pageSize: 15 }, } }}
              rows={currentClients}
              columns={columns}
              onRowClick={(params) => {
                setSelectedClient(params.row);
                console.log("Usuario seleccionado:", params.row);
              }} />
            {isModifyOpen && selectedClient && <Modify selectedClient={selectedClient} />}
          </Box>
        </div>
      </>
    );
  };
