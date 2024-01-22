import React, { useState, useEffect, useMemo } from "react";
import Form                                    from 'react-bootstrap/Form';
import TextLinkExample                         from "./Navbar";
import { Formik }                              from "formik";
import TextField                               from "@mui/material/TextField";
import Swal                                    from "sweetalert2";
import Stack                                   from '@mui/material/Stack';
import Item                                    from '@mui/material/Stack';
import FormControl                             from "@mui/material/FormControl";
import InputLabel                              from "@mui/material/InputLabel";
import FilledInput                             from "@mui/material/FilledInput";
import IconButton                              from "@mui/material/IconButton";
import InputAdornment                          from "@mui/material/InputAdornment";
import Visibility                              from "@mui/icons-material/Visibility";
import VisibilityOff                           from "@mui/icons-material/VisibilityOff";
import Checkbox                                from '@mui/material/Checkbox';
import FormControlLabel                        from '@mui/material/FormControlLabel';
import { Link }                                from 'react-router-dom';
import '../Components/Client/CSS/register-style.scss'
export const Login = (props) => {
 
 const[logindata,setLogindata] = useState({
        email:null,
        password:null
    })

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword         = () => setShowPassword((show) => !show);
    const handleMouseDownPassword         = (event) => {
        event.preventDefault();
      };
    

    const handleSubmit = async()=>{
        try{
            if(
                !logindata.email ||
                !logindata.password
            ){
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Por favor, complete todos los campos antes de iniciar sesion.",          
                });
                return;
              }}

        catch (error) {console.error("Error Al enviar la solicitud de LOGIN", error); }}; 

  return (
    <>
    <TextLinkExample />

    <Formik onSubmit={(response, { resetForm }) => {response(); console.log("Formulario enviado"); resetForm();}}>

      {({ errors, touched, handleSubmit: handleSubmit, handleChange, handleBlur, values, setFieldValue, setValues}) => (
        <Form className="formulario-login" onSubmit={handleSubmit}>

          <Stack direction="row" spacing={30} className="Containers-stacks2-login">  
           
            <Item md="6" className="Containers-Item-login"> 
              <img className="foto" src="https://s1.1zoom.me/b4647/584/Cosmonauts_Surface_of_planets_525931_1920x1080.jpg"></img>
            </Item>
            <Item md="6" className="Containers-Item-login-2">                 
                <span className="title-login" >Iniciar Sesión</span>
                  <Item className="group-form-login">
                      <TextField
                        label="Correo "
                        type="email"
                        required
                        variant="filled"
                        name="email"
                        placeholder="Correo@example.com"
                        value={logindata.email}
                        onChange={(e) => {
                          handleChange(e);
                          setClientData({ ...logindata, email: e.target.value })}}
                        onBlur={handleBlur}
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                      />
                  </Item>

          <Item className="group-form-login">
              <FormControl  variant="filled">
                  <InputLabel htmlFor="filled-adornment-passwrd">Password</InputLabel>
                      <FilledInput
                        id="filled-adornment-password"
                        type={showPassword ? "text" : "password"}
                        required
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />} 
                            </IconButton>
                      </InputAdornment>}/>
              </FormControl>

                <div className="buttons-check">
                  <FormControlLabel control={<Checkbox />} label="Recordarme"/>
                  <a  className="forgot" href="#">Olvide mi contraseña</a>
                </div>
                
              <Link className="link" to="/ApClients"> <button className="btn-login">Iniciar Sesión</button></Link>
                <a className="noacount" href="#">¿Aun no tienes cuenta? Registrate</a>
              </Item>
            </Item>       
          </Stack>
                                    
        </Form>
      )}
    </Formik>
  </>
  );
};