import React,{useState} from "react"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import '../CSS/register-style.css';
import { useFetch } from '../assets/useFetch';
import { useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';


export const Registro = (props) => {

    const { Formik } = formik;
    const {data: clients} = useFetch("http://localhost:8080/api/clients");
    const {data: profession} = useFetch("http://localhost:8080/api/profession");
    const {data: country} = useFetch("https://restcountries.com/v3.1/all");
    const[objetos, setObjetos] = useState();
    const [selectedBirthDate, setSelectedBirthDate] = useState(new Date());
    const [selectedGender,setSelectedGender] = useState(null);
    const [selectedProfession, setSelectedProfession] = useState({});
    const [selectedNationality, setSelectedNationality] = useState(null);
    const [dataClient, setDataClient] = useState({
      id: '',
      documentNumber: '',
      firstName:'',
      lastName:'',
      secondLastName:'',
      phoneNumber:'',
      email:'',
      address:''
    }
    );
 
    //  METHOD POST

    const handleSubmit = async () => {
      try {
          if(
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
            !selectedProfession.id_profession
          ){
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Por favor, complete todos los campos antes de enviar.',});
            return;
          }

        const reponse = await axios.post('http://localhost:8080/api/clients',{
          id: objetos,
          documentNumber: dataClient.documentNumber,
          firstName:      dataClient.firstName,
          lastName:       dataClient.lastName,
          secondLastName: dataClient.secondLastName,
          birthDate:      selectedBirthDate,
          gender:         selectedGender,
          nationality:    selectedNationality,
          phoneNumber:    dataClient.phoneNumber,
          email:          dataClient.email,
          address:        dataClient.address,
          profession: {
            id_profession: selectedProfession.id_profession,
            profession_Name: selectedProfession.profession_Name
          },
          state:"True"

          
        });
        console.log('Respuesta de la API:',reponse.data);
        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          text: 'Cliente Registrado!'});
        setTimeout(()=>{window.location.reload();},2000)

      } catch (error) {console.error('Error Al enviar la solicitud POST',error);}
    }


   

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
              onSubmit={(dataClient,{resetForm}) => {
                
                console.log(dataClient);
                console.log('Formulario enviado')
                resetForm();}}
              initialValues={{
                id:objetos,                      
                numberdoc:'',
                name:'',
                lastName:'',
                secondLastName:'',
                phone:'',
                email:'',
                address:'',
              }}


              
              //VALIDACION DE CAMPOS

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
                        placeholder="123456789" 
                        value={dataClient.numberdoc} 
                        onChange={(e) => setDataClient({...dataClient,documentNumber: e.target.value})}
                        onBlur={handleBlur}/>
                        
                       
                      </Form.Group>

                        <div className="linea"></div>

                      <Form.Label className="labels-title">Información de contacto</Form.Label>

                      <Form.Group as={Col} md="3" className="group-form">
                        <Form.Label className="labels">Nombres</Form.Label>

                        <Form.Control 
                        type="text"  
                        name="name"  
                        placeholder="Pedro" 
                        value={dataClient.name} 
                        onChange={(e) => setDataClient({...dataClient,firstName: e.target.value})}
                        onBlur={handleBlur}  />
                      </Form.Group>

                      <Form.Group as={Col} md="3" className="group-form">
                        <Form.Label className="labels">Primer Apellido</Form.Label>

                        <Form.Control 
                          type="text" 
                          name="lastName1"
                          placeholder="Puebla" 
                          value={dataClient.lastName1} 
                          onChange={(e) => setDataClient({...dataClient,lastName: e.target.value})} 
                          onBlur={handleBlur} />
                      </Form.Group>


                      <Form.Group as={Col} md="3" className="group-form">
                        <Form.Label className="labels">Segundo Apellido</Form.Label>

                        <Form.Control 
                          type="text" 
                          name="secondLastName"
                          placeholder="Ureta"  
                          onChange={(e) => setDataClient({...dataClient,secondLastName: e.target.value})}
                          value={dataClient.secondLastName}
                          onBlur={handleBlur} />
                      </Form.Group>

                      <Form.Group as={Col} md="3" className="group-form">
                        <Form.Label className="labels">Fecha de nacimiento</Form.Label>

                        <DatePicker 
                        className="datepicker" 
                        dateFormat="dd/MM/yyyy"
                        selected={moment(selectedBirthDate).toDate()} 
                        onChange={(date)=>setSelectedBirthDate(date)}
                        onBlur={handleBlur} 
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="3" className="group-form">

                        <Form.Label className="labels">Género</Form.Label>

                        <Form.Select 
                         className="select-form" 
                         size='sm' 
                         value={selectedGender}
                         onChange={(e)=>setSelectedGender(e.target.value)}
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
                        value={selectedNationality}
                        onChange={(e)=>setSelectedNationality(e.target.value)}
                        onBlur={handleBlur}>
                          <option></option>
                          {country && country.map((item) => (
                            <option key={item.id} value={item.id}>{item.name.common}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>


                      <Form.Group as={Col} md="3" className="group-form">

                        <Form.Label className="labels">Teléfono</Form.Label>

                        <Form.Control 
                          type="text" 
                          name="phone" 
                          placeholder="956411424" 
                          onChange={(e) => setDataClient({...dataClient,phoneNumber: e.target.value})} 
                          value={dataClient.phoneNumber}
                          
                          onBlur={handleBlur} />
                          
                      </Form.Group>


                      <Form.Group as={Col} md="3" className="group-form">

                          <Form.Label className="labels">Correo</Form.Label>

                          <Form.Control 
                            type="email" 
                            name="email"
                            placeholder="Correo@example.com"  
                            onChange={(e) => setDataClient({...dataClient,email: e.target.value})} 
                            value={dataClient.email}
                            onBlur={handleBlur}  
                            />
                          

                      </Form.Group>
                        
                      <Form.Group as={Col} md="6" className="group-form">

                        <Form.Label className="labels">Dirección</Form.Label>

                        <Form.Control 
                          type="address" 
                          name="address" 
                          placeholder="Calle Caupolicán, 952 RM Providencia" 
                          value={dataClient.address}  
                          onChange={(e) => setDataClient({...dataClient,address: e.target.value})}
                          /> 
                       </Form.Group>


                        <div className="linea"></div>


                      <Form.Label className="labels-title">Información adicional</Form.Label>

                      <Form.Group as={Col} md="3" className="group-form">
                        <Form.Label className="labels">Profesión</Form.Label>
                        <Form.Select 
                        className="select-form" 
                        size='sm' 
                        value={selectedProfession.id_profession}
                        onChange={(e) => setSelectedProfession({
                          id_profession: e.target.value,
                          profession_Name: e.target.options[e.target.selectedIndex].text
                        })}
                        onBlur={handleBlur}>
                          <option></option>
                          {profession && profession.map((item) => (
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
                        <Button className="btn_footer" type="Submit" onClick={handleSubmit}  >Registrar</Button>
                      <Button className="btn_footer" onClick={props.onHide}>Close</Button>
                  </div>
            </Modal.Footer>
         </Modal.Body>





        </Modal></>

  );
}
       
