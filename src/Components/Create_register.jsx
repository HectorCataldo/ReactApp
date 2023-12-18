import React, { useState, useEffect, useMemo } from "react";
import '../CSS/register-style.scss';
import moment                                  from "moment";
import axios                                   from "axios";
import Form                                    from 'react-bootstrap/Form';
import Swal                                    from "sweetalert2";
import { useFetch }                            from "../assets/useFetch";
import TextLinkExample                         from "./Navbar";
import Sidebar                                 from "./sidebar";
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
import { Correos }                             from "./contact_cor";
import { Telefonos }                           from "./contact_tel";
import { Direcciones }                         from "./contact_dir";
import PanelControl                            from "./Panel-Control";
import * as Yup                                from "yup";
import { Box,FormHelperText, Grid }            from "@mui/material";
import dayjs                                   from "dayjs";
import { BorderStyle } from "@mui/icons-material";

export const Registro = (props) => {
  const { data: country }                            = useFetch( "https://gist.githubusercontent.com/HectorCataldo/ceee7aa2b93e83d7d04f752e3adbe623/raw/81b6bc11b965720e6717975f665fe85869c71e81/paises.json" )
  const { data: regions}                             = useFetch("https://gist.githubusercontent.com/HectorCataldo/11e149d5ba18e9dfe72b6c21e38ca439/raw/b7281863b44021b362338493025cc0723e39b7a9/regions.json");
  const { data: clients }                            = useFetch("http://localhost:8080/api/clients");
  const { data: profession }                         = useFetch("http://localhost:8080/api/profession");
  const { data: gender}                              = useFetch("http://localhost:8080/api/gender");
  const [selectedBirthDate, setSelectedBirthDate]    = useState(dayjs().format("YYYY-MM-DD"));
  const [objetos, setObjetos]                        = useState();
  const [selectedcreateDate]                         = useState(dayjs());
  const [er, setEr]                                  = useState(false);
  const [selectedGender, setSelectedGender]          = useState("");
  const [selectedTipo, setSelectedTipo]              = useState(1);
  const [selectedProfession, setSelectedProfession]  = useState("");
  const [Currentdate, setCurrentDate]                = useState(moment(new Date()));
  const [clientData, setClientData]                  = useState({
    id                  : null,
    documentNumber      : null,
    firstName           : null,
    lastName            : null, 
    secondLastName      : null,
    fantasyName         : null,
    birthDate           : null,
    gender              : {
      id_gender : null,
      gender    : null,
    },
    nationality         : null,
    phoneNumber         : null,
    email               : null,
    address             : null,
    region              : null,
    comuna              : null,
    giro                : null,
    profession          : {
      id_profession  : null,
      profession_Name: null
    },
    tipo_persona        : null,
    fechaCreacion       : null
  })
  const [disableGender, setDisableGender] = useState(false);

  // COMUNAS Y REGIONES 
  const [seRegion, setSeRegion]           = useState('');
  const [fcomunas, setfcomunas]           = useState([]);
  const [seComuna, setSeComuna]           = useState();



  //Filtrar Generos
  const GendersFilter = (e) => {
    const tp = e.target.value;
    setSelectedTipo(tp);

    if (tp == 1){
      setDisableGender(false);
      setSelectedTipo(1);
    }
    else if( tp == 2){
      setDisableGender(true);
      const genderObject = gender.find(item => item.id_gender === 0);
      setSelectedGender(genderObject);
      setSelectedTipo(2);
      setSelectedBirthDate("");
    }
    else if( tp != 2 || tp != 1){
      setDisableGender(true);
      setSelectedGender();
      setSelectedTipo(null);
    }

  }

  //Filtrado de Comunas por Región
  const RegionChange = (e) => {
    //Obtenemos Región
    const selectedRegion = e.target.value;
    setSeRegion(selectedRegion);

    const regionData = regions.regions.find((region) => region.name === selectedRegion);
    if (regionData) {
      setfcomunas(regionData.communes);
      setSeComuna('');
    }
    else{
      setfcomunas([]);
      setSeComuna('');
    }
  };

  const handleSubmit = async () => {
    try {
      if (
        !clientData.documentNumber  ||
        !clientData.firstName       ||
        !clientData.lastName        ||
        !clientData.secondLastName  ||
        !selectedBirthDate          ||
        !selectedGender             ||
        !seComuna                   ||
        !seRegion                   ||
        !clientData.nationality     ||
        !clientData.phoneNumber     ||
        !clientData.email           ||
        !clientData.address         ||
        !clientData.profession      ||       
        !selectedTipo
        ) {
          Swal.fire({
            icon  : "error",
            title : "Error",
            text  : "Por favor, complete todos los campos antes de enviar.",          
          });
          return;
        }
      const NombreCompleto = clientData.firstName + " " + clientData.lastName;
      const response = await axios.post("https://si-client-bkn.kps/api/v1/client/", {
        manComp   : selectedTipo,
        egn       : clientData.documentNumber ,
        name      : NombreCompleto            ,
        gname     : clientData.firstName      ,
        sname     : clientData.lastName       ,
        fname     : clientData.secondLastName ,
        birthDate : selectedBirthDate         ,
        sexo      : selectedGender.id_gender  ,
      });

      console.log("Respuesta de la API:", response.data);
      Swal.fire({
        icon  : "success",
        title : "Registrado",
        text  : "Cliente Registrado!",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error Al enviar la solicitud POST", error);
    }
  };

  useEffect(() => {
    if (clients && Array.isArray(clients)) {
      const length        = clients.length;
      const totalObjects  = clients[length - 1];
      const id            = totalObjects.id;
      setObjetos(id + 1);
    }
  }, [clients]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);



  //  USER NAME DINAMICO
  const [userName, setUserName] = useState("Usuario");

  const updateUserName = (firstName, lastName, secondLastName) => {
    let userFullName = firstName || "Usuario";
  
    if (lastName) {
      userFullName += ` ${lastName}`;
    }
  
    if (secondLastName) {
      userFullName += ` ${secondLastName}`;
    }
  
    setUserName(userFullName);
  };

  //Validaciones
  //Validación de digito verificador:
  const validarRut = (rut) => {
    const rutLimpio = rut.replace(/[^0-9kK]/g, ''); 
    if (rutLimpio.length > 9) return false;
    let num       = parseInt(rutLimpio.slice(0, -1), 10);
    const dv      = rutLimpio.slice(-1).toLowerCase();
    let suma      = 0;
    let multiplo  = 2;
    for (let i = 1; num > 0; i++) {
        multiplo = i === 7 ? 2 : multiplo;
        suma     += (num % 10) * multiplo;
        num      = Math.floor(num / 10);
        multiplo++;
      }

    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? 0 : dvEsperado === 10 ? 'k' : dvEsperado.toString();

    return dv === dvCalculado;
  }
    
  //Validaciones con YUP formatos:
  const validationSchema = Yup.object().shape({
    documentNumber  : Yup.string()
                      .matches(/^(\d{1,2}(\.?\d{3}){2}[-][0-9kK]{1})$|^(\d{1,2}(-\d)?)$/, "Formato de número de documento inválido")
                      .test('validar-rut','Rut inválido', (value) =>{return validarRut(value);})
                      .required("Por favor ingresa un número de documento"),
    firstName       : Yup.string().trim()
                      .matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El nombre solo debe contener letras')
                      .required('Por favor ingresa un nombre'),
    lastName        : Yup.string().trim()
                      .matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El apellido solo debe contener letras')
                      .required('Por favor ingresa un apellido'),
    secondLastName  : Yup.string().trim().notRequired()
                      .matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El apellido solo debe contener letras'),
    birthDate       : Yup.date()
                      .required('La fecha de nacimiento es requerida')
                      .max(new Date(), 'La fecha de nacimiento no puede ser posterior a la fecha actual'),
    email           : Yup.string()
                      .email('Ingrese un email válido')
                      .required('Ingrese un email'),
    phoneNumber     : Yup.string()
                      .min(9, 'El número debe contener al menos 9 dígitos')
                      .matches(/^[+0-9]+$/,'Ingrese un número de teléfono válido')
                      .required('Ingrese un número de teléfono'),
    address         : Yup.string().required('Ingrese una dirección'),
    region          : Yup.string().required('Seleccione una región'),
    comuna          : Yup.string().required('Seleccione una comuna'),
    gender          : Yup.string().required('Seleccione un género'),
    country         : Yup.string().required('Seleccione un país'),
    profession      : Yup.string().required('Seleccione una profesión'),
    jdocument       : Yup.string()
                      .matches(/^(\d{1,2}(\.?\d{3}){2}[-][0-9kK]{1})$|^(\d{1,2}(-\d)?)$/, "Formato de número de documento inválido")
                      .test('validar-rut','Rut inválido', (value) =>{return validarRut(value);})
                      .required("Por favor ingresa un número de documento"),
    jrazonsocial    : Yup.string().trim().required('Ingrese razón social'),
    jfname          : Yup.string().trim()
                      .matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ0-9]+)*$/,'Escriba un nombre')
                      .notRequired(),
    jemail          : Yup.string().email('Ingrese un email válido').required('Ingrese un email'),
    jphone          : Yup.string().min(9, 'El número debe contener al menos 9 dígitos').matches(/^[+0-9]+$/,'Ingrese un número de teléfono válido').required('Ingrese un número de teléfono'),
    jaddress        : Yup.string().required('Ingrese una dirección'),
    jregion         : Yup.string().required('Seleccione una región'),
    jcomuna         : Yup.string().required('Seleccione una comuna'),
    jgiro           : Yup.string().required('Ingrese su GIRO'),
    jnationality    : Yup.string().required('Seleccione un país')
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
        id              : "",
        documentNumber  : "",
        firstName       : "",
        lastName        : "",
        secondLastName  : "",
        nationality     : "",
        phoneNumber     : "",
        email           : "",
        address         : "",
        region          : "",
        comuna          : "",
        gender          : "",
        country         : "",
        profession      : "",
        jdocument       : "",
        jrazonsocial    : "",
        jfname          : "",
        jemail          : "",
        jphone          : "",
        jaddress        : "",
        jregion         : "",
        jcomuna         : "",
        jgiro           : "",
        jnationality    : ""
    }}
    validationSchema = {validationSchema}
    >
      {({ errors, touched, handleSubmit: formikHandleSubmit, handleChange, handleBlur, values, setFieldValue, setValues}) => (
        <Form className="formulario-cr" onSubmit={formikHandleSubmit}>
              {/* PANEL DE CONTROL */}
                <Stack   
                direction="row" //{ xs: 'column', sm: 'row' }
                spacing={{ xs: 1, sm: 2, md: 4 }}
                className="Panel-User"
                >
                  <div   className   = "user-info-container">
                    <h1  className   = "title-user"> {userName ? userName : 'Usuario'}</h1>  
                    <h1  className   = "title-newuser">Cliente nuevo</h1>
                  </div>
                  <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  // spacing={{ xs: 1, sm: 2, md: 4 }}
                  >
                      <Item className="group-user">                                    
                        <TextField
                          id        = "id filled-disabled"
                          label     = "ID Cliente" 
                          value     = {objetos? objetos.toString(): ''}
                          onChange  = {handleChange}
                          InputProps= {{
                            readOnly: true,
                          }}
                          disabled
                          variant   = "filled"/> 
                      </Item >
                      <Item className="group-user" >
                        <TextField
                          id          ="fechacreacion"
                          label       ="Fecha Creacion"
                          type        ="text"
                          variant     ="filled"
                          fullWidth
                          handleBlur  ={handleBlur}
                          value       ={moment(selectedcreateDate).format("DD/MM/YYYY")}
                          InputProps  ={{
                            readOnly: true,
                          }}
                          disabled
                        />
                      </Item>
                  </Stack>
                </Stack>
            
              {/* PERSONA NATURAL */}
              {selectedTipo == 1 && (
                  <Stack 
                  direction={{ xs: 'column', sm: 'row' }}
                  // spacing={30}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  className="Containers-stacks-3">
                     {/* Contenedor 1 */}
                     <Stack
                    //  direction={{ xs: 'column', sm: 'row' }}
                    //  md="4"
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    className="Containers-Stack-in"
                    >
                       <Item md="12" className="Containers-Item">
                        <span className="title-stack">Datos Personales</span>
                          <Item className="group-form">
                             <FormControl className="select-form">
                               <InputLabel htmlFor="tipo-persona">Tipo persona </InputLabel>
                               <Select
                                 id       = "tipo-persona"
                                 variant  = "filled"
                                 value    = {selectedTipo}
                                 onChange = {GendersFilter}
                                 onBlur   = {handleBlur}
                                 label    = "Tipo persona "
                                 error    = {touched.selectedTipo && !!errors.selectedTipo}
                                 required
                               >
                                {/*<MenuItem>Seleccione un tipo de persona</MenuItem>*/}
                                <MenuItem value={1} >Natural</MenuItem>
                                <MenuItem value={2} >Jurídica</MenuItem>
                                </Select>
                              </FormControl>
                                {errors.selectedTipo && touched.selectedTipo && (
                                  <div className="error">{errors.selectedTipo}</div>
                                )}
                          </Item>

                          <Item className="group-form">
                            <TextField
                              id          = "documentNumber"
                              className   = "text-field custom-text-field"
                              label       = "RUT"
                              name        = "documentNumber"
                              type        = "text"
                              variant     = "filled"
                              placeholder = "11.111.111-1"
                              value       = {values.documentNumber}
                              onChange    = {(e)=>{
                                handleChange(e);
                                setClientData({...clientData, documentNumber: e.target.value});
                              }}
                              onBlur      = {handleBlur}
                              onKeyPress={(e) => {
                                const pattern = /^[Kk0-9-.]+$/;
                                if (!pattern.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              required
                              inputProps  = {{ maxLength: 12 }}
                              error       = {touched.documentNumber && !!errors.documentNumber}
                              helperText  = {touched.documentNumber && errors.documentNumber}
                            />
                          </Item>
             
                          <Item className="group-form">
                            <Box mb={touched.gender && errors.gender ? 2.5:0}>
                            <FormControl variant="filled" className="select-form" error={touched.gender && !!errors.gender}>
                              <InputLabel htmlFor="gender">Género </InputLabel>
                              <Select
                                id        = "gender"
                                name      = "gender"
                                value     = {values.gender}
                                onChange  = {(e) => {
                                  const genderSelected = e.target.value;
                                  setValues((prevValues)=>({...prevValues, gender: genderSelected}));
                                  const id_gender = e.target.value;
                                  const genderObjerc = gender.find(item => item.id_gender === id_gender);
                                  setSelectedGender(genderObjerc || null);
                                }}
                                onBlur    = {handleBlur}
                                label     = "Género"
                                disabled  = {disableGender}
                                error     = {touched.selectedGender && !!errors.selectedGender}
                              >
                                <MenuItem value="">Selecciona un género</MenuItem>
                                {selectedTipo !== 1 && (
                                  gender && gender.slice(0, 1).map((item) => (
                                    <MenuItem key={item.id_gender} value={item.id_gender}>
                                      {item.gender}
                                    </MenuItem>
                                  ))
                                )}
                                {gender && gender.slice(-2).map((item)=>(
                                  <MenuItem key={item.id_gender} value={item.id_gender}>
                                    {item.gender}
                                  </MenuItem> 
                                ))}
                              </Select>
                              {touched.gender && errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                            </FormControl>
                            </Box>
                          </Item>                                    
                        </Item>
                      </Stack>

                      {/* Contenedor 2 */}
                      <Stack md="4" className="Containers-Stack-in">                                
                        <Item md="12" className="Containers-Item">
                          <span className="title-stack">Datos Personales</span>
                          <Item className="group-form">
                            <TextField
                              id        = "firstName"
                              label     = "Nombres"
                              type      = "text"
                              variant   = "filled"
                              name      = "firstName"
                              value     = {values.firstName}
                              required
                              onChange  = {(e) => {
                                handleChange(e);
                                setClientData({ ...clientData, firstName: e.target.value });
                                updateUserName(e.target.value,clientData.lastName,clientData.secondLastName); 
                              }}
                              onBlur    = {handleBlur}
                              onKeyPress= {(e) => {
                              const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                              if (!pattern.test(e.key)) {
                              e.preventDefault();
                              }
                              }}
                              error     = {touched.firstName && !!errors.firstName}
                              helperText= {touched.firstName && errors.firstName}
                              />
                          </Item>

                          <Item className="group-form">
                            <TextField
                              id        = "lastName"
                              label     = "Primer Apellido"
                              type      = "text"
                              variant   = "filled"
                              required
                              name      = "lastName"
                              value     = {values.lastName}
                              onChange  = {(e) => {
                                handleChange(e);
                                setClientData((prevData)=>({...prevData , lastName: e.target.value }));
                                updateUserName(clientData.firstName,e.target.value,clientData.secondLastName);
                              }}
                              onBlur    = {handleBlur}
                              onKeyPress={(e) => {
                                const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                if (!pattern.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              error     = {touched.lastName && !!errors.lastName}
                              helperText= {touched.lastName && errors.lastName}
                            />
                          </Item>

                          <Item className="group-form">
                            <TextField
                              id          = "secondLastName"
                              label       = "Segundo Apellido"
                              type        = "text"
                              variant     = "filled"
                              name        = "secondLastName"
                              onChange    = {(e) => {
                                handleChange(e);
                                setClientData((prevData)=>({ ...prevData, secondLastName: e.target.value }));
                                updateUserName(clientData.firstName,clientData.lastName,e.target.value);
                              }}
                              value={values.secondLastName}
                              onBlur      = {handleBlur}
                              onKeyPress  = {(e) => {
                                const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                if (!pattern.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              error       = {touched.secondLastName && !!errors.secondLastName}
                              helperText  = {touched.secondLastName && errors.secondLastName}
                            />
                          </Item>                                      
                        </Item>
                      </Stack>
                      
                      {/* Contenedor 3 */}
                      <Stack  md= "4"   className = "Containers-Stack-in">
                        <Item md= "12"  className = "Containers-Item">    
                          <span className="title-stack">Datos Adicionales</span>                                  
                          <Item className="group-form">
                            <LocalizationProvider dateAdapter={AdapterDayjs} error={touched.birthDate && !!errors.birthDate}>
                              <DatePicker
                                className = "datepicker"                                            
                                label     = "Fecha de Nacimiento"
                                name      = "birthDate"
                                value     = {values.birthDate}
                                onChange  = {
                                  (value) => {
                                    setFieldValue('birthDate', value); 
                                    setSelectedBirthDate(dayjs(value).format("YYYY-MM-DD"))
                                  }
                                }
                                format    = "DD - MM - YYYY"
                                onBlur    = {handleBlur}
                                disableFuture                                            
                                slotProps = {
                                  {
                                    textField:{
                                      name      : "birthDate",
                                      required  : true,
                                      variant   : 'filled',
                                      error     : Boolean( !!errors.birthDate),
                                      helperText: errors.birthDate ? errors.birthDate: ''
                                    }
                                  }
                                }
                                />
                            </LocalizationProvider>
                          </Item>

                          {/* INFORMACION DE LOCACION */}
                          <Item className="group-form">
                            <Box mb={touched.country && errors.country ? 2.5:0}>
                              <FormControl variant="filled" className="select-form" error={touched.country && !!errors.country}>
                                <InputLabel htmlFor="nacionalidad">Pais de origen </InputLabel>
                                <Select
                                  id      = "nacionalidad"
                                  required
                                  name    = "country"
                                  value   = {values.country}
                                  onChange= {(e) => {
                                    setValues((prevValues)=>({...prevValues, country: e.target.value}));
                                    setClientData({...clientData, nationality: e.target.value})
                                  }}
                                  onBlur  = {handleBlur}
                                  label   = "Nacionalidad"
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
                            <Box mb={1}>
                              <FormControl variant="filled" className="select-form" error={touched.profession && !!errors.profession}>
                                <InputLabel htmlFor="profesion">Profesión </InputLabel>
                                <Select
                                  id          = "profesion"
                                  name        = "profession"
                                  value       = {values.profession}
                                  onChange    = {(e) => {
                                    setValues((prevValues)=>({...prevValues, profession: e.target.value}));                                              
                                    const selectedProfessionId = e.target.value;
                                    const selectedProfessionObject = profession.find(item => item.id_profession === selectedProfessionId);
                                    setSelectedProfession(selectedProfessionObject || null);
                                  }}
                                  onBlur      = {handleBlur}
                                  label       = "Profesión "
                                  >
                                    <MenuItem value="">
                                    Selecciona una profesión
                                    </MenuItem>
                                    {profession &&
                                    profession.map((item) => (
                                    <MenuItem key={item.id_profession} value={item.id_profession}>
                                    {item.profession_Name}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {touched.profession && errors.profession && <FormHelperText>{errors.profession}</FormHelperText>}
                              </FormControl>
                            </Box>
                          </Item>
                        </Item>
                      </Stack>
                  </Stack>
            )}

            {/* PERSONA JURIDICA */}
            {selectedTipo == 2 && (
              <Stack direction="row" spacing={30} className="Containers-stacks-3">

                {/* Contenedor 1 */}
                <Stack md="4" className="Containers-Stack-in">
                  <Item md="12" className="Containers-Item">
                    <span className="title-stack">Datos de la Empresa</span>
                    <Item className="group-form">
                      <FormControl className="select-form">
                        <InputLabel htmlFor="tipo-persona">Tipo persona </InputLabel>
                        <Select
                          id      = "tipo-persona"
                          variant = "filled"
                          value   = {selectedTipo}
                          onChange= {GendersFilter}
                          onBlur  = {handleBlur}
                          label   = "Tipo persona "
                          error   = {touched.selectedTipo && !!errors.selectedTipo}
                        >
                          <MenuItem value={1}>Natural</MenuItem>
                          <MenuItem value={2}>Jurídica</MenuItem>
                        </Select>
                      </FormControl>
                      {errors.selectedTipo && touched.selectedTipo && <FormHelperText>{errors}</FormHelperText>}
                    </Item>

                    <Item className="group-form">
                      <TextField
                        id          = "jdocument"
                        className   = "text-field custom-text-field"
                        label       = "RUT"
                        required
                        name        = "jdocument"
                        type        = "text"
                        variant     = "filled"
                        placeholder = "11.111.111-1"
                        value       = {values.jdocument}
                        onChange={(e)=> {
                          handleChange(e);
                          setClientData({...clientData, documentNumber: e.target.value});  
                        }}
                        onBlur={handleBlur}
                        onKeyPress={(e) => {
                          const pattern = /^[Kk0-9-.]+$/;
                          if (!pattern.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        inputProps  = {{ maxLength: 12 }}
                        error       = {touched.jdocument && !!errors.jdocument}
                        helperText  = {touched.jdocument && errors.jdocument}
                      />
                    </Item>
                  </Item>
                </Stack>

                {/* Contenedor 2 */}
                <Stack md="4" className="Containers-Stack-in">
                  <Item md="12" className="Containers-Item">                 
                    <span className="title-stack" >Datos de Contacto</span>
                    <Item className="group-form">
                      <TextField
                      label     = "Razon Social"
                      type      = "text"
                      variant   = "filled"
                      required      
                        name    = "jrazonsocial"
                      value     = {values.jrazonsocial}
                      onChange  = {(e) => {
                        handleChange(e);
                        setClientData({ ...clientData, firstName: e.target.value });
                        updateUserName(e.target.value,clientData.fantasyName); 
                      }}
                      onBlur    = {handleBlur}
                      error     = {touched.jrazonsocial && !!errors.jrazonsocial}
                      helperText= {touched.jrazonsocial && errors.jrazonsocial}
                      />
                    </Item>

                    <Item className="group-form">
                      <TextField
                        label     = "Nombre de Fantasía"
                        type      = "text"
                        variant   = "filled"
                        name      = "jfname"
                        value     = {values.jfname}
                        onChange  = {(e) => {
                          handleChange(e);
                          setClientData({...clientData,fantasyName: e.target.value,lastName: e.target.value});
                          updateUserName(clientData.firstName, e.target.value)
                        }}
                        onBlur    = {handleBlur}
                        error     = {touched.jfname && !!errors.jfname}
                        helperText= {touched.jfname && errors.jfname}
                        />
                    </Item>
                     
                  </Item>
                </Stack>
                      
                {/* Contenedor 3 */}
                <Stack md="4" className="Containers-Stack-in">
                  <Item md="12" className="Containers-Item">    
                    <span className="title-stack">Datos Adicionales</span>
                      <Item className="group-form">
                        <TextField
                          label         = "GIRO"
                          type          = "text"
                          required          
                            variant     = "filled"
                          name          = "jgiro"
                          value         = {values.jgiro}
                          onChange      = {(e) => {
                            handleChange(e);
                            setClientData({...clientData,giro: e.target.value,secondLastName: e.target.value})
                          }}
                          onBlur        = {handleBlur}
                          error         = {touched.jgiro && !!errors.jgiro}
                          helperText    = {touched.jgiro &&  errors.jgiro}
                          />
                      </Item>

                      <Item className="group-form">
                        <Box mb={touched.jnationality && errors.jnationality ? 2.5 : 0}>
                          <FormControl variant="filled" className="select-form" error={touched.jnationality && !!errors.jnationality}>
                            <InputLabel htmlFor="nacionalidad">País de origen </InputLabel>
                            <Select
                              id          = "jnationality"
                              required
                              name        = "jnationality"
                              value       = {values.jnationality}
                              onChange    = {(e) => {
                                handleChange(e);
                                setClientData({...clientData, nationality: e.target.value})
                              }}
                              onBlur      = {handleBlur}
                              label       = "País de origen"
                              >
                              <MenuItem value = "">Seleccione un País</MenuItem>
                              {Array.isArray(country?.paises) &&
                                country.paises.map((pais, index) =>
                                (<MenuItem key={index} value={pais}>
                                {pais}
                                </MenuItem>
                                ))}                                     
                            </Select>
                          </FormControl>
                        </Box>
                      </Item>   
                    </Item>
                </Stack>                  
              </Stack>
            )}
        </Form>
      )}
    </Formik>
  <Stack
    className="border"
    direction={{ xs: 'column', sm: 'row' }}
    justifyContent="flex-start"
    spacing={{ xs: 1, sm: 2, md: 4 }}
    border={1}
    ml={9}
    >
      <Item >
        <Telefonos></Telefonos>
      </Item>
      <Item>
        <Correos></Correos>
      </Item>
    </Stack>
    <Direcciones></Direcciones> 
  </>
  );
};
