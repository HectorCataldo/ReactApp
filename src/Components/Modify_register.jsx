import React,{useState, useEffect} from "react"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import '../CSS/register-style.css';
import { useFetch } from '../assets/useFetch';

//MODAL
import Modal from 'react-bootstrap/Modal';

//DATE PICKER
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'



export const Modify = (props) => {


    const [startDate, setStartDate] = useState(new Date());
    const { Formik } = formik;

    const { show, onHide, selectedClient } = props;
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedProfession, setSelectedProfession] = useState(null);
    const [selectedNationality, setSelectedNationality] = useState(null);

    useEffect(() => {
      if (show) {
        setSelectedGender(selectedClient.gender || '');
        setSelectedProfession(selectedClient.profession.profession_Name);
        setSelectedNationality(selectedClient.nationality);
      }
    }, [show, selectedClient]);

    //MODAL CONST
    
    

    const schema = yup.object().shape({
      idclient: yup.string().required(),
      numberdoc:yup.string().required(),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      lastName2: yup.string().required(),
      address: yup.string().required(),
      email: yup.string().required(),
      phone: yup.string().required(),
      gender: yup.string().required(),
    });

    const {data: profession} = useFetch("http://localhost:8080/api/profession");
    const {data: country} = useFetch("https://restcountries.com/v3.1/all");

      
    return(
    <>
         <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title >
         <h1 className="title-modal">MODIFICAR</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Formik
              validationSchema={schema}
              onSubmit={console.log}
              initialValues={{
                idclient: '',
                numberdoc: '',
                firstName: '',
                lastName: '',
                lastName2: '',
                address: '',
                email: '',
                phone: '',
                gender: '',
              }}
            >

              {({ handleSubmit, handleChange, values, touched, errors }) => (


                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="mb-6">
                  <Form.Label className="labels-title">INFORMACIÓN BÁSICA</Form.Label>
                    <Form.Group as={Col} md="3" className="group-form">
                      <Form.Label className="labels">ID Cliente</Form.Label>

                      <Form.Control
                        type="text"
                        name="idclient"
                        className="form-control"
                        value={selectedClient.id}
                        onChange={handleChange}
                        isValid={touched.idclient && !errors.idclient}
                        disabled
                        readOnly /></Form.Group>

                    <Form.Group as={Col} md="3" className="group-form">

                      <Form.Label className="labels">Número de documento</Form.Label>

                      <Form.Control
                        type="text"
                        name="numberdoc"
                        value={selectedClient.documentNumber}
                        onChange={handleChange}
                        isValid={touched.numberdoc && !errors.numberdoc} 
                        disabled
                        readOnly/></Form.Group>
                        
                      <div className="linea"></div>
                    <Form.Label className="labels-title">INFORMACIÓN DE CONTACTO</Form.Label>
                    <Form.Group as={Col} md="3" className="group-form">
                      <Form.Label className="labels">Nombres</Form.Label>
                      <Form.Control
                        type="text"
                        name="Names"
                        value={selectedClient.firstName}
                        onChange={handleChange}
                        isValid={touched.firstName && !errors.firstName} /></Form.Group>


                    <Form.Group as={Col} md="3" className="group-form">
                      <Form.Label className="labels">Primer Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName1"
                        value={selectedClient.lastName}
                        onChange={handleChange}
                        isValid={touched.lastName && !errors.lastName} /></Form.Group>

                    <Form.Group as={Col} md="3" className="group-form">
                      <Form.Label className="labels">Segundo Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName2"
                        value={selectedClient.secondLastName}
                        onChange={handleChange}
                        isValid={touched.lastName2 && !errors.lastName2} /></Form.Group>

                    <Form.Group as={Col} md="3" className="group-form">
                      {/*DATE PICKER FOR BORN REGISTER*/}
                      <Form.Label className="labels">Fecha de nacimiento</Form.Label>
                      <DatePicker className="datepicker" 
                      selected={selectedClient.birthDate ? new Date(selectedClient.birthDate + 'T00:00:00Z') : null}
                      onChange={(date) => setStartDate(date)} />
                    </Form.Group>

                    <Form.Group as={Col} md="3" className="group-form">
                      <Form.Label className="labels">Género</Form.Label>
                      <Form.Select 
                        className="select-form"
                        size='sm'
                        value={selectedGender}
                        onChange={(e) => setSelectedGender(e.target.value)}>
                        <option></option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} md="3" className="group-form">
                      <Form.Label className="labels">Nacionalidad</Form.Label>
                      <Form.Select 
                        className="select-form" 
                        size='sm'
                        value={selectedNationality}
                        onChange={(e) => setSelectedNationality(e.target.value)}>
                        <option></option>
                        {country && country.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name.common}
                          </option>
                        ))

                        }
                      </Form.Select>
                    </Form.Group>

                  
                    <Form.Group as={Col} md="3" className="group-form">
                      <Form.Label className="labels">Teléfono</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={selectedClient.phoneNumber}
                        onChange={handleChange}
                        isValid={touched.phone && !errors.phone} /></Form.Group>


                    <Form.Group as={Col} md="3" className="group-form">
                        <Form.Label className="labels">Correo</Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          value={selectedClient.email}
                          onChange={handleChange}
                          isValid={touched.email && !errors.email} />
                      </Form.Group>
                      
                    <Form.Group as={Col} md="6" className="group-form">
                      <Form.Label className="labels">Dirección</Form.Label>
                      <Form.Control
                        className="form_dir"
                        type="text"
                        name="address"
                        value={selectedClient.address}
                        onChange={handleChange}
                        isValid={touched.address && !errors.address} /></Form.Group>

                  
                      <div className="linea"></div>

                  
                      <Form.Label className="labels-title">INFORMACIÓN ADICIONAL</Form.Label>

                      <Form.Group as={Col} md="3" className="group-form">
                      <Form.Label className="labels">Profesión</Form.Label>
                      <Form.Select 
                        className="select-form" 
                        size='sm'
                        value={selectedProfession}
                        onChange={(e) => setSelectedProfession(e.target.value)}>
                        <option></option>
                        {profession && profession.map((item) => (
                          <option key={item.id} value={item.id}>
                              {item.profession_Name}
                          </option>
                        )  )}
                      </Form.Select>
                    </Form.Group>
                  </Row>
                </Form>
              )}
            </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn_footer" type="submit" >Guardar</Button>
        <Button className="btn_footer" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
       
