import React, { useState, useEffect } from 'react';
import { useFetch } from '../assets/useFetch';
import '../CSS/insr-obj-style.scss';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Objmodal } from './insrobj_modal';


export const Insurerclaim = (props) => {
  const { data: insureobjdata } = useFetch("https://gist.githubusercontent.com/LeandroGabrielAltamiranoPereira/9d7665ceac24aedbc6661293a3744756/raw/9ef7a5a135a70fe7d3cdd803fcf67b6fd09ad883/objetosasegurados.json");
  const [insureobjd, setInsrobjd] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [insrobjPerPage, setinsrobjPerPage] = useState(25);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    // Actualizar clientsPerPage basado en la longitud de los datos
    if (insureobjdata) {
      const additionalinsureobj = insureobjdata.length - insrobjPerPage;
      const newinsureobjsPerPage = insrobjPerPage + additionalinsureobj;
      setinsrobjPerPage(newinsureobjsPerPage);
    }
  }, [insureobjdata]);

  const pag = useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (!insureobjdata) {
    return <div>Cargando...</div>;
  }

  const filteredData = insureobjdata.filter((item) => {
    const searchText = searchTerm.toLowerCase();
    return (
      (item.objname && item.objname.toString().toLowerCase().includes(searchText))
    );
  });

  const isRowEmpty = (row) => {
    return (
      !row.annexid &&
      !row.objname &&
      !row.objstatus
    );
  };

  const handleCheckboxChange = (rowIndex) => {
    setSelectedRowIndex(rowIndex);
    // Puedes realizar otras acciones aquí al seleccionar el checkbox
  };

  const indexOfLastClient = currentPage * insrobjPerPage;
  const indexOfFirstClient = indexOfLastClient - insrobjPerPage;
  const currentClients = filteredData.slice(indexOfFirstClient, indexOfLastClient);

  const insureobj = [
    { width: 20, sortable: false, renderCell: (params) => {
      if (isRowEmpty(params.row)) {
        return null;
      } else {
        return (
          <input type="checkbox" checked={selectedRowIndex === params.row.id} onChange={() => handleCheckboxChange(params.row.id)}/>
        );
      }
    }},
    { field: 'annexid', headerName: 'ID de endoso', width: 160 },
    { field: 'objname', headerName: 'Nombre del objeto', width: 150,
     renderCell: (params) => ( <button className='btn-list' onClick={()=> setModalShow(true)}>{params.value}</button> ),},
    { field: 'objstatus', headerName: 'Estado de objeto', width: 150 },
    { field: 'insuredvalue', headerName: 'Suma Asegurada ', width: 150 },
    { field: 'currencytype', headerName: 'Moneda', width: 120 },
    { field: 'tasa', headerName: 'Tasa', width: 150 },
    { field: 'premium', headerName: 'Prima', width: 150 },
    { field: 'corevalue', headerName: 'Valor real', width: 150 },
  ];

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(searchValue);
  };

  return (
    <>
      <div className='App-insr'>
        <div className='container-sm container-title-br'>
          <h4 className='title-obj'>Objetos asegurados</h4>
        </div>
        <Box className='boxgrid-cov' >
          <DataGrid
            className='dataGrid'
            rows={currentClients}
            columns={insureobj}
            onRowClick={(params) => {
              setInsrobjd(params.row);
              console.log("Usuario seleccionado:", params.row);
            }}
          />
        </Box>
      </div>
      <Objmodal show={modalShow} onHide={() => setModalShow(false)}/>
    </>
  );
};
