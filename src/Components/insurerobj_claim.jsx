import React, { useState, useEffect } from 'react';
import { useFetch } from '../assets/useFetch';
import '../CSS/insr-obj-style.scss';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Objmodal } from './insrobj_modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export const Insurerclaim = (props) => {
  const {id} = useParams();
  const { data: insureobjdata } = useFetch("https://gist.githubusercontent.com/LeandroGabrielAltamiranoPereira/9d7665ceac24aedbc6661293a3744756/raw/9ef7a5a135a70fe7d3cdd803fcf67b6fd09ad883/objetosasegurados.json");
  const [insureobjd, setInsrobjd] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [insrobjPerPage, setinsrobjPerPage] = useState(25);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [objectsRows, setObjectsRows] = useState([]);
  const [insuredObject, setInsuredObject] = useState({
    id              :    1,
    annexid         :    null,
    objname         :    null,
    objstatus       :    null,
    insuredvalue    :    null,
    currencytype    :    null,
    tasa            :    null,
    premium         :    null
  })


  useEffect(() => {
    const objectList = async () =>{
      try{      
        const  response = await axios.get(`https://si-client-bkn.kps/api/v1/policy/${id}`);
        const data = response.data.data.policyAnnex;
        const upObjectRows = [];

        for (let i = 0; i < data.length; i++) {
          const e = data[i];
          const e2 = e.insuredObject

          for (let index = 0; index < e2.length; index++) {

            const dato = e2[index];

            const iobdata = {
              id              :    dato.insuredObjId++,
              objectid        :    dato.objectId,
              annexid         :    dato.annexId,
              objname         :    dato.objectType,
              objstatus       :    dato.objectState,
              insuredvalue    :    dato.insuredValue,
              currencytype    :    dato.ivCurrency,
              tasa            :    dato.ivCurrencyRate,
              premium         :    dato.premium,
            }
            setInsuredObject(iobdata);
            upObjectRows.push(iobdata);
          }
        }
        setObjectsRows(upObjectRows);
      }
    
      catch(error){
        console.error('Error: ' + error);
      }
    }
    objectList ();    
  }, []);

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

    { field: 'objectid',      headerName: 'ID de objeto',       width: 160 },
    { field: 'annexid',       headerName: 'ID de endoso',       width: 160 },
    { field: 'objname',       headerName: 'Nombre del objeto',  width: 150,
      renderCell: (params) => ( <button className='btn-list' onClick={()=> setModalShow(true)}>{params.value}</button> ),},
    { field: 'objstatus',     headerName: 'Estado de objeto',   width: 150 },
    { field: 'insuredvalue',  headerName: 'Suma Asegurada ',    width: 150 },
    { field: 'currencytype',  headerName: 'Moneda',             width: 120 },
    { field: 'tasa',          headerName: 'Tasa',               width: 150 },
    { field: 'premium',       headerName: 'Prima',              width: 150 },
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
            initialState={{
              sorting:{ sortModel: [{field: 'annexid', sort: 'desc'}] },
            }}
            rows={objectsRows}
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
