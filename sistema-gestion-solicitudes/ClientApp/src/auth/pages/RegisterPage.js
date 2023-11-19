import {
    Grid, Box, AppBar, Toolbar, Button,
    Typography, CardMedia, Divider
} from "@mui/material"
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { ButtonStyled } from "../../Utils/CustomStyles";
import logo from "../../assets/logo.png";
import FormikControl from "../../components/Form/FormControl";
import { Formik, Form } from "formik";
import * as yup from "yup";
import banner from "../../assets/banner.jpg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SnackbarComponent from "../../components/Snackbar";
import { API_URL } from "../../Utils/Variables";


export const RegisterPage = () => {

    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const [open, setOpen] = useState(false);
   

    const initialValues = {
        nombres: "",
        apellidos: "",
        cedula: "",
        username: "",
        correo: "",
        contrasena: "",
        confirmacion:"",


    };

    const onSubmit = async (values, { resetForm }) => {
        const dataRegistro = JSON.stringify({
            Nombres: values.nombres,
            Apellidos: values.apellidos,
            Cedula: values.cedula,
            Username: values.username,
            Correo: values.correo,
            ContrasenaHash: null,
            Estado: true,

        })

        console.log(dataRegistro);
        let res = await fetch(API_URL + "/Register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: dataRegistro,
        })
        if (res.status === 200) {
            setMessage('Usuario registrado exitosamente')
            setSeverity('success');
            setOpen(true);
            resetForm({});
        }
        else {
            setMessage('Error al crear usuario')
            setSeverity('error');
            setOpen(true);


        }


    }

    const validationSchema = yup.object({
        nombres: yup
            .string()
            .min(2, "Ingrese más de 2 caracteres")
            .required("Nombre requerido"),
        apellidos: yup
            .string()
            .min(2, "Ingrese más de 2 caracteres")
            .required("Apellido requerido"),
        cedula: yup
            .string()
            .required('Campo requerido')
            .matches(/^[0-9]+$/, "Debe ingresar solo numeros")
            .length(10, 'Campo debe contener 10 caracteres'),
        username: yup
            .string()
            .required('Campo requerido'),
        correo: yup
            .string()
            .email('Formato de email incorrecto')
            .required('Campo requerido'),
        contrasena: yup
            .string()
            .required('Campo requerido'),
        confirmacion: yup
            .string()
            .required('Campo requerido')
            .oneOf([yup.ref('contrasena')], 'Contrasenas deben coincidir'),


    });


    const handleCloseSnackBar = (event, reason) => {
       
        setOpen(false);
    };

    





    return (
        <>
            <Box sx={{
                display: 'grid',
                height: '100vh',
                gridTemplateRows: 'auto 85% 15%',
                gridTemplateAreas: `"header header header header"
                                          "main  right right right"
                                          "footer footer footer footer"`,

                                          gridArea: 'main', display: 'flex',
                                          alignItems: 'center',   
                                          backgroundColor:'#2d3b45'                         
            }}>
               

                    <Grid container direction="column" justifyContent="center" alignItems="center" >
                        <Grid item xs={12} sx={{ width: '70%', backgroundColor: "#fff", p: 2, backgroundColor:'#2d3b45', color: 'white' }} >
                            <Grid item sx={{ m: { xs: 1, sm: 2 } }}>
                                <Divider  sx={{ mb:3, fontSize: '2.5rem'}}>
                                    REGISTRO USUARIO EXTERNO
                                </Divider>
                                <Formik

                                    initialValues={initialValues}
                                    onSubmit={onSubmit}
                                    validationSchema={validationSchema}


                                >
                                    {(formik) => {
                                        return ( 
                                            <Form>
                                                <Grid container direction="column">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                label="Nombres"
                                                                name="nombres"
                                                                target="Forms"
                                                                style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '90%'}}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                label="Apellidos"
                                                                name="apellidos"
                                                                target="Forms"
                                                                style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '90%'}}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                label="Cédula"
                                                                name="cedula"
                                                                target="Forms"
                                                                style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '90%'}}
                                                            />
                                                        </Grid>
                                                        
                                                    </Grid>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                label="Username"
                                                                name="username"
                                                                target="Forms"
                                                                style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '90%'}}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                label="Correo Electrónico"
                                                                name="correo"
                                                                target="Forms"
                                                                style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '90%'}}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                label="Contraseña"
                                                                name="contrasena"
                                                                target="Forms"
                                                                style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '90%'}}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                label="Confirmar contraseña"
                                                                name="confirmacion"
                                                                target="Forms"
                                                                style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '90%'}}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container justifyContent="center">
                                                        <ButtonStyled variant="contained" type="submit"  sx={{ mt: 2, width: '15%',  backgroundColor: '#2d3b45', border: '2.5px solid white' }} >
                                                            Registrar
                                                        </ButtonStyled>
                                                    </Grid>
                                                </Grid>
                                                
                                            </Form>
                                          
                                        );
                                    }}
                                </Formik>


                            </Grid>


                        </Grid>
                    </Grid>
                </Box>
                            

            <SnackbarComponent message={message} open={open} severity={severity} onClose={handleCloseSnackBar} />

        </>
    )
}
