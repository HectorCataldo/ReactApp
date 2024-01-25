import React, { useState } from 'react';
import Modal               from 'react-bootstrap/Modal';
import { Clientlist }      from './clientlist';
import '../../CSS/modal-client.scss';

export const ModalClient = (props) => {

  const handleClose = () => {
    props.onHide(); // Llama a la función onHide proporcionada por react-bootstrap para cerrar el modal
  };


  return (
    <>
    <Modal className='modal-container-client'
           {...props}>

        <Modal.Header closeButton>
            <h1 className='title-header'>Clientes</h1>
            
        </Modal.Header>
            <Modal.Body className='modal-body-contact'>
               <Clientlist></Clientlist>
            </Modal.Body>
    </Modal>
    </>
  );
};
