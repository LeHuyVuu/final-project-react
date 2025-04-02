import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Rating } from "primereact/rating";
import { Badge } from "primereact/badge";
import { OverlayPanel } from "primereact/overlaypanel";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faChevronDown,
  faHeart,
  faShoppingCart,
  faStar,
  faTimes,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { 
  getCategoryDetail,
  // getProductListing,
  getFilters,
  getFilteredProducts,
  getPaginationInfo,
} from "../../../context/api";
// import { testCategoryDetail } from "../../../context/apiDebug";

const ProductListing = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const urlKey = new URLSearchParams(location.search).get("urlKey");

  const [products, setProducts] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState("top_seller");
  const [hoverProduct, setHoverProduct] = useState(null);
  const [filtersApplied, setFiltersApplied] = useState(0);
  const colorPanelRef = useRef(null);

  // Cập nhật state filterOptions để phù hợp với cấu trúc API Tiki
  const [filterOptions, setFilterOptions] = useState({
    materials: [],
    patterns: [],
    colors: [],
    sizes: [],
    priceRanges: [],
    ratings: [],
  });

  const [filters, setFilters] = useState({
    materials: [],
    patterns: [],
    colors: [],
    price:null
  });

  const [checkboxFilters, setCheckboxFilters] = useState({
    fastDelivery: false,
    freeShip: false,
    fourPlusStar: false,
    topDeal: false,
  });

  const sortOptions = [
    { label: "Phổ biến", value: "top_seller" },
    { label: "Bán chạy", value: "newest" },
    { label: "Giá thấp đến cao", value: "price,asc" },
    { label: "Giá cao đến thấp", value: "price,desc" },
  ];

  // Màu sắc mặc định cho các màu từ API
  const colorMap = {
    Đen: "#000000",
    Trắng: "#ffffff",
    Đỏ: "#ef4444",
    "Xanh dương": "#3b82f6",
    "Xanh lá": "#22c55e",
    Vàng: "#facc15",
    Hồng: "#ec4899",
    Tím: "#a855f7",
    Xám: "#6b7280",
    Nâu: "#92400e",
    Kem: "#fef9c3",
    Cam: "#fb923c",
    Bạc: "#cbd5e1",
  };

  // Default filter options trong trường hợp API không trả về dữ liệu
  const defaultFilterOptions = {
    materials: [
      { name: "Cotton", key: "3966971" },
      { name: "Len", key: "3966977" },
      { name: "Ren", key: "3967003" },
      { name: "Lụa", key: "3966985" },
      { name: "Voan", key: "3966983" },
      { name: "Thô", key: "3966981" },
      { name: "Kate", key: "3966979" },
      { name: "Kaki", key: "3966969" },
    ],
    patterns: [
      { name: "Trơn", key: "3967325" },
      { name: "Hoa lá", key: "3967333" },
      { name: "Chấm bi", key: "3967331" },
      { name: "Kẻ sọc", key: "3967327" },
      { name: "Caro", key: "3967329" },
      { name: "Hình học", key: "3967335" },
    ],
    colors: [
      { name: "Đen", key: "Đen", hex: "#000000" },
      { name: "Đỏ", key: "Đỏ", hex: "#ef4444" },
      { name: "Trắng", key: "Trắng", hex: "#ffffff" },
      { name: "Hồng", key: "Hồng", hex: "#ec4899" },
      { name: "Vàng", key: "Vàng", hex: "#facc15" },
      { name: "Xanh lá", key: "Xanh lá", hex: "#22c55e" },
      { name: "Xanh dương", key: "Xanh dương", hex: "#3b82f6" },
    ],
  };

  // Hàm xử lý dữ liệu filters từ API Tiki
  const processFiltersFromAPI = (filters) => {
    let newFilterOptions = {
      materials: [],
      patterns: [],
      colors: [],
      sizes: [],
      priceRanges: [],
      ratings: [],
    };

    if (!filters || !Array.isArray(filters)) {
      console.log("Không tìm thấy dữ liệu filters từ API");
      return defaultFilterOptions;
    }

    // Xử lý từng loại filter
    filters.forEach((filter) => {
      // Kiểm tra filter có tồn tại không
      if (!filter || typeof filter !== "object") return;

      switch (filter.code) {
        case "cloth_material": // Chất liệu
          if (filter.values && Array.isArray(filter.values)) {
            newFilterOptions.materials = filter.values.map((item) => ({
              name: item.display_value || "",
              key: item.query_value || "",
              count: item.count || 0,
            }));
          }
          break;

        case "fashion_pattern": // Họa tiết
          if (filter.values && Array.isArray(filter.values)) {
            newFilterOptions.patterns = filter.values.map((item) => ({
              name: item.display_value || "",
              key: item.query_value || "",
              count: item.count || 0,
            }));
          }
          break;

        case "option_color": // Màu sắc
          if (filter.values && Array.isArray(filter.values)) {
            newFilterOptions.colors = filter.values.map((item) => ({
              name: item.display_value || "",
              key: item.query_value || "",
              count: item.count || 0,
              hex: colorMap[item.display_value] || "#cccccc", // Màu mặc định nếu không tìm thấy
            }));
          }
          break;

        case "option_size_clothes": // Kích cỡ
          if (filter.values && Array.isArray(filter.values)) {
            newFilterOptions.sizes = filter.values.map((item) => ({
              name: item.display_value || "",
              key: item.query_value || "",
              count: item.count || 0,
            }));
          }
          break;

        case "price": // Giá
          if (filter.values && Array.isArray(filter.values)) {
            newFilterOptions.priceRanges = filter.values.map((item) => ({
              name: item.display_value || "",
              key: item.query_value || "",
              count: item.count || 0,
            }));
          }
          break;

        case "rating": // Đánh giá
          if (filter.values && Array.isArray(filter.values)) {
            newFilterOptions.ratings = filter.values.map((item) => ({
              name: item.display_value || "",
              key: item.query_value || "",
            }));
          }
          break;

        default:
          // Bỏ qua các filter khác không xử lý
          break;
      }
    });

    // Nếu không có dữ liệu từ API, sử dụng dữ liệu mặc định
    if (!newFilterOptions.materials || newFilterOptions.materials.length === 0)
      newFilterOptions.materials = defaultFilterOptions.materials;
    if (!newFilterOptions.patterns || newFilterOptions.patterns.length === 0)
      newFilterOptions.patterns = defaultFilterOptions.patterns;
    if (!newFilterOptions.colors || newFilterOptions.colors.length === 0)
      newFilterOptions.colors = defaultFilterOptions.colors;

    return newFilterOptions;
  };

  // Fetch category info và filter options
  useEffect(() => {
    const fetchCategoryInfo = async () => {
      if (!categoryId || !urlKey) return;
  
      try {
        setLoading(true);
        
        // Lấy thông tin chi tiết danh mục
        const categoryResponse = await getCategoryDetail(categoryId);
        if (categoryResponse?.data) {
          setCategoryInfo(categoryResponse.data);
        }
        
        // Lấy dữ liệu filter từ API
        const filtersData = await getFilters(categoryId, urlKey);
        
        if (filtersData) {
          // Xử lý dữ liệu filter
          const newFilterOptions = {
            materials: [],
            patterns: [],
            colors: [],
            sizes: [],
            priceRanges: [],
            ratings: []
          };
          
          // Chất liệu
          if (filtersData.attributes) {
            const materialFilter = filtersData.attributes.find(filter => filter.code === "cloth_material");
            if (materialFilter?.values) {
              newFilterOptions.materials = materialFilter.values.map(item => ({
                name: item.display_value || "",
                key: item.query_value || "",
                count: item.count || 0
              }));
            }
            
            // Họa tiết
            const patternFilter = filtersData.attributes.find(filter => filter.code === "fashion_pattern");
            if (patternFilter?.values) {
              newFilterOptions.patterns = patternFilter.values.map(item => ({
                name: item.display_value || "",
                key: item.query_value || "",
                count: item.count || 0
              }));
            }
            
            // Màu sắc
            const colorFilter = filtersData.attributes.find(filter => filter.code === "option_color");
            if (colorFilter?.values) {
              newFilterOptions.colors = colorFilter.values.map(item => ({
                name: item.display_value || "",
                key: item.query_value || "",
                count: item.count || 0,
                hex: colorMap[item.display_value] || "#cccccc"  // Dùng colorMap hiện có
              }));
            }
            
            // Size
            const sizeFilter = filtersData.attributes.find(filter => filter.code === "option_size_clothes");
            if (sizeFilter?.values) {
              newFilterOptions.sizes = sizeFilter.values.map(item => ({
                name: item.display_value || "",
                key: item.query_value || "",
                count: item.count || 0
              }));
            }
          }
          
          // Giá
          if (filtersData.price && filtersData.price.values) {
            newFilterOptions.priceRanges = filtersData.price.values.map(item => ({
              name: item.display_value || "",
              key: item.query_value || "",
              count: item.count || 0
            }));
          }
          
          // Rating
          if (filtersData.rating && filtersData.rating.values) {
            newFilterOptions.ratings = filtersData.rating.values.map(item => ({
              name: item.display_value || "",
              key: item.query_value || "",
            }));
          }
          
          setFilterOptions(newFilterOptions);
        } else {
          // Nếu API không trả về dữ liệu, sử dụng dữ liệu mặc định
          setFilterOptions(defaultFilterOptions);
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin danh mục hoặc bộ lọc:", error);
        setFilterOptions(defaultFilterOptions);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategoryInfo();
  }, [categoryId, urlKey]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryId || !urlKey) {
        setLoading(false);
        return;
      }
  
      setLoading(true);
      try {
        // Chuẩn bị tham số filter
        const filterParams = {
          price: filters.price || null,
          rating: null,
          cloth_material: [],
          fashion_pattern: [],
          option_color: [],
          services: {
            support_p2h_delivery: checkboxFilters.fastDelivery || false,
            tiki_hero: checkboxFilters.topDeal || false,
            freeship_campaign: checkboxFilters.freeShip || false
          }
        };
        
        // Thêm tham số lọc chất liệu (cloth_material)
        if (filters.materials && filters.materials.length > 0) {
          filterParams.cloth_material = filters.materials;
        }
  
        // Thêm tham số lọc họa tiết (fashion_pattern)
        if (filters.patterns && filters.patterns.length > 0) {
          filterParams.fashion_pattern = filters.patterns;
        }
  
        // Thêm tham số lọc màu sắc (option_color)
        if (filters.colors && filters.colors.length > 0) {
          filterParams.option_color = filters.colors;
        }
  
        // Thêm các tham số checkbox
        // if (checkboxFilters.fastDelivery) {
        //   filterParams.services.support_p2h_delivery = true;
        // }
  
        // if (checkboxFilters.topDeal) {
        //   filterParams.services.tiki_hero = true;
        // }
  
        // if (checkboxFilters.freeShip) {
        //   filterParams.services.freeship_campaign = true;
        // }
  
        if (checkboxFilters.fourPlusStar) {
          filterParams.rating = "4";
        }
        
        // Sử dụng API lọc sản phẩm
        const result = await getFilteredProducts(
          categoryId, 
          urlKey,
          filterParams,
         
          { page: currentPage, limit: 24 },
          sortOption
        );
  
        if (result?.data) {
         // Loại bỏ các sản phẩm trùng lặp dựa trên ID
        const uniqueProducts = Array.from(
          new Map(result.data.map(item => [item.id, item])).values()
        );
        
        setProducts(uniqueProducts);
          
        if (result?.paging) {
          const paginationInfo = getPaginationInfo(result.paging);
          setTotalProducts(paginationInfo.totalItems);
          setTotalPages(paginationInfo.totalPages);
          // Đảm bảo trang hiện tại không vượt quá tổng số trang
          if (currentPage > paginationInfo.totalPages) {
            setCurrentPage(1);
          }
        }
      }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        setError("Không thể tải danh sách sản phẩm");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [categoryId, urlKey, currentPage, sortOption, filters, checkboxFilters]);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortOption(e.value);
    setCurrentPage(1);
  };

  

  // Handle filter change
  const onFilterChange = (e, category, item) => {
    const checked = e.checked;
    let newFilters = { ...filters };

    // Đảm bảo mảng tồn tại
    if (!newFilters[category]) {
      newFilters[category] = [];
    }

    if (checked) {
      newFilters[category] = [...newFilters[category], item.key];
    } else {
      newFilters[category] = newFilters[category].filter(
        (key) => key !== item.key
      );
    }

    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle checkbox filter change
  const handleCheckboxChange = (e, key) => {
    setCheckboxFilters({
      ...checkboxFilters,
      [key]: e.checked,
    });
  // Nếu là checkbox rating, cần cập nhật query parameter tương ứng
  if (key === "fourPlusStar" && e.checked) {
    // Thêm logic xử lý đặc biệt cho rating nếu cần
  }
  
  setCurrentPage(1); // Reset to first page when filters change
  };

  

  // Toggle color filter
  const toggleColorFilter = (color) => {
    // Đảm bảo mảng tồn tại
    let newColors = filters.colors ? [...filters.colors] : [];

    if (newColors.includes(color)) {
      newColors = newColors.filter((c) => c !== color);
    } else {
      newColors.push(color);
    }

    setFilters({
      ...filters,
      colors: newColors,
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePriceChange = (priceKey) => {
    // Nếu click vào giá đã chọn, bỏ chọn
    if (filters.price === priceKey) {
      setFilters({
        ...filters,
        price: null
      });
    } else {
      // Nếu chọn giá mới
      setFilters({
        ...filters,
        price: priceKey
      });
    }
    setCurrentPage(1);
  };

  // Reset all filters
  const resetFilters = () => {
    // Reset tag filters với các mảng rỗng (không phải undefined)
    setFilters({
      materials: [],
      patterns: [],
      colors: [],
      price: null,
    });

    // Reset checkbox filters
    setCheckboxFilters({
      fastDelivery: false,
      freeShip: false,
      fourPlusStar: false,
      topDeal: false,
    });

    // Reset sort option
    setSortOption("top_seller");

    // Reset to first page
    setCurrentPage(1);
  };

  // Count total active filters
  useEffect(() => {
    let count = 0;
    count += filters.materials?.length || 0;
    count += filters.patterns?.length || 0;
    count += filters.colors?.length || 0;
    if (filters.price) count++;

    if (checkboxFilters.fastDelivery) count++;
    if (checkboxFilters.freeShip) count++;
    if (checkboxFilters.topDeal) count++;
    if (checkboxFilters.fourPlusStar) count++;

    setFiltersApplied(count);
  }, [filters, checkboxFilters]);

  // Generate breadcrumb items from ancestors
  const getBreadcrumbItems = () => {
    if (!categoryInfo || !categoryInfo.ancestors) return [];

    return categoryInfo.ancestors.map((ancestor) => ({
      label: ancestor.name,
      url: `/category/${ancestor.id}${
        ancestor.url_key ? `?urlKey=${ancestor.url_key}` : ""
      }`,
    }));
  };

  // Breadcrumb home item
  const breadcrumbHome = { icon: "pi pi-home", url: "/" };

  // Item template for the products
  const itemTemplate = (product) => {
    const isHovered = hoverProduct === product.id;

    return (
      <div
        className="col-span-1 group relative"
        onMouseEnter={() => setHoverProduct(product.id)}
        onMouseLeave={() => setHoverProduct(null)}
      >
        <Link
          to={`/detail/${product.id}`}
        
        >
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
          <div className="relative overflow-hidden">
            <img
              src={product.thumbnail_url}
              alt={product.name}
              className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div
              className={`absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center gap-3 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">
                <FontAwesomeIcon icon={faSearch} />
              </button> */}
            </div>

            {/* Labels */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.discount_rate > 0 && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded shadow-sm">
                  -{product.discount_rate}%
                </span>
              )}
            </div>

            {product.badges_new?.some((badge) => badge.code === "tikinow") && (
              <div className="absolute bottom-0 left-0">
                <img
                  src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                  alt=""
                />
              </div>
            )}

            {product.badges_new?.some(
              (badge) => badge.code === "authentic_brand"
            ) && (
              <div className="absolute bottom-0 right-0">
                <img
                  src="https://salt.tikicdn.com/ts/upload/c2/bc/6d/ff18cc8968e2bbb43f7ac58efbfafdff.png"
                  alt=""
                />
              </div>
            )}
          </div>

          <div className="p-3 flex flex-col flex-grow min-h-52">
            <div className="mb-1">
              <div className="flex items-center mb-1">
                <span className="text-red-500 font-bold text-base">
                  {formatCurrency(product.price)}
                </span>
                {product.original_price > product.price && (
                  <span className="ml-2 text-gray-400 text-xs line-through">
                    {formatCurrency(product.original_price)}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                  {product.brand_name}
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">
                    <FontAwesomeIcon icon={faStar} size="xs" />
                  </span>
                  <span className="text-xs text-gray-600">
                    {product.rating_average} ({product.review_count})
                  </span>
                </div>
              </div>
            </div>

            <h3 className="text-gray-800 text-sm font-medium mb-2 line-clamp-2 h-10 hover:text-blue-600 transition-colors">
              {product.name}
            </h3>

            <div className="flex flex-wrap gap-1 mb-2 min-h-[1.5rem]">
              {product.badges_new
                ?.find((badge) => badge.code === "variant_count")
                ?.arr_text?.map((text, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-sm"
                  >
                    {text.value}
                  </span>
                ))}
            </div>

            {product.discount_rate > 0 && (
              <div className="flex items-center text-xs text-blue-600 mb-1">
                <FontAwesomeIcon
                  icon={faTag}
                  className="mr-1.5 text-blue-600"
                  size="xs"
                />
                Giảm {formatCurrency(product.discount)}
              </div>
            )}

            <div className="flex justify-between items-center mt-auto">
              <div className="text-xs text-gray-500">
                {product.badges_new?.find(
                  (badge) => badge.code === "delivery_info_badge"
                )?.text || "Giao hàng tiêu chuẩn"}
              </div>

              {product.badges_new?.some(
                (badge) => badge.code === "tikinow"
              ) && (
                <span className="bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded-full border border-red-200">
                  2H
                </span>
              )}
            </div>
          </div>
        </div>
        </Link>
      </div>
    );
  };

  if (loading && products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb skeleton */}
        <div className="h-8 bg-gray-200 w-1/2 rounded animate-pulse mb-6"></div>

        {/* Products skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      {categoryInfo && (
        <div className="mb-6">
          <BreadCrumb model={getBreadcrumbItems()} home={breadcrumbHome} />
        </div>
      )}

      {/* Header with applied filters counter */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-800">
          {categoryInfo?.name || "Sản phẩm"}
          {filtersApplied > 0 && (
            <Badge
              value={filtersApplied}
              severity="info"
              className="ml-2"
            ></Badge>
          )}
        </h2>

        {filtersApplied > 0 && (
          <Button
            label="Xóa bộ lọc"
            icon="pi pi-filter-slash"
            className="p-button-outlined p-button-sm"
            onClick={resetFilters}
          />
        )}
      </div>

      {/* Main Categories */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex flex-col space-y-4">
          {filterOptions?.materials && filterOptions.materials.length > 0 && (
            <div>
              <p className="text-gray-500 text-sm mb-2.5 font-medium">
                Chất liệu
              </p>
              <div className="flex flex-wrap gap-2">
                {filterOptions.materials.slice(0, filterOptions.materials.length).map((material) => (
                  <div
                    key={material.key}
                    className={`px-3 py-1.5 rounded-full border text-xs cursor-pointer transition-all duration-200 ${
                      filters.materials?.includes(material.key)
                        ? "bg-blue-50 border-blue-400 text-blue-600 shadow-sm"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                    onClick={() =>
                      onFilterChange(
                        { checked: !filters.materials?.includes(material.key) },
                        "materials",
                        material
                      )
                    }
                  >
                    {material.name}{" "}
                    {material.count > 0 && (
                      <span className="text-gray-500">({material.count})</span>
                    )}
                  </div>
                ))}
                {/* {filterOptions.materials.length > 8 && (
                  <button className="px-3 py-1.5 rounded-full border border-gray-300 text-xs text-gray-700 hover:border-gray-400">

                   + {filterOptions.materials.length - 8} loại khác
               
                 
                  </button>
                )} */}
              </div>
            </div>
          )}

          {filterOptions?.patterns && filterOptions.patterns.length > 0 && (
            <div>
              <p className="text-gray-500 text-sm mb-2.5 font-medium">
                Họa tiết
              </p>
              <div className="flex flex-wrap gap-2">
                {filterOptions.patterns.slice(0, filterOptions.patterns.length).map((pattern) => (
                  <div
                    key={pattern.key}
                    className={`px-3 py-1.5 rounded-full border text-xs cursor-pointer transition-all duration-200 ${
                      filters.patterns?.includes(pattern.key)
                        ? "bg-blue-50 border-blue-400 text-blue-600 shadow-sm"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                    onClick={() =>
                      onFilterChange(
                        { checked: !filters.patterns?.includes(pattern.key) },
                        "patterns",
                        pattern
                      )
                    }
                  >
                    {pattern.name}{" "}
                    {pattern.count > 0 && (
                      <span className="text-gray-500">({pattern.count})</span>
                    )}
                  </div>
                ))}
                {/* {filterOptions.patterns.length > 8 && (
                  <button className="px-3 py-1.5 rounded-full border border-gray-300 text-xs text-gray-700 hover:border-gray-400">
                    + {filterOptions.patterns.length - 8} loại khác
                  </button>
                )} */}
              </div>
            </div>
          )}

          {filterOptions?.colors && filterOptions.colors.length > 0 && (
            <div>
              <p className="text-gray-500 text-sm mb-2.5 font-medium">
                Màu sắc
              </p>
              <div className="flex flex-wrap gap-2">
                {filters.colors &&
                  filters.colors.length > 0 &&
                  filterOptions.colors
                    .filter((color) => filters.colors.includes(color.key))
                    .map((color) => (
                      <div
                        key={color.key}
                        className="px-3 py-1.5 rounded-full border text-xs cursor-pointer bg-blue-50 border-blue-400 text-blue-600 shadow-sm flex items-center group"
                        onClick={() => toggleColorFilter(color.key)}
                      >
                        <span
                          className="w-3 h-3 rounded-full mr-1.5"
                          style={{ backgroundColor: color.hex }}
                        ></span>
                        {color.name}
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          size="xs"
                        />
                      </div>
                    ))}
                <Button
                  className="p-button-outlined p-button-sm rounded-full text-xs py-1.5 px-3 border-gray-300 text-gray-700 flex items-center gap-1"
                  onClick={(e) => colorPanelRef.current.toggle(e)}
                  label={
                    !filters.colors || filters.colors.length === 0
                      ? "Chọn màu"
                      : "Thêm màu"
                  }
                  icon={
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      size="xs"
                      className="mr-1"
                    />
                  }
                />
              </div>
            </div>
          )}

          {/* Khoảng giá */}
          {filterOptions?.priceRanges &&
            filterOptions.priceRanges.length > 0 && (
              <div>
                <p className="text-gray-500 text-sm mb-2.5 font-medium">
                  Khoảng giá
                </p>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.priceRanges.map((priceRange) => (
                    <div
                      key={priceRange.key}
                      className={`px-3 py-1.5 rounded-full border text-xs cursor-pointer border-gray-300 text-gray-700 hover:border-gray-400 ${filters.price === priceRange.key ? "bg-blue-50 border-blue-400 text-blue-600 shadow-sm" : ""}`}
                      onClick={() => handlePriceChange(priceRange.key)}

                    >
                      {priceRange.name}{" "}
                      {priceRange.count > 0 && (
                        <span className="text-gray-500">
                          ({priceRange.count})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Link đến trang tìm kiếm, sử dụng Link component để không hiện lỗi linter */}
          <div className="mt-4 text-sm text-blue-600">
            <Link to={`/search?q=${categoryInfo?.name || ""}`}>
              Xem thêm sản phẩm {categoryInfo?.name || "liên quan"}
            </Link>
          </div>
        </div>

        {/* Color Overlay Panel */}
        <OverlayPanel ref={colorPanelRef} className="w-96">
          <div className="p-2">
            <h5 className="text-sm font-medium text-gray-700 mb-3">
              Chọn màu sắc
            </h5>
            <div className="grid grid-cols-5 gap-3">
              {filterOptions?.colors &&
                filterOptions.colors.map((color) => (
                  <div
                    key={color.key}
                    className="flex flex-col items-center gap-1.5 cursor-pointer"
                    onClick={() => toggleColorFilter(color.key)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border ${
                        filters.colors?.includes(color.key)
                          ? "border-blue-600 ring-2 ring-blue-200"
                          : "border-gray-300"
                      } hover:shadow-md transition-shadow duration-200`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {filters.colors?.includes(color.key) && (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-xs text-white drop-shadow-md">
                            ✓
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs">{color.name}</span>
                    {color.count > 0 && (
                      <span className="text-xs text-gray-500">
                        ({color.count})
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </OverlayPanel>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex items-center">
              <Checkbox
                id="nowShipping"
                className="border border-gray-300 rounded mr-2"
                checked={checkboxFilters.fastDelivery}
                onChange={(e) => handleCheckboxChange(e, "fastDelivery")}
              />
              <label
                htmlFor="nowShipping"
                className="text-xs flex items-center"
              >
                <img
                  src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                  alt="Giao siêu tốc 2H"
                  className="h-[25px]"
                />
                <span className="text-red-500 font-bold mx-1 cursor-pointer">
                  Giao siêu tốc 2H
                </span>
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="topDeal"
                className="border border-gray-300 rounded mr-2"
                checked={checkboxFilters.topDeal}
                onChange={(e) => handleCheckboxChange(e, "topDeal")}
              />
              <label htmlFor="topDeal" className="text-xs flex items-center">
                <img
                  src="https://salt.tikicdn.com/ts/upload/b5/aa/48/2305c5e08e536cfb840043df12818146.png"
                  alt="Siêu rẻ"
                  className="h-[25px]"
                />
                <span className="text-red-500 font-bold mx-1 cursor-pointer">
                  Siêu rẻ
                </span>
              </label>
            </div>

            <div className="flex items-center">
              <Checkbox
                id="freeShip"
                className="border border-gray-300 rounded mr-2"
                checked={checkboxFilters.freeShip}
                onChange={(e) => handleCheckboxChange(e, "freeShip")}
              />
              <label htmlFor="freeShip" className="text-xs text-gray-700">
                <img
                  src="https://salt.tikicdn.com/ts/upload/2f/20/77/0f96cfafdf7855d5e7fe076dd4f34ce0.png"
                  alt=""
                  className="h-[25px]"
                />
              </label>
            </div>

            {filterOptions?.ratings && filterOptions.ratings.length > 0 && (
  <div className="flex items-center">
    <Checkbox
      id="fourStar"
      className="border border-gray-300 rounded mr-2"
      checked={checkboxFilters.fourPlusStar}
      onChange={(e) => handleCheckboxChange(e, "fourPlusStar")}
    />
    <label
      htmlFor="fourStar"
      className="text-xs text-gray-700 flex items-center"
    >
      <Rating
        value={4}
        readOnly
        disabled
        stars={5}
        className="mr-1"
        cancel={false}
        pt={{
          onIcon: { className: "text-yellow-400 text-xs" },
          offIcon: { className: "text-gray-300 text-xs" },
        }}
      />
      {filterOptions.ratings.find(r => r.key === "4")?.name || "từ 4 sao"}
    </label>
  </div>
)}
          </div>

          <div className="flex items-center gap-2 mt-3 sm:mt-0">
            <span className="text-xs text-gray-500">Sắp xếp theo:</span>
            <Dropdown
              value={sortOption}
              options={sortOptions}
              onChange={handleSortChange}
              placeholder={sortOptions[0].label}
              className="w-40 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Products Results Summary */}
      <div className="text-sm text-gray-600 mb-3">
        Hiển thị {totalProducts} sản phẩm {filtersApplied > 0 ? "(đã lọc)" : ""}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id}>{itemTemplate(product)}</div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center my-8">
            {/* <img
              src="https://i.imgur.com/ULuKTQP.png"
              alt="No results"
              className="w-32 h-32 mx-auto mb-4 opacity-60"
            /> */}
            <p className="text-lg text-gray-500 mb-2">
              Không tìm thấy sản phẩm phù hợp
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Vui lòng thử lại với bộ lọc khác
            </p>
            <Button
              label="Xóa tất cả bộ lọc"
              icon="pi pi-filter-slash"
              className="p-button-outlined"
              onClick={resetFilters}
            />
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-1">
            <button
              className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center bg-white hover:border-blue-500 hover:text-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded border flex items-center justify-center transition-colors ${
                      page === currentPage
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-300 bg-white hover:border-blue-500 hover:text-blue-500"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              }
              return null;
            })}

            <button
              className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center bg-white hover:border-blue-500 hover:text-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
