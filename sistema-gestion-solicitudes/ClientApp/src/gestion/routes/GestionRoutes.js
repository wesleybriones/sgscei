import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages";
import SolicitudControl from "../../Pages/dashboard/Solicitudes/SolicitudControl";

export const GestionRoutes = () => {
  
  const rol = 'administrador'

  return (
    <Routes>
      
        <Route path="/" element={ <Home /> } />
        {/* <Route path="/Solicitudes" element={<ListaSolicitudes />} />
        <Route path="/Solicitud/:id" element={<SolicitudControl />} />
        <Route path="/Usuarios" element={<Usuario />} />
        <Route path="/Roles" element={<Roles />} />
        <Route path="/Especialidades" element={<Especialidades />} />
        <Route path="/Permisos" element={<Permisos />} />
        <Route path="/PlazosSolicitudes" element={<PlazosEntrega />} />
        <Route path="/Anexo1A/:id" element={<Anexo1A />} />
        <Route path="/Anexo1/:id" element={<Anexo1 />} />
        <Route path="/Anexo2/:id" element={<Anexo2 />} />
        <Route path="/Anexo3/:id" element={<Anexo3 />} />
        <Route path="/Anexo4/:id" element={<Anexo4 />} />
        <Route path="/Anexo5/:id" element={<Anexo5 />} />
        <Route path="/Anexo6/:id" element={<Anexo6 />} /> */}
        
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
