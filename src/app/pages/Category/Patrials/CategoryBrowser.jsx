import { useState, useEffect } from "react";
import { getCategories } from "../../../context/api";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Autoplay } from "swiper/modules";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "../../Home/SwiperStyle.css";

const CategoryBrowser = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);

  // Fetch main fashion categories on component mount
  useEffect(() => {
    const fetchParentCategories = async () => {
      setLoading(true);
      try {
        // Fetch top-level fashion categories (parent_id=931 is Thời trang nữ)
        const response = await getCategories(931);
        if (response.data && response.data.data) {
          setParentCategories(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh mục cha:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParentCategories();
  }, []);

  // Handle category selection
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setLoadingSubcategories(true);

    try {
      // Fetch subcategories of the selected category
      const response = await getCategories(category.id);
      console.log("Subcategories response:", response.data);

      if (response.data && response.data.data) {
        // If we got a response with data array
        if (response.data.data.length > 0) {
          // Get the first (should be only) item from the response
          const categoryData = response.data.data[0];
          // Check if it has children
          if (categoryData.children && categoryData.children.length > 0) {
            setSubcategories(categoryData.children);
          } else {
            // No children in the response, check if the original category has children
            if (category.children && category.children.length > 0) {
              setSubcategories(category.children);
            } else {
              setSubcategories([]);
            }
          }
        } else if (category.children && category.children.length > 0) {
          // If the API returned empty but the category object already has children
          setSubcategories(category.children);
        } else {
          setSubcategories([]);
        }
      } else {
        setSubcategories([]);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh mục con:", error);
      // Fallback to using children from the category object if available
      if (category.children && category.children.length > 0) {
        setSubcategories(category.children);
      } else {
        setSubcategories([]);
      }
    } finally {
      setLoadingSubcategories(false);
    }
  };

  const renderSkeletons = () => {
    return Array(12)
      .fill(0)
      .map((_, index) => (
        <SwiperSlide key={`skeleton-${index}`} className="category-slide">
          <div className="flex flex-col items-center p-4 rounded-lg animate-pulse">
            <div className="w-20 h-20 rounded-full bg-gray-300 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
        </SwiperSlide>
      ));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 pl-2 border-l-4 border-blue-500">
          Khám phá theo danh mục
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-gray-300 rounded-full mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 pl-2 border-l-4 border-blue-500">
          Khám phá theo danh mục
        </h2>

        {/* Main category grid with Swiper */}
        <Swiper
          slidesPerView={4}
          grid={{ rows: 2, fill: "row" }}
          spaceBetween={20}
          navigation={true}
          modules={[Grid, Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1280: { slidesPerView: 6, grid: { rows: 2 } },
            1024: { slidesPerView: 4, grid: { rows: 2 } },
            768: { slidesPerView: 3, grid: { rows: 2 } },
            480: { slidesPerView: 2, grid: { rows: 2 } },
          }}
          className="category-swiper mb-10"
        >
          {parentCategories.map((category) => (
            <SwiperSlide key={category.id} className="category-slide">
              <div
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer flex flex-col items-center p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 group ${
                  selectedCategory?.id === category.id
                    ? "bg-blue-50 shadow-md"
                    : ""
                }`}
              >
                <div
                  className={`w-20 h-20 overflow-hidden rounded-full bg-gray-100 mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                    selectedCategory?.id === category.id
                      ? "ring-2 ring-blue-500 ring-offset-2"
                      : ""
                  }`}
                >
                  <img
                    src={
                      category.thumbnail_url ||
                      "https://salt.tikicdn.com/assets/img/image.svg"
                    }
                    alt={category.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <span
                  className={`text-sm font-medium text-center ${
                    selectedCategory?.id === category.id
                      ? "text-blue-600"
                      : "text-gray-700 group-hover:text-blue-600"
                  } transition-colors duration-300`}
                >
                  {category.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Subcategories section */}
        {selectedCategory && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
              {selectedCategory.name}
              <span className="ml-2 text-sm text-gray-500 font-normal">
                ({selectedCategory.product_count.toLocaleString()} sản phẩm)
              </span>
            </h3>

            {loadingSubcategories ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array(12)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-gray-300 rounded-full mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-16 mb-1"></div>
                      <div className="h-2 bg-gray-300 rounded w-10"></div>
                    </div>
                  ))}
              </div>
            ) : subcategories.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {subcategories.map((subcat) => (
                  <Link
                    key={subcat.id}
                    to={`/category/${subcat.id}?urlKey=${subcat.url_key}`}
                    className="flex flex-col items-center group"
                  >
                    <div className="w-16 h-16 overflow-hidden rounded-full bg-white shadow-sm mb-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <img
                        src={
                          subcat.thumbnail_url ||
                          "https://salt.tikicdn.com/assets/img/image.svg"
                        }
                        alt={subcat.name}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <span className="text-xs font-medium text-center text-gray-700 group-hover:text-blue-600 transition-colors">
                      {subcat.name}
                    </span>
                    {subcat.product_count > 0 && (
                      <span className="text-xs text-gray-500">
                        {subcat.product_count.toLocaleString()} sản phẩm
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Không có danh mục con
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBrowser;
