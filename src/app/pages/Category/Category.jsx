import CategoryExplore from "./Patrials/CategoryExplore";
import ShowingProduct from "./Patrials/ShowingProduct";
import CategoryBrowser from "./Patrials/CategoryBrowser";
import { useParams } from "react-router-dom";
import ProductListing from "./Patrials/ProductListing";

function Category() {
  const { categoryId } = useParams();

  // If we have a categoryId, show product listing, otherwise show category browsing
  const renderContent = () => {
    if (categoryId) {
      return <ProductListing />;
    } else {
      return (
        <>
          <CategoryExplore />
          <CategoryBrowser />
          {/* <ShowingProduct /> */}
        </>
      );
    }
  };

  return <div className="min-h-screen bg-gray-50">{renderContent()}</div>;
}

export default Category;
