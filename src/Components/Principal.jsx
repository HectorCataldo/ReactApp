import React from 'react';
import { Link } from 'react-router-dom';
import  TextLinkExample  from './Navbar';


export const Principal = () => {
  return (
    <>
    <TextLinkExample/>
    <div className='Principal'>
        <h1>API REST Clients</h1>
        <p>This is a API REST for testings by KPS</p>
        <Link to="/app">
            <button>Clientes</button>
        </Link>
    </div>
    </>
  );
};
