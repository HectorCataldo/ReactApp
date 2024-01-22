import React, { useState } from 'react';
import Modal               from 'react-bootstrap/Modal';
import TextField           from "@mui/material/TextField";
import Select              from "@mui/material/Select";
import MenuItem            from "@mui/material/MenuItem";
import FormControl         from "@mui/material/FormControl";
import InputLabel          from "@mui/material/InputLabel";
import Stack               from '@mui/material/Stack';
import Item                from '@mui/material/Stack';
import { Box }             from "@mui/material"
import PanelControlModal   from './Panel-Control-modal';
import '../CSS/contact-style.scss';


export const Modaldir = (props) => {

  const handleClose = () => {
    props.onHide(); // Llama a la función onHide proporcionada por react-bootstrap para cerrar el modal
  };
  
  return (
    <>
    <Modal className='modal-container'
           {...props}>

        <Modal.Header closeButton > 
            <h1 className='title-header'>Agregar nueva Direccion</h1>
            
        </Modal.Header>
            <Modal.Body className='modal-body-contact'>
              <PanelControlModal></PanelControlModal>
              <Stack direction="row" className='container-modal'>

              <Stack direction="column" className='stack-content'>
              <Item className="group-form">
              <Box >
                <FormControl variant="filled" className="select-form-in" >
                  <InputLabel htmlFor="region">Tipo de direccion </InputLabel>
                  <Select
                    id="region"
                    name="region"
                    label="Región"  >
                      <MenuItem value = "">Cobranza </MenuItem>
                      <MenuItem value = "">Correspondencia </MenuItem>
                      <MenuItem value = "">Fiscal </MenuItem>
                      <MenuItem value = "">Sin geocodificar </MenuItem>
              
                  </Select>
                </FormControl>
                </Box>

                <Item md="6" className="group-form">
                  <TextField
                    label="Dirección "
                    type="text"
                    variant="filled"
                    name="address"
                    required
                  />
                </Item>

                
                <Item md="6" className="group-form">
                  <TextField
                    label="Calle "
                    type="text"
                    variant="filled"
                    name="street"
                    required
                  />
    
                </Item>
                <Item md="6" className="group-form">
                  <TextField
                    label="Departamento"
                    type="text"
                    variant="filled"
                    name="address"
                    required
                  />
                </Item>
                <Item md="6" className="group-form">
                  <TextField
                    label="Codigo de país"
                    type="text"
                    variant="filled"
                    name="address"
                    required
                  />
                </Item>
              </Item>
              </Stack>
              <Stack direction="column" className='stack-content'>
              <Item className="group-form">
                <Item md="6" className="group-form">
                  <TextField
                    label="Nro calle "
                    type="text"
                    variant="filled"
                    name="address"
                    required
                  />
                </Item>

                <Item md="6" className="group-form">
                  <TextField
                    label="Nro Departamento "
                    type="text"
                    variant="filled"
                    name="street"
                    required
                  />
    
                </Item>
                <Item md="6" className="group-form">
                  <TextField
                    label="Departamento"
                    type="text"
                    variant="filled"
                    name="address"
                    required
                  />
                </Item>
                <Item md="6" className="group-form">
                  <TextField
                    label="Codigo de ciudad"
                    type="text"
                    variant="filled"
                    name="address"
                    required
                  />
                </Item>
                <Item md="6" className="group-form">
                  <TextField
                    label="Codigo de postal "
                    type="text"
                    variant="filled"
                    name="address"
                    required
                  />
                </Item>
              </Item>
              </Stack>
              </Stack>


            </Modal.Body>
    </Modal>
    </>
  );
};
