import React, { useState, useEffect } from "react";
import moment                         from "moment";
import axios                          from "axios";
import Form                           from 'react-bootstrap/Form';
import Swal                           from "sweetalert2";
import { useFetch }                   from "../../assets/useFetch";
import TextLinkExample                from "../Navbar/Navbar";
import Sidebar                        from "../Sidebar/sidebar";
import { Formik }                     from "formik";
import TextField                      from "@mui/material/TextField";
import Select                         from "@mui/material/Select";
import MenuItem                       from "@mui/material/MenuItem";
import FormControl                    from "@mui/material/FormControl";
import InputLabel                     from "@mui/material/InputLabel";
import { AdapterDayjs }               from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider }       from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker }                 from '@mui/x-date-pickers/DatePicker';
import Stack                          from '@mui/material/Stack';
import Item                           from '@mui/material/Stack';
import PanelControl                   from "../PanelControl/Panel-Control";
import * as Yup                       from "yup";
import { Box, FormHelperText }        from "@mui/material";
import { useParams }                  from 'react-router-dom';
import dayjs                          from 'dayjs';
import { Correos }                    from "../Contacts/contact_cor";
import { Telefonos }                  from "../Contacts/contact_tel";
import { Direcciones }                from "../Contacts/contact_dir";
import '../Client/CSS/register-style.scss';

export const Modify = (props) => {
  const { data: country }     = useFetch( "https://gist.githubusercontent.com/HectorCataldo/ceee7aa2b93e83d7d04f752e3adbe623/raw/81b6bc11b965720e6717975f665fe85869c71e81/paises.json" )
  const { data: regions }     = useFetch("https://gist.githubusercontent.com/HectorCataldo/11e149d5ba18e9dfe72b6c21e38ca439/raw/b7281863b44021b362338493025cc0723e39b7a9/regions.json");
  const { data: clients }     = useFetch("http://localhost:8080/api/clients");
  const { data: profession }  = useFetch("http://localhost:8080/api/profession");
  const { data: gender }      = useFetch("http://localhost:8080/api/gender");

  const [selectedBirthDate  ,setSelectedBirthDate  ] = useState(dayjs());
  const [objetos            ,setObjetos            ] = useState();
  const [selectedcreateDate ,setCreateDate         ] = useState(dayjs(new Date()));
  const [selectedGender     ,setSelectedGender     ] = useState("");
  const [selectedTipo       ,setSelectedTipo       ] = useState("Natural");
  const [selectedProfession ,setSelectedProfession ] = useState("");
  const [Currentdate        ,setCurrentDate        ]= useState(dayjs());
  const [disableGender      ,setDisableGender      ] = useState(true);
  const [editar             ,setEditar             ] = useState(false);
       
 // COMUNAS Y REGIONES 
 const [seRegion, setSeRegion]      = useState('');
 const [fcomunas, setfcomunas]      = useState([]);
 const [seComuna, setSeComuna]      = useState();
  const { id }                      = useParams();
  const {data : cliente}            = useFetch(`https://si-client-bkn.kps/api/v1/client/${id}`);
  const [loading, setLoading]       = useState(true);
  const [clientData, setClientData] = useState({
    id:             null,
    documentNumber: null,
    firstName:      null,
    lastName:       null,
    secondLastName: null,
    fantasyName:    null,
    birthDate:      null,
    gender: {
      id_gender:    null,
      gender:       null,
    },
    nationality:    null,
    phoneNumber:    null,
    email:          null,
    address:        null,
    region:         null,
    comuna:         null,
    giro:           null,
    profession: {
     id_profession: null,
     profession_Name: null
    },
    tipo_persona:  null,
    fechaCreacion: null
  })


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
  
  const RegionChange = (e) => {
    const selectedRegion =  e && e.target? e.target.value: e;
    setSeRegion(selectedRegion);

  const regionData = regions?.regions.find((region) => region.name === selectedRegion);
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
    id_profession:   selectedProfession.id_profession,
    profession_Name: selectedProfession.profession_Name,
  } : null;

  const handleEdit = ()=>{
    if(editar){
      setEditar(false);
    }
    else{
      setEditar(true);
    }
    console.log(clientData)
  }

  const handleState = async () =>{
    try{
      const response = await axios.put(`http://localhost:8080/api/clients/state/${clientData.id}`);
      if(clientData.state){
      console.log("Respuesta de la API:", response.data);
      Swal.fire({
        icon: "success",
        title: "Desactivado",
        text: "Cliente Desactivado!",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
      }
      else{
        console.log("Respuesta de la API:", response.data);
        Swal.fire({
          icon: "success",
          title: "Activado",
          text: "Cliente Activado!",
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } 
    catch (error) {
        console.error("Error Al enviar la solicitud PUT", error);
    }
  }

  const handleSubmit = async () => {
    console.log(clientData)
    try {
      if(clientData.tipo_persona === "Natural"){
        if (
          !clientData.documentNumber ||
          !clientData.firstName      ||
          !clientData.lastName       ||
          !clientData.birthDate      ||
          !clientData.gender         ||
          !clientData.comuna         ||
          !clientData.region         ||
          !clientData.nationality    ||
          !clientData.phoneNumber    ||
          !clientData.email          ||
          !clientData.address        ||
          !clientData.profession     ||
          !clientData.tipo_persona       
        ) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor, complete todos los campos antes de enviar.",          
          });
          return;
        }
      }
      else{
        if (
          !clientData.documentNumber ||
          !clientData.firstName      ||
          !clientData.comuna         ||
          !clientData.region         ||
          !clientData.giro           ||
          !clientData.nationality    ||
          !clientData.phoneNumber    ||
          !clientData.email          ||
          !clientData.address        ||
          !clientData.tipo_persona
        ) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor, complete todos los campos antes de enviar.",          
          });
          return;
        }
      };
      

      const response = await axios.put("http://localhost:8080/api/clients", {
        id:             clientData.id,
        documentNumber: clientData.documentNumber,
        firstName:      clientData.firstName,
        lastName:       clientData.lastName,
        secondLastName: clientData.secondLastName,
        fantasyName:    clientData.fantasyName,
        birthDate:      clientData.birthDate,
        gender:         clientData.gender,
        nationality:    clientData.nationality,
        phoneNumber:    clientData.phoneNumber,
        email:          clientData.email,
        address:        clientData.address,
        region:         clientData.region,
        comuna:         clientData.comuna,
        giro:           clientData.giro,
        profession:     clientData.profession,
        state: true,
        tipo_persona:   clientData.tipo_persona,
        fechaCreacion:  selectedcreateDate,
      });

      console.log("Respuesta de la API:", response.data);
      Swal.fire({
        icon: "success",
        title: "Modificado",
        text: "Cliente Modificado!",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error Al enviar la solicitud PUT", error);
    }
  };

  useEffect(() => {
    if (clients && Array.isArray(clients)) {
      const length       = clients.length;
      const totalObjects = clients[length - 1];
      const id           = totalObjects.id;
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

  const[newClient, setNewClient] =  useState({});
  useEffect(()=>{
    if(cliente)
    {
      setNewClient(cliente.data);
      setClientData((prevClientData)=>({...prevClientData, documentNumber: cliente.data.egn}));
      setSelectedBirthDate(dayjs(cliente.birthDate));
      setCreateDate(dayjs(cliente.fechaCreacion))
      setLoading(false);
      setDisableGender(false);

      if(cliente.data.manComp == 2){
        setSelectedTipo("Juridica");
        setClientData({...clientData, tipo_persona: 'Juridica'});
        setSelectedGender({
          ...selectedGender,
          id_gender: 0,
          gender: 'Company'
        });
      }
      else{
        setSelectedTipo("Natural");
        setClientData({...clientData, tipo_persona: 'Natural'});
        if(cliente.data.sexo == 1){
          setSelectedGender({
            ...selectedGender,
            id_gender: 1,
            gender: 'Masculino'
          })
        }
        else if(cliente.data.sexo == 2){
          setSelectedGender({
            ...selectedGender,
            id_gender: 2,
            gender: 'Femenino'
          })
        }
        
      }

      RegionChange(cliente.region);
      updateUserName(cliente.data.gname, cliente.data.sname, cliente.secondLastName);
    }
  },[cliente])
 

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

  const validarRut  = (rut) => {
    const rutLimpio = rut.replace(/[^0-9kK]/g, ''); 
    if (rutLimpio.length > 9) return false;
    let num  = parseInt(rutLimpio.slice(0, -1), 10);
    const dv = rutLimpio.slice(-1).toLowerCase();
    let suma = 0;
    let multiplo = 2;
    for (let i = 1; num > 0; i++) {
        multiplo = i === 7 ? 2 : multiplo;
        suma += (num % 10) * multiplo;
        num = Math.floor(num / 10);
        multiplo++;
      }

    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? 0 : dvEsperado === 10 ? 'k' : dvEsperado.toString();

    return dv === dvCalculado;
  }
    
  //Validaciones con YUP formatos:
  const validationSchema = Yup.object().shape({

    documentNumber: Yup.string().matches(/^(\d{1,2}(\.?\d{3}){2}[-][0-9kK]{1})$|^(\d{1,2}(-\d)?)$/, "Formato de número de documento inválido").test('validar-rut','Rut inválido', (value) =>{ return validarRut(value); }).required("Por favor ingresa un número de documento"),
    firstName:      Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El nombre solo debe contener letras').required('Por favor ingresa un nombre'),
    lastName:       Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El apellido solo debe contener letras').required('Por favor ingresa un apellido'),
    secondLastName: Yup.string().trim().notRequired().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/,'El apellido solo debe contener letras'),
    birthDate:      Yup.date().required('La fecha de nacimiento es requerida').max(new Date(), 'La fecha de nacimiento no puede ser posterior a la fecha actual'),
    email:          Yup.string().email('Ingrese un email válido').required('Ingrese un email'),
    phoneNumber:    Yup.string().min(9, 'El número debe contener al menos 9 dígitos').matches(/^[+0-9]+$/,'Ingrese un número de teléfono válido').required('Ingrese un número de teléfono'),
    address:        Yup.string().required('Ingrese una dirección'),
    region:         Yup.string().required('Seleccione una región'),
    comuna:         Yup.string().required('Seleccione una comuna'),
    gender:         Yup.string().required('Seleccione un género'),
    country:        Yup.string().required('Seleccione un país'),
    profession:     Yup.string().required('Seleccione una profesión').nonNullable('Seleccione una profesión'),
    jdocument:      Yup.string().matches(/^(\d{1,2}(\.?\d{3}){2}[-][0-9kK]{1})$|^(\d{1,2}(-\d)?)$/, "Formato de número de documento inválido").test('validar-rut','Rut inválido', (value) =>{ return validarRut(value);}).required("Por favor ingresa un número de documento"),
    jrazonsocial:   Yup.string().trim().required('Ingrese razón social'),
    jfname:         Yup.string().trim().matches(/^(?!\s*$)[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ0-9]+)*$/,'Escriba un nombre').notRequired(),
    jemail:         Yup.string().email('Ingrese un email válido').required('Ingrese un email'),
    jphone:         Yup.string().min(9, 'El número debe contener al menos 9 dígitos').matches(/^[+0-9]+$/,'Ingrese un número de teléfono válido').required('Ingrese un número de teléfono'),
    jaddress:       Yup.string().required('Ingrese una dirección'),
    jregion:        Yup.string().required('Seleccione una región'),
    jcomuna:        Yup.string().required('Seleccione una comuna'),
    jgiro:          Yup.string().required('Ingrese su GIRO'),
    jnationality:   Yup.string().required('Seleccione un país')
  });
  return (
    <>

    <TextLinkExample />
    <Sidebar />
    <PanelControl handleSubmit={handleSubmit} objetos={objetos} handleEdit={handleEdit} handleState={handleState} state={clientData.state}/>

    <Formik enableReinitialize={true} onSubmit={(dataClient, { resetForm }) => { console.log(dataClient); console.log("Formulario enviado"); resetForm(); }}

      initialValues={{ 
        id:             loading ? 'Cargando...' : id || 'No hay id',
        documentNumber: loading? 'Cargando'     : newClient.egn,
        firstName:      loading ? 'Cargando...' : newClient.gname,
        lastName:       loading ? 'Cargando...' : newClient.sname,
        secondLastName: loading ? 'Cargando...' : newClient.fname,
        birthDate:      loading ? 'Cargando...' : clientData.birthDate,
        phoneNumber:    loading ? 'Cargando...' : clientData.phoneNumber,
        email:          loading ? 'Cargando...' : clientData.email,
        address:        loading ? 'Cargando...' : clientData.address,
        region:         loading ? 'Cargando...' : clientData.region,
        comuna:         loading ? 'Cargando...' : clientData.comuna,
        gender:         loading ? 'Cargando...' : selectedGender?.id_gender,
        country:        loading ? 'Cargando...' : clientData.nationality,
        profession:     loading ? 'Cargando...' : clientData.profession?.id_profession,
        jdocument:      loading ? 'Cargando...' : newClient.egn,
        jrazonsocial:   loading ? 'Cargando...' : newClient.gname,
        jfname:         loading ? 'Cargando...' : newClient.sname,
        jemail:         loading ? 'Cargando...' : clientData.email,
        jphone:         loading ? 'Cargando...' : clientData.phoneNumber,
        jaddress:       loading ? 'Cargando...' : clientData.address,
        jregion:        loading ? 'Cargando...' : clientData.region,
        jcomuna:        loading ? 'Cargando...' : clientData.comuna,
        jgiro:          loading ? 'Cargando...' : clientData.giro,
        jnationality:   loading ? 'Cargando...' : clientData.nationality
    }}
    validationSchema = {validationSchema}>

      {({ errors, touched, handleSubmit: formikHandleSubmit, handleChange, handleBlur, values, setFieldValue, setValues}) => (
        <Form className="formulario-cr" onSubmit={formikHandleSubmit}>
                      {/* PANEL DE CONTROL */}
                      
                   <Stack direction="row" className="Panel-User">
                            <div className="user-info-container">
                                 <h1 className="title-user"> {userName ? userName : 'Usuario'}</h1>  
                                 <h1 className="title-newuser">Vista Cliente</h1>
                            </div>
                              <Stack direction="row">
                              <Item className="group-user">
                                    
                                    <TextField
                                      id="id filled-disabled"
                                      label="ID Cliente" 
                                      value={values.id}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      InputProps={{
                                        readOnly: true,
                                      }}
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
                                          value={selectedcreateDate.format("DD/MM/YYYY")}
                                          InputProps={{
                                            readOnly: true,
                                          }}
                                        />
                                      </Item>
                              </Stack>           
                   </Stack>  

                       {/* PERSONA NATURAL */}
                       {selectedTipo === "Natural"  && (
                          <Stack direction="row" spacing={30} className="Containers-stacks-3">

                              {/* Contenedor 1 */}
                              <Stack md="4" className="Containers-Stack-in">
                                <Item md="12" className="Containers-Item">
                                <span className="title-stack">Datos Personales</span>
                                <Item className="group-form">
                                      <FormControl className="select-form">
                                        <InputLabel htmlFor="tipo-persona">Tipo persona </InputLabel>
                                        <Select
                                          id="tipo-persona"
                                          variant="filled"
                                          value={selectedTipo}
                                          inputProps={{
                                            readOnly: true,
                                          }}
                                          onChange={(e) => {
                                            GendersFilter(e);
                                            setClientData({...clientData, tipo_persona: e.target.value});
                                          }}
                                          onBlur={handleBlur}
                                          label="Tipo persona "
                                          error={touched.selectedTipo && !!errors.selectedTipo}
                                          required
                                        >
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
                                          id="documentNumber"
                                          className="text-field custom-text-field"
                                          label="RUT"
                                          name="documentNumber"
                                          type="text"
                                          InputProps={{
                                            readOnly: true,
                                          }}                                          variant="filled"
                                          placeholder="11.111.111-1"
                                          value={loading? 'Cargando...':values.documentNumber}
                                          onChange={(e)=>{
                                            handleChange(e);
                                            setClientData({...clientData, documentNumber: e.target.value})
                                          }}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[Kk0-9-.]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          required
                                          inputProps={{ maxLength: 12 }}
                                          // error={editar && touched.documentNumber && !!errors.documentNumber}
                                          // helperText={editar && touched.documentNumber && errors.documentNumber}
                                        />
                                      </Item>


                                      {/*AQUI VA GENERO*/}  
                                      <Item className="group-form">
                                        <Box mb={editar && touched.gender && errors.gender ? 2.5 : 0}>
                                          <FormControl variant="filled" className="select-form" error={editar && touched.gender && !!errors.gender}>
                                            <InputLabel htmlFor="gender">Género </InputLabel>
                                            <Select
                                              id="gender"
                                              value={values.gender}
                                              name="gender"                                              
                                              onChange={(e) => {                                               
                                                const sgi = e.target.value;
                                                const genderObject = gender.find(item => item.id_gender === sgi);
                                                setSelectedGender(genderObject || null);
                                                setClientData({...clientData, gender: genderObject || null});
                                                setValues((prevValues)=>({...prevValues,gender:e.target.value}))
                                              }}
                                              onBlur={handleBlur}
                                              label="Género"
                                              inputProps={{
                                                readOnly: disableGender || !editar,
                                              }}
                                              error={editar && touched.selectedGender && !!errors.selectedGender}
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
                                            {editar && touched.gender && errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                                          </FormControl>
                                        </Box>                                        
                                      </Item>

                                      
                     
                                </Item>
                              </Stack>

                              {/* Contenedor 2 */}
                              <Stack md="4" className="Containers-Stack-in">
                                <Item md="12" className="Containers-Item">                 
                                  <span className="title-stack" >Datos de Contacto</span>

                                  <Item className="group-form">
                                        <TextField
                                          id="firstName"
                                          label="Nombres"
                                          type="text"
                                          variant="filled"
                                          name="firstName"
                                          InputProps={{
                                            readOnly: !editar,
                                          }}
                                          value={values.firstName}
                                          required
                                          onChange={(e) => {setClientData({ ...clientData, firstName: e.target.value });
                                                            updateUserName(e.target.value,clientData.lastName1,clientData.secondLastName);
                                                            handleChange(e);
                                                  }}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={editar && touched.firstName && !!errors.firstName}
                                          helperText={editar && touched.firstName && errors.firstName}
                                        />
                                      </Item>

                                      <Item className="group-form">
                                        <TextField
                                          id="lastName"
                                          label="Primer Apellido"
                                          type="text"
                                          variant="filled"
                                          required
                                          InputProps={{
                                            readOnly: !editar,
                                          }}                                          name="lastName"
                                          value={values.lastName}
                                          onChange={(e) => {setClientData({ ...clientData, lastName: e.target.value });
                                                            updateUserName(clientData.firstName, e.target.value,clientData.secondLastName);
                                                            handleChange(e);
                                                  }}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={editar && touched.lastName && !!errors.lastName}
                                          helperText={editar && touched.lastName && errors.lastName}
                                        />
                                      </Item>

                                      <Item className="group-form">
                                        <TextField
                                          id="secondLastName"
                                          label="Segundo Apellido"
                                          type="text"
                                          variant="filled"
                                          name="secondLastName"
                                          InputProps={{
                                            readOnly: !editar,
                                          }}                                          value={values.secondLastName}
                                          onChange={(e) => {
                                            setClientData(({ ...clientData, secondLastName: e.target.value }));
                                            updateUserName(clientData.firstName,clientData.lastName,e.target.value);
                                            handleChange(e);
                                        }}
                                          onBlur={handleBlur}
                                          onKeyPress={(e) => {
                                            const pattern = /^[A-Za-záéíóúñÁÉÍÓÚÑ ]+$/;
                                            if (!pattern.test(e.key)) {
                                              e.preventDefault();
                                            }
                                          }}
                                          error={ editar && touched.secondLastName && !!errors.secondLastName}
                                          helperText={editar && touched.secondLastName && errors.secondLastName}

                                        />
                                      </Item>
                                </Item>
                              </Stack>
                              {/* Contenedor 3 */}
                              <Stack md="4" className="Containers-Stack-in">
                                <Item md="12" className="Containers-Item">    
                                  <span className="title-stack">Datos Adicionales</span>

                                  <Item className="group-form">
                                        <LocalizationProvider dateAdapter={AdapterDayjs} error={editar && touched.birthDate && !!errors.birthDate}>
                                          <DatePicker
                                            className="datepicker"
                                            name="birthDate"
                                            label="Fecha de Nacimiento"
                                            value={selectedBirthDate}
                                            readOnly = {!editar}
                                            onChange={(value) => {
                                              setFieldValue('birthDate', value);
                                              setSelectedBirthDate(value);
                                              setClientData({...clientData, birthDate: value.format("YYYY-MM-DD")})
                                            }}
                                            format="DD - MM - YYYY"
                                            onBlur={()=>{
                                              setIsTouched(true);
                                              handleBlur}}
                                            disableFuture
                                            slotProps={
                                              {
                                                textField:{
                                                  required: true,
                                                  variant: 'filled',
                                                  error: editar && Boolean(errors.birthDate),
                                                  helperText: editar && errors.birthDate ? errors.birthDate: ''
                                                }
                                              }
                                            }
                                          />
                                        </LocalizationProvider>
                                      </Item> 

                                      {/* INFORMACION DE LOCACION */}
                                      <Item className="group-form">
                                        <Box mb={editar && touched.country && errors.country ? 2.5 : 0}>
                                          <FormControl variant="filled" className="select-form" error={editar && touched.country && !!errors.country}>
                                            <InputLabel htmlFor="nacionalidad">Pais de origen </InputLabel>
                                            <Select
                                              id="nacionalidad"
                                              required
                                              name="country"
                                              value={values.country}
                                              inputProps={{
                                                readOnly: !editar,
                                              }}
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
                                            {editar && touched.country && errors.country && <FormHelperText>{errors.country}</FormHelperText>}
                                          </FormControl>
                                        </Box>
                                      </Item>

                                      <Item className="group-form">
                                      <Box mb={1}>
                                        <FormControl variant="filled" className="select-form" error={editar && touched.profession && !!errors.profession}>
                                          <InputLabel htmlFor="profesion">Profesión </InputLabel>
                                          <Select
                                            id="profesion"
                                            name="profession"
                                            value={values.profession}
                                            inputProps={{
                                              readOnly: !editar,
                                            }}
                                            onChange={(e) => {
                                              setValues((prevValues)=>({...prevValues, profession: e.target.value}));
                                              const selectedProfessionId = e.target.value;
                                              const selectedProfessionObject = profession.find(item => item.id_profession === selectedProfessionId);
                                              setSelectedProfession(selectedProfessionObject || null);
                                              setClientData({...clientData, profession: selectedProfessionObject || null});
                                            }}
                                            onBlur={handleBlur}
                                            label="Profesión "
                                          >
                                            {profession &&
                                              profession.map((item) => (
                                                <MenuItem key={item.id_profession} value={item.id_profession}>
                                                  {item.profession_Name}
                                                </MenuItem>
                                              ))}
                                          </Select>
                                            {editar && touched.profession && errors.profession && <FormHelperText>{errors.profession}</FormHelperText>}
                                        </FormControl>
                                        </Box>
                                      </Item>
                                </Item>
                              </Stack>
                          </Stack>
                       )}
                       {/* PERSONA JURIDICA */}

                       {selectedTipo === "Juridica" && (
                          <Stack direction="row" spacing={30} className="Containers-stacks-3">

                          {/* Contenedor 1 */}
                          <Stack md="4" className="Containers-Stack-in">
                            <Item md="12" className="Containers-Item">
                               <span className="title-stack">Datos de la Empresa</span>

                              <Item className="group-form">
                                    <FormControl className="select-form">
                                      <InputLabel htmlFor="tipo-persona">Tipo persona </InputLabel>
                                      <Select
                                        id="tipo-persona"
                                        variant="filled"
                                        value={selectedTipo}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        onChange={(e)=>{
                                          GendersFilter(e);
                                          setClientData({...clientData, tipo_persona})
                                        }}
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
                                      disabled
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
                                                
                                

                            </Item>
                          </Stack>

                          {/* Contenedor 2 */}
                          <Stack md="4" className="Containers-Stack-in">
                            <Item md="12" className="Containers-Item">                 
                              <span className="title-stack" >Datos de Contacto</span>

                              <Item className="group-form">
                                    <TextField
                                      label="Razon Social"
                                      type="text"
                                      variant="filled"
                                      required
                                      disabled={!editar}
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
                                      disabled={!editar}
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
                      
                              {/* Contenedor 3 */}
                              <Stack md="4" className="Containers-Stack-in">
                                <Item md="12" className="Containers-Item">    
                                  <span className="title-stack">Datos Adicionales</span>
                                    

                                  <Item className="group-form">
                                    <TextField
                                      label="GIRO"
                                      type="text"
                                      required
                                      variant="filled"
                                      disabled={!editar}
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
                                          disabled={!editar}
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

   <div className="container-comp" style={{ display: 'flex' }}>
     <Telefonos></Telefonos>
     <Correos></Correos>
  </div>

   <Direcciones></Direcciones>

  </>
                  


  );

};
export default Modify;