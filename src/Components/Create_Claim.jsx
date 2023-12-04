import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Swal from "sweetalert2";
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
import { useFetch } from "../assets/useFetch";
import PanelControl from "./Panel-Control";
import * as Yup from "yup";
import { Box,FormHelperText } from "@mui/material"
import { Insurerclaim } from "./insurerobj_claim";

export const Claim = (props) => {
  //  APIS

  const [objetos, setObjetos] = useState();
  const [selectedcreateDate] = useState(moment(new Date()));
  const { data: country } = useFetch( "https://gist.githubusercontent.com/HectorCataldo/ceee7aa2b93e83d7d04f752e3adbe623/raw/81b6bc11b965720e6717975f665fe85869c71e81/paises.json" )

/// selected 

    const [selecteddatenotification, setselecteddatenotification] = useState(new Date());
    const [selecteddateevent, setselecteddateevent]     = useState(new Date());  
    const [selectedclaimtype,setSelectedClaimtype] = useState("");
    const [selectedclaimorigin,setSelectedClaimorigin] = useState("");
    const [selectedstatus,setSelectedStatus] = useState("");
    const [selectedsubstatus,setSelectedsubstatus] = useState("");
    const [selectedcountry, setSelectedCountry]= useState("");



   
  //TEXT FIELD DE poliza
  const [claimdata, setclaimdata] = useState({
    claimid:"",
    claimnumber:"",
    policyid: "",
    policynumber: "",
    clientname: "",
    product:"",
    claimtype:"",
    claimorigin:"",
    dateevent:"",
    datenotification:"",
    claimstatus:"",
    claimsubstatus:"",
    country:"",
    place:"",
    description:"",

  });
  const [dataclaim, setdataclaim] = useState({
    claimid:null,
    claimnumber:null,
    policyid: null,
    policynumber: null,
    clientname: null,
    product:null,
    claimtype:null,
    claimorigin:null,
    dateevent:null,
    datenotification:null,
    claimstatus:null,
    claimsubstatus:null,
    country:null,
    place:null,
    description:null,
    fechaCreacion: null
  })

  const [isTouched, setIsTouched] = useState(false);


  const handleSubmit = async () => {
    try {
      if (
        !dataclaim.claimid ||
        !dataclaim.claimnumber ||
        !dataclaim.policyid ||
        !dataclaim.policynumber ||
        !dataclaim.clientname ||
        !dataclaim.product ||
        !dataclaim.fechaCreacion||
        !dataclaim.place||
        !dataclaim.description||
        !selecteddatenotification||
        !selecteddateevent||
        !selectedclaimtype||
        !selectedclaimorigin||
        !selectedstatus||
        !selectedsubstatus||
        !selectedcountry||
        console.log(dataclaim),
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
        policyid: dataclaim.policyid,
        quotationnumber: dataclaim.quotationnumber,
        clientname: dataclaim.clientname,
        product:dataclaim.product,
        startpolicy: selecteddatenotification,
        endpolicy: selecteddateevent,       
        datepolicy: dataclaim.datepolicy,
        primaanual: dataclaim.primanual,
        paymentmethod: selectedpaymentmethod,
        Ppagos: selectedPpagos,
        primam: dataclaim.primam,
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

    claimid: Yup.string().min(2, 'El número debe contener al menos 12 dígitos').matches(/^[+0-9]+$/,'Ingrese un id de póliza válido').required('Ingrese un id de siniestro'),
    claimnumber: Yup.string().min(2, 'El número debe contener al menos 12 dígitos').matches(/^[+0-9]+$/,'Ingrese un id de póliza válido').required('Ingrese un número de siniestro'),
    policyid: Yup.string().min(2, 'El número debe contener al menos 12 dígitos').matches(/^[+0-9]+$/,'Ingrese un id de póliza válido').required('Ingrese un id de póliza'),
    policynumber: Yup.string().matches(/^(POL-)?[+0-9]+$/, 'Ingrese un número de cotización válido').min(8, 'El número debe contener al menos 12 caracteres').required('Ingrese un número de cotización'),
    clientname:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El nombre solo debe contener letras').required('Por favor ingresa un nombre'),
    product:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El producto solo debe contener letras').required('Por favor ingresa un producto'),
    datenotification: Yup.date().required('La fecha de notificación es requerida').max(new Date(), 'La fecha de notificación no puede ser posterior a la fecha actual'),
    dateevent: Yup.date().required('La fecha de evento es requerida').max(new Date(), 'La fecha de evento no puede ser posterior a la fecha actual'),
    place: Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El lugar solo debe contener letras').required('Por favor ingresa un lugar'),
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
        claimid          :"",    
        claimnumber      :"",
        policyid         :"",
        policynumber     :"",
        clientname       :"",
        product          :"",
        fechaCreacion    :"",
 
  
       
    }}
    validationSchema = {validationSchema}
    >
      {({ errors, touched, handleSubmit: formikHandleSubmit, handleChange, handleBlur, values, setFieldValue, setValues}) => (
        <Form className="formulario" onSubmit={formikHandleSubmit}>
                      {/* PANEL DE CONTROL */}
                      <Stack direction="row"className="Panel-User">
                            <div className="user-info-container">
                              <span className="title-stack">Denuncio de Siniestro - FNOL</span>
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
                                <span className="title-stack">Información básica del siniestro </span>
                             
                                      <Item className="group-form">
                                        <TextField
                                          id="claimid"
                                          label="ID de Siniestro"
                                          type="text"
                                          variant="filled"
                                          name="claimid"
                                          placeholder="1000589"
                                          value={values.claimid}
                                          required
                                          onChange={(e)=>{
                                            handleChange(e);
                                            setdataclaim({...dataclaim, claimid: e.target.value});
                                          }}

                                          onBlur={handleBlur}
                                       
                                          error={touched.claimid && !!errors.claimid}
                                          helperText={touched.claimid && errors.claimid}
                                        />
                                      </Item>

                                      <Item className="group-form">
                                        <TextField
                                          id="claimnumber"
                                          label="N° de Siniestro"
                                          type="text"
                                          variant="filled"
                                          name="claimnumber"
                                          placeholder="1234121170"
                                          value={values.claimnumber}
                                          required
                                          onChange={(e)=>{
                                            handleChange(e);
                                            setdataclaim({...dataclaim, claimnumber: e.target.value});
                                          }}

                                          onBlur={handleBlur}
                                       
                                          error={touched.claimnumber && !!errors.claimnumber}
                                          helperText={touched.claimnumber && errors.claimnumber}
                                        />
                                      </Item>
                                     
                                      <Item className="group-form">
                                        <TextField
                                          id="policyid"
                                          className="text-field custom-text-field"
                                          label="ID de Póliza"
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
                                          label="Cliente titular"
                                          placeholder="Ana María Díaz"
                                          type="text"
                                          variant="filled"
                                          required
                                          name="clientname"
                                          value={values.clientname}
                                          onChange={(e)=>{
                                            handleChange(e);
                                            setdataclaim({...dataclaim, clientname: e.target.value});
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
                                          onChange={(e) => {handleChange(e);setdataclaim({ ...dataclaim, product: e.target.value })}}
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
                                      
                                        {/*AQUI VA EL ORIGEN DEL SINIESTRO  */}

                                        
                                      <Item className="group-form">
                                      <FormControl className="select-form">
                                        <InputLabel htmlFor="claimorigin">Origen de siniestro </InputLabel>
                                        <Select
                                          id="claimorigin"
                                          variant="filled"
                                          value={values.claimorigin}
                                          onChange={selectedclaimorigin}
                                          onBlur={handleBlur}
                                          label="Canal de venta"
                                          error={touched.claimorigin && !!errors.claimorigin}
                                          required
                                        >
                                          <MenuItem value="RA">Reclamación por Asegurado   </MenuItem>
                                          <MenuItem value="RB">Reclamación por Beneficiario</MenuItem>
                                          
                                        </Select>
                                      </FormControl>
                                      {errors.claimorigin && touched.claimorigin && (
                                        <div className="error">{errors.claimorigin}</div>
                                      )}

                                    </Item>

                                      <Item className="group-form">
                                      <FormControl className="select-form">
                                        <InputLabel htmlFor="claimtype">Tipo de Siniestro</InputLabel>
                                        <Select
                                          id="claimtype"
                                          variant="filled"
                                          value={values.claimtype}
                                          onChange={selectedclaimtype}
                                          onBlur={handleBlur}
                                          label="Canal de venta"
                                          error={touched.claimtype && !!errors.claimtype}
                                          required
                                        >
                                          <MenuItem value="Agro">Agro </MenuItem>
                                          <MenuItem value="ACP" >Accidentes personales </MenuItem>
                                          <MenuItem value="Affinity">Affinity</MenuItem>
                                          <MenuItem value="Propiedad">Propiedad</MenuItem>
                                          <MenuItem value="Vida">Vida</MenuItem>
                                        </Select>
                                      </FormControl>
                                      {errors.claimtype && touched.claimtype && (
                                        <div className="error">{errors.claimtype}</div>
                                      )}

                                    </Item>
                                    
                              
                                </Item>
                              </Stack>



                              {/* Contenedor 2 */}
                              <Stack md="4" className="Containers-Stack">
                                <Item md="12" className="Containers-Item">                 
                                   <span className="title-stack" >Información del evento</span> 

                                   <Item md="6" className="group-form">
                                        <TextField
                                          label="Lugar de evento"
                                          id="place"
                                          type="text"
                                          variant="filled"
                                          name="place"
                                          placeholder="$60.000"
                                          required
                                          value={values.place}
                                          onChange={(e) => {handleChange(e);setdataclaim({ ...dataclaim, place: e.target.value })}}
                                          onBlur={handleBlur}  
                                          error={touched.place && !!errors.place}
                                          helperText={touched.place && errors.place}
                                        />
                                      </Item>

                                               {/* Información DE LOCACION */}
                                               <Item className="group-form">
                                      <Box mb={touched.country && errors.country ? 2.5:0}>
                                        <FormControl variant="filled" className="select-form" error={touched.country && !!errors.country}>
                                          <InputLabel htmlFor="nacionalidad">Pais de origen </InputLabel>
                                          <Select
                                            id="nacionalidad"
                                            required
                                            name="country"
                                            value={values.country}
                                            onChange={(e) => {
                                              setValues((prevValues)=>({...prevValues, country: e.target.value}));
                                              setClientData({...clientData, nationality: e.target.value})
                                            }}
                                            onBlur={handleBlur}
                                            label="Nacionalidad"
                                          >
                                            <MenuItem value = "">Seleccione un País</MenuItem>
                                            {Array.isArray(country?.paises) &&
                                              country.paises.map((pais, index) =>
                                              (<MenuItem key={index} value={pais}>
                                                  {pais}
                                                </MenuItem>
                                              ))}                                     
                                          </Select>                                          
                                            {touched.country && errors.country && <FormHelperText>{errors.country}</FormHelperText>}                                                                                   
                                        </FormControl>
                                        </Box>                                       
                                      </Item>

                                    <Item className="group-form">
                                        <LocalizationProvider dateAdapter={AdapterDayjs} error={touched.dateevent && !!errors.dateevent}>
                                          <DatePicker
                                            className="datepicker"
                                            name="dateevent"
                                            label="Fecha del evento"
                                            value={values.dateevent}
                                            onChange={(value) => {setFieldValue('dateevent', value); setSelectedBirthDate(value)}}
                                            format="DD - MM - YYYY"
                                            onBlur={()=>{
                                              setIsTouched(true);
                                              handleBlur}}
                                            disableFuture
                                            slotProps={
                                              {
                                                textField:{
                                                  required: true,
                                                  error: Boolean(errors.dateevent),
                                                  helperText: errors.dateevent ? errors.dateevent: ''
                                                }
                                              }
                                            }
                                          />
                                        </LocalizationProvider>
                                      </Item>
                                        
                                      <Item className="group-form">
                                        <LocalizationProvider dateAdapter={AdapterDayjs} error={touched.datenotification && !!errors.datenotification}>
                                          <DatePicker
                                            className="datepicker"
                                            name="datenotification"
                                            label="Fecha de notificación"
                                            value={values.datenotification}
                                            onChange={(value) => {setFieldValue('datenotification', value); setSelectedBirthDate(value)}}
                                            format="DD - MM - YYYY"
                                            onBlur={()=>{
                                              setIsTouched(true);
                                              handleBlur}}
                                            disableFuture
                                            slotProps={
                                              {
                                                textField:{
                                                  required: true,
                                                  error: Boolean(errors.datenotification),
                                                  helperText: errors.datenotification ? errors.datenotification: ''
                                                }
                                              }
                                            }
                                          />
                                        </LocalizationProvider>
                                      </Item>
                                        
                                    <Item className="group-form">
                                      <FormControl className="select-form">
                                        <InputLabel htmlFor="status">Estado</InputLabel>
                                        <Select
                                          id="status"
                                          variant="filled"
                                          value={values.status}
                                          onChange={selectedstatus}
                                          onBlur={handleBlur}
                                          label="Canal de venta"
                                          error={touched.status && !!errors.status}
                                          required
                                        >
                                          <MenuItem value="Presencial">Inicial</MenuItem>
                                          <MenuItem value="Telefonico">Espera de Documentos</MenuItem>
                                          <MenuItem value="Correo electronico">Cancelado</MenuItem>
                                          
                                        </Select>
                                      </FormControl>
                                      {errors.status && touched.status && (
                                        <div className="error">{errors.status}</div>
                                      )}

                                    </Item>

                                    <Item className="group-form">
                                      <FormControl className="select-form">
                                        <InputLabel htmlFor="substatus">Sub Estado</InputLabel>
                                        <Select
                                          id="substatus"
                                          variant="filled"
                                          value={values.substatus}
                                          onChange={selectedsubstatus}
                                          onBlur={handleBlur}
                                          label="Canal de venta"
                                          error={touched.substatus && !!errors.substatus}
                                          required
                                        >
                                          <MenuItem value="Presencial">Inicial</MenuItem>
                                          <MenuItem value="Telefonico">Espera de Documentos</MenuItem>
                                          <MenuItem value="Correo electronico">Cancelado</MenuItem>
                                          
                                        </Select>
                                      </FormControl>
                                      {errors.substatus && touched.substatus && (
                                        <div className="error">{errors.substatus}</div>
                                      )}

                                    </Item>
                         
                                </Item>
                              </Stack>
                              

                             {/* Contenedor 3  PRIMA */}
                            <Stack md="4" className="Containers-Stack">
                                <Item md="12" className="Containers-Item">                 
                                   <span className="title-stack" >Información adicional </span> 
                               
                                      
                                     

                                      <Item  className="group-form">
                                        <TextField
                                          label="Descripción"
                                          id="description"
                                          type="text"
                                          variant="filled"
                                          name="description"
                                          placeholder=""
                                          multiline
                                          rows={4}
                                          required
                                          value={values.description}
                                          onChange={(e) => {handleChange(e);setdataclaim({ ...dataclaim, description: e.target.value })}}
                                          onBlur={handleBlur}
                                          error={touched.description && !!errors.description}
                                          helperText={touched.description && errors.description}
                                
                                        />
                                      </Item>

                           
                                </Item>
                              </Stack>
                          </Stack>  
                                                          
                        {/* <Stack direction={"row"} className="container-obj">
                          <Item>
                          <span className="title-stack">Objetos </span>
                            <Stack direction={"row"} className="stack-2">
                           
                              <Item className="group-form">
                                      <FormControl className="select-form">
                                        <InputLabel htmlFor="status">Cobetura</InputLabel>
                                        <Select
                                          id="status"
                                          variant="filled"
                                          value={values.status}
                                          onChange={selectedstatus}
                                          onBlur={handleBlur}
                                          label="Canal de venta"
                                          error={touched.status && !!errors.status}
                                          required
                                        >
                                          <MenuItem value="ACP">Accidentes Personales</MenuItem>
                                          <MenuItem value="ONC">Oncologico</MenuItem>
                                          <MenuItem value="VID">Vida</MenuItem>
                                          
                                        </Select>
                                      </FormControl>
                                      {errors.status && touched.status && (
                                        <div className="error">{errors.status}</div>
                                      )}

                                    </Item>

                                    <Item md="6" className="group-form">
                                        <TextField
                                          label="Monto Solicitado"
                                          id="montosoli"
                                          type="text"
                                          variant="filled"
                                          name="montosoli"
                                          placeholder="$60.000"
                                          required
                                          value={values.montosoli}
                                          onChange={(e) => {handleChange(e);setdatapolicy({ ...datapolicy, montosoli: e.target.value })}}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[0-9.]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={touched.montosoli && !!errors.montosoli}
                                          helperText={touched.montosoli && errors.montosoli}
                                        />
                                      </Item>
                            </Stack>
                          </Item>
                        </Stack> */}

                     

        </Form>
      )}
    </Formik>
  
    <Insurerclaim></Insurerclaim>
  </>
  );
};
