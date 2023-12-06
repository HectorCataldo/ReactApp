import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../CSS/insr-obj-style.scss';
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import { Box,FormHelperText } from "@mui/material"
import '../CSS/insr-obj-style.scss';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';

export const Modalcor = (props) => {

  const handleClose = () => {
    props.onHide(); // Llama a la función onHide proporcionada por react-bootstrap para cerrar el modal
  };


  return (
    <>
    <Modal className='modal-container'
           {...props}>

        <Modal.Header >
            <h1 className='title-header'>Agregar nuevo Correo</h1>
            
            <Stack direction="row" spacing={2}>
            <Button className='btn-header' onClick={handleClose} variant="contained"><CancelIcon className='icons'></CancelIcon>      Cerrar          </Button>
  
            </Stack>
        </Modal.Header>
            <Modal.Body className='modal-body'>
                <Stack direction="row" className='stack-content'>
                <Item className="group-form">
                 <TextField
                    id="email"
                    label="Correo "
                    type="email"
                    variant="filled"
                    name="email"
                    required
                    placeholder="Correo@example.com"
                   
                    />
                </Item>
                </Stack>
            </Modal.Body>
    </Modal>
    </>
  );
};
