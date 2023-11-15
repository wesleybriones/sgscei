import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { GestionRoutes } from '../gestion/routes/GestionRoutes';

export const AppRouter = () => {

    const status = 'authenticated';

      return (

          <Routes>

            {
                (status === 'authenticated')
                ? <Route path='/*' element={ <GestionRoutes /> } />
                : <Route path='/auth/*' element={<AuthRoutes />} />
            }

            <Route path='/*' element={ <Navigate to='/auth/welcome' />  } />
            {/* 
                  <Route path="/Solicitudes" element={<ListaSolicitudes />} />
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
                  <Route path="/Anexo6/:id" element={<Anexo6 />} />

            </Route> */}
        </Routes>
    )
  }