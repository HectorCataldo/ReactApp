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

export const Modaltel = (props) => {


  return (
    <>
    <Modal className='modal-container'
           {...props}>

        <Modal.Header closeButton >
            <h1 className='title-header'>Agregar nuevo telefono</h1>
            
        </Modal.Header>
      
            <Modal.Body className='modal-body-contact'>
              
            <PanelControlModal></PanelControlModal>

                <Stack direction="row" className='stack-content'>
                <Item className="group-form">
                <TextField
                    id="phoneNumber"
                    label="Teléfono "
                    type="text"
                    variant="filled"
                    name="phoneNumber"
                    required
                    placeholder="911111111"
                    />
             
                </Item>

                <Item className="group-form">
                                      <FormControl className="select-form">
                                        <InputLabel htmlFor="tipo-persona">Tipo </InputLabel>
                                        <Select
                                          id="tipo-persona"
                                          variant="filled"
                  
                                        >
                                          {/*<MenuItem>Seleccione un tipo de persona</MenuItem>*/}
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
