import React from 'react';
import { useFetch } from './assets/useFetch';
import './index.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Registro } from './Create_register';



export const App = () => {
  const { data } = useFetch("http://localhost:8080/api/clients");

  //Seleccionador de filas en tablas
  const [selectedRow, setSelectedRow] = useState(); //(AGREGAR App.jsx LINEA 14)Para manejar estados de las filas de la tabla

  const handleRowClick = (index) => {setSelectedRow(index); //(AGREGARC 16) Cuando haces clic en una fila, establece el índice de esa fila como seleccionado
    console.log("seleccionado la fila " + index );          //(AGREGAR)
  };                                                        //(AGREGAR 18)
  //

  //MODAL
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
       <div className='App'>
      <h1>API Clients</h1>

      <div className='container'>
        <input placeholder='Buscar'></input>
        <button className='btn-buscar'>Buscar</button> 
        
        <button className='btn-crear' type= "submit" onClick={handleShow} >Crear</button> 
  
        <button className='btn-modificar'>Modificar</button> 
        <button className='btn-desactivar'>Desactivar</button> 
        </div>
      <div className='card'>
        <table >
          <thead>
            <tr>
              <th>Número de documento</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Fecha de nacimiento</th>
              <th>Sexo</th>
              <th>Nacionalidad</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Profesión</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => ( //(AGREGAR ABAJO DEL tbody)
              <tr key={item.id} onClick={() => handleRowClick(index)} className={selectedRow === index ? 'selected-row' : '' }> {/*(AGREGAR)*/}
                <td>{item.documentNumber}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.birthDate}</td>
                <td>{item.gender}</td>
                <td>{item.nationality}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.profession.profession_Name}</td>
              </tr>
            ))}
          </tbody>

        </table>        
      </div>
      <div className='container'>
      <Link to = "/">
          <button>Volver</button>
        </Link>      
      </div>
    </div>
    <Registro show={show} handleClose={handleClose}/>
    </>
  );
};

