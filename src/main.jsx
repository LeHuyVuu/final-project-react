import { createRoot } from "react-dom/client";
import "./index.css";
import MainRoutes from "./app/routes/MainRoutes.jsx";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css"; // icons

createRoot(document.getElementById("root")).render(<MainRoutes />);
