import React  from 'react';
import { useFetch } from '../assets/useFetch';
import '../CSS/index.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Registro } from './Create_register';
import { Modify }   from './Modify_register';
import { Desctivate } from './Desactivate_register';


export const App = () => {
  const { data } = useFetch("http://localhost:8080/api/clients");

  //MODAL
  const [modalShowC, setModalShowC] = useState(false);
  const [modalShowM, setModalShowM] = React.useState(false);
  const [modalShowD,setModalShowD] = React.useState(false);

  const [selectedClient, setSelectedClient] = useState(); 

  const handleRowClick = (rowData) => {
    setSelectedClient(rowData); 
    console.log( selectedClient );          
  };
  
  return (
    <>
       <div className='App'>
      <h1>API Clients</h1>

      <div className='container'>

        <input placeholder='Buscar'></input>

        <button className='btn-buscar'>Buscar</button> 
        
        <button className='btn-crear'     type= "submit" onClick={() => setModalShowC(true)} >Crear</button> 
  
        <button className='btn-modificar' type="submit" onClick={() => setModalShowM(true)} disabled={!selectedClient} >Modificar</button>

        <button className='btn-desactivar' type="submit" onClick={() => setModalShowD(true)} disabled={!selectedClient}  >{selectedClient && selectedClient.state ? "Desactivar" : "Activar"}</button> 
        </div>
      <div className='card'>
        <table>
        <thead>
            <tr>
              <th>Número de documento</th>
              <th>Nombres</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Fecha de nacimiento</th>
              <th>Sexo</th>
              <th>Nacionalidad</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Profesión</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => ( 
              <tr key={item.id} onClick={() => handleRowClick(item)} className={selectedClient && selectedClient.id === item.id ? 'selectedClient' : '' }>
                <td>{item.documentNumber}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.secondLastName}</td>
                <td>{item.birthDate}</td>
                <td>{item.gender}</td>
                <td>{item.nationality}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.profession.profession_Name}</td>
                <td>{item.state ? 'Activo' : 'Inactivo'}</td>
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
    <Registro   show={modalShowC} onHide={() => setModalShowC(false)}/>
    <Modify show={modalShowM} onHide={() => setModalShowM(false)} selectedClient={selectedClient} />
    <Desctivate show={modalShowD} onHide={() => setModalShowD(false)}/>
    </>
  );
};
