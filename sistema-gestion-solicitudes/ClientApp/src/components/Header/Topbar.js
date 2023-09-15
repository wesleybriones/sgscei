import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton } from '@mui/material';
import Notification from "./NotificationSection/Notification";
import ProfileUser from "./ProfileSection/ProfileUser";
import NavComite from './NavComite';

const Topbar = ({ toggleSidebar }) => {

    return (
        <>

            <div className=" d-flex flex-column p-0">         
                <div className="d-flex justify-content-between">
                        <IconButton
                            onClick={toggleSidebar}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className="my-2 my-lg-0">
                            <Notification />
                            <ProfileUser />

                        <Button size="small">
                                    Cerrar Sesion
                             
                            </Button>
                        </div>
                </div>
                <div className="Comite p-2 rounded">
                    <NavComite />
                </div>

                       
                
            
            </div>
           
        </>
  );
};

export default Topbar;
