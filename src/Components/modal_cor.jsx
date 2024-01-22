import React, { useState } from 'react';
import Modal               from 'react-bootstrap/Modal';
import TextField           from "@mui/material/TextField";
import Select              from "@mui/material/Select";
import MenuItem            from "@mui/material/MenuItem";
import FormControl         from "@mui/material/FormControl";
import InputLabel          from "@mui/material/InputLabel";
import Stack               from '@mui/material/Stack';
import Item                from '@mui/material/Stack';
import PanelControlModal   from './Panel-Control-modal';
import '../CSS/contact-style.scss';


export const Modalcor = (props) => {

  const handleClose = () => {
    props.onHide(); // Llama a la función onHide proporcionada por react-bootstrap para cerrar el modal
  };


  return (
    <>
    <Modal className='modal-container'
           {...props}>

        <Modal.Header closeButton>
            <h1 className='title-header'>Agregar nuevo Correo</h1>
            
        </Modal.Header>

        <Modal.Body className='modal-body-contact'>
              <PanelControlModal></PanelControlModal>
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
                  
                  <Item className="group-form">
                    <FormControl className="select-form">
                        <InputLabel htmlFor="tipo-persona">Tipo </InputLabel>
                          <Select
                            id="tipo-persona"
                            variant="filled">
                            <MenuItem value={1} >Natural</MenuItem>
                            <MenuItem value={2} >Jurídica</MenuItem>
                          </Select>
                    </FormControl>
                  </Item>
                </Stack>
        </Modal.Body>
    </Modal>
    </>
  );
};
