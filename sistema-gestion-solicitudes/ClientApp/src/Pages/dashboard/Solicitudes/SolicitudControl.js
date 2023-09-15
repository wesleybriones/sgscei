import {useParams } from 'react-router-dom';
import SolicitudComponent from './Usuarios/Solicitud';
import SolicitudCEI from './CEI/SolicitudCEI';





const SolicitudControl = () => {

    const params = useParams();
    const rol = 'solicitante';
    
    return (

        <>

            {rol === 'soicitante' ?
                
                    <SolicitudComponent/>
              
                :
               
                    <SolicitudCEI/>
                

        
            }

            



        </>

    )

}
export default SolicitudControl;

