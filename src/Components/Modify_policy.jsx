import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Swal from "sweetalert2";
import { useFetch } from "../assets/useFetch";
import TextLinkExample from "./Navbar";
import Sidebar from "./sidebar";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import '../CSS/policy-style.scss';
import PanelControl from "./Panel-Control";
import * as Yup from "yup";
import { Box,FormHelperText } from "@mui/material";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
import { Coverage }                            from "./Coverage";
import { Insurerclaim }                        from "./insurerobj_claim";
import { Objannex }                            from "./annex_obj";
import { ObjPaymnt }                           from "./paymentplant_obj";
export const Modifypolicy = (props) => {
  //  APIS
  const {id} = useParams();
  const {data:policy} = useFetch(`https://si-client-bkn.kps/api/v1/policy/${id}`)
  
  // 
  const [loading, setLoading] = useState(true);
  const [editar, setEditar] = useState(false);

  //TEXT FIELD DE poliza  
  const [datapolicy, setdatapolicy] = useState({
    policyid: null,
    policynumber: null,
    clientname: null,
    product: null,
    insrBegin: null,
    insrEnd: null,
    insrDuration: null,
    durDimension: null,
    agent:null,
    office:null,
    salesChannel: null,
    state:null,
    subestado:null,
    dateGiven:null,
    paymentWay: null,
    num_instalments: null,
    payment_anual: null,
    payment_mensual:null
  })

  //UseEffect que nos ayuda a desplegar lógica cuando allá datos en la API.
  useEffect(()=>{
    if(policy){
      const filterPolicy = policy.data;
      setdatapolicy({
        ...datapolicy,
        policyid: filterPolicy.policyId,
        policynumber: filterPolicy.policyNo,
        clientname: filterPolicy.client.people.name,
        product: filterPolicy.insrType.name,
        insrBegin: filterPolicy.insrBegin,
        insrEnd: filterPolicy.insrEnd,
        insrDuration: filterPolicy.insrDuration,
        durDimension: filterPolicy.durDimension,
        agent:filterPolicy.agent.people.name,
        office:filterPolicy.office.people.name,
        salesChannel: '',
        state: filterPolicy.policyState.name,
        subestado:'',
        dateGiven:filterPolicy.dateGiven,
        paymentWay: '',
        num_instalments: '',
        payment_anual: '',
        payment_mensual:''
      }),
      setLoading(false);
    }
  },[policy])
  console.log(datapolicy)

   
  const handleSubmit = async () => {
    try {
      if (
        !datapolicy.policyid ||
        !datapolicy.policynumber ||
        !datapolicy.clientname ||
        !datapolicy.product ||
        !datapolicy.insrBegin ||
        !datapolicy.insrEnd ||
        !datapolicy.insrDuration||
        !datapolicy.durDimension ||
        !datapolicy.agent ||
        !datapolicy.office ||
        !datapolicy.salesChannel ||
        !datapolicy.state ||
        !datapolicy.subestado ||
        !datapolicy.dateGiven ||
        !datapolicy.paymentWay ||
        !datapolicy.num_instalments ||
        !datapolicy.payment_anual ||
        !datapolicy.payment_mensual
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, complete todos los campos antes de enviar.",          
        });
        return;
      }

      // const response = await axios.post(, {
      // });

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
  const handleEdit = ()=>{
    if(editar){
      setEditar(false);
    }
    else{
      setEditar(true);
    }
    console.log(clientData)
  }
  const[er,setEr] = useState(false);



  //Validaciones con YUP formatos:
  // if (editar) {    
  // }
  const validationSchema = Yup.object().shape({
    policyid: Yup.string().min(2, 'El número debe contener al menos 12 dígitos').matches(/^[+0-9]+$/,'Ingrese un id de póliza válido').required('Ingrese un id de póliza'),
    policynumber: Yup.string().matches(/^(POL-)?[+0-9]+$/, 'Ingrese un número de póliza válido').min(8, 'El número debe contener al menos 12 caracteres').required('Ingrese un número de póliza'),
    clientname:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ 0-9]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El formato es incorrecto').required('Por favor ingresa un nombre'),
    insrBegin: Yup.date().required('La fecha de inicio de vigencia es requerida').min(new Date(), 'La fecha de inicio de vigencia no puede ser anterior a la fecha actual'),
    insrEnd: Yup.date().required('La fecha de termino de vigencia es requerida').min(new Date(), 'La fecha de termino de vigencia no puede ser anterior a la fecha actual'),
    insrDuration: Yup.string().min(1, 'El número debe contener al menos 1 dígito').matches(/^[+0-9]+$/,'Solo se admiten números').required('Ingrese un número de duracion de póliza'),
    durDimension: Yup.string().required('Seleccione un sistema de tiempo'),
    paymentWay:Yup.string().required('Seleccione un método de pago'),
    num_instalments: Yup.string().required('Seleccione perioricidad de pagos'),
    payment_anual: Yup.string().min(6, 'El número debe contener al menos 6 dígitos').matches(/^[+0-9]+$/,'Ingrese un número de teléfono válido').required('Ingrese un valor de prima anual'), 
    payment_mensual:Yup.string().min(5, 'El número debe contener al menos 5 dígitos').matches(/^[+0-9]+$/,'Ingrese un valor valido').required('Ingrese un valor de prima mensual'),
    agent:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ -()+0-9]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'Formato de agente incorrecto').required('Por favor ingresa un agente'),
    office:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ -()+0-9]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'Formato de la oficina es incorrecto').required('Por favor ingresa una oficina'),
    product:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ -]*$/,'Formato de producto incorrecto').required('Por favor ingresa un producto'),
    state:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'Formato de estado incorrecto').required('Por favor ingresa un estado'),
    subestado:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'Formato de subestado incorrecto').required('Por favor ingresa un subestado'),
    dateGiven: Yup.date().required('La fecha de emision es requerida').min(new Date(), 'La fecha de emision no puede ser anterior a la fecha actual'),
    salesChannel:Yup.string().required('Por favor ingresa un canal de venta'),
  });

  return (
    <>
    <TextLinkExample />
    <Sidebar />
    <PanelControl handleSubmit={handleSubmit} handleEdit={handleEdit} />
    <Formik
      enableReinitialize={true}
      onSubmit={(response, { resetForm }) => {
        response();
        console.log("Formulario enviado");
        resetForm();
      }}
      initialValues={{
        policyid: loading? 'Cargando...' : datapolicy.policyid,
        policynumber: loading? 'Cargando...' : datapolicy.policynumber,
        clientname: loading? 'Cargando...' : datapolicy.clientname,
        product: loading? 'Cargando...' : datapolicy.product,
        insrBegin: loading? 'Cargando...' : datapolicy.insrBegin,
        insrEnd: loading? 'Cargando...' : datapolicy.insrEnd,
        insrDuration: loading? 'Cargando...' : datapolicy.insrDuration,
        durDimension: loading? 'Cargando...' : datapolicy.durDimension,
        agent: loading? 'Cargando...' : datapolicy.agent,
        office: loading? 'Cargando...' : datapolicy.office,
        salesChannel: loading? 'Cargando...' : '',
        state: loading? 'Cargando...' : datapolicy.state,
        subestado: loading? 'Cargando...' : '',
        dateGiven: loading? 'Cargando...' : datapolicy.dateGiven,
        paymentWay: loading? 'Cargando...' : '',
        num_instalments: loading? 'Cargando...' : '',
        payment_anual: loading? 'Cargando...' : '',
        payment_mensual: loading? 'Cargando...' : ''
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
                                          id="fechacreacion"
                                          label="Fecha Emisión"
                                          type="text"
                                          variant="filled"
                                          fullWidth                                          
                                          handleBlur={handleBlur}
                                          value={dayjs(values.dateGiven).utc().format("DD/MM/YYYY")}
                                          InputProps={{
                                            readOnly: true,
                                          }}
                                        />
                                      </Item>
                              </Stack>
                      </Stack>  


                          <Stack direction="row" spacing={30} className="Containers-stacks2">

                              {/* Contenedor 1 */}
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
                                          InputProps={{
                                            readOnly:true,
                                          }}
                                          onBlur={handleBlur}
                                          // onKeyPress={(e) => {
                                          //   const pattern = /^[0-9-.]+$/;
                                          //   if (!pattern.test(e.key)) {
                                          //     e.preventDefault();
                                          //   }
                                          // }}
                                          required
                                          // inputProps={{ maxLength: 12 }}
                                          // error={touched.policyid && !!errors.policyid}
                                          // helperText={touched.policyid && errors.policyid}
                                        />
                                      </Item>
             
                                      <Item className="group-form">
                                        <TextField
                                          id="policynumber"
                                          label="N° de Póliza"
                                          type="text"
                                          InputProps={{
                                            readOnly:true,
                                          }}
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
                                          // error={touched.policynumber && !!errors.policynumber}
                                          // helperText={touched.policynumber && errors.policynumber}
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
                                          // disabled={!editar}
                                          InputProps={{
                                            readOnly: !editar,
                                          }}
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
                                          error={editar && touched.clientname && !!errors.clientname}
                                          helperText={editar && touched.clientname && errors.clientname}
                                        />
                                      </Item>

                                      <Item md="6" className="group-form">
                                        <TextField
                                          label="Producto"
                                          id="product"
                                          type="text"
                                          variant="filled"
                                          name="product"
                                          InputProps={{
                                            readOnly: !editar,
                                          }}
                                          placeholder="Salud"
                                          required
                                          value={values.product}
                                          onChange={(e) => {
                                            handleChange(e);
                                            setdatapolicy({ ...datapolicy, product: e.target.value })
                                          }}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          onBlur={handleBlur}
                                          error={editar && touched.product && !!errors.product}
                                          helperText={editar && touched.product && errors.product}
                                        />
                                      </Item>

                                      <Item className="group-form">
                                        <Box mb={editar && errors.insrBegin ? 2.5:0}>                                        
                                        <LocalizationProvider dateAdapter={AdapterDayjs} error={editar && touched.insrBegin && !!errors.insrBegin}>
                                          <DatePicker
                                            readOnly={!editar}
                                            className="datepicker"
                                            name="insrBegin"
                                            label="Inicio de vigencia"
                                            value={dayjs(values.insrBegin).utc()}
                                            onChange={(value) => {
                                              setFieldValue('insrBegin', value); 
                                              setdatapolicy({...datapolicy, insrBegin: dayjs(value).format("YYYY-MM-DD")})
                                            }}
                                            format="DD - MM - YYYY"
                                            onBlur={handleBlur}
                                            disablePast
                                            slotProps={
                                              {
                                                textField:{
                                                  required: true,
                                                  variant:'filled',
                                                  error: editar && Boolean(errors.insrBegin),
                                                  helperText: editar && errors.insrBegin ? errors.insrBegin: ''
                                                }
                                              }
                                            }
                                          />
                                        </LocalizationProvider>
                                        </Box>
                                      </Item>

                                      <Item className="group-form">
                                          <Box mb={editar && errors.insrEnd ? 2.5:0}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} error={editar && touched.insrEnd && !!errors.insrEnd}>
                                              <DatePicker
                                                readOnly = {!editar}
                                                className="datepicker"
                                                name="insrEnd"
                                                label="Termino de vigencia"
                                                value={dayjs(values.insrEnd).utc()}
                                                onChange={(value) => {
                                                  setFieldValue('insrEnd', value);
                                                  setdatapolicy({...datapolicy, insrEnd: dayjs(value).format("YYYY-MM-DD")})
                                                }}
                                                format="DD - MM - YYYY"
                                                onBlur={()=>{
                                                  setIsTouched(true);
                                                  handleBlur}}
                                                disablePast
                                                slotProps={
                                                  {
                                                    textField:{
                                                      variant:'filled',
                                                      required: true,
                                                      error: editar && Boolean(errors.insrEnd),
                                                      helperText: editar && errors.insrEnd ? errors.insrEnd: ''
                                                    }
                                                  }
                                                }
                                              />
                                            </LocalizationProvider>
                                          </Box>
                                      </Item>
                                      <Item direction="row" className="group-form">
                                        <TextField
                                          id="duracion"
                                          label="Duración"
                                          type="text"
                                          variant="filled"
                                          name="insrDuration"
                                          placeholder="123"
                                          InputProps={{
                                            readOnly: !editar ,
                                          }}
                                          inputProps={{maxLength : 3}}
                                          onKeyPress={(e) => {
                                            const pattern = /^[1-9]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          onChange={(e) => {
                                            handleChange(e);
                                            setdatapolicy({ ...datapolicy, insrDuration: e.target.value })
                                          }}
                                          onBlur={handleBlur}
                                          value={values.insrDuration}
                                          error={ editar && touched.insrDuration && !!errors.insrDuration}
                                          helperText={ editar && touched.insrDuration && errors.insrDuration}
                                          />


                                        <FormControl className="select-form" error={ editar && touched.durDimension && !!errors.durDimension}>
                                        <InputLabel htmlFor="durDimension"></InputLabel>
                                        <Select
                                          id="duracion"
                                          variant="filled"
                                          name="durDimension"
                                          value={values.durDimension}
                                          onChange={(e) =>{
                                            setValues((prevValues)=>({...prevValues, durDimension: e.target.value}));
                                            setdatapolicy({...datapolicy, durDimension: e.target.value});
                                          }}
                                          inputProps={{
                                            readOnly: !editar,
                                          }}
                                          onBlur={handleBlur}
                                          label="Tipo de duración"
                                          error={editar && touched.durDimension && !!errors.durDimension}
                                          required>
                                          
                                          <MenuItem value="d">Días</MenuItem>
                                          <MenuItem value="m">Mes</MenuItem>
                                          <MenuItem value="a">Año</MenuItem>
                                        </Select>
                                        {editar && touched.durDimension && errors.durDimension && <FormHelperText>{errors.durDimension}</FormHelperText>}
                                      </FormControl>
                                      </Item>
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
                                          InputProps={{
                                            readOnly:!editar,
                                          }}
                                          value={values.agent}
                                          onChange={(e)=>{
                                            handleChange(e);
                                            setdatapolicy({...datapolicy, agent: e.target.value});
                                          }}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ -()+0-9]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={editar && touched.agent && !!errors.agent}
                                          helperText={editar && touched.agent && errors.agent}
                                        />
                                      </Item>


                                      <Item className="group-form">
                                        <TextField
                                          id="office"
                                          label="Oficina"
                                          type="text"
                                          variant="filled"
                                          InputProps={{
                                            readOnly:!editar,
                                          }}
                                          name="office"
                                          required
                                          placeholder="Casa Matriz"                                          
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ +0-9 () -]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          value={values.office}
                                          onChange={(e) => {
                                            handleChange(e);
                                            setdatapolicy({ ...datapolicy, office: e.target.value })
                                          }}
                                          onBlur={handleBlur}
                                          error={editar && touched.office && !!errors.office}
                                          helperText={editar && touched.office && errors.office}
                                        />
                                      </Item>

                                     
                               
                                      <Item className="group-form">
                                      <Box mb={editar && touched.salesChannel && errors.salesChannel ? 2.5 :0}>
                                      <FormControl className="select-form" error= {editar && touched.salesChannel && !!errors.salesChannel}>
                                        <InputLabel htmlFor="salesChannel">Canal de venta </InputLabel>
                                        <Select
                                          id="salesChannel"
                                          variant="filled"
                                          name="salesChannel"
                                          value={values.salesChannel}
                                          inputProps={{
                                            readOnly:!editar,
                                          }}
                                          onChange={(e)=>{
                                            setValues((prevValues)=>({...prevValues, salesChannel: e.target.value}));
                                            setdatapolicy({...datapolicy, salesChannel: e.target.value})
                                          }}
                                          onBlur={handleBlur}
                                          label="Canal de venta"
                                          required
                                        >
                                          <MenuItem value="Presencial">Presencial</MenuItem>
                                          <MenuItem value="Telefonico">Telefonico</MenuItem>
                                          <MenuItem value="Correo electronico">Correo Electronico</MenuItem>
                                        </Select>
                                        {editar && touched.salesChannel && errors.salesChannel &&<FormHelperText>{errors.salesChannel}</FormHelperText>}
                                      </FormControl>
                                      </Box>
                                    </Item>

                          
                                      <Item md="6" className="group-form">
                                        <TextField
                                          label="Estado"
                                          id="state"
                                          type="text"
                                          variant="filled"
                                          name="state"
                                          placeholder="Activo"
                                          InputProps={{
                                            readOnly:!editar,
                                          }}
                                          required
                                          value={values.state}
                                          onChange={(e) => {
                                            handleChange(e);
                                            setdatapolicy({ ...datapolicy, state: e.target.value })
                                          }}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          onBlur={handleBlur}
                                          error={editar && touched.state && !!errors.state}
                                          helperText={editar && touched.state && errors.state}
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
                                          InputProps={{
                                            readOnly:!editar,
                                          }}
                                          required
                                          value={values.subestado}
                                          onChange={(e) => {
                                            handleChange(e);
                                            setdatapolicy({ ...datapolicy, subestado: e.target.value })
                                          }}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={editar && touched.subestado && !!errors.subestado}
                                          helperText={editar && touched.subestado && errors.subestado}
                                        />
                                      </Item>
                                      <Item className="group-form">
                                        <Box mb={editar && errors.dateGiven ? 2.5:0} error={editar && er && errors.dateGiven}>
                                          <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DatePicker
                                              readOnly={!editar}
                                              className="datepicker"
                                              name="dateGiven"
                                              label="Fecha de emision"
                                              value={dayjs(values.dateGiven).utc()}
                                              onChange={(value) => {
                                                setFieldValue('dateGiven', value); 
                                                setdatapolicy({...datapolicy, dateGiven: dayjs(value).format("YYYY-MM-DD")});                                                
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
                                                    variant:'filled',
                                                    required: true,
                                                    error: editar && er && Boolean(errors.dateGiven),
                                                    helperText: editar && er  && errors.dateGiven//? errors.dateGiven: ''
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
                                    <Box mb={editar && touched.paymentWay && errors.paymentWay ? 2.5:0}>
                                      <FormControl className="select-form" error={editar && touched.paymentWay && !!errors.paymentWay}>
                                        <InputLabel htmlFor="paymentWay">Metodo de Pago </InputLabel>
                                        <Select
                                          id="paymentWay"
                                          variant="filled"
                                          name="paymentWay"
                                          value={values.paymentWay}
                                          onChange={(e)=>{
                                            setValues((prevValues)=>({...prevValues, paymentWay: e.target.value}));
                                            setdatapolicy({...datapolicy, paymentWay: e.target.value});
                                          }}
                                          inputProps={{
                                            readOnly:!editar,
                                          }}
                                          onBlur={handleBlur}
                                          label="Metodo de pago "
                                          required
                                        >
                                          <MenuItem value="PAC">PAC</MenuItem>
                                          <MenuItem value="PAT">PAT</MenuItem>
                                        </Select>
                                        {editar && touched.paymentWay && errors.paymentWay && <FormHelperText>{errors.paymentWay}</FormHelperText>}
                                      </FormControl>
                                      </Box>                                      
                                    </Item>

                                      <Item className="group-form">
                                        <Box mb={editar && touched.num_instalments && errors.num_instalments ? 2.5:0}>
                                        <FormControl variant="filled" className="select-form" error={editar && touched.num_instalments && !!errors.num_instalments}>
                                          <InputLabel htmlFor="num_instalments">Periodicidad de Pagos</InputLabel>
                                          <Select
                                            labelId="demo-simple-select-label"
                                            label="Periodicidad de Pagos"
                                            id="num_instalments"
                                            name="num_instalments"
                                            value={values.num_instalments}
                                            onChange={(e)=>{
                                              setValues((prevValues)=> ({...prevValues, num_instalments: e.target.value}));
                                              setdatapolicy({...datapolicy, num_instalments: e.target.value});
                                            }}
                                            inputProps={{
                                              readOnly:!editar,
                                            }}
                                            onBlur={handleBlur}
                                            >
                                              <MenuItem value = "Anual">   Anual </MenuItem>
                                              <MenuItem value = "Mensual"> Mensual </MenuItem>
                                              
                                          </Select>
                                          {editar && touched.num_instalments && errors.num_instalments && <FormHelperText>{errors.num_instalments}</FormHelperText>}
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
                                          InputProps={{
                                            readOnly:!editar,
                                          }}
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
                                          error={editar && touched.payment_anual && !!errors.payment_anual}
                                          helperText={editar && touched.payment_anual && errors.payment_anual}
                                        />
                                      </Item>

                                      <Item md="6" className="group-form">
                                        <TextField
                                          label="Prima Mensual"
                                          id="payment_mensual"
                                          type="text"
                                          variant="filled"
                                          name="payment_mensual"
                                          placeholder="$60.000"
                                          InputProps={{
                                            readOnly:!editar,
                                          }}
                                          required
                                          value={values.payment_mensual}
                                          onChange={(e) => {
                                            handleChange(e);
                                            setdatapolicy({ ...datapolicy, payment_mensual: e.target.value })
                                          }}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[0-9.]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={editar && touched.payment_mensual && !!errors.payment_mensual}
                                          helperText={editar && touched.payment_mensual && errors.payment_mensual}
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
  </>
  );
};
