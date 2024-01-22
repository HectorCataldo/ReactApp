import React, { useState }    from 'react';
import Modal                  from 'react-bootstrap/Modal';
import TextField              from "@mui/material/TextField";
import Select                 from "@mui/material/Select";
import MenuItem               from "@mui/material/MenuItem";
import FormControl            from "@mui/material/FormControl";
import InputLabel             from "@mui/material/InputLabel";
import Stack                  from '@mui/material/Stack';
import Item                   from '@mui/material/Stack';
import { Box,FormHelperText } from "@mui/material"
import Button                 from '@mui/material/Button';
import CancelIcon             from '@mui/icons-material/Cancel';
import '../CSS/insr-obj-style.scss';


export const Objmodal = (props) => {

  const handleClose = () => {
    props.onHide(); // Llama a la función onHide proporcionada por react-bootstrap para cerrar el modal
  };


  return (
    <>
    <Modal className='modal-container'
           {...props}>

        <Modal.Header >
            <h1 className='title-header'>Objeto asegurado</h1>
            
              <Stack direction="row" spacing={2}>
                <Button className='btn-header' onClick={handleClose} variant="contained"><CancelIcon className='icons'></CancelIcon>      Cerrar          </Button>
              </Stack>
              
        </Modal.Header>

        <Modal.Body className='modal-body'>
            <Stack direction="row" className='stack-content'>
            <Item className="group-form">
             <TextField
             className='textfield'
              id="departamentid"
              label="Id Departamento"
              type="text"
              variant="standard"
              name="departamentid"
              value={"4"}
              readOnly
              />
             <TextField
             className='textfield'
              id="departament"
              label="Departamento"
              type="text"
              variant="standard"
              name="departament"
              value={"Colonia"}
              readOnly
              />
              <TextField
              className='textfield'
              id="objID"
              label="Id de objeto"
              type="text"
              variant="standard"
              name="objID"
              value={"5000000587"}
              readOnly
              />
              </Item>

              <Item className="group-form">
             <TextField
             className='textfield'
              id="hectares"
              label="Hectáreas Cultivadas"
              type="text"
              variant="standard"
              name="hectares"
              value={"331"}
              readOnly
              />
             <TextField
             className='textfield'
              id="hectarevalue"
              label="Valor por Hectáreas"
              type="text"
              variant="standard"
              name="hectarevalue"
              value={"700"}
              readOnly
              />

              </Item>

              <Item className="group-form">
             <TextField
              className='textfield'
              id="ranchname"
              label="Nombre de la Chacra"
              type="text"
              variant="standard"
              name="ranchname"
              value={"Los Corraleros"}
              readOnly
              />
              <TextField
              className='textfield'
              id="coordinates"
              label="Coordenadas de ubicación"
              type="text"
              variant="standard"
              name="coordinates"
              multiline
              rows={4}
              value={"(-58.20689625622657 -34.05657689413216,-58.20061809157385 -34.05742697081109,-58.19744023937179 -34.04968022924169,-58.19992726495781 -34.04361561908049,-58.20097042993601 -34.03967198838841,-58.20306461484066 -34.03851810918717,-58.21109879343381 -34.03374970283316,-58.21761092102528 -34.03612131379603,-58.21946349217243 -34.05087740944695,-58.20689625622657 -34.05657689413216)"}
              readOnly
              />

              </Item>
            </Stack>
        </Modal.Body>

     
    </Modal>
    </>
  );
};
