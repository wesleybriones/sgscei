import { Formik, Form } from "formik";
import * as yup from "yup";
import FormDialog from "../../../../components/Dialog/Dialogo";
import { Box , Typography } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email';
import FormikControl from "../../../../components/Form/FormControl";
import { ButtonStyled, BtnCancel } from "../../../../Utils/CustomStyles";

const InvitationForm = (props) => {

    const { openDialog, handleCloseDialog } = props;


    const initialValues = {
        correo: '',
        mensaje:'',
    }

    const onSubmit = (value) => {
        console.log(value)
    }

    const validationSchema = yup.object({
        correo: yup
            .string()
            .email('Formato de email incorrecto')
            .required('Correo requerido'),

        mensaje: yup
            .string()
            .required('Mensaje requerido')
    });

    

    return (
        <>
            <FormDialog title={"Invitación"} open={openDialog} handleClose={handleCloseDialog}>

                <Box sx={{ display: 'flex', flexDirection:'column'}}>
                    <Box sx={{display:'flex', mb:2, alignItems:'center'}}>
                        <EmailIcon sx={{mr:2}} />
                        <Typography variant="subtitle2">
                            Correo Electrónico
                        </Typography>    
                    </Box>
                    
                    <Box>
                        
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}

                        >
                            {(formik) => {
                                return (
                                    <Form>
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <Box sx={{ display: "flex" , flexDirection:'column'}}>
                                                <FormikControl
                                                    control="input"
                                                    type="email"
                                                    label="Correo Agente externo"
                                                    name="correo"
                                                    target="Forms"
                                                />

                                                <FormikControl
                                                    control="textarea"
                                                    type="text"
                                                    label="Mensaje"
                                                    name="mensaje"
                                                    placeholder="Mensaje invitación"
                                                />



                                            </Box>

                                            <Box sx={{ display: "flex", justifyContent: "space-around" }} >
                                                <ButtonStyled variant="contained" type="submit" sx={{ mt: 2 }} >
                                                    Invitar
                                                </ButtonStyled>
                                                <BtnCancel variant="outlined" color="error" type="button" sx={{ mt: 2 }} onClick={handleCloseDialog} >
                                                    Cancelar
                                                </BtnCancel>

                                            </Box>
                                        </Box>



                                    </Form>
                                );
                            }}
                        </Formik>


                    </Box>
                </Box>
                
                
              
            



            </FormDialog>

        </>

    )


}; export default InvitationForm;
