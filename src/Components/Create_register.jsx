import React,{useState} from "react"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import '../CSS/register-style.css';
import { useFetch } from '../assets/useFetch';
import { useEffect } from "react";

//MODAL
import Modal from 'react-bootstrap/Modal';

//DATE PICKER
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'



export const Registro = (props) => {


    const [startDate, setStartDate] = useState(new Date());
    const { Formik } = formik;

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

    const {data: clients} = useFetch("http://localhost:8080/api/clients");

    const {data: profession} = useFetch("http://localhost:8080/api/profession");
    
    const[objetos, setObjetos] = useState();

    useEffect(() =>{
      if (clients && Array.isArray(clients)) {
        const length = clients.length;
        const totalObjects = clients[length - 1];
        const id = totalObjects.id;
        setObjetos(id +1);
      }
    },[clients]);


      
    return(
<>
      <Modal {...props}  size='xl'>
          <Modal.Header closeButton>
            <h1 className="title-modal">REGISTRAR</h1>
          </Modal.Header>


          <Modal.Body>
            
            <Formik
              validationSchema={schema}
              onSubmit={console.log('Formulario enviado')}
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


                <Form noValidate onSubmit={handleSubmit}
                >
                  <Row className="mb-6">

                  <Form.Label className="labels-title">Información básica</Form.Label>

                    <Form.Group as={Col} md="3" className="group-form">
                      <Form.Label className="labels">ID Cliente</Form.Label>

                      <Form.Control type="text" name="idclient" className="form-control" value={objetos} onChange={handleChange}  isValid={touched.idclient && !errors.idclient} disabled readOnly />
                    </Form.Group>

                    <Form.Group as={Col} md="3" className="group-form">
                      <Form.Label className="labels">Número de documento</Form.Label>

                      <Form.Control type="text" name="numberdoc" value={values.numberdoc} onChange={handleChange} isValid={touched.numberdoc && !errors.numberdoc} />
                    </Form.Group>

                       <div className="linea"></div>

                   <Form.Label className="labels-title">Información de contacto</Form.Label>

                    <Form.Group as={Col} md="3" className="group-form">
                      <Form.Label className="labels">Nombres</Form.Label>

                      <Form.Control type="text" name="Names"  value={values.firstName} onChange={handleChange}  isValid={touched.firstName && !errors.firstName} />
                    </Form.Group>


                    <Form.Group as={Col} md="3" className="group-form">
                      <Form.Label className="labels">Primer Apellido</Form.Label>

                      <Form.Control type="text" name="lastName1" value={values.lastName} onChange={handleChange} isValid={touched.lastName && !errors.lastName} />
                    </Form.Group>

                    <Form.Group as={Col} md="3" className="group-form">
                      <Form.Label className="labels">Segundo Apellido</Form.Label>

                      <Form.Control type="text" name="lastName2" value={values.lastName2} onChange={handleChange} isValid={touched.lastName2 && !errors.lastName2} />
                    </Form.Group>

                    <Form.Group as={Col} md="3" className="group-form">
                      <Form.Label className="labels">Fecha de nacimiento</Form.Label>

                      <DatePicker className="datepicker" selected={startDate} onChange={(date) => setStartDate(date)} />
                    </Form.Group>

                    <Form.Group as={Col} md="3" className="group-form">

                      <Form.Label className="labels">Género</Form.Label>

                      <Form.Select className="select-form" size='sm'>
                        <option></option>
                        <option value="1">Masculino</option>
                        <option value="2">Femenino</option>
                        <option value="3">Otro</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} md="3" className="group-form">

                      <Form.Label className="labels">Nacionalidad</Form.Label>

                      <Form.Select className="select-form" size='sm'>
                        <option></option>
                        <option value="1">Mujer</option>
                        <option value="2">Hombre</option>
                        <option value="3">Otro</option>
                      </Form.Select>
                    </Form.Group>

                  
                    <Form.Group as={Col} md="3" className="group-form">

                      <Form.Label className="labels">Teléfono</Form.Label>

                      <Form.Control type="number" name="phone" value={values.phone} onChange={handleChange} isValid={touched.phone && !errors.phone} />
                    </Form.Group>


                    <Form.Group as={Col} md="3" className="group-form">

                        <Form.Label className="labels">Correo</Form.Label>

                        <Form.Control type="email" name="email" value={values.email} onChange={handleChange} isValid={touched.email && !errors.email} />

                    </Form.Group>
                      
                    <Form.Group as={Col} md="6" className="group-form">

                      <Form.Label className="labels">Dirección</Form.Label>

                      <Form.Control className="form_dir" type="text" name="address" value={values.address}  onChange={handleChange} isValid={touched.address && !errors.address} />
                    </Form.Group>

                  
                      <div className="linea"></div>

                  
                    <Form.Label className="labels-title">Información adicional</Form.Label>

                    <Form.Group as={Col} md="3" className="group-form">
                      <Form.Label className="labels">Profesión</Form.Label>
                      <Form.Select className="select-form" size='sm'>
                        <option></option>
                        {profession && profession.map((item) => (
                          <option key={item.id} value={item.id}>
                              {item.profession_Name}
                          </option>
                        )  )}
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  <div className="modal-footer">
                      <Button className="btn_footer" type="submit">Registrar</Button>
                      <Button className="btn_footer" onClick={props.onHide}>Close</Button>
                  </div>
                </Form>
          
              )}
            </Formik>
         </Modal.Body>





        </Modal></>

  );
}
       
