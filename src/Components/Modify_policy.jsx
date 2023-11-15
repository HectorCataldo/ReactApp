import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
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

export const Modifypolicy = (props) => {
  //  APIS

  const [objetos, setObjetos] = useState();
  const [selectedcreateDate] = useState(moment(new Date()));
/// selected 

    const [selectedstartpolicy, setSelectedstartpolicy] = useState(new Date());
    const [selectedendpolicy, setSelectedendpolicy]     = useState(new Date());
    const [selectedDatetipe, setSelectedDatetipe] = useState("");
    const [selectedPpagos, setSelectedPpagos] = useState("");
    const [selectedpaymentmethod,setPaymentmethod] = useState("");
    const [selectedchannelsale,setSelectedChannelsale]= useState("");

  //TEXT FIELD DE poliza
  const [policydata, setpolicydata] = useState({
    policyid: "",
    policynumber: "",
    clientname: "",
    datetipe:"",
    paymentmethod:"",
    datepolicy: "",
    primanual: "",
    primam:"",
    fechaCreacion:"",
    agents:"",
    office:"",
    channelsale:"",


  });
  const [datapolicy, setdatapolicy] = useState({
    policyid: null,
    policynumber: null,
    clientname: null,
    datepolicy: null,
    primanual: null,
    primam: null,
    startpolicy:null,
    endpolicy: null,
    datetipe:null,
    Ppagos:null,
    fechaCreacion: null
  })

  const [isTouched, setIsTouched] = useState(false);


  const handleSubmit = async () => {
    try {
      if (
        !datapolicy.policyid ||
        !datapolicy.policynumber ||
        !datapolicy.clientname ||
        !datapolicy.datepolicy ||
        !datapolicy.primanual ||
        !datapolicy.primam ||
        !datapolicy.fechaCreacion||
        !selectedstartpolicy||
        !selectedendpolicy||
        !selectedDatetipe||
        !selectedpaymentmethod||
        !selectedPpagos||
        console.log(datapolicy),
        console.log(objetos)


      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, complete todos los campos antes de enviar.",          
        });
        return;
      }

      const response = await axios.post("http://localhost:8080/api/clients", {
        policyid: datapolicy.policyid,
        policynumber: datapolicy.policynumber,
        clientname: datapolicy.clientname,
        startpolicy: selectedstartpolicy,
        endpolicy: selectedendpolicy,       
        datepolicy: datapolicy.datepolicy,
        datetipe: selectedDatetipe,
        primaanual: datapolicy.primanual,
        paymentmethod: selectedpaymentmethod,
        Ppagos: selectedPpagos,
        primam: datapolicy.primam,
        fechaCreacion: selectedcreateDate,
        
      });

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


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);



  //Validaciones con YUP formatos:
  const validationSchema = Yup.object().shape({

    policyid: Yup.string().min(2, 'El número debe contener al menos 12 dígitos').matches(/^[+0-9]+$/,'Ingrese un id de póliza válido').required('Ingrese un id de póliza'),
    policynumber: Yup.string().matches(/^(POL-)?[+0-9]+$/, 'Ingrese un número de póliza válido').min(8, 'El número debe contener al menos 12 caracteres').required('Ingrese un número de póliza'),
    clientname:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El nombre solo debe contener letras').required('Por favor ingresa un nombre'),
    startpolicy: Yup.date().required('La fecha de inicio de vigencia es requerida').max(new Date(), 'La fecha de inicio de vigencia no puede ser posterior a la fecha actual'),
    endpolicy: Yup.date().required('La fecha de termino de vigencia es requerida').max(new Date(), 'La fecha de termino de vigencia no puede ser posterior a la fecha actual'),
    datepolicy: Yup.string().min(1, 'El número debe contener al menos 1 dígito').matches(/^[+0-9]+$/,'Ingrese un número').required('Ingrese un número de duracion de póliza'),
    datetipe: Yup.string().required('Seleccione un sistema de tiempo'),
    paymentmethod:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El metodo de pago solo debe contener letras').required('Por favor ingresa un metodo de pago'),
    primanual: Yup.string().min(6, 'El número debe contener al menos 6 dígitos').matches(/^[+0-9]+$/,'Ingrese un número de teléfono válido').required('Ingrese un valor de prima anual'), 
    primam:Yup.string().min(5, 'El número debe contener al menos 5 dígitos').matches(/^[+0-9]+$/,'Ingrese un valor valido').required('Ingrese un valor de prima mensual'),
    agents:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El nombre solo debe contener letras').required('Por favor ingresa un nombre'),
    office:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El nombre solo debe contener letras').required('Por favor ingresa un nombre de la oficina'),
    product:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El producto solo debe contener letras').required('Por favor ingresa un producto'),
    status:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El Estado solo debe contener letras').required('Por favor ingresa un estado'),
    substatus:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El subestado solo debe contener letras').required('Por favor ingresa un subestado'),
    dateemision: Yup.date().required('La fecha de emision es requerida').max(new Date(), 'La fecha de emision no puede ser posterior a la fecha actual'),
    dateconst: Yup.date().required('La fecha de contratacion es requerida').max(new Date(), 'La fecha de contratacion no puede ser posterior a la fecha actual'),
    channelsale:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El subestado solo debe contener letras').required('Por favor ingresa un canal de vent'),

  }); 

  return (
    <>
    <TextLinkExample />
    <Sidebar />
    <PanelControl handleSubmit={handleSubmit} objetos={objetos} />


    <Formik
      onSubmit={(response, { resetForm }) => {
        response();
        console.log("Formulario enviado");
        resetForm();
      }}
      initialValues={{
        id: "",
        documentNumber: "",
        primaanual:"",
        firstName: "",
        lastName: "",
        secondLastName: "",
        nationality: "",
        phoneNumber: "",
        email: "",
        address: "",
        region:"",
        comuna:"",
        gender:"",
        country: "",
        profession: "",
        jdocument:"",
        jrazonsocial:"",
        jfname:"",
        jemail:"",
        jphone:"",
        jaddress:"",
        jregion:"",
        jcomuna:"",
        jgiro:"",
        jnationality:""
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
                                          label="Fecha Creacion"
                                          type="text"
                                          variant="filled"
                                          fullWidth
                                          handleBlur={handleBlur}
                                          value={moment(selectedcreateDate).format("DD/MM/YYYY")}
                                          InputProps={{
                                            readOnly: true,
                                          }}
                                          disabled
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
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[0-9-.]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          required
                                          inputProps={{ maxLength: 12 }}
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
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
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
                                          onChange={(e) => {handleChange(e);setdatapolicy({ ...datapolicy, product: e.target.value })}}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
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
                                        <LocalizationProvider dateAdapter={AdapterDayjs} error={touched.startpolicy && !!errors.startpolicy}>
                                          <DatePicker
                                            className="datepicker"
                                            name="startpolicy"
                                            label="Inicio de vigencia"
                                            value={values.startpolicy}
                                            onChange={(value) => {setFieldValue('startpolicy', value); setSelectedBirthDate(value)}}
                                            format="DD - MM - YYYY"
                                            onBlur={()=>{
                                              setIsTouched(true);
                                              handleBlur}}
                                            disableFuture
                                            slotProps={
                                              {
                                                textField:{
                                                  required: true,
                                                  error: Boolean(errors.startpolicy),
                                                  helperText: errors.startpolicy ? errors.startpolicy: ''
                                                }
                                              }
                                            }
                                          />
                                        </LocalizationProvider>
                                      </Item>

                                      <Item className="group-form">
                                        <LocalizationProvider dateAdapter={AdapterDayjs} error={touched.endpolicy && !!errors.endpolicy}>
                                          <DatePicker
                                            className="datepicker"
                                            name="endpolicy"
                                            label="Termino de vigencia"
                                            value={values.endpolicy}
                                            onChange={(value) => {setFieldValue('endpolicy', value); setSelectedBirthDate(value)}}
                                            format="DD - MM - YYYY"
                                            onBlur={()=>{
                                              setIsTouched(true);
                                              handleBlur}}
                                            disableFuture
                                            slotProps={
                                              {
                                                textField:{
                                                  required: true,
                                                  error: Boolean(errors.endpolicy),
                                                  helperText: errors.endpolicy ? errors.endpolicy: ''
                                                }
                                              }
                                            }
                                          />
                                        </LocalizationProvider>
                                      </Item>
                                      <Item direction="row" className="group-form">
                                        <TextField
                                          id="datepolicy"
                                          label="Duracion de poliza"
                                          type="text"
                                          variant="filled"
                                          name="datepolicy"
                                          placeholder="123"
                                          inputProps={{maxLength : 3}}
                                          onKeyPress={(e) => {
                                            const pattern = /^[+1-9]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          onChange={(e) => {handleChange(e);setdatapolicy({ ...datapolicy, datepolicy: e.target.value })}}
                                          onBlur={handleBlur}
                                          value={values.datepolicy}
                                          error={touched.datepolicy && !!errors.datepolicy}
                                          helperText={touched.datepolicy && errors.datepolicy}
                                          />


                                        <FormControl className="select-form">
                                        <InputLabel htmlFor="datetipe"> </InputLabel>
                                        <Select
                                          id="datetipe"
                                          variant="filled"
                                          value={values.datetipe}
                                          onChange={selectedDatetipe}
                                          onBlur={handleBlur}
                                          label=""
                                          error={touched.datetipe && !!errors.datetipe}
                                          required>
                                          
                                          <MenuItem value="dia">Día</MenuItem>
                                          <MenuItem value="mes">Mes</MenuItem>
                                          <MenuItem value="anio">Año</MenuItem>
                                        </Select>
                                      </FormControl>
                                      {errors.datetipe && touched.datetipe && (
                                        <div className="error">{errors.datetipe}</div>
                                      )}
                                      </Item>
                                </Item>
                              </Stack>



                              {/* Contenedor 2 */}
                              <Stack md="4" className="Containers-Stack">
                                <Item md="12" className="Containers-Item">                 
                                   <span className="title-stack" >Datos Adicionales</span> 

                                  <Item className="group-form">
                                        <TextField
                                          id="agents"
                                          label="Agente"
                                          placeholder="Rodrigo Briones"
                                          type="text"
                                          variant="filled"
                                          required
                                          name="agents"
                                          value={values.agents}
                                          onChange={(e)=>{
                                            handleChange(e);
                                            setdatapolicy({...datapolicy, agents: e.target.value});
                                          }}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={touched.agents && !!errors.agents}
                                          helperText={touched.agents && errors.agents}
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
                                          // onKeyPress={(e) => {
                                          //   const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                          //   if (!pattern.test(e.key)) {
                                          //     e.preventDefault();
                                          //   }
                                          // }}
                                          onChange={(e) => {handleChange(e);setdatapolicy({ ...datapolicy, office: e.target.value })}}
                                          onBlur={handleBlur}
                                          value={values.office}
                                          error={touched.office && !!errors.office}
                                          helperText={touched.office && errors.office}
                                        />
                                      </Item>

                                     
                               
                                      <Item className="group-form">
                                      <FormControl className="select-form">
                                        <InputLabel htmlFor="channelsale">Canal de venta </InputLabel>
                                        <Select
                                          id="channelsale"
                                          variant="filled"
                                          value={values.channelsale}
                                          onChange={selectedchannelsale}
                                          onBlur={handleBlur}
                                          label="Canal de venta"
                                          error={touched.channelsale && !!errors.channelsale}
                                          required
                                        >
                                          <MenuItem value="Presencial">Presencial</MenuItem>
                                          <MenuItem value="Telefonico">Telefonico</MenuItem>
                                          <MenuItem value="Correo electronico">Correo Electronico</MenuItem>
                                        </Select>
                                      </FormControl>
                                      {errors.channelsale && touched.channelsale && (
                                        <div className="error">{errors.channelsale}</div>
                                      )}

                                    </Item>

                          
                                      <Item md="6" className="group-form">
                                        <TextField
                                          label="Estado"
                                          id="status"
                                          type="text"
                                          variant="filled"
                                          name="status"
                                          placeholder="Activo"
                                          required
                                          value={values.status}
                                          onChange={(e) => {handleChange(e);setdatapolicy({ ...datapolicy, status: e.target.value })}}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          onBlur={handleBlur}
                                          error={touched.status && !!errors.status}
                                          helperText={touched.status && errors.status}
                                        />
                                      </Item>

                                      <Item md="6" className="group-form">
                                        <TextField
                                          label="Sub Estado"
                                          id="substatus"
                                          type="text"
                                          variant="filled"
                                          name="substatus"
                                          placeholder="Pendiente"
                                          required
                                          value={values.substatus}
                                          onChange={(e) => {handleChange(e);setdatapolicy({ ...datapolicy, substatus: e.target.value })}}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={touched.substatus && !!errors.substatus}
                                          helperText={touched.substatus && errors.substatus}
                                        />
                                      </Item>
                                      <Item className="group-form">
                                        <LocalizationProvider dateAdapter={AdapterDayjs} error={touched.dateemision && !!errors.dateemision}>
                                          <DatePicker
                                            className="datepicker"
                                            name="dateemision"
                                            label="Fecha de emision"
                                            value={values.dateemision}
                                            onChange={(value) => {setFieldValue('dateemision', value); setSelectedBirthDate(value)}}
                                            format="DD - MM - YYYY"
                                            onBlur={()=>{
                                              setIsTouched(true);
                                              handleBlur}}
                                            disableFuture
                                            slotProps={
                                              {
                                                textField:{
                                                  required: true,
                                                  error: Boolean(errors.dateemision),
                                                  helperText: errors.dateemision ? errors.dateemision: ''
                                                }
                                              }
                                            }
                                          />
                                        </LocalizationProvider>
                                      </Item>

                                      <Item className="group-form">
                                        <LocalizationProvider dateAdapter={AdapterDayjs} error={touched.dateconst && !!errors.dateconst}>
                                          <DatePicker
                                            className="datepicker"
                                            name="dateconst"
                                            label="Fecha de Contratación"
                                            
                                            value={values.dateconst}
                                            onChange={(value) => {setFieldValue('dateconst', value); setSelectedBirthDate(value)}}
                                            format="DD - MM - YYYY"
                                            onBlur={()=>{
                                              setIsTouched(true);
                                              handleBlur}}
                                            disableFuture
                                            slotProps={
                                              {
                                                textField:{
                                                  required: true,
                                                  error: Boolean(errors.dateconst),
                                                  helperText: errors.dateconst ? errors.dateconst: ''
                                                }
                                              }
                                            }
                                          />
                                        </LocalizationProvider>
                                      </Item>
                                </Item>
                              </Stack>
                              

                             {/* Contenedor 3  PRIMA */}
                            <Stack md="4" className="Containers-Stack">
                                <Item md="12" className="Containers-Item">                 
                                   <span className="title-stack" >Prima</span> 


                                   <Item className="group-form">
                                      <FormControl className="select-form">
                                        <InputLabel htmlFor="paymentmethod">Metodo de Pago </InputLabel>
                                        <Select
                                          id="paymentmethod"
                                          variant="filled"
                                          value={values.paymentmethod}
                                          onChange={selectedpaymentmethod}
                                          onBlur={handleBlur}
                                          label="Metodo de pago "
                                          error={touched.paymentmethod && !!errors.paymentmethod}
                                          required
                                        >
                                          <MenuItem value="PAC">PAC</MenuItem>
                                          <MenuItem value="PAT">PAT</MenuItem>
                                        </Select>
                                      </FormControl>
                                      {errors.paymentmethod && touched.paymentmethod && (
                                        <div className="error">{errors.paymentmethod}</div>
                                      )}
                                    </Item>

                                      <Item className="group-form">
                                        
                                        <FormControl variant="filled" className="select-form" error={touched.Ppagos && !!errors.Ppagos}>
                                          <InputLabel htmlFor="Ppagos">Periocidad de Pagos </InputLabel>
                                          <Select
                                            id="Ppagos"
                                            name="Ppagos"
                                            value={values.Ppagos}
                                            onChange={selectedPpagos}
                                            onBlur={handleBlur}
                                            label="Ppagos" >
                                              <MenuItem value = "Anual">   Anual </MenuItem>
                                              <MenuItem value = "Mensual"> Mensual </MenuItem>
                                              
                                          </Select>
                                          {touched.region && errors.Ppagos && <FormHelperText>{errors.Ppagos}</FormHelperText>}
                                        </FormControl>
                                       
                                      </Item>

                                      <Item md="6" className="group-form">
                                        <TextField
                                          label="Prima Anual"
                                          id="primanual"
                                          type="text"
                                          variant="filled"
                                          name="primanual"
                                          placeholder="$60.000"
                                          required
                                          value={values.primanual}
                                          onChange={(e) => {handleChange(e);setdatapolicy({ ...datapolicy, primanual: e.target.value })}}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[0-9.]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={touched.primanual && !!errors.primanual}
                                          helperText={touched.primanual && errors.primanual}
                                        />
                                      </Item>

                                      <Item md="6" className="group-form">
                                        <TextField
                                          label="Prima Mensual"
                                          id="primam"
                                          type="text"
                                          variant="filled"
                                          name="primam"
                                          placeholder="$60.000"
                                          required
                                          value={values.primam}
                                          onChange={(e) => {handleChange(e);setdatapolicy({ ...datapolicy, primam: e.target.value })}}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[0-9.]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={touched.primam && !!errors.primam}
                                          helperText={touched.primam && errors.primam}
                                        />
                                      </Item>

                           
                                </Item>
                              </Stack>
                          </Stack>  
                                                          
                        
             
        </Form>
      )}
    </Formik>
  </>
  );
};
