import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { GestionRoutes } from '../gestion/routes/GestionRoutes';

export const AppRouter = () => {

    const status = 'not-authenticated';

      return (

          <Routes>

            {
                (status === 'authenticated')
                ? <Route path='/*' element={ <GestionRoutes /> } />
                : <Route path='/auth/*' element={<AuthRoutes />} />
            }

            <Route path='/*' element={ <Navigate to='/auth/welcome' />  } />
        </Routes>
    )
  }