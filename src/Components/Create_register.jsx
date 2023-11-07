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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import '../CSS/register-style.scss';
import PanelControl from "./Panel-Control";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";





export const Registro = (props) => {
  const { data: country } = useFetch( "https://gist.githubusercontent.com/HectorCataldo/ceee7aa2b93e83d7d04f752e3adbe623/raw/81b6bc11b965720e6717975f665fe85869c71e81/paises.json" )
  const { data: regions} = useFetch("https://gist.githubusercontent.com/HectorCataldo/11e149d5ba18e9dfe72b6c21e38ca439/raw/b7281863b44021b362338493025cc0723e39b7a9/regions.json");
  const { data: clients } = useFetch("http://localhost:8080/api/clients");
  const { data: profession } = useFetch("http://localhost:8080/api/profession");
  const { data: gender} = useFetch("http://localhost:8080/api/gender");
  const [selectedBirthDate, setSelectedBirthDate] = useState(new Date());
  const [objetos, setObjetos] = useState();
  const [selectedcreateDate] = useState(moment(new Date()));
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("Natural");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");
  const [Currentdate, setCurrentDate]= useState(moment(new Date()));
  const [dataClient, setDataClient] = useState({
    id: "",
    documentNumber: "",
    firstName: "",
    lastName: "",
    secondLastName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const [clientData, setClientData] = useState({
    id: null,
    documentNumber: null,
    firstName: null,
    lastName: null,
    secondLastName: null,
    fantasyName:null,
    birthDate: null,
    gender: {
      id_gender: null,
      gender: null,
    },
    nationality: null,
    phoneNumber: null,
    email: null,
    address: null,
    region: null,
    comuna: null,
    giro: null,
    profession: {
      id_profession: null,
      profession_Name: null
    },
    tipo_persona: null,
    fechaCreacion: null
  })
  const [disableGender, setDisableGender] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // COMUNAS Y REGIONES 
  const [seRegion, setSeRegion] = useState('');
  const [fcomunas, setfcomunas] = useState([]);
  const [seComuna, setSeComuna] = useState();



  //Filtrar Generos
  const GendersFilter = (e) => {
    const tp = e.target.value;
    setSelectedTipo(tp);    

    if (tp === 'Natural'){
      setDisableGender(false);
      setSelectedTipo('Natural');
    }
    else if( tp === 'Juridica'){
      setDisableGender(true);
      setSelectedGender("Compañía");
      setSelectedTipo('Juridica');
    }
    else if( tp != 'Juridica' || tp != 'Natural'){
      setDisableGender(true);
      setSelectedGender();
      setSelectedTipo('');
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

  const isValidProfession = typeof selectedProfession === 'object' &&
    'id_profession' in selectedProfession &&
    'profession_Name' in selectedProfession;

  const professionData = isValidProfession ? {
    id_profession: selectedProfession.id_profession,
    profession_Name: selectedProfession.profession_Name,
  } : null;

  const handleSubmit = async () => {
    try {
      if (
        !clientData.documentNumber ||
        !clientData.firstName ||
        !clientData.lastName ||
        !clientData.secondLastName ||
        !selectedBirthDate ||
        !selectedGender ||
        !seComuna ||
        !seRegion||
        !clientData.nationality ||
        !clientData.phoneNumber ||
        !clientData.email ||
        !clientData.address ||
        !professionData ||
        !selectedTipo,
        console.log(clientData),
        console.log(objetos),
        console.log(selectedcreateDate),
        console.log(selectedGender),
        console.log(professionData)

      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, complete todos los campos antes de enviar.",          
        });
        return;
      }

      const response = await axios.post("http://localhost:8080/api/clients", {
        id: objetos,
        documentNumber: clientData.documentNumber,
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        secondLastName: clientData.secondLastName,
        fantasyName: clientData.fantasyName,
        birthDate: selectedBirthDate,
        gender: {
          id_gender:selectedGender.id_gender,
          gender: selectedGender.gender
        },
        nationality: clientData.nationality,
        phoneNumber: clientData.phoneNumber,
        email: clientData.email,
        address: clientData.address,
        region: seRegion,
        comuna: seComuna,
        giro: clientData.giro,
        profession: professionData,
        state: true,
        tipo_persona: selectedTipo,
        fechaCreacion: selectedcreateDate,
        
      });

      console.log("Respuesta de la API:", response.data);
      Swal.fire({
        icon: "success",
        title: "Registrado",
        text: "Cliente Registrado!",
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
      const length = clients.length;
      const totalObjects = clients[length - 1];
      const id = totalObjects.id;
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
    const rutLimpio = rut.replace(/[^0-9kK]/g, ''); // Eliminar caracteres no numéricos y convertir 'k' a minúscula
    if (rutLimpio.length > 9) return false; // El RUT debe tener 9 caracteres

    let num = parseInt(rutLimpio.slice(0, -1), 10);
    const dv = rutLimpio.slice(-1).toLowerCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = 1; num > 0; i++) {
        multiplo = i === 7 ? 2 : multiplo; // Volver a 2 cuando lleguemos al 8vo dígito
        console.log(i + ' ++$ ' + suma + ' += ' + '( '+ num +' %10) ' + '* ' + multiplo);
        suma += (num % 10) * multiplo;
        console.log('++$ ' + suma)
        num = Math.floor(num / 10);
        multiplo++;
      }

    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? 0 : dvEsperado === 10 ? 'k' : dvEsperado.toString();

    return dv === dvCalculado;
}
  
  //Validaciones con YUP formatos:
  const validationSchema = Yup.object().shape({
    documentNumber: Yup.string().matches(/^(\d{1,2}(\.?\d{3}){2}[-][0-9kK]{1})$|^(\d{1,2}(-\d)?)$/, "Formato de número de documento inválido").
    test('validar-rut','Rut inválido', (value) =>{
      return validarRut(value);
    }).required("Por favor ingresa un número de documento"),
    firstName:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El nombre solo debe contener letras')
    .required('Por favor ingresa un nombre'),
    lastName:Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El apellido solo debe contener letras')
    .required('Por favor ingresa un apellido'),
    secondLastName: Yup.string().trim().notRequired().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El apellido solo debe contener letras'),
    birthDate:Yup.date().max(new Date(), 'La fecha no debe pasar a la actual').required('Ingrese una fecha de nacimiento'),
    email: Yup.string().email('Ingrese un email válido').required('Ingrese un email'),
    phoneNumber: Yup.string().min(9, 'El número debe contener 9 dígitos').matches(/^[0-9]+$/,'Ingrese un número de teléfono válido').required('Ingrese un número de teléfono'),
    address: Yup.string().required('Ingrese una dirección'),
    region: Yup.string().required('Selecciona una región')
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
        firstName: "",
        lastName: "",
        secondLastName: "",
        birthDate: null,
        nationality: "",
        phoneNumber: "",
        email: "",
        address: "",
        region:"",
        tipo_p:"",
    }}
    validationSchema = {validationSchema}
    >
      {({ errors, touched, handleSubmit: formikHandleSubmit, handleChange, handleBlur, values, setFieldValue}) => (
        <Form className="formulario" onSubmit={formikHandleSubmit}>
                      {/* PANEL DE CONTROL */}
                   <Stack direction="row" className="Panel-User">
                            <div className="user-info-container">
                                 <h1 className="title-user"> {userName ? userName : 'Usuario'}</h1>  
                                 <h1 className="title-newuser">Cliente nuevo</h1>
                            </div>
                              <Stack direction="row">
                              <Item className="group-user">                                    
                                    <TextField
                                      id="id filled-disabled"
                                      label="ID Cliente" 
                                      value={objetos? objetos.toString(): ''}
                                      onChange={handleChange}
                                      InputProps={{
                                        readOnly: true,
                                      }}
                                      disabled
                                      variant="filled"/> 
                              </Item>
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


                       {/* PERSONA NATURAL */}
                       {selectedTipo === "Natural" && (

                          <Stack direction="row" spacing={30} className="Containers-stacks2">

                              {/* Contenedor 1 */}
                              <Stack md="4" className="Containers-Stack">
                                <Item md="12" className="Containers-Item">
                                <span className="title-stack">Datos Personales</span>
                                <Item className="group-form">
                                      <FormControl className="select-form">
                                        <InputLabel htmlFor="tipo-persona">Tipo persona </InputLabel>
                                        <Select
                                          id="tipo-persona"
                                          variant="filled"
                                          value={selectedTipo}
                                          onChange={GendersFilter}
                                          onBlur={handleBlur}
                                          label="Tipo persona "
                                          error={touched.selectedTipo && !!errors.selectedTipo}
                                          required
                                        >
                                          {/*<MenuItem>Seleccione un tipo de persona</MenuItem>*/}
                                          <MenuItem value="Natural">Natural</MenuItem>
                                          <MenuItem value="Jurídica">Jurídica</MenuItem>
                                        </Select>
                                      </FormControl>
                                      {errors.selectedTipo && touched.selectedTipo && (
                                        <div className="error">{errors.selectedTipo}</div>
                                      )}
                                    </Item>

                                      <Item className="group-form">
                                        <TextField
                                          id="documentNumber"
                                          className="text-field custom-text-field"
                                          label="RUT"
                                          name="documentNumber"
                                          type="text"
                                          variant="filled"
                                          placeholder="11.111.111-1"
                                          value={values.documentNumber}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[Kk0-9-.]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          required
                                          inputProps={{ maxLength: 12 }}
                                          error={touched.documentNumber && !!errors.documentNumber}
                                          helperText={touched.documentNumber && errors.documentNumber}
                                        />
                                      </Item>
             
                                      <Item className="group-form">
                                        <TextField
                                          id="firstName"
                                          label="Nombres"
                                          type="text"
                                          variant="filled"
                                          name="firstName"
                                          value={values.firstName}
                                          required
                                          onChange={handleChange/*(e) => {setDataClient({ ...dataClient, firstName: e.target.value });
                                                            updateUserName(e.target.value,dataClient.lastName1,dataClient.secondLastName); 
                                                  }*/}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={touched.firstName && !!errors.firstName}
                                          helperText={touched.firstName && errors.firstName}
                                        />
                                      </Item>

                                      <Item className="group-form">
                                        <TextField
                                          id="lastName"
                                          label="Primer Apellido"
                                          type="text"
                                          variant="filled"
                                          required
                                          name="lastName"
                                          value={values.lastName}
                                          onChange={handleChange/*(e) => {setDataClient((prevData)=>({...prevData , lastName: e.target.value }));
                                                            updateUserName(dataClient.firstName,e.target.value,dataClient.secondLastName);
                                                }*/}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={touched.lastName && !!errors.lastName}
                                          helperText={touched.lastName && errors.lastName}
                                        />
                                      </Item>

                                      <Item className="group-form">
                                        <TextField
                                          id="secondLastName"
                                          label="Segundo Apellido"
                                          type="text"
                                          variant="filled"
                                          name="secondLastName"
                                          onChange={handleChange/*(e) => {setDataClient((prevData)=>({ ...prevData, secondLastName: e.target.value }));
                                                            updateUserName(dataClient.firstName,dataClient.lastName,e.target.value);
                                        }*/}
                                          value={values.secondLastName}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={touched.secondLastName && !!errors.secondLastName}
                                          helperText={touched.secondLastName && errors.secondLastName}

                                        />
                                      </Item>
                                      <Item className="group-form">
                                        <LocalizationProvider dateAdapter={AdapterDayjs} error={touched.birthDate && !!errors.birthDate}>
                                          <DatePicker
                                            className="datepicker"
                                            dateFormat="dd/MM/yyyy"
                                            name="birthDate"
                                            label="Fecha de Nacimiento"
                                            value={values.birthDate}
                                            // selected={/*moment(selectedBirthDate).toDate()*/}
                                            onChange={(value) => setFieldValue('birthDate', value)/*setSelectedBirthDate(date)*/}
                                            onBlur={handleBlur}                                         
                                            renderInput={(params)=>(
                                              <TextField
                                                {...params}
                                                error={touched.birthDate && !!errors.birthDate}
                                                helperText={touched.birthDate && errors.birthDate ? errors.birthDate: 'Ingresa una fecha de nacimiento'}
                                              />
                                            )}
                                            />
                                        </LocalizationProvider>                                        
                                      </Item>    
                                </Item>
                              </Stack>

                              {/* Contenedor 2 */}
                              <Stack md="4" className="Containers-Stack">
                                <Item md="12" className="Containers-Item">                 
                                  <span className="title-stack" >Datos de Contacto</span>

                                  <Item className="group-form">
                                        <TextField
                                          id="email"
                                          label="Correo "
                                          type="email"
                                          variant="filled"
                                          name="email"
                                          required
                                          placeholder="Correo@example.com"
                                          onChange={handleChange/*(e) => setDataClient({ ...dataClient, email: e.target.value })*/}
                                          value={values.email}
                                          onBlur={handleBlur}
                                          error={touched.email && !!errors.email}
                                          helperText={touched.email && errors.email}
                                        />
                                      </Item>

                                      <Item className="group-form">
                                        <TextField
                                          id="phoneNumber"
                                          label="Teléfono "
                                          type="text"
                                          variant="filled"
                                          name="phoneNumber"
                                          placeholder="911111111"
                                          onChange={handleChange/*(e) => setDataClient({ ...dataClient, phoneNumber: e.target.value })*/}
                                          onBlur={handleBlur}
                                          value={values.phoneNumber}
                                          error={touched.phoneNumber && !!errors.phoneNumber}
                                          helperText={touched.phoneNumber && errors.phoneNumber}
                                        />
                                      </Item>

                                      <Item md="6" className="group-form">
                                        <TextField
                                          label="Dirección "
                                          type="text"
                                          variant="filled"
                                          name="address"
                                          value={values.address}
                                          onChange={handleChange/*(e) => setDataClient({ ...dataClient, address: e.target.value })*/}
                                          onBlur={handleBlur}
                                          error={touched.address && !!errors.address}
                                          helperText={touched.address && errors.address}
                                        />
                                      </Item>

                                      <Item className="group-form">
                                        <FormControl variant="filled" className="select-form" error={touched.region && !!errors.region}>
                                          <InputLabel htmlFor="region">Región </InputLabel>
                                          <Select
                                            id="region"
                                            name="region"
                                            value={values.region/*seRegion*/}
                                            onChange={(event) => setFieldValue("region", event.target.value)/*RegionChange*/}
                                            onBlur={handleBlur}
                                            label="Región"
                                            // error={touched.region && !!errors.region }
                                            // helperText = {touched.region && errors.region }
                                            >
                                              <MenuItem value = "">
                                              Seleccione una región
                                              </MenuItem>
                                              {Array.isArray(regions?.regions) &&
                                                regions.regions.map((region, index) =>(
                                                  <MenuItem key={index} value={region.name}>
                                                  {region.name}
                                                  </MenuItem>
                                                ))}
                                          </Select>
                                          {touched.region && errors.region && <FormHelperText>{errors.region}</FormHelperText>}
                                        </FormControl>
                                        </Box>
                                      </Item>

                                      <Item className="group-form">
                                        <Box mb={touched.comuna && errors.comuna ? 2.5:0}>
                                        <FormControl variant="filled" className="select-form" error={touched.comuna && !!errors.comuna}>
                                          <InputLabel htmlFor="comuna">Comuna </InputLabel>
                                          <Select
                                            id="comuna"
                                            name="comuna"
                                            value={values.comuna}
                                            onChange={(e) =>{
                                                const comunaSelect = e.target.value;
                                                setValues((prevValues)=> ({...prevValues, comuna: comunaSelect}));
                                                setSeComuna(comunaSelect);
                                              }}
                                            onBlur={handleBlur}
                                            disabled ={!seRegion}
                                            label="Comuna"
                                            required>
                                              <MenuItem value="">Seleccione una comuna</MenuItem>
                                              {Array.isArray(fcomunas) &&
                                                fcomunas.map((comuna, index) =>
                                                (
                                                  <MenuItem key={index} value={comuna.name}>
                                                    {comuna.name}
                                                  </MenuItem>
                                                ))}
                                          </Select>
                                          {seRegion && touched.comuna && errors.comuna && <FormHelperText>{errors.comuna}</FormHelperText>}
                                        </FormControl>
                                        </Box>
                                      </Item>
                                </Item>
                              </Stack>
                              {/* Contenedor 3 */}
                              <Stack md="4" className="Containers-Stack">
                                <Item md="12" className="Containers-Item">    
                                  <span className="title-stack">Datos Adicionales</span>
                                    

                                

                                      <Item className="group-form">
                                        <Box mb={touched.gender && errors.gender ? 2.5:0}>
                                        <FormControl variant="filled" className="select-form" error={touched.gender && !!errors.gender}>
                                          <InputLabel htmlFor="gender">Género </InputLabel>
                                          <Select
                                            id="gender"
                                            name="gender"
                                            value={values.gender}
                                            onChange={(e) => {
                                              const genderSelected = e.target.value;
                                              setValues((prevValues)=>({...prevValues, gender: genderSelected}));
                                              const id_gender = e.target.value;
                                              const genderObjerc = gender.find(item => item.id_gender === id_gender);
                                              setSelectedGender(genderObjerc || null);
                                            }}
                                            onBlur={handleBlur}
                                            label="Género"
                                            disabled= {disableGender}
                                            error={touched.selectedGender && !!errors.selectedGender}
                                          >
                                            <MenuItem value="">Selecciona un género</MenuItem>
                                            {selectedTipo !== 'Natural' && (
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

                                      {/* INFORMACION DE LOCACION */}
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
                                      <Box mb={1}>
                                        <FormControl variant="filled" className="select-form" error={touched.profession && !!errors.profession}>
                                          <InputLabel htmlFor="profesion">Profesión </InputLabel>
                                          <Select
                                            id="profesion"
                                            name="profession"
                                            value={values.profession/*selectedProfession ? selectedProfession.id_profession : ''*/}
                                            onChange={(e) => {
                                              setValues((prevValues)=>({...prevValues, profession: e.target.value}));                                              
                                              const selectedProfessionId = e.target.value;
                                              const selectedProfessionObject = profession.find(item => item.id_profession === selectedProfessionId);
                                              setSelectedProfession(selectedProfessionObject || null);
                                            }}
                                            onBlur={handleBlur}
                                            label="Profesión "
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

                        {selectedTipo === "Juridica" && (
                          <Stack direction="row" spacing={30} className="Containers-stacks2">

                          {/* Contenedor 1 */}
                          <Stack md="4" className="Containers-Stack">
                            <Item md="12" className="Containers-Item">
                               <span className="title-stack">Datos de la Empresa</span>

                              <Item className="group-form">
                                    <FormControl className="select-form">
                                      <InputLabel htmlFor="tipo-persona">Tipo persona </InputLabel>
                                      <Select
                                        id="tipo-persona"
                                        variant="filled"
                                        value={selectedTipo}
                                        onChange={GendersFilter}
                                        onBlur={handleBlur}
                                        label="Tipo persona "
                                        error={touched.selectedTipo && !!errors.selectedTipo}
                                      >
                                        <MenuItem>Seleccione un tipo de persona</MenuItem>
                                        <MenuItem value="Natural">Natural</MenuItem>
                                        <MenuItem value="Juridica">Jurídica</MenuItem>
                                      </Select>
                                    </FormControl>
                                    {errors.selectedTipo && touched.selectedTipo && (
                                      <div className="error">{errors.selectedTipo}</div>
                                    )}
                                  </Item>

                                  <Item className="group-form">
                                    <TextField
                                      id="jdocument"
                                      className="text-field custom-text-field"
                                      label="RUT"
                                      required
                                      name="jdocument"
                                      type="text"
                                      variant="filled"
                                      placeholder="11.111.111-1"
                                      value={values.jdocument}
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
                                      inputProps={{ maxLength: 12 }}                                      
                                      error={touched.jdocument && !!errors.jdocument}
                                      helperText={touched.jdocument && errors.jdocument}
                                    />
                                  </Item>
                                                
                                  <Item className="group-form">
                                    <TextField
                                      label="Razón Social"
                                      type="text"
                                      variant="filled"
                                      required
                                      name="jrazonsocial"
                                      value={values.jrazonsocial}
                                      onChange={(e) => {
                                        handleChange(e);
                                        setClientData({ ...clientData, firstName: e.target.value });
                                        updateUserName(e.target.value,clientData.fantasyName); 
                                              }}
                                      onBlur={handleBlur}
                                      error={touched.jrazonsocial && !!errors.jrazonsocial}
                                      helperText={touched.jrazonsocial && errors.jrazonsocial}
                                    />
                                  </Item>

                                  <Item className="group-form">
                                    <TextField
                                      label="Nombre de Fantasía"
                                      type="text"
                                      variant="filled"
                                      name="jfname"
                                      value={values.jfname}
                                      onChange={(e) => {
                                        handleChange(e);
                                        setClientData({ ...clientData, fantasyName: e.target.value });
                                        updateUserName(clientData.firstName, e.target.value)
                                      }}
                                      onBlur={handleBlur}
                                      error={touched.jfname && !!errors.jfname}
                                      helperText={touched.jfname && errors.jfname}
                                    />
                                  </Item>

                            </Item>
                          </Stack>

                          {/* Contenedor 2 */}
                          <Stack md="4" className="Containers-Stack">
                            <Item md="12" className="Containers-Item">                 
                              <span className="title-stack" >Datos de Contacto</span>

                              <Item className="group-form">
                                    <TextField
                                      label="Correo "
                                      type="email"
                                      required
                                      variant="filled"
                                      name="jemail"
                                      placeholder="Correo@example.com"
                                      value={values.jemail}
                                      onChange={(e) => {
                                        handleChange(e);
                                        setClientData({ ...clientData, email: e.target.value })}}
                                      onBlur={handleBlur}
                                      error={touched.jemail && !!errors.jemail}
                                      helperText={touched.jemail && errors.jemail}
                                    />
                                  </Item>

                                  <Item className="group-form">
                                    <TextField
                                      label="Teléfono "
                                      type="text"
                                      variant="filled"
                                      name="jphone"
                                      required
                                      placeholder="911111111"
                                      value={values.jphone}
                                      inputProps={{maxLength : 12}}
                                          onKeyPress={(e) => {
                                            const pattern = /^[+0-9]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                      onChange={(e) => {
                                        handleChange(e);
                                        setClientData({ ...clientData, phoneNumber: e.target.value })}}
                                      onBlur={handleBlur}
                                      error={touched.jphone && !!errors.jphone}
                                      helperText={touched.jphone && errors.jphone}
                                    />
                                  </Item>

                          

                                  <Item md="6" className="group-form">
                                    <TextField
                                      label="Dirección "
                                      type="text"
                                      variant="filled"
                                      required
                                      name="jaddress"
                                      value={values.jaddress}
                                      onChange={(e)=>{
                                        handleChange(e);
                                        setClientData({...clientData, address: e.target.value});
                                      }}
                                      onBlur={handleBlur}
                                      error={touched.jaddress && !!errors.jaddress}
                                      helperText={touched.jaddress && errors.jaddress}
                                    />
                                  </Item>

                                  <Item className="group-form">
                                    <Box mb={touched.region && errors.region ? 2.5 : 0}>
                                    <FormControl variant="filled" className="select-form" error={touched.jregion && !!errors.jregion}>
                                      <InputLabel htmlFor="region">Región </InputLabel>
                                      <Select
                                        id="region"
                                        value={values.jregion}
                                        name="jregion"
                                        onChange={(e)=>{
                                          setValues((prevValues)=>({...prevValues, jregion:e.target.value}));
                                          RegionChange(e);
                                        }}
                                        onBlur={handleBlur}
                                        required
                                        label="Región">
                                          <MenuItem value = "">
                                          Seleccione una región
                                          </MenuItem>
                                          {Array.isArray(regions?.regions) &&
                                            regions.regions.map((region, index) =>(
                                              <MenuItem key={index} value={region.name}>
                                              {region.name}
                                              </MenuItem>
                                            ))}
                                      </Select>
                                      {touched.jregion && errors.jregion && <FormHelperText>{errors.jregion}</FormHelperText>}
                                    </FormControl>
                                    </Box>
                                  </Item>

                                  <Item className="group-form">
                                  <Box mb={touched.jcomuna && errors.jcomuna ? 2.5 : 0}>
                                    <FormControl variant="filled" className="select-form" error={touched.jcomuna && !!errors.jcomuna}>
                                      <InputLabel htmlFor="comuna">Comuna </InputLabel>
                                      <Select
                                        id="comuna"
                                        name="jcomuna"
                                        value={values.jcomuna}
                                        onChange={(e) => {
                                          setValues((prevValues)=>({...prevValues, jcomuna: e.target.value}))
                                          setSeComuna(e.target.value)}}
                                        onBlur={handleBlur}
                                        disabled ={!seRegion}
                                        label="Comuna"
                                        required>
                                          <MenuItem value="">Seleccione una comuna</MenuItem>
                                          {Array.isArray(fcomunas) &&
                                            fcomunas.map((comuna, index) =>
                                            (
                                              <MenuItem key={index} value={comuna.name}>
                                                {comuna.name}
                                              </MenuItem>
                                            ))}
                                      </Select>
                                      {touched.jcomuna && errors.jcomuna && <FormHelperText>{errors.jcomuna}</FormHelperText>}
                                    </FormControl>
                                    </Box>
                                  </Item>
                                  
                     
                            </Item>
                          </Stack>
                      
                              {/* Contenedor 3 */}
                              <Stack md="4" className="Containers-Stack">
                                <Item md="12" className="Containers-Item">    
                                  <span className="title-stack">Datos Adicionales</span>
                                    

                                  <Item className="group-form">
                                    <TextField
                                      label="GIRO"
                                      type="text"
                                      required
                                      variant="filled"
                                      name="jgiro"
                                      value={values.jgiro}
                                      onChange={(e) => {
                                        handleChange(e);
                                        setClientData({...clientData, giro: e.target.value})
                                    }}
                                      onBlur={handleBlur}
                                      error={touched.jgiro && !!errors.jgiro}
                                      helperText={touched.jgiro &&  errors.jgiro}
                                    />
                                  </Item>

                                  <Item className="group-form">
                                    <Box mb={touched.jnationality && errors.jnationality ? 2.5 : 0}>
                                      <FormControl variant="filled" className="select-form" error={touched.jnationality && !!errors.jnationality}>
                                        <InputLabel htmlFor="nacionalidad">País de origen </InputLabel>
                                        <Select
                                          id="jnationality"
                                          required
                                          name="jnationality"
                                          value={values.jnationality}
                                          onChange={(e) => {
                                            handleChange(e);
                                            setClientData({...clientData, nationality: e.target.value})}}
                                          onBlur={handleBlur}
                                          label="País de origen"
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
  </>
  );
};
