import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../CSS/register-style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export const SuccessModal = ({ show, onHide }) => {
  return (
    <Modal
    className='scale-up-center'
     size='xs'
     aria-labelledby="contained-modal-title.vcenter"
     centered
     show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
            <h1 className="modal-title1">ÉXITO</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='iconSuccess'>            
            <FontAwesomeIcon icon={faCircleCheck} size='2x' bounce style={{color: "#44ff00",}}/>
        </div>
        <div className='bodymsg'>
            <h1 className="body-msg">El objeto se guardó exitosamente</h1>
        </div>        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

