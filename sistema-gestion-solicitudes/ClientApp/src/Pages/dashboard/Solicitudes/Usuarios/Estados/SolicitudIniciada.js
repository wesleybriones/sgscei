import { Box, Typography} from "@mui/material";
import { ButtonStyled, TypographyTitle, BtnCancel } from "../../../../../Utils/CustomStyles";
import FormikControl from "../../../../../components/Form/FormControl";
import { Formik, Form } from "formik";
import ConfirmDialog from "../../../../../components/Dialog/ConfirmDialog";
import { useState, useEffect } from "react";
import * as yup from "yup";
import MetodosFetch from "../../../../../Servicios/MetodosFetch";
import AnexosList from "../../Secciones/AnexosSection";
import DocumentsList from "../../Secciones/DocumentosSection";
import { API_URL } from "../../../../../Utils/Variables";
import MessageCard from "../../../../../components/Card/MessageCard";

const SolicitudIniciada = (props) => {
    const { solicitud, fetchData } = props;
    const [documentosAdicionales, setDocumentosAdicionales] = useState([]);
    const [openConfirmacion, setOpenConfirmacion] = useState(false);
    const [files, setFiles] = useState([]);


    const getDocumentacionByTipo = async () => {
        try {
            await fetch(API_URL + '/ArchivosBySolicitud/' + solicitud.solicitudDetalle.id)
                .then(response => response.json())
                .then(data => {
                    data.forEach(doc => {
                        let tipoArchivo = doc.tipoArchivo.nombre
                        if (tipoArchivo === 'DocumentacionAdicional') {
                            setDocumentosAdicionales(documentosAdicionales => [...documentosAdicionales, doc])
                        }

                    })
                })

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    useEffect(() => {
        getDocumentacionByTipo();
        return (() => {
            setDocumentosAdicionales([])

        })

    }, [])



    const onSubmit = (value) => {
        console.log(value)
        setOpenConfirmacion(true);

    }

    const initialValues = {
        files: [],
    }

    const handleEnviar = async () => {

        const newFiles = [];

        files.forEach((file) => {

            newFiles.push(
                {
                    Nombre: file.name,
                    solicitudDetalleId: solicitud.solicitudDetalle.id,
                    URL: '',
                    Extension: (file.name).split('.').pop(),
                    UsuarioId: 1,
                    TipoArchivoId: 1,
                }
            )

        })

        console.log(newFiles)

        let response = await MetodosFetch.createArchivos(newFiles)
        if (response.ok) {
            setOpenConfirmacion(false);
            fetchData();
        }
        else {

        }
        

    }

    const handleCloseConfirmacion = () => {
        setOpenConfirmacion(false);
    }


    const validationSchema = yup.object({
        files: yup
            .array()
            .min(1,'Seleccione un archivo para enviar')
            .required("Required")
    })



    return (
        <>
           
            <Box>
                <AnexosList anexos={solicitud.solicitudDetalle.anexos} estado={solicitud.estado.nombre} />
                
                {solicitud.solicitudDetalle.otrosArchivos &&
                    <>
                    <DocumentsList documentos={documentosAdicionales} title={'Documentación Adicional'} tipoArchivo={'DocumentacionAdicional'} />
                    <MessageCard message={solicitud.solicitudDetalle.archivosSolicitados}> </MessageCard>
                   
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema }
                    >
                        {(formik) => {
                            return (
                                <Form>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>

                                        <TypographyTitle>Subir documentación</TypographyTitle>
                                        <FormikControl
                                            control="file"
                                            type="file"
                                            label="Documentos"
                                            name="files"
                                            isMultiple={true}
                                            files={files}
                                            setFiles={setFiles}
                                        />

                                        <Box sx={{ display: "flex", justifyContent: "space-around", m: 2 }} >
                                            <ButtonStyled variant="contained" type="submit" >
                                                Enviar
                                            </ButtonStyled>
                                        </Box>
                                    </Box>



                                </Form>
                            );
                        }}
                    </Formik>

                    </>

                }
               
                <ConfirmDialog title={"Confirmación de Envio"} open={openConfirmacion} handleClose={handleCloseConfirmacion}>
                    <Typography variant="subtitle1">
                        Revisar que los anexos/documentos solicitados han sido correctamente completados.
                    </Typography>
                    <Typography variant="subtitle1">
                        Una vez listo haga click en continuar
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }} >
                        <ButtonStyled onClick={handleEnviar} variant="contained" sx={{ mt: 2 }}>Confirmar</ButtonStyled>
                        <BtnCancel onClick={handleCloseConfirmacion} variant="outlined" color="error" sx={{ mt: 2 }}>Cancelar</BtnCancel>

                    </Box>
                </ConfirmDialog>


            </Box>


        </>

    )

}
export default SolicitudIniciada;
