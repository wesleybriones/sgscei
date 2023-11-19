﻿import { Grid, Box, AppBar, Toolbar, Button, Typography, CardMedia, Divider } from "@mui/material"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { ButtonStyled } from "../../Utils/CustomStyles";
import logo from "../../assets/logo.png";
import FormikControl from "../../components/Form/FormControl";
import { Formik, Form } from "formik";
import * as yup from "yup";
import banner from "../../assets/banner.jpg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const LoginExterno = () => {

    const initialValues = {
        correo: "",
        contrasena: "",

    };

    const onSubmit = async (values) => {
        const dataLogin = JSON.stringify({
            Correo: values.correo,
            ContrasenaHash: values.contrasena,
        })
    }
    
    const validationSchema = yup.object({
        correo: yup
            .string()
            .email('Formato de email incorrecto')
            .required('Correo es requerido'),
        contrasena: yup
            .string()
            .max(20)
            .required('Contraseña requerido'),
    });


    return (

        <>
            <Box sx={{
                display: 'grid',
                height: '100vh',
                gridTemplateRows: 'auto 50% 15%',
                gridTemplateAreas: `"header header header header"
                                          "main  right right right"
                                          `,
                gridArea: 'main', display: 'flex',
                alignItems: 'center',    
                backgroundColor:'#2d3b45'              
            }}>

           
               

                    <Grid container direction="column" justifyContent="center" alignItems="center" >
                        
                        <Grid item xs={12} sx={{ width: '100%', backgroundColor: "#fff", p: 2, backgroundColor:'#2d3b45'}} >
                            
                            <Grid item sx={{ m: {xs: 1, sm: 2  } }}>
                                
                                
                                <Formik
                                        initialValues={initialValues}
                                        onSubmit={onSubmit}
                                        validationSchema={validationSchema}

                                    >
                                        
                                        {(formik) => {
                                        return (
                                            
                                            <Box sx={{ display: 'flex', justifyContent: 'center', p:3, color: 'white'}}>
                                                    
                                                    
                                                    <Form>   
                                                        <Divider  sx={{ mb:3, fontSize: '2.5rem'}}>
                                                            INICIO SESIÓN USUARIO EXTERNO
                                                        </Divider>

                                                        <FormikControl
                                                            control="input"
                                                            type="text"
                                                            label="Correo Electrónico"
                                                            name="correo"
                                                            target="Forms"
                                                            style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '100%' }}
                                                        />

                                                        <FormikControl
                                                            control="input"
                                                            type="password"
                                                            label="Contraseña"
                                                            name="contrasena"
                                                            target="Forms"
                                                            style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px' , width: '100%' }}
                                                    />

                                                    <Box sx={{ display: "flex", flexDirection: "column" , pr: 3}} >
                                                        <ButtonStyled variant="contained" type="submit" sx={{ mt: 2, width: '40%', backgroundColor: '#2d3b45', border: '2.5px solid white' }} >
                                                                Iniciar Sesión
                                                        </ButtonStyled>

                                                        
                                                        
                                                        <Typography sx={{ mt: 1, color: 'Denim' ,  color: 'white' }} component={Link} to="/auth/register" variant="subtitle2">
                                                            Crear cuenta
                                                        </Typography>

                                                        <Typography sx={{ mt: 1, color: 'Denim' ,  color: 'white' }} component={Link} to="/auth/register" variant="subtitle2">
                                                            ¿Olvidaste tu contraseña?
                                                        </Typography>
                                                       
                                                    </Box>
                                                   

                                                    </Form>
                                                </Box>
                                            );
                                        }}
                                </Formik>

                                  
                            </Grid>
                           
                           
                        </Grid>
                    </Grid>
                </Box>
                
                

            



        </>
    )
}
