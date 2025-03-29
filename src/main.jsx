
import { createRoot } from 'react-dom/client'
import './index.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";

import MainRoutes from './app/routes/MainRoutes.jsx'
import { PrimeReactProvider } from 'primereact/api';

createRoot(document.getElementById('root')).render(
    <PrimeReactProvider>

         <MainRoutes />
    </PrimeReactProvider>
   
)
