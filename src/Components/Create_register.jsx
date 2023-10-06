import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import "../CSS/register-style.css";
import { useFetch } from "../assets/useFetch";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";



export const Registro = (props) => {
  const { Formik } = formik;
  const { data: clients } = useFetch("http://localhost:8080/api/clients");
  const { data: profession } = useFetch("http://localhost:8080/api/profession");
  const { data: country } = useFetch("https://restcountries.com/v3.1/all");
  const [objetos, setObjetos] = useState();
  const [selectedBirthDate, setSelectedBirthDate] = useState(moment(new Date()));
  const [selectedcreateDate,setSelectedcreateDate] = useState(moment(new Date()));
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedProfession, setSelectedProfession] = useState({});
  const [selectedTipo, setSelectedTipo]= useState(null);
  const [selectedNationality, setSelectedNationality] = useState(null);
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

  // reglas de contexto para la validación de campos
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const caracRegex = /^[a-zA-Z]+$/;
  const ndocRegex = /^[Kk0-9-]+$/;
  const numberRegex = /^[0-9]+$/;

  // date picker validación
  const [maxDate, setMaxDate] = useState(new Date());

  const handleDateChange = (date) => {
    if (moment(date).isAfter(maxDate)) {
      return; 
    }
    setSelectedBirthDate(date);
  };

  
 
  // METHOD POST
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
        !selectedProfession.id_profession||
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
        profession: {
          id_profession: selectedProfession.id_profession,
          profession_Name: selectedProfession.profession_Name,
        },
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
    }, 1000); // Actualiza la fecha cada segundo

    return () => {
      clearInterval(interval); // Limpia el intervalo al desmontar el componente
    };
  }, []);



  return (
    <>
      <Modal {...props} size="xl">
        <Modal.Header closeButton>
          <h1 className="title-modal">REGISTRAR</h1>
        </Modal.Header>

        <Modal.Body>
          <Formik
            onSubmit={(dataClient, { resetForm }) => {
              console.log(dataClient);
              console.log("Formulario enviado");
              resetForm();
            }}
            validate={() => {
              let errores = {};

              if (!dataClient.documentNumber) {
                errores.documentNumber = "El campo es requerido";
              } else if (!ndocRegex.test(dataClient.documentNumber)) {
                errores.documentNumber = "Formato Invalido";
              }

              if (!dataClient.firstName) {
                errores.firstName = "El campo es requerido";
              } else if (!caracRegex.test(dataClient.firstName)) {
                errores.firstName = "Formato Invalido , Solo puede contener letras";
              }

              if (!dataClient.lastName) {
                errores.lastName = "El campo es requerido";
              } else if (!caracRegex.test(dataClient.lastName)) {
                errores.lastName = "Formato Invalido , Solo puede contener letras";
              }

              if (!dataClient.secondLastName) {
                errores.secondLastName = "El campo es requerido";
              } else if (!caracRegex.test(dataClient.secondLastName)) {
                errores.secondLastName = "Formato Invalido , Solo puede contener letras";
              }

              if (!dataClient.email) {
                errores.email = "El campo es requerido";
              } else if (!emailRegex.test(dataClient.email)) {
                errores.email = "Formato de correo invalido";
              }

              if (!dataClient.phoneNumber) {
                errores.phoneNumber = "El campo es requerido";
              } else if (!numberRegex.test(dataClient.phoneNumber)) {
                errores.phoneNumber = "Formato de telefono invalido, Solo puede contener numeros";
              }

              if (!dataClient.address) {
                errores.address = "El campo es requerido";
              }

              if (!selectedGender) {
                errores.selectedGender = "Debes seleccionar un género.";
              }
              
              if (!selectedTipo) {
                errores.selectedTipo = "Debes seleccionar un Tipo.";
              }
              return errores;
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
            {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
              <Form className="formulario" onSubmit={handleSubmit}>
                <Row className="mb-6">
                  <Form.Label className="labels-title">Información básica</Form.Label>

                  <Form.Group as={Col} md="3" className="group-form">
                    <Form.Label className="labels">ID Cliente</Form.Label>

                    <Form.Control type="text" name="idclient" className="form-control" value={objetos} onChange={handleChange} disabled readOnly />
                  </Form.Group>

                  <Form.Group as={Col} md="3" className={`group-form ${touched.numberdoc && errors.numberdoc ? "has-error" : ""}`}>
                    <Form.Label className="labels">RUT <span className="asterisk">*</span> </Form.Label>

                    <Form.Control
                      type="text"
                      name="numberdoc"
                      placeholder="11.111.111-1"
                      value={dataClient.documentNumber}
                      onChange={(e) => setDataClient({ ...dataClient, documentNumber: e.target.value })}
                      onBlur={handleBlur}
                    />

                    {errors.documentNumber && <div className="error">{errors.documentNumber}</div>}
                  </Form.Group>

                  <Form.Group as={Col} md="3" className="group-form">
                    <Form.Label className="labels">Tipo persona <span className="asterisk">*</span></Form.Label>

                    <Form.Select
                      className="select-form"
                      size="sm"
                      value={selectedTipo}
                      onChange={(e) =>setSelectedTipo(e.target.value)}
                      onBlur={handleBlur}>

                      <option value=""></option>
                      <option value="Natural">Natural</option>
                      <option value="Juridica">Júridica</option>
                      
                    </Form.Select>

                    {errors.selectedTipo && touched.selectedTipo && (
                      <div className="error">{errors.selectedTipo}</div>
                    )}
                  </Form.Group>  

                   {/*FECHA DE CREACION */}

                   <Form.Group as={Col} md="3" className="group-form">
                    <Form.Label className="labels">Fecha Creacion </Form.Label>

                    <DatePicker
                      className="datepicker"
                      dateFormat="dd/MM/yyyy"
                      selected={moment(selectedcreateDate).toDate()}
                      onChange={handleDateChange}
                      maxDate={maxDate}
                      onBlur={handleBlur}
                      disabled
                      readOnly
                    /> 

                      
                  </Form.Group>

                  <div className="linea"></div>

                  <Form.Label className="labels-title">Información de contacto</Form.Label>

                  <Form.Group as={Col} md="3" className="group-form">
                    <Form.Label className="labels">Nombres <span className="asterisk">*</span></Form.Label>

                    <Form.Control
                      type="text"
                      name="name"
                      value={dataClient.name}
                      onChange={(e) => setDataClient({ ...dataClient, firstName: e.target.value })}
                      onBlur={handleBlur}
                    />

                    {errors.firstName && <div className="error">{errors.firstName}</div>}
                  </Form.Group>

                  <Form.Group as={Col} md="3" className="group-form">
                    <Form.Label className="labels">Primer Apellido <span className="asterisk">*</span></Form.Label>

                    <Form.Control
                      type="text"
                      name="lastName1"
                      
                      value={dataClient.lastName1}
                      onChange={(e) => setDataClient({ ...dataClient, lastName: e.target.value })}
                      onBlur={handleBlur}
                    />

                    {errors.lastName && <div className="error">{errors.lastName}</div>}
                  </Form.Group>

                  <Form.Group as={Col} md="3" className="group-form">
                    <Form.Label className="labels">Segundo Apellido </Form.Label>

                    <Form.Control
                      type="text"
                      name="secondLastName"
                      
                      onChange={(e) => setDataClient({ ...dataClient, secondLastName: e.target.value })}
                      value={dataClient.secondLastName}
                      onBlur={handleBlur}
                    />

                    {errors.secondLastName && <div className="error">{errors.secondLastName}</div>}
                  </Form.Group>

                  <Form.Group as={Col} md="3" className="group-form">
                    <Form.Label className="labels">Fecha de nacimiento <span className="asterisk">*</span></Form.Label>

                    <DatePicker
                      className="datepicker"
                      dateFormat="dd/MM/yyyy"
                      selected={moment(selectedBirthDate).toDate()}
                      onChange={handleDateChange}
                      maxDate={maxDate}
                      onBlur={handleBlur}
                    /> 

                      
                  </Form.Group>

                  <Form.Group as={Col} md="3" className="group-form">
                    <Form.Label className="labels">Género <span className="asterisk">*</span></Form.Label>

                    <Form.Select
                      className="select-form"
                      size="sm"
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      onBlur={handleBlur}
                    >
                      <option value=""></option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </Form.Select>

                    {errors.selectedGender && touched.selectedGender && (
                      <div className="error">{errors.selectedGender}</div>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} md="3" className="group-form">
                    <Form.Label className="labels">Nacionalidad <span className="asterisk">*</span></Form.Label>

                    <Form.Select
                      className="select-form"
                      size="sm"
                      value={selectedNationality}
                      onChange={(e) => setSelectedNationality(e.target.value)}
                      onBlur={handleBlur}
                    >
                      <option></option>
                      {country &&
                        country.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name.common}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} md="3" className="group-form">
                    <Form.Label className="labels">Teléfono <span className="asterisk">*</span></Form.Label>

                    <Form.Control
                      type="text"
                      name="phone"
                     
                      onChange={(e) => setDataClient({ ...dataClient, phoneNumber: e.target.value })}
                      value={dataClient.phoneNumber}
                      onBlur={handleBlur}
                    />

                    {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
                  </Form.Group>

                  <Form.Group as={Col} md="3" className="group-form">
                    <Form.Label className="labels">Correo <span className="asterisk">*</span></Form.Label>

                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Correo@example.com"
                      onChange={(e) => setDataClient({ ...dataClient, email: e.target.value })}
                      value={dataClient.email}
                      onBlur={handleBlur}
                    />

                    {errors.email && <div className="error">{errors.email}</div>}
                  </Form.Group>

                  <Form.Group as={Col} md="6" className="group-form">
                    <Form.Label className="labels">Dirección <span className="asterisk">*</span></Form.Label>

                    <Form.Control
                      type="address"
                      name="address"
                      placeholderText="DD/MM/YYYY"
                      value={dataClient.address}
                      onChange={(e) => setDataClient({ ...dataClient, address: e.target.value })}
                      onBlur={handleBlur}
                    />

                    {errors.address && <div className="error">{errors.address}</div>}
                  </Form.Group>

                  <div className="linea"></div>

                  <Form.Label className="labels-title">Información adicional</Form.Label>

                  <Form.Group as={Col} md="3" className="group-form">
                    <Form.Label className="labels">Profesión <span className="asterisk">*</span></Form.Label>
                    <Form.Select
                      className="select-form"
                      size="sm"
                      value={selectedProfession.id_profession}
                      onChange={(e) =>
                        setSelectedProfession({
                          id_profession: e.target.value,
                          profession_Name: e.target.options[e.target.selectedIndex].text,
                        })
                      }
                      onBlur={handleBlur}
                    >
                      <option></option>
                      {profession &&
                        profession.map((item) => (
                          <option key={item.id_profession} value={item.id_profession}>
                            {item.profession_Name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
              </Form>
            )}
          </Formik>
          <Modal.Footer>
            <div className="modal-footer">
              <Button className="btn_footer" type="Submit" onClick={handleSubmit}>
                Registrar
              </Button>
              <Button className="btn_footer" onClick={props.onHide}>
                Close
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};
