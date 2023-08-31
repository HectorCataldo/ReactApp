import React from 'react';
import { useFetch } from './assets/useFetch';
import './index.css';
import { Link } from 'react-router-dom';


export const App = () => {
  const { data } = useFetch("http://localhost:8080/api/clients");

  return (
    <div className='App'>
      <h1>API Clients</h1>
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
  );
};
