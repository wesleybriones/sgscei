import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./router/AppRouter"
import './Utils/custom.css';

export const GestionApp = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
  )
}
