
import React, { useState, useEffect, useMemo } from "react";
import moment                                  from "moment";
import axios                                   from "axios";
import Form                                    from 'react-bootstrap/Form';
import Swal                                    from "sweetalert2";
import TextLinkExample                         from "../Navbar";
import Sidebar                                 from "../sidebar";
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
import PanelControl                            from "../Panel-Control";
import * as Yup                                from "yup";

export const Modifyclaim = (props) => {
  //  APIS

  const [objetos ,setObjetos ] = useState();
  const [selectedcreateDate  ] = useState(moment(new Date()));
/// selected 

    const [selectedstartpolicy   ,setSelectedstartpolicy  ] = useState(new Date());
    const [selectedendpolicy     ,setSelectedendpolicy    ] = useState(new Date());
    const [selectedDatetipe      ,setSelectedDatetipe     ] = useState("");
    const [selectedPpagos        ,setSelectedPpagos       ] = useState("");
    const [selectedpaymentmethod ,setPaymentmethod        ] = useState("");
    const [selectedchannelsale   ,setSelectedChannelsale  ] = useState("");

  //TEXT FIELD DE poliza
  const [quotationdata, setquotationdata] = useState({
    policyid:        "",
    quotationnumber: "",
    clientname:      "",
    datetipe:        "",
    paymentmethod:   "",
    datepolicy:      "",
    primanual:       "",
    primam:          "",
    fechaCreacion:   "",
    agents:          "",
    office:          "",
    channelsale:     "",
  });


  const [dataquotation, setdataquotation] = useState({
    policyid:        null,
    quotationnumber: null,
    clientname:      null,
    product:         null,
    startpolicy:     null,
    endpolicy:       null,
    datepolicy:      null,
    datetipe:        null,
    agents:          null,
    office:          null,
    channelsale:     null,
    status:          null,
    substatus:       null,
    datequotation:   null,
    dateconst:       null,
    paymentmethod:   null,
    Ppagos:          null,
    primanual:       null,
    primam:          null,
    fechaCreacion:   null
  })

  const [isTouched ,setIsTouched ] = useState(false);


  const handleSubmit = async () => {
    try {
      if (
        !dataquotation.policyid        ||
        !dataquotation.quotationnumber ||
        !dataquotation.clientname      ||
        !dataquotation.product         ||
        !dataquotation.datepolicy      ||
        !dataquotation.primanual       ||
        !dataquotation.primam          ||
        !dataquotation.fechaCreacion   ||
        !selectedstartpolicy           ||
        !selectedendpolicy             ||
        !selectedDatetipe              ||
        !selectedpaymentmethod         ||
        !selectedPpagos                ||
        console.log(dataquotation),
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
        policyid:        dataquotation.policyid,
        quotationnumber: dataquotation.quotationnumber,
        clientname:      dataquotation.clientname,
        product:         dataquotation.product,
        startpolicy:     selectedstartpolicy,
        endpolicy:       selectedendpolicy,       
        datepolicy:      dataquotation.datepolicy,
        datetipe:        selectedDatetipe,
        primaanual:      dataquotation.primanual,
        paymentmethod:   selectedpaymentmethod,
        Ppagos:          selectedPpagos,
        primam:          dataquotation.primam,
        fechaCreacion:   selectedcreateDate,
        
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

    policyid:        Yup.string().min(2, 'El número debe contener al menos 12 dígitos').matches(/^[+0-9]+$/,'Ingrese un id de póliza válido').required('Ingrese un id de póliza'),
    quotationnumber: Yup.string().matches(/^(POL-)?[+0-9]+$/, 'Ingrese un número de cotización válido').min(8, 'El número debe contener al menos 12 caracteres').required('Ingrese un número de cotización'),
    clientname:      Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El nombre solo debe contener letras').required('Por favor ingresa un nombre'),
    startpolicy:     Yup.date().required('La fecha de inicio de vigencia es requerida').max(new Date(), 'La fecha de inicio de vigencia no puede ser posterior a la fecha actual'),
    endpolicy:       Yup.date().required('La fecha de termino de vigencia es requerida').max(new Date(), 'La fecha de termino de vigencia no puede ser posterior a la fecha actual'),
    datepolicy:      Yup.string().min(1, 'El número debe contener al menos 1 dígito').matches(/^[+0-9]+$/,'Ingrese un número').required('Ingrese un número de duracion de póliza'),
    datetipe:        Yup.string().required('Seleccione un sistema de tiempo'),
    paymentmethod:   Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El metodo de pago solo debe contener letras').required('Por favor ingresa un metodo de pago'),
    primanual:       Yup.string().min(6, 'El número debe contener al menos 6 dígitos').matches(/^[+0-9]+$/,'Ingrese un número de teléfono válido').required('Ingrese un valor de prima anual'), 
    primam:          Yup.string().min(5, 'El número debe contener al menos 5 dígitos').matches(/^[+0-9]+$/,'Ingrese un valor valido').required('Ingrese un valor de prima mensual'),
    agents:          Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El nombre solo debe contener letras').required('Por favor ingresa un nombre'),
    office:          Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El nombre solo debe contener letras').required('Por favor ingresa un nombre de la oficina'),
    product:         Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El producto solo debe contener letras').required('Por favor ingresa un producto'),
    status:          Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El Estado solo debe contener letras').required('Por favor ingresa un estado'),
    substatus:       Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El subestado solo debe contener letras').required('Por favor ingresa un subestado'),
    datequotation:   Yup.date().required('La fecha de cotización es requerida').max(new Date(), 'La fecha de cotización no puede ser posterior a la fecha actual'),
    dateconst:       Yup.date().required('La fecha de contratación es requerida').max(new Date(), 'La fecha de contratación no puede ser posterior a la fecha actual'),
    channelsale:     Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El subestado solo debe contener letras').required('Por favor ingresa un canal de venta'),

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
        policyid:        "",
        quotationnumber: "",
        clientname:      "",
        datetipe:        "",
        paymentmethod:   "",
        primanual:       "",
        primam:          "",
        agents:          "",
        office:          "",
        product:         "",
        status:          "",
        substatus:       "",
        channelsale:     "",
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
                                <span className="title-stack">Datos del Siniestros</span>
                                   <Item className="group-form">
                                      <Item className="group-form">
                                        <TextField
                                          id="quotationnumber"
                                          label="ID de Siniestro"
                                          type="text"
                                          variant="filled"
                                          name="quotationnumber"
                                          placeholder="COT-1000101"
                                          value={values.quotationnumber}
                                          required
                                          onChange={(e)=>{
                                            handleChange(e);
                                            setdataquotation({...dataquotation, quotationnumber: e.target.value});
                                          }}

                                          onBlur={handleBlur}
                                       
                                          error={touched.quotationnumber && !!errors.quotationnumber}
                                          helperText={touched.quotationnumber && errors.quotationnumber}
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
                                          label="Asegurado"
                                          placeholder="Ana María Díaz"
                                          type="text"
                                          variant="filled"
                                          required
                                          name="clientname"
                                          value={values.clientname}
                                          onChange={(e)=>{
                                            handleChange(e);
                                            setdataquotation({...dataquotation, clientname: e.target.value});
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
                                          onChange={(e) => {handleChange(e);setdataquotation({ ...dataquotation, product: e.target.value })}}
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
                                            label="Fecha de notificación"
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

                                      </Item>
                              
                                </Item>
                              </Stack>



                              {/* Contenedor 2 */}
                              <Stack md="4" className="Containers-Stack">
                                <Item md="12" className="Containers-Item">                 
                                   <span className="title-stack" >Datos Adicionales</span> 

                                   <Item md="6" className="group-form">
                                        <TextField
                                          label="Monto Solicitado"
                                          id="primam"
                                          type="text"
                                          variant="filled"
                                          name="primam"
                                          placeholder="$60.000"
                                          required
                                          value={values.primam}
                                          onChange={(e) => {handleChange(e);setdataquotation({ ...dataquotation, primam: e.target.value })}}
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


                                   
                                      <Item className="group-form">
                                      <FormControl className="select-form">
                                        <InputLabel htmlFor="channelsale"> Evento </InputLabel>
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
                                          <MenuItem value="Hosp">Hospitalización</MenuItem>
                                          <MenuItem value="cartrash">Accidente de transito</MenuItem>
                                          <MenuItem value="Correo electronico"></MenuItem>
                                        </Select>
                                      </FormControl>
                                      {errors.channelsale && touched.channelsale && (
                                        <div className="error">{errors.channelsale}</div>
                                      )}

                                    </Item>
                                    <Item className="group-form">
                                        <LocalizationProvider dateAdapter={AdapterDayjs} error={touched.datequotation && !!errors.datequotation}>
                                          <DatePicker
                                            className="datepicker"
                                            name="datequotation"
                                            label="Fecha del evento"
                                            value={values.datequotation}
                                            onChange={(value) => {setFieldValue('datequotation', value); setSelectedBirthDate(value)}}
                                            format="DD - MM - YYYY"
                                            onBlur={()=>{
                                              setIsTouched(true);
                                              handleBlur}}
                                            disableFuture
                                            slotProps={
                                              {
                                                textField:{
                                                  required: true,
                                                  error: Boolean(errors.datequotation),
                                                  helperText: errors.datequotation ? errors.datequotation: ''
                                                }
                                              }
                                            }
                                          />
                                        </LocalizationProvider>
                                      </Item>

                                     
                               
                                      <Item className="group-form">
                                      <FormControl className="select-form">
                                        <InputLabel htmlFor="channelsale">Cobertura </InputLabel>
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
                                          <MenuItem value="gastos">Gastos medicos</MenuItem>
                                          <MenuItem value="Telefonico">Telefonico</MenuItem>
                                          <MenuItem value="Correo electronico">Correo Electronico</MenuItem>
                                        </Select>
                                      </FormControl>
                                      {errors.channelsale && touched.channelsale && (
                                        <div className="error">{errors.channelsale}</div>
                                      )}

                                    </Item>

                          
                                          
                                    <Item className="group-form">
                                      <FormControl className="select-form">
                                        <InputLabel htmlFor="channelsale">Estado</InputLabel>
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
                                          <MenuItem value="Presencial">Inicial</MenuItem>
                                          <MenuItem value="Telefonico">Espera de Documentos</MenuItem>
                                          <MenuItem value="Correo electronico">Cancelado</MenuItem>
                                          
                                        </Select>
                                      </FormControl>
                                      {errors.channelsale && touched.channelsale && (
                                        <div className="error">{errors.channelsale}</div>
                                      )}

                                    </Item>

                                    
                                      
                                     
                                </Item>
                              </Stack>
                              

                             {/* Contenedor 3  PRIMA */}
                            <Stack md="4" className="Containers-Stack">
                                <Item md="12" className="Containers-Item">                 
                                   <span className="title-stack" >Descripción</span> 


                                      <Item md="6" className="group-form">
                                        <TextField
                                          label="Lugar"
                                          id="primanual"
                                          type="text"
                                          variant="filled"
                                          name="primanual"
                                          placeholder="$60.000"
                                          required
                                          value={values.primanual}
                                          onChange={(e) => {handleChange(e);setdataquotation({ ...dataquotation, primanual: e.target.value })}}
                                          onBlur={handleBlur}  
                                          error={touched.primanual && !!errors.primanual}
                                          helperText={touched.primanual && errors.primanual}
                                        />
                                      </Item>

                                      <Item md="6" className="group-form">
                                        <TextField
                                          label="Descripción"
                                          id="primam"
                                          type="text"
                                          variant="filled"
                                          name="primam"
                                          placeholder="$60.000"
                                          required
                                          value={values.primam}
                                          onChange={(e) => {handleChange(e);setdataquotation({ ...dataquotation, primam: e.target.value })}}
                                          onBlur={handleBlur}
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
