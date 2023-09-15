import { Component } from "react";
import {
     Typography
} from "@mui/material";
import Tabla from "../../../components/Table/Tabla";
import { API_URL } from "../../../Utils/Variables";
import { ButtonStyled } from "../../../Utils/CustomStyles";
import RoleActions from "./RoleActions";
import FormDialog from "../../../components/Dialog/Dialogo";
import AddRole from "./AddRole";
import SnackBar from "../../../components/Snackbar";

class Roles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            listaRoles: [],
            dialogOpen: false,
            openSnackbar: false,
            messageInfo: "",
            severity: "",
        }

    }

    async componentDidMount() {
        this.cargarRoles()        

    }

    cargarRoles() {
        fetch(API_URL + '/Role')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    listaRoles: data,
                    loading: false,
                })
            });
    }


    handleOpenCreate() {
        this.setState({
            dialogOpen: true
        })
    };


    handleCloseCreate = () => {
        this.setState({
            dialogOpen: false
        })
    };


    handleShowSnackBar = (success, message) => {
        if (success) {
            this.setState({
                isLoading: true,
                dialogOpen: false,
                openSnackbar: true,
                messageInfo: message,
                severity: "success",
            })
            this.cargarRoles()
        }
        else {
            this.setState({
                openSnackbar: true,
                messageInfo: message,
                severity: "error",
            })

        }
    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            openSnackbar: false,
        })
    };

    render() {

        return (

            <>
                <div className="d-flex flex-column m-3">
                    <Typography sx={{ fontWeight: 'bold', textAlign: "center" }}>Roles</Typography>

                    <div className="d-flex justify-content-end m-3">
                        <ButtonStyled  variant="contained"
                            onClick={() => this.handleOpenCreate()}
                        >
                            Nuevo Rol
                        </ButtonStyled>
                    </div>
                    <div >

                        <Tabla isLoading={this.state.loading}
                            headerNames={[
                                {

                                    field: "id",
                                    headerName: "ID",
                                    type: "integer",
                                    width: 90,
                                    headerAlign: 'center',
                                    align: 'center',
                                },
                                {
                                    field: "nombre",
                                    headerName: "Nombre",
                                    type: "string",
                                    width: 200,
                                },
                                {
                                    field: "estado",
                                    headerName: "Estado",
                                    align: 'center',
                                    type: "boolean",
                                    width: 150,
                                    renderCell: (params) => {
                                        return (
                                            <RoleActions parametros={params.row} snackBar={this.handleShowSnackBar} handleClose={this.handleCloseCreate} />
                                        );
                                    },

                                },
                                

                            ] }
                            data={this.state.listaRoles} />
                    </div>

                  

                    <AddRole open={this.state.dialogOpen} handleClose={this.handleCloseCreate} handleSnackBar={this.handleShowSnackBar} />

                    <SnackBar message={this.state.messageInfo} open={this.state.openSnackbar} severity={this.state.severity} onClose={this.handleCloseSnackBar} />

                </div>
            </>

        )
    }
} export default Roles;


/*

 <FormDialog
                        title={"Nuevo Rol"}
                        isOpen={this.state.dialogOpen}
                        handleClose={this.handleCloseCreate}
                        content={<AddRole handleClose={this.handleCloseCreate} handleSnackBar={this.handleShowSnackBar} />}
                    />

*/
