import { Navigate, Route, Routes } from "react-router-dom";
import { LoginExterno, RegisterPage, Welcome } from "../pages";

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="/loginExt" element={ <LoginExterno /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/welcome" element={ <Welcome /> } />

        <Route path="/*" element={ <Navigate to="/auth/welcome" /> } />
    </Routes>
  )
}
