import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
import { CloseCircleOutlined,PlusCircleOutlined } from '@ant-design/icons';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import '../CSS/register-style.scss';


export const Registro = (props) => {
  const { data: country } = useFetch( "https://gist.githubusercontent.com/HectorCataldo/ceee7aa2b93e83d7d04f752e3adbe623/raw/25b49d88975f0031ebfbd9abd0b5881e92a9303d/paises.json" )
  const { data: regions} = useFetch("https://gist.githubusercontent.com/HectorCataldo/11e149d5ba18e9dfe72b6c21e38ca439/raw/b7281863b44021b362338493025cc0723e39b7a9/regions.json");
  const { data: clients } = useFetch("http://localhost:8080/api/clients");
  const { data: profession } = useFetch("http://localhost:8080/api/profession");
  const [selectedBirthDate, setSelectedBirthDate] = useState(new Date());
  const [objetos, setObjetos] = useState();
  const [selectedcreateDate] = useState(moment(new Date()));
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("");
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

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const caracRegex = /^[a-zA-Z]+$/;
  const ndocRegex = /^[Kk0-9-]+$/;
  const numberRegex = /^[0-9]+$/;


  // COMUNAS Y REGIONES 
  const [seRegion, setSeRegion] = useState('');
  const [fcomunas, setfcomunas] = useState([]);
  const [seComuna, setSeComuna] = useState();

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


      const response = await axios.post("http://localhost:8080/api/clients", {
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

  return (
    <>
    <TextLinkExample />
    <Sidebar />
    <div className="Pane-Control">
      <Button className="btn_create" type="Submit" onClick={handleSubmit}> <PlusCircleOutlined className="create-log" /> Crear</Button>
      <Button className="btn_cancel"><CloseCircleOutlined className="cancel-log" /> Cancelar </Button>
    </div>
  
    <Formik
      onSubmit={(dataClient, { resetForm }) => {
        console.log(dataClient);
        console.log("Formulario enviado");
        resetForm();
      }}
      initialValues={{
        id: objetos,
        numberdoc: "",
        name: "",
        lastName1: "",
        secondLastName: "",
        phone: "",
        email: "",
        address: "",
      }}
    >
      {({ errors, touched, handleSubmit: formikHandleSubmit, handleChange, handleBlur }) => (
        <Form className="formulario" onSubmit={formikHandleSubmit}>


                       
                          <Stack direction="row" className="Panel-User">

                         
                              <Item className="group-form">
                                 
                                 <TextField
                                   id="id"
                                   label="ID Cliente"
                                   type="text"
                                   variant="filled"
                                   value={objetos}
                                   onChange={handleChange}
                                   InputProps={{
                                     readOnly: true,
                                   }}/> 
                                 </Item>

                                    <Item className="group-form">
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
                                        />
                                      </Item>
                           </Stack>            
                    
  
                   <div className="container-TOTAL">
                    <Stack direction="row" className="Containers-stacks2">
                  
                        <Stack md="4" direction="row" className="Containers-Stack">
                          <Item md="12" className="Containers-Item">
                          <span>Contenedor 1</span>
                              <Modal.Body className="MBody">
                                
              
                                <Item className="group-form">
                                  <TextField
                                    id="rut"
                                    label="RUT"
                                    type="text"
                                    variant="filled"
                                    value={dataClient.documentNumber}
                                    onChange={(e) => setDataClient({ ...dataClient, documentNumber: e.target.value })}
                                    error={touched.numberdoc && !!errors.numberdoc}
                                    helperText={touched.numberdoc && errors.numberdoc}
                                  />
                                </Item>
              
                                <Item className="group-form">
                                  <FormControl className="select-form">
                                    <InputLabel htmlFor="tipo-persona">Tipo persona *</InputLabel>
                                    <Select
                                      id="tipo-persona"
                                      variant="filled"
                                      value={selectedTipo}
                                      onChange={(e) => setSelectedTipo(e.target.value)}
                                      onBlur={handleBlur}
                                      label="Tipo persona *"
                                      error={touched.selectedTipo && !!errors.selectedTipo}
                                    >
                                      <MenuItem value=""></MenuItem>
                                      <MenuItem value="Natural">Natural</MenuItem>
                                      <MenuItem value="Juridica">Júridica</MenuItem>
                                    </Select>
                                  </FormControl>
                                  {errors.selectedTipo && touched.selectedTipo && (
                                    <div className="error">{errors.selectedTipo}</div>
                                  )}
                                </Item>
              
                               
              
                                <Item className="group-form">
                                  <TextField
                                    label="Nombres *"
                                    type="text"
                                    variant="filled"
                                    name="name"
                                    value={dataClient.name}
                                    onChange={(e) => setDataClient({ ...dataClient, firstName: e.target.value })}
                                    error={touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                  />
                                </Item>
              
                                <Item className="group-form">
                                  <TextField
                                    label="Primer Apellido *"
                                    type="text"
                                    variant="filled"
                                    name="lastName1"
                                    value={dataClient.lastName1}
                                    onChange={(e) => setDataClient({ ...dataClient, lastName: e.target.value })}
                                    error={touched.lastName1 && !!errors.lastName1}
                                    helperText={touched.lastName1 && errors.lastName1}
                                  />
                                </Item>
              
                                <Item className="group-form">
                                  <TextField
                                    label="Segundo Apellido"
                                    type="text"
                                    variant="filled"
                                    name="secondLastName"
                                    onChange={(e) => setDataClient({ ...dataClient, secondLastName: e.target.value })}
                                    value={dataClient.secondLastName}
                                  />
                                </Item>
                                <Item className="group-form">
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      className="datepicker"
                                      dateFormat="dd/MM/yyyy"
                                      
                                      selected={moment(selectedBirthDate).toDate()}
                                      onChange={(date) => setSelectedBirthDate(date)}
                                      onBlur={handleBlur}
                                      label="Fecha de Nacimiento"
                                    />
                                  </LocalizationProvider>
                                </Item>
                              </Modal.Body>
                           
                          </Item>
                        </Stack>
              
                        {/* Contenedor 2 */}
                       
                        <Stack md="4" className="Containers-Stack">
                          <Item md="12" className="Containers-Item">
                         
                            <span>Contenedor 2</span>
                            <div className="container">
                              <Modal.Body className="MBody">
                            

                                <Item className="group-form">
                                  <FormControl variant="filled" className="select-form">
                                    <InputLabel htmlFor="gender">Género *</InputLabel>
                                    <Select
                                      id="gender"
                                      value={selectedGender}
                                      onChange={(e) => setSelectedGender(e.target.value)}
                                      onBlur={handleBlur}
                                      label="Género *"
                                      error={touched.selectedGender && !!errors.selectedGender}
                                    >
                                      <MenuItem value=""></MenuItem>
                                      <MenuItem value="Masculino">Masculino</MenuItem>
                                      <MenuItem value="Femenino">Femenino</MenuItem>
                                      <MenuItem value="Otro">Otro</MenuItem>
                                    </Select>
                                  </FormControl>
                                  {errors.selectedGender && touched.selectedGender && (
                                    <div className="error">{errors.selectedGender}</div>
                                  )}
                                </Item>
              
                                {/* INFORMACION DE LOCACION */}
                                <Item className="group-form">
                                  <FormControl variant="filled" className="select-form">
                                    <InputLabel htmlFor="nacionalidad">Pais de origen *</InputLabel>
                                    <Select
                                      id="nacionalidad"
                                      value={selectedNationality}
                                      onChange={(e) => setSelectedNationality(e.target.value)}
                                      onBlur={handleBlur}
                                      label="Nacionalidad *"
                                    >
                                     
                                    </Select>
                                  </FormControl>
                                </Item>

                                <Item className="group-form">
                                  <FormControl variant="filled" className="select-form">
                                    <InputLabel htmlFor="nacionalidad">Región *</InputLabel>
                                    <Select
                                      id="region"
                                      value={selectedNationality}
                                      onChange={(e) => setSelectedNationality(e.target.value)}
                                      onBlur={handleBlur}
                                      label="Región *">
                                    </Select>
                                  </FormControl>
                                </Item>

                                <Item className="group-form">
                                  <FormControl variant="filled" className="select-form">
                                    <InputLabel htmlFor="nacionalidad">Comuna *</InputLabel>
                                    <Select
                                      id="comuna"
                                      value={selectedNationality}
                                      onChange={(e) => setSelectedNationality(e.target.value)}
                                      onBlur={handleBlur}
                                      label="Comuna *">
                                    </Select>
                                  </FormControl>
                                </Item>

                              </Modal.Body>
                            </div>
                          </Item>
                        </Stack>

                      {/* Contenedor 3 */}
                        <Stack md="4" className="Containers-Stack">
                          <Item md="12" className="Containers-Item">                 
                            <span>Contenedor 3</span>
                            <div className="container">
                              <Modal.Body className="MBody">
                             

                                {/*   fin de  informacion de locacion   */}
              
                                <Item className="group-form">
                                  <TextField
                                    label="Teléfono *"
                                    type="text"
                                    variant="filled"
                                    name="phone"
                                    onChange={(e) => setDataClient({ ...dataClient, phoneNumber: e.target.value })}
                                    value={dataClient.phoneNumber}
                                    error={touched.phone && !!errors.phone}
                                    helperText={touched.phone && errors.phone}
                                  />
                                </Item>
              
                                <Item className="group-form">
                                  <TextField
                                    label="Correo *"
                                    type="email"
                                    variant="filled"
                                    name="email"
                                    placeholder="Correo@example.com"
                                    onChange={(e) => setDataClient({ ...dataClient, email: e.target.value })}
                                    value={dataClient.email}
                                    error={touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                  />
                                </Item>
              
                                <Item md="6" className="group-form">
                                  <TextField
                                    label="Dirección *"
                                    type="text"
                                    variant="filled"
                                    name="address"
                                    value={dataClient.address}
                                    onChange={(e) => setDataClient({ ...dataClient, address: e.target.value })}
                                    error={touched.address && !!errors.address}
                                    helperText={touched.address && errors.address}
                                  />
                                </Item>
              
                                <Item className="group-form">
                                  <FormControl variant="filled" className="select-form">
                                    <InputLabel htmlFor="profesion">Profesión *</InputLabel>
                                    <Select
                                      id="profesion"
                                      value={selectedProfession ? selectedProfession.id_profession : ''}
                                      onChange={(e) => {
                                        const selectedProfessionId = e.target.value;
                                        const selectedProfessionObject = profession.find(item => item.id_profession === selectedProfessionId);
              
                                        setSelectedProfession(selectedProfessionObject || null);
                                      }}
                                      onBlur={handleBlur}
                                      label="Profesión *"
                                    >
                                      {profession &&
                                        profession.map((item) => (
                                          <MenuItem key={item.id_profession} value={item.id_profession}>
                                            {item.profession_Name}
                                          </MenuItem>
                                        ))}
                                    </Select>
                                  </FormControl>
                                </Item>
                               
                              </Modal.Body>
                            </div>
                          </Item>
                        </Stack>
                      </Stack>  
          
          </div>
  
        </Form>
      )}
    </Formik>

  </>


  );
};
