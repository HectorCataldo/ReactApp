import React,{useState} from "react"
import Button from 'react-bootstrap/Button';
import '../CSS/register-style.css';
//MODAL
import Modal from 'react-bootstrap/Modal';




export const Desctivate = (props) => {
   
    return(
    <>
         <Modal
      {...props}
      size="xs"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
        <h1  className="modal-title1" >DESACTIVAR</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1 className="body-msg">¿Esta seguro que desea desactivar este usuario?</h1>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn_desactivate" type="submit" >Desactivar</Button>
        <Button className="btn_desactivate" onClick={props.onHide}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
       
