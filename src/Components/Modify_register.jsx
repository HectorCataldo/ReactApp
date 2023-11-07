import React, { useState, useEffect } from "react";
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
import '../CSS/register-style.scss';
import PanelControl from "./Panel-Control";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import { useParams } from 'react-router-dom';


export const Modify = (props) => {
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
  const [disableGender, setDisableGender] = useState(true);
  const [seRegion, setSeRegion] = useState('');
  const [fcomunas, setfcomunas] = useState([]);
  const [seComuna, setSeComuna] = useState();
  const { id } = useParams();
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
        !dataClient.documentNumber ||
        !dataClient.firstName ||
        !dataClient.lastName ||
        !dataClient.secondLastName ||
        !selectedBirthDate ||
        !selectedGender ||
        !selectedNationality ||
        !dataClient.phoneNumber ||
        !dataClient.email ||
        !dataClient.address ||
        !selectedProfession.id_profession ||
        !selectedTipo
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, complete todos los campos antes de enviar.",
        });
        return;
      }
     
      const response = await axios.put("http://localhost:8080/api/clients", {
        id: objetos,
        documentNumber: dataClient.documentNumber,
        firstName: dataClient.firstName,
        lastName: dataClient.lastName,
        secondLastName: dataClient.secondLastName,
        birthDate: selectedBirthDate,   
        gender: selectedGender,
        nationality: selectedNationality,
        phoneNumber: dataClient.phoneNumber,
        email: dataClient.email,
        address: dataClient.address,
        profession: professionData,
        state: "True",
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

 // const props 

 const { selectedClient } = props;

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
  
 
console.log("usuario seleccionado:", props.selectedClient);

  return (
    <>

    <TextLinkExample />
    <Sidebar />
    <PanelControl handleSubmit={handleSubmit} objetos={objetos} />



    <Formik
      onSubmit={(dataClient, { resetForm }) => {
        console.log(dataClient);
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
                                          value={''}
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
                                          value={''}
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
                                          value={''}
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
                                          value={''}
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
                                          value={''}
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
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                          <DatePicker
                                            className="datepicker"
                                            dateFormat="dd/MM/yyyy"
                                            name="birthDate"
                                            label="Fecha de Nacimiento"
                                            value={''}
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
                                          placeholder="Correo@example.com"
                                          onChange={handleChange/*(e) => setDataClient({ ...dataClient, email: e.target.value })*/}
                                          value={''}
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
                                          value={''}
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
                                          value={''}
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
                                            value={''}
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
                                      </Item>

                                      <Item className="group-form">
                                        <FormControl variant="filled" className="select-form">
                                          <InputLabel htmlFor="comuna">Comuna </InputLabel>
                                          <Select
                                            id="comuna"
                                            value={''}
                                            onChange={(e) => setSeComuna(e.target.value)}
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
                                        </FormControl>
                                      </Item>

                                </Item>
                              </Stack>
                              {/* Contenedor 3 */}
                              <Stack md="4" className="Containers-Stack">
                                <Item md="12" className="Containers-Item">    
                                  <span className="title-stack">Datos Adicionales</span>
                                    

                                

                                      <Item className="group-form">
                                        <FormControl variant="filled" className="select-form">
                                          <InputLabel htmlFor="gender">Género </InputLabel>
                                          <Select
                                            id="gender"
                                            value={''}
                                            onChange={(e) => setSelectedGender(e.target.value)}
                                            onBlur={handleBlur}
                                            label="Género"
                                            disabled= {disableGender}
                                            error={touched.selectedGender && !!errors.selectedGender}
                                          >
                                            <MenuItem value="">Selecciona un género</MenuItem>
                                            {selectedTipo !== 'Natural' && (
                                              gender && gender.slice(0, 1).map((item) => (
                                                <MenuItem key={item.id_gender} value={item.gender}>
                                                  {item.gender}
                                                </MenuItem>
                                              ))
                                            )}
                                            {gender && gender.slice(-2).map((item)=>(
                                              <MenuItem key={item.id_gender} value={item.gender}>
                                                {item.id_gender + "."} {item.gender}
                                              </MenuItem> 
                                            ))}
                                          </Select>
                                        </FormControl>
                                        {errors.selectedGender && touched.selectedGender && (
                                          <div className="error">{errors.selectedGender}</div>
                                        )}
                                      </Item>

                                      {/* INFORMACION DE LOCACION */}
                                      <Item className="group-form">
                                        <FormControl variant="filled" className="select-form">
                                          <InputLabel htmlFor="nacionalidad">Pais de origen </InputLabel>
                                          <Select
                                            id="nacionalidad"
                                            required
                                            value={''}
                                            onChange={(e) => setSelectedNationality(e.target.value)}
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
                                        </FormControl>
                                      </Item>

                                      <Item className="group-form">
                                        <FormControl variant="filled" className="select-form">
                                          <InputLabel htmlFor="profesion">Profesión </InputLabel>
                                          <Select
                                            id="profesion"
                                            value={''}
                                            onChange={(e) => {
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
                                        </FormControl>
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
export default Modify;