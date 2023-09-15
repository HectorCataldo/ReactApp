import React,{useEffect, useState} from "react"
import Button from 'react-bootstrap/Button';
import '../CSS/register-style.css';
import axios from "axios";
//MODAL
import Modal from 'react-bootstrap/Modal';




export const Desctivate = (props) => {
    const client = props.selectedClient;

    const [titulo, setTitulo] = useState();
    const [mensaje, setMensaje] = useState();
    const [boton,setBoton] = useState();

    useEffect( () => {
      if(props.show && !client.state){
        setTitulo('ACTIVAR');
        setMensaje('¿Deseas activar a este usuario?');
        setBoton('Activar');
      }
      else if(props.show && client.state){
        setTitulo('DESACTIVAR');
        setMensaje('¿Esta seguro que desea desactivar este usuario?');
        setBoton('Desactivar');
      }
    });

    

    const changeState = async () =>{
      try{
        const response = await axios.put(`http://localhost:8080/api/clients/state/${client.id}`)
        console.log('Respuesta de la API: ', response.data);
        window.location.reload();
      }
      catch(error){
        console.error('Error al enviar la solicitud a la API: ', error);
      }
    }

   
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
        <h1  className="modal-title1" >{titulo}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1 className="body-msg">{mensaje}</h1>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn_desactivate" type="button" onClick={changeState} >{boton}</Button>
        <Button className="btn_desactivate" onClick={props.onHide}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
       
