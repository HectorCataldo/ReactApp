import React from 'react';
import { useFetch } from './assets/useFetch';
import './index.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Registro } from './Create_register';


export const App = () => {
  const { data } = useFetch("http://localhost:8080/api/clients");

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
        <table>
          <thead>
            <tr>
              <th>Document Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Birth Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id}>
                <td>{item.documentNumber}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.birthDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to = "/">
          <button>Volver</button>
        </Link>
      </div>
      
    </div>
    <Registro show={show} handleClose={handleClose}/>
    </>
  );
};
