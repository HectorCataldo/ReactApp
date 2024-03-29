import React, { useState, useEffect, useMemo } from "react";
import moment                                  from "moment";
import axios                                   from "axios";
import Form                                    from 'react-bootstrap/Form';
import Swal                                    from "sweetalert2";
import TextLinkExample                         from "../Navbar/Navbar";
import Sidebar                                 from "../Sidebar/sidebar";
import { Formik }                              from "formik";
import TextField                               from "@mui/material/TextField";
import Select                                  from "@mui/material/Select";
import MenuItem                                from "@mui/material/MenuItem";
import FormControl                             from "@mui/material/FormControl";
import InputLabel                              from "@mui/material/InputLabel";
import { AdapterDayjs }                        from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider }                from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker }                          from '@mui/x-date-pickers/DatePicker';
import Stack                                   from '@mui/material/Stack';
import Item                                    from '@mui/material/Stack';

import PanelControl                            from "../PanelControl/Panel-Control";
import * as Yup                                from "yup";
import { Box,FormHelperText }                  from "@mui/material";
import dayjs                                   from "dayjs";
import utc                                     from 'dayjs/plugin/utc';
import timezone                                from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
import { Coverage }                            from "../Coverage/Coverage";
import { Insurerclaim }                        from "../InsuredObject/insurerobj_claim";
import { Objannex }                            from "../Annex/annex_obj";
import { ObjPaymnt }                           from "../Payment/paymentplant_obj";
import { ModalClient }                         from "../Client/modalclient";
import SearchIcon                              from '@mui/icons-material/Search';
import '../Policy/CSS/policy-style.scss';

export const Policy = (props) => {
/// selected     
    const[er,setEr] = useState(false);

  //TEXT FIELD DE poliza  
  const [datapolicy, setdatapolicy] = useState({
    policyid:        null,
    policynumber:    null,
    clientname:      null,
    product:         null,
    insrBegin:       null,
    insrEnd:         null,
    insrDuration:    null,
    durDimension:    null,
    agent:           null,
    office:          null,
    salesChannel:    null,
    state:           null,
    subestado:       null,
    dateGiven:       null,
    paymentWay:      null,
    num_instalments: null,
    payment_anual:   null,
    quote_value:     null
  });

  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = async () => {
    try {
      if (
        !datapolicy
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, complete todos los campos antes de enviar.",          
        });
        return;
      }

      console.log("Respuesta de la API:", response.data);
      Swal.fire({
        icon: "success",
        title: "Registrado",
        text: "Póliza Registrada!",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error Al enviar la solicitud POST", error);
    }
  };

  //Validaciones con YUP formatos:
  const validationSchema = Yup.object().shape({
    policyid:        Yup.string().min(2, 'El número debe contener al menos 12 dígitos').matches(/^[+0-9]+$/,'Ingrese un id de póliza válido').required('Ingrese un id de póliza'),
    policynumber:    Yup.string().matches(/^(POL-)?[+0-9]+$/, 'Ingrese un número de póliza válido').min(8, 'El número debe contener al menos 12 caracteres').required('Ingrese un número de póliza'),
    clientname:      Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ 0-9]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El formato es incorrecto').required('Por favor ingresa un nombre'),
    insrBegin:       Yup.date().required('La fecha de inicio de vigencia es requerida').min(new Date(), 'La fecha de inicio de vigencia no puede ser anterior a la fecha actual'),
    insrEnd:         Yup.date().required('La fecha de termino de vigencia es requerida').min(new Date(), 'La fecha de termino de vigencia no puede ser anterior a la fecha actual'),
    insrDuration:    Yup.string().min(1, 'El número debe contener al menos 1 dígito').matches(/^[+0-9]+$/,'Solo se admiten números').required('Ingrese un número de duracion de póliza'),
    durDimension:    Yup.string().required('Seleccione un sistema de tiempo'),
    paymentWay:      Yup.string().required('Seleccione un método de pago'),
    num_instalments: Yup.string().required('Seleccione perioricidad de pagos'),
    payment_anual:   Yup.string().min(6, 'El número debe contener al menos 6 dígitos').matches(/^[+0-9]+$/,'Ingrese un número de teléfono válido').required('Ingrese un valor de prima anual'), 
    quote_value:     Yup.string().min(5, 'El número debe contener al menos 5 dígitos').matches(/^[+0-9]+$/,'Ingrese un valor valido').required('Ingrese un valor de prima mensual'),
    agent:           Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ -()+0-9]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'Formato de agente incorrecto').required('Por favor ingresa un agente'),
    office:          Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ -()+0-9]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'Formato de la oficina es incorrecto').required('Por favor ingresa una oficina'),
    product:         Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ -]*$/,'Formato de producto incorrecto').required('Por favor ingresa un producto'),
    state:           Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'Formato de estado incorrecto').required('Por favor ingresa un estado'),
    subestado:       Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'Formato de subestado incorrecto').required('Por favor ingresa un subestado'),
    dateGiven:       Yup.date().required('La fecha de emision es requerida').min(new Date(), 'La fecha de emision no puede ser anterior a la fecha actual'),
    salesChannel:    Yup.string().required('Por favor ingresa un canal de venta'),
  });

  return (
    <>
    <TextLinkExample />
    <Sidebar />
    <PanelControl handleSubmit={handleSubmit} />

    <Formik onSubmit={(response, { resetForm }) => { response(); console.log("Formulario enviado"); resetForm(); }}

      initialValues={{
                      policyid:       '',
                      policynumber:   '',
                      clientname:     '',
                      product:        '',
                      // insrBegin:   null,
                      // insrEnd:     null,
                      insrDuration:   '',
                      durDimension:   '',
                      agent:          '',
                      office:         '',
                      salesChannel:   '',
                      state:          '',
                      subestado:      '',
                      // dateGiven:   dayjs(new Date()).format("DD/MM/YYYY"),
                      paymentWay:     '',
                      num_instalments:'',
                      payment_anual:  '', 
                      quote_value:    ''
    }}
      validationSchema = {validationSchema}
    >
      
      {({ errors, touched, handleSubmit: formikHandleSubmit, handleChange, handleBlur, values, setFieldValue, setValues}) => (
        <Form className="formulario" onSubmit={formikHandleSubmit}>
           {/* PANEL DE CONTROL */}
           <Stack direction="row"className="Panel-User">
              <div className="user-info-container">
                <span className="title-stack">Resumen de Póliza</span>
              </div>
                <Stack direction="row">
                    <Item className="group-user">
                      <TextField
                        id="dateGiven"
                        label="Fecha Emisión"
                        type="text"
                        variant="filled"
                        fullWidth
                        handleBlur={handleBlur}
                        value={dayjs().format("DD/MM/YYYY")}
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled
                      />
                    </Item>
                </Stack>
           </Stack>  


           <Stack direction="row" spacing={30} className="Containers-stacks2">
               <Stack md="4" className="Containers-Stack">
                   <Item md="12" className="Containers-Item">
                       <span className="title-stack">Datos de la Póliza</span>

                         <Item className="group-form">
                                        <TextField
                                          id="policyid"
                                          className="text-field custom-text-field"
                                          label="Id de Póliza"
                                          name="policyid"
                                          type="text"
                                          variant="filled"
                                          placeholder="100000000181"
                                          value={values.policyid}
                                          onChange={(e)=>{
                                            handleChange(e);
                                            setdatapolicy({...datapolicy, policyid: e.target.value});
                                          }}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[0-9-.]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          required
                                          // inputProps={{ maxLength: 12 }}
                                          error={touched.policyid && !!errors.policyid}
                                          helperText={touched.policyid && errors.policyid}
                                        />
                         </Item>

                         <Item className="group-form">
                                        <TextField
                                          id="policynumber"
                                          label="N° de Póliza"
                                          type="text"
                                          variant="filled"
                                          name="policynumber"
                                          placeholder="POL-0001"
                                          value={values.policynumber}
                                          required
                                          onChange={(e)=>{
                                            handleChange(e);
                                            setdatapolicy({...datapolicy, policynumber: e.target.value});
                                          }}
                                          onBlur={handleBlur}                                       
                                          error={touched.policynumber && !!errors.policynumber}
                                          helperText={touched.policynumber && errors.policynumber}
                                        />
                         </Item>

                         <Item className="group-form">
                                     
                                        <TextField
                                          id="clientname"
                                          label="Cliente"
                                          placeholder="Ana María Díaz"
                                          type="text"
                                          variant="filled"
                                          required
                                          name="clientname"
                                          value={values.clientname}
                                          onChange={(e)=>{
                                            handleChange(e);
                                            setdatapolicy({...datapolicy, clientname: e.target.value});
                                          }}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ +0-9 ()]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          InputProps={{
                                            startAdornment:(
                                              <button className='btn-search' onClick={()=> setModalShow(true)} >
                                             <SearchIcon className="icon-search" sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                           </button>
                                            )
                                          }}
                                          error={touched.clientname && !!errors.clientname}
                                          helperText={touched.clientname && errors.clientname}
                                   
                                        />
                         </Item>

                         <Item md="6" className="group-form">
                                        <TextField
                                          label="Producto"
                                          id="product"
                                          type="text"
                                          variant="filled"
                                          name="product"
                                          placeholder="Salud"
                                          required
                                          value={values.product}
                                          onChange={(e) => {
                                            handleChange(e);
                                            setdatapolicy({ ...datapolicy, product: e.target.value })
                                          }}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ () 0-9 +]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          onBlur={handleBlur}
                                          error={touched.product && !!errors.product}
                                          helperText={touched.product && errors.product}
                                        />
                         </Item>

                         <Item className="group-form">
                                        <Box mb={errors.insrBegin ? 2.5:0}>
                                          <LocalizationProvider dateAdapter={AdapterDayjs} error={!!errors.insrBegin}>
                                            <DatePicker
                                              className="datepicker"
                                              name="insrBegin"
                                              label="Inicio de vigencia"
                                              value={values.insrBegin}
                                              onChange={(value) => {
                                                setFieldValue('insrBegin', value); 
                                                setdatapolicy({...datapolicy, insrBegin: value});
                                              }}
                                              format="DD - MM - YYYY"
                                              onBlur={()=>{
                                                handleBlur;
                                                setEr(true);
                                              }}
                                              disablePast
                                              slotProps={
                                                {
                                                  textField:{
                                                    required: true,
                                                    variant:"filled",
                                                    error: Boolean(errors.insrBegin),
                                                    helperText: errors.insrBegin ? errors.insrBegin: ''
                                                  }
                                                }
                                              }
                                            />
                                          </LocalizationProvider>
                                        </Box>
                         </Item>

                         <Item className="group-form">
                                        <Box mb={errors.insrEnd ? 2.5:0}>
                                          <LocalizationProvider dateAdapter={AdapterDayjs} error={touched.insrEnd && !!errors.insrEnd}>
                                            <DatePicker
                                              className="datepicker"
                                              name="insrEnd"
                                              label="Termino de vigencia"
                                              value={values.insrEnd}
                                              onChange={(value) => {
                                                setFieldValue('insrEnd', value);
                                                setdatapolicy({...datapolicy, insrEnd: value});
                                              }}
                                              format="DD - MM - YYYY"
                                              onBlur={()=>{
                                                handleBlur}
                                              }
                                              disablePast
                                              slotProps={
                                                {
                                                  textField:{
                                                    required: true,
                                                    variant:'filled',
                                                    error: Boolean(errors.insrEnd),
                                                    helperText: errors.insrEnd ? errors.insrEnd: ''
                                                  }
                                                }
                                              }
                                            />
                                          </LocalizationProvider>
                                        </Box>
                         </Item>

                         <Box mb={(touched.insrDuration && !!errors.insrDuration) || (touched.durDimension && errors.durDimension) ? 2.5:0}>
                                      <Item direction="row" className="group-form">
                                        <TextField
                                          id="insrDuration"
                                          label="Duracion de poliza"
                                          type="text"
                                          variant="filled"
                                          name="insrDuration"
                                          placeholder="123"
                                          inputProps={{maxLength : 3}}
                                          onKeyPress={(e) => {
                                            const pattern = /^[1-9]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          onChange={(e) => {
                                            handleChange(e);
                                            setdatapolicy({ ...datapolicy, insrDuration: e.target.value })}}
                                          onBlur={handleBlur}
                                          value={values.insrDuration}
                                          error={touched.insrDuration && !!errors.insrDuration}
                                          helperText={touched.insrDuration && errors.insrDuration}
                                          />
                                        <FormControl className="select-form" error={touched.durDimension && !!errors.durDimension}>
                                        <InputLabel htmlFor="durDimension"> </InputLabel>
                                          <Select
                                            id="durDimension"
                                            variant="filled"
                                            value={values.durDimension}
                                            // onChange={}
                                            onBlur={handleBlur}
                                            label=""
                                            error={touched.durDimension && !!errors.durDimension}
                                            required
                                            >                                          
                                            <MenuItem value="dia">Día</MenuItem>
                                            <MenuItem value="mes">Mes</MenuItem>
                                            <MenuItem value="anio">Año</MenuItem>
                                          </Select>
                                        </FormControl>
                                        {errors.durDimension && touched.durDimension && <FormHelperText>{errors.durDimension}</FormHelperText>}
                                      </Item>
                                      </Box>
                                      
                   </Item>
               </Stack>



                {/* Contenedor 2 */}
                 <Stack md="4" className="Containers-Stack">
                     <Item md="12" className="Containers-Item">                 
                         <span className="title-stack" >Datos Adicionales</span> 

                            <Item className="group-form">
                                        <TextField
                                          id="agent"
                                          label="Agente"
                                          placeholder="Rodrigo Briones"
                                          type="text"
                                          variant="filled"
                                          required
                                          name="agent"
                                          value={values.agent}
                                          onChange={(e)=>{
                                            handleChange(e);
                                            setdatapolicy({...datapolicy, agent: e.target.value});
                                          }}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={touched.agent && !!errors.agent}
                                          helperText={touched.agent && errors.agent}
                                        />
                            </Item>

                            <Item className="group-form">
                                        <TextField
                                          id="office"
                                          label="Oficina"
                                          type="text"
                                          variant="filled"
                                          name="office"
                                          required
                                          placeholder="Casa Matriz"
                                          inputProps={{maxLength : 12}}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ 0-9 ()]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          onChange={(e) => {
                                            handleChange(e);
                                            setdatapolicy({ ...datapolicy, office: e.target.value })}}
                                          onBlur={handleBlur}
                                          value={values.office}
                                          error={touched.office && !!errors.office}
                                          helperText={touched.office && errors.office}
                                        />
                            </Item>

                             <Item className="group-form">
                                      <Box mb={touched.salesChannel && !!errors.salesChannel ? 2.5:0}></Box>
                                      <FormControl className="select-form">
                                        <InputLabel htmlFor="salesChannel">Canal de venta </InputLabel>
                                        <Select
                                          id="salesChannel"
                                          variant="filled"
                                          value={values.salesChannel}
                                          onChange={(e)=>{
                                            setValues((prevValues)=>({...prevValues, salesChannel: e.target.value}));
                                            setdatapolicy({...datapolicy, salesChannel: e.target.value});
                                          }}
                                          onBlur={handleBlur}
                                          label="Canal de venta"
                                          error={touched.salesChannel && !!errors.salesChannel}
                                          required
                                        >
                                          <MenuItem value="Presencial">Presencial</MenuItem>
                                          <MenuItem value="Telefonico">Telefonico</MenuItem>
                                          <MenuItem value="Correo electronico">Correo Electronico</MenuItem>
                                        </Select>
                                      </FormControl>
                                      {errors.salesChannel && touched.salesChannel && <FormHelperText>{errors.salesChannel}</FormHelperText>}

                             </Item>

                            <Item md="6" className="group-form">
                                        <TextField
                                          label="Estado"
                                          id="state"
                                          type="text"
                                          variant="filled"
                                          name="state"
                                          placeholder="Activo"
                                          required
                                          value={values.state}
                                          onChange={(e) => {
                                            handleChange(e);
                                            setdatapolicy({ ...datapolicy, state: e.target.value });
                                          }}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ 0-9 ()]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          onBlur={handleBlur}
                                          error={touched.state && !!errors.state}
                                          helperText={touched.state && errors.state}
                                        />
                            </Item>

                            <Item md="6" className="group-form">
                                        <TextField
                                          label="Sub Estado"
                                          id="subestado"
                                          type="text"
                                          variant="filled"
                                          name="subestado"
                                          placeholder="Pendiente"
                                          required
                                          value={values.subestado}
                                          onChange={(e) => {handleChange(e);setdatapolicy({ ...datapolicy, subestado: e.target.value })}}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ 0-9]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={touched.subestado && !!errors.subestado}
                                          helperText={touched.subestado && errors.subestado}
                                        />
                            </Item>

                            <Item className="group-form">
                                        <Box mb={touched.dateGiven && !!errors.dateGiven ? 2.5:0}>
                                          <LocalizationProvider dateAdapter={AdapterDayjs} error={touched.dateGiven && !!errors.dateGiven}>
                                            <DatePicker
                                              className="datepicker"
                                              name="dateGiven"
                                              label="Fecha de emision"
                                              value={values.dateGiven}
                                              onChange={(value) => {
                                                setFieldValue('dateGiven', value);
                                            
                                              }}
                                              format="DD - MM - YYYY"
                                              onBlur={()=>{
                                                handleBlur}}
                                              disableFuture
                                              slotProps={
                                                {
                                                  textField:{
                                                    required: true,
                                                    variant:'filled',
                                                    error: Boolean(errors.dateGiven),
                                                    helperText: errors.dateGiven ? errors.dateGiven: ''
                                                  }
                                                }
                                              }
                                            />
                                          </LocalizationProvider>
                                        </Box>
                            </Item>                                      
                     </Item>
                 </Stack>
                              

                  {/* Contenedor 3  PRIMA */}
                 <Stack md="4" className="Containers-Stack">
                   <Item md="12" className="Containers-Item">                 
                       <span className="title-stack" >Prima</span> 

                          <Item className="group-form">
                                    <Box mb={touched.paymentWay && errors.paymentWay ? 2.5:0}>
                                      <FormControl className="select-form">
                                        <InputLabel htmlFor="paymentWay">Metodo de Pago </InputLabel>
                                        <Select
                                          id="paymentWay"
                                          variant="filled"
                                          value={values.paymentWay}
                                          onChange={(e)=>{
                                            setValues((prevValues)=>({...prevValues, paymentWay:e.target.value}));
                                            setdatapolicy({...datapolicy, paymentWay: e.target.value});
                                          }}
                                          onBlur={handleBlur}
                                          label="Metodo de pago"
                                          error={touched.paymentWay && !!errors.paymentWay}
                                          required
                                        >
                                          <MenuItem value="PAC">PAC</MenuItem>
                                          <MenuItem value="PAT">PAT</MenuItem>
                                        </Select>
                                      </FormControl>
                                      {errors.paymentWay && touched.paymentWay && <FormHelperText>{errors.paymentWay}</FormHelperText>}
                                    </Box>
                           </Item>

                             <Item className="group-form">
                                        <Box mb={touched.num_instalments && !!errors.num_instalments ? 2.5:0}>
                                        <FormControl variant="filled" className="select-form" error={touched.num_instalments && !!errors.num_instalments}>
                                          <InputLabel htmlFor="num_instalments">Periocidad de Pagos </InputLabel>
                                          <Select
                                            id="num_instalments"
                                            name="num_instalments"
                                            value={values.num_instalments}
                                            onChange={(e)=>{
                                              setValues((prevValues)=>({...prevValues, num_instalments: e.target.value}));
                                              setdatapolicy({...datapolicy, num_instalments: e.target.value});
                                            }}
                                            onBlur={handleBlur}
                                            label="Ppagos" >
                                              <MenuItem value = "Anual">   Anual </MenuItem>
                                              <MenuItem value = "Mensual"> Mensual </MenuItem>                                              
                                          </Select>
                                          {touched.num_instalments && errors.num_instalments && <FormHelperText>{errors.num_instalments}</FormHelperText>}
                                        </FormControl>
                                        </Box>                                   
                             </Item>

                             <Item md="6" className="group-form">
                                        <TextField
                                          label="Prima Anual"
                                          id="payment_anual"
                                          type="text"
                                          variant="filled"
                                          name="payment_anual"
                                          placeholder="$60.000"
                                          required
                                          value={values.payment_anual}
                                          onChange={(e) => {
                                            handleChange(e);
                                            setdatapolicy({ ...datapolicy, payment_anual: e.target.value })
                                          }}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[0-9.]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={touched.payment_anual && !!errors.payment_anual}
                                          helperText={touched.payment_anual && errors.payment_anual}
                                        />
                             </Item>

                             <Item md="6" className="group-form">
                                        <TextField
                                          label="Valor Cuota"
                                          id="quote_value"
                                          type="text"
                                          variant="filled"
                                          name="quote_value"
                                          placeholder="$60.000"
                                          required
                                          value={values.quote_value}
                                          onChange={(e) => {
                                            handleChange(e);
                                            setdatapolicy({ ...datapolicy, quote_value: e.target.value})
                                          }}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[0-9.]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={touched.quote_value && !!errors.quote_value}
                                          helperText={touched.quote_value && errors.quote_value}
                                        />
                             </Item>                           
                   </Item>
                </Stack>
           </Stack>
        </Form>
      )}
    </Formik>
    
    <Objannex></Objannex>
    <Insurerclaim></Insurerclaim>
    <Coverage></Coverage>
    <ObjPaymnt></ObjPaymnt>
    <ModalClient show={modalShow} onHide={() => setModalShow(false)}/>
  </>
  );
};
