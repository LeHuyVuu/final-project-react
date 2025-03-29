import "./App.css";
// import { BreadCrumbCommon } from "./components/customcss";
import ProductDetail from "./components/ProductDetail";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css"; // PrimeReact core
import "primeicons/primeicons.css"; // PrimeReact icons
import ProductReviews from "./components/ProductReviews";
import RelatedProducts from "./components/RelatedProducts";

function App() {
  return (
    <div className="app-container">
      {/* <BreadCrumbCommon /> */}
      <ProductDetail />
      {/* <ProductReviews /> */}
      {/* <RelatedProducts /> */}
    </div>
  );
}

export default App;
