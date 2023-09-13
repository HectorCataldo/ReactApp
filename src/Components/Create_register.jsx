import React,{useState} from "react"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';

import '../CSS/register-style.css';
import { useFetch } from '../assets/useFetch';
import { useEffect } from "react";

//MODAL
import Modal from 'react-bootstrap/Modal';

//DATE PICKER
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

// CONECT DB


export const Registro = (props) => {


    const [startDate, setStartDate] = useState(new Date());
    
    const { Formik } = formik;

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

    
    //DB CONECTION

    const handleSubmit = async e =>{
      e.preventDefault()
      try {
        let config = {
          method: 'POST',
          headers:{'Accept':'application/json',
                   'Content-Type':'application/json'
                  },
           body: JSON.stringify(this.state.formulario)

        }
        let res = await fetch('http://localhost:8080/api/clients',config)
        let json = await res.json()
        

        console.log(json)
      } 

      catch (error) {
        console.log(error)
      }
    }
      
    return(
<>
      <Modal {...props}  size='xl'>
          <Modal.Header closeButton>
            <h1 className="title-modal">REGISTRAR</h1>
          </Modal.Header>


          <Modal.Body>
            
            <Formik
              onSubmit={(valores,{resetForm}) => {
                
                console.log(valores);
                console.log('Formulario enviado')
                resetForm();}}
              initialValues={{
                id:objetos,                      
                numberdoc:'',
                name:'',
                lastName1:'',
                datepicker:'',
                gender:'',
                country:'',
                phone:'',
                email:'',
                address:'',
                profession:'',
              }}


              // VALIDACION DE CAMPOS
              validate={(valores)=>{

                let errores = {};
                  // NOMBRE
                  if(!valores.numberdoc){
                    errores.numberdoc = 'Por favor ingresa un numero de documento'
                  }
                    

                if(!valores.name){
                  errores.name = 'Por favor ingresa un nombre'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)){
                  errores.name='El nombre solo puede contener letras y espacios'}

                if(!valores.lastName1){
                  errores.lastName1 = 'Por favor ingresa un apellido'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.lastName1)){
                  errores.lastName1='El apellido solo puede contener letras'}

                if(!valores.lastName2){
                  errores.lastName2 = 'Por favor ingresa un apellido'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.lastName2)){
                  errores.lastName2='El apellido solo puede contener letras'
                }

                if(!valores.phone){
                  errores.phone = 'Por favor ingresa un numero telefonico'
                }else if(/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.phone)){
                  errores.phone='El Telefono solo puede contener numeros'
                }

                if(!valores.email){
                  errores.email = 'Por favor ingresa un Correo'
                }
                if(!valores.address){
                  errores.address = 'Por favor ingresa una Direccion'
                }
              
                  return errores;
              }}


            >

              {({values,errors,touched,handleSubmit,handleChange,handleBlur}) => (


                <Form className="formulario" onSubmit={handleSubmit}>
                   <Row className="mb-6">
                   <Form.Label className="labels-title">Información básica</Form.Label>

                      <Form.Group as={Col} md="3" className="group-form">
                        <Form.Label className="labels">ID Cliente</Form.Label>

                        <Form.Control 
                        type="text" 
                        name="idclient" 
                        className="form-control" 
                        value={objetos} 
                        onChange={handleChange}  
                        disabled 
                        readOnly />
                      </Form.Group>

                      <Form.Group as={Col} md="3" className="group-form">
                        <Form.Label className="labels">Número de documento</Form.Label>

                        <Form.Control 
                        type="text"  
                        name="numberdoc" 
                        id="numberdoc"
                        placeholder="123456789" 
                        value={values.numberdoc} 
                        onChange={handleChange}
                        onBlur={handleBlur}/>
                        {touched.numberdoc && errors.numberdoc && <div className="error">{errors.numberdoc}</div>}
                      </Form.Group>

                        <div className="linea"></div>

                      <Form.Label className="labels-title">Información de contacto</Form.Label>

                      <Form.Group as={Col} md="3" className="group-form">
                        <Form.Label className="labels">Nombres</Form.Label>

                        <Form.Control 
                        type="text"  
                        name="name"  
                        placeholder="Pedro" 
                        id="name" 
                        value={values.name} 
                        onChange={handleChange}
                        onBlur={handleBlur}  />
                        {touched.name && errors.name && <div className="error">{errors.name}</div>}
                      </Form.Group>

                      <Form.Group as={Col} md="3" className="group-form">
                        <Form.Label className="labels">Primer Apellido</Form.Label>

                        <Form.Control 
                          type="text" 
                          name="lastName1"
                          placeholder="Puebla"  
                          id="lastname1" 
                          onChange={handleChange} 
                          value={values.lastName1}
                          onBlur={handleBlur} />
                          {touched.lastName1 && errors.lastName1 && <div className="error">{errors.lastName1}</div>}
                      </Form.Group>


                      <Form.Group as={Col} md="3" className="group-form">
                        <Form.Label className="labels">Segundo Apellido</Form.Label>

                        <Form.Control 
                          type="text" 
                          name="lastName2"
                          placeholder="Ureta"  
                          id="lastname2" 
                          onChange={handleChange} 
                          value={values.lastName2}
                          onBlur={handleBlur} />
                          {touched.lastName2 && errors.lastName2 && <div className="error">{errors.lastName2}</div>}
                      </Form.Group>

                      <Form.Group as={Col} md="3" className="group-form">
                        <Form.Label className="labels">Fecha de nacimiento</Form.Label>

                        <DatePicker 
                        className="datepicker" 
                        uniqkey
                        id="datapicker" 
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)}
                        onBlur={handleBlur} 
                        />
                        
                      </Form.Group>

                      <Form.Group as={Col} md="3" className="group-form">

                        <Form.Label className="labels">Género</Form.Label>

                        <Form.Select 
                         className="select-form" 
                         size='sm' 
                         id="gender"
                         value={values.gender}
                         onChange={handleChange}
                         onBlur={handleBlur} >
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
                        id="country"
                        
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}>
                          <option></option>
                          <option value="1">Mujer</option>
                          <option value="2">Hombre</option>
                          <option value="3">Otro</option>
                        </Form.Select>
                      </Form.Group>


                      <Form.Group as={Col} md="3" className="group-form">

                        <Form.Label className="labels">Teléfono</Form.Label>

                        <Form.Control 
                          type="text" 
                          name="phone" 
                          placeholder="956411424" 
                          id="phone" 
                          onChange={handleChange} 
                          value={values.phone}
                          onBlur={handleBlur} />
                          {touched.phone && errors.phone && <div className="error">{errors.phone}</div>}
                      </Form.Group>


                      <Form.Group as={Col} md="3" className="group-form">

                          <Form.Label className="labels">Correo</Form.Label>

                          <Form.Control 
                            type="email" 
                            name="email"
                            placeholder="Correo@example.com"  
                            id="email" 
                            onChange={handleChange} 
                            value={values.email}
                            onBlur={handleBlur}  />
                            {touched.email && errors.email && <div className="error">{errors.email}</div>}

                      </Form.Group>
                        
                      <Form.Group as={Col} md="6" className="group-form">

                        <Form.Label className="labels">Dirección</Form.Label>

                        <Form.Control 
                          className="form_dir" 
                          type="text" 
                          name="address" 
                          placeholder="Calle Caupolicán, 952 RM Providencia" 
                          id="address"
                          value={values.address}  
                          onChange={handleChange}  />
                          {touched.address && errors.address && <div className="error">{errors.address}</div>}
                      </Form.Group>


                        <div className="linea"></div>


                      <Form.Label className="labels-title">Información adicional</Form.Label>

                      <Form.Group as={Col} md="3" className="group-form">
                        <Form.Label className="labels">Profesión</Form.Label>
                        <Form.Select 
                        className="select-form" 
                        size='sm' 
                        id="profession"
                        value={values.profession}
                        onChange={handleChange}
                        onBlur={handleBlur}>
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
                      <Button className="btn_footer" type="Submit">Registrar</Button>
                      <Button className="btn_footer" onClick={props.onHide}>Close</Button>
                  </div>
                </Form>
          
              )}
            </Formik>
         </Modal.Body>





        </Modal></>

  );
}
       
