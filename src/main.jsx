
import { createRoot } from 'react-dom/client'
import './index.css'

import "primereact/resources/themes/lara-light-blue/theme.css";  // Chủ đề sáng
import "primereact/resources/primereact.min.css";  /* Core CSS */
import "primeicons/primeicons.css";  /* Bộ Icon */


import MainRoutes from './app/routes/MainRoutes.jsx'
import { PrimeReactProvider } from 'primereact/api';


createRoot(document.getElementById('root')).render(
    <PrimeReactProvider value={{ ripple: true, inputStyle: 'outlined' }}>

         <MainRoutes />
    </PrimeReactProvider>
   
)
