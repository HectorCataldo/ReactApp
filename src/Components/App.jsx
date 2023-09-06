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

  const [selectedRow, setSelectedRow] = useState(); 
  const handleRowClick = (index) => {setSelectedRow(index); 
    console.log("seleccionado la fila " + index );          
  };                                                        
  
  return (
    <>
       <div className='App'>
      <h1>API Clients</h1>

      <div className='container'>

        <input placeholder='Buscar'></input>

        <button className='btn-buscar'>Buscar</button> 
        
        <button className='btn-crear'     type= "submit" onClick={() => setModalShowC(true)} >Crear</button> 
  
        <button className='btn-modificar' type="submit" onClick={() => setModalShowM(true)}>Modificar</button>

        <button className='btn-desactivar' type="submit" onClick={() => setModalShowD(true)} >Desactivar</button> 
        </div>
      <div className='card'>
        <table>
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
        <Link to = "/">
          <button>Volver</button>
        </Link>
      </div>
      
    </div>
    <Registro   show={modalShowC} onHide={() => setModalShowC(false)}/>
    <Modify     show={modalShowM} onHide={() => setModalShowM(false)}/>
    <Desctivate show={modalShowD} onHide={() => setModalShowD(false)}/>
    </>
  );
};
