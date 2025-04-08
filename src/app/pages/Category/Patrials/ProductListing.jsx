import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Rating } from "primereact/rating";
import { Badge } from "primereact/badge";
import { OverlayPanel } from "primereact/overlaypanel";
import { Dialog } from "primereact/dialog";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  faTag,
  faChevronDown,
  faStar,
  faTimes,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import {
  getCategoryDetail,
  getFilters,
  getFilteredProducts,
  getPaginationInfo,
} from "../../../context/api";
import CategoryBrowser from "./CategoryBrowser";
import FormattedSold from "../../Home/FormattedSold";
// import CategoryExplore from "./CategoryExplore";
// import { testCategoryDetail } from "../../../context/apiDebug";

const ProductListing = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const urlKey = new URLSearchParams(location.search).get("urlKey");
  const normalizedCategoryId = categoryId?.replace(/^c/, "") || "";
  const [products, setProducts] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortOption, setSortOption] = useState("top_seller");
  const [hoverProduct, setHoverProduct] = useState(null);
  const [filtersApplied, setFiltersApplied] = useState(0);
  const colorPanelRef = useRef(null);
  const [showAllFiltersDialog, setShowAllFiltersDialog] = useState(false);
  const [visibleFilters, setVisibleFilters] = useState([]);

  // Cập nhật state filterOptions để phù hợp với cấu trúc API động
  const [filterOptions, setFilterOptions] = useState({
    materials: [],
    patterns: [],
    colors: [],
    sizes: [],
    priceRanges: [],
    ratings: [],
    brands: [], // Thêm brands để hỗ trợ danh mục khác
  });

  // Cập nhật filters để hỗ trợ nhiều loại filter hơn
  const [filters, setFilters] = useState({
    materials: [],
    patterns: [],
    colors: [],
    price: null,
    brands: [], // Thêm brands filter
  });

  const [checkboxFilters, setCheckboxFilters] = useState({
    fastDelivery: false,
    freeShip: false,
    fourPlusStar: false,
    topDeal: false,
  });

  const [tempFilters, setTempFilters] = useState({
    materials: [],
    patterns: [],
    colors: [],
    price: null,
    brands: [],
  });
  const [tempDynamicFilters, setTempDynamicFilters] = useState({});
  const [tempCheckboxFilters, setTempCheckboxFilters] = useState({
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
    brands: [], // Thêm brands mặc định rỗng
  };

  // Fetch category info và filter options
  useEffect(() => {
    const fetchCategoryInfo = async () => {
      if (!normalizedCategoryId || !urlKey) return;

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
            ratings: [],
            brands: [],
            // Thêm container cho các filter động khác
            dynamicFilters: {},
          };

          // Nếu có thuộc tính lọc, xử lý chúng
          if (filtersData.attributes && Array.isArray(filtersData.attributes)) {
            // Lưu lại mảng các filter để xác định 3 filter hiển thị ngoài (sau khoảng giá)
            const availableFilters = [];

            // Duyệt qua từng thuộc tính filter
            filtersData.attributes.forEach((filter) => {
              // Xử lý tất cả các loại filter
              if (filter.values && Array.isArray(filter.values)) {
                // Lưu lại filter hiện tại để sau này xác định 3 filter hiển thị
                if (filter.code !== "price") {
                  availableFilters.push(filter.code);
                }

                // Xử lý các trường hợp đặc biệt riêng
                switch (filter.code) {
                  // Xử lý thương hiệu
                  case "brand":
                    newFilterOptions.brands = filter.values.map((item) => ({
                      name: item.display_value || "",
                      key: item.query_value || "",
                      count: item.count || 0,
                      url_key: item.url_key || "",
                    }));
                    break;

                  // Xử lý chất liệu
                  case "cloth_material":
                    newFilterOptions.materials = filter.values.map((item) => ({
                      name: item.display_value || "",
                      key: item.query_value || "",
                      count: item.count || 0,
                    }));
                    break;

                  // Xử lý họa tiết
                  case "fashion_pattern":
                    newFilterOptions.patterns = filter.values.map((item) => ({
                      name: item.display_value || "",
                      key: item.query_value || "",
                      count: item.count || 0,
                    }));
                    break;

                  // Xử lý màu sắc
                  case "option_color":
                    newFilterOptions.colors = filter.values.map((item) => ({
                      name: item.display_value || "",
                      key: item.query_value || "",
                      count: item.count || 0,
                      hex: colorMap[item.display_value] || "#cccccc",
                    }));
                    break;

                  // Xử lý kích cỡ
                  case "option_size_clothes":
                    newFilterOptions.sizes = filter.values.map((item) => ({
                      name: item.display_value || "",
                      key: item.query_value || "",
                      count: item.count || 0,
                    }));
                    break;

                  // Xử lý các filter khác không nằm trong danh sách cố định
                  default:
                    // Lưu filter này vào dynamicFilters với code làm key
                    newFilterOptions.dynamicFilters[filter.code] = {
                      code: filter.code,
                      display_name: filter.display_name || filter.code,
                      multi_select: filter.multi_select || false,
                      query_name: filter.query_name || filter.code,
                      values: filter.values.map((item) => ({
                        name: item.display_value || "",
                        key: item.query_value || "",
                        count: item.count || 0,
                        url_key: item.url_key || "",
                      })),
                    };
                    break;
                }
              }
            });

            // Lấy 3 filter đầu tiên để hiển thị sau khoảng giá
            setVisibleFilters(availableFilters.slice(0, 3));
          }

          // Xử lý price filter nếu có
          if (filtersData.price && filtersData.price.values) {
            newFilterOptions.priceRanges = filtersData.price.values.map(
              (item) => ({
                name: item.display_value || "",
                key: item.query_value || "",
                count: item.count || 0,
              })
            );
          }

          // Xử lý rating filter nếu có
          if (filtersData.rating && filtersData.rating.values) {
            newFilterOptions.ratings = filtersData.rating.values.map(
              (item) => ({
                name: item.display_value || "",
                key: item.query_value || "",
                count: item.count || 0,
              })
            );
          }

          console.log("Filter Options:", newFilterOptions);
          setFilterOptions(newFilterOptions);
        } else {
          // Nếu API không trả về dữ liệu, sử dụng dữ liệu mặc định
          setFilterOptions(defaultFilterOptions);
          setVisibleFilters(["colors", "materials", "patterns"]); // Mặc định hiển thị 3 filter này
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin danh mục hoặc bộ lọc:", error);
        setFilterOptions(defaultFilterOptions);
        setVisibleFilters(["colors", "materials", "patterns"]); // Mặc định hiển thị 3 filter này
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryInfo();
  }, [normalizedCategoryId, urlKey]);

  // Cập nhật thêm state để lưu các filter động
  const [dynamicFilters, setDynamicFilters] = useState({});

  // Fetch products with infinite scroll
  const fetchProducts = useCallback(async () => {
    if (!categoryId || !urlKey || urlKey === "") {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Chuẩn bị tham số filter theo đúng cấu trúc API
      const filterParams = {
        price: filters.price || null,
        rating: null,
        services: {
          support_p2h_delivery: checkboxFilters.fastDelivery || false,
          tiki_hero: checkboxFilters.topDeal || false,
          freeship_campaign: checkboxFilters.freeShip || false,
        },
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

      // Thêm tham số lọc thương hiệu (brand)
      if (filters.brands && filters.brands.length > 0) {
        filterParams.brand = filters.brands;
      }

      // Thêm các filter động vào tham số
      if (Object.keys(dynamicFilters).length > 0) {
        Object.entries(dynamicFilters).forEach(([key, values]) => {
          if (values && values.length > 0) {
            filterParams[key] = values;
          }
        });
      }

      if (checkboxFilters.fourPlusStar) {
        filterParams.rating = "4";
      }

      console.log("Filter Params:", filterParams);

      // Sử dụng API lọc sản phẩm
      const result = await getFilteredProducts(
        categoryId,
        urlKey,
        filterParams,
        { page: currentPage, limit: 24 },
        sortOption
      );

      if (result?.data) {
        // Process unique products
        const newProducts = result.data;

        // For infinite scroll, append to existing products instead of replacing them
        // But if we're on page 1, replace the products instead
        if (currentPage === 1) {
          setProducts(newProducts);
        } else {
          setProducts((prevProducts) => {
            // Combine previous and new products, ensuring no duplicates
            const allProducts = [...prevProducts, ...newProducts];
            return Array.from(
              new Map(allProducts.map((item) => [item.id, item])).values()
            );
          });
        }

        if (result?.paging) {
          const paginationInfo = getPaginationInfo(result.paging);
          setTotalProducts(paginationInfo.totalItems);
          // Check if we've reached the last page
          setHasMore(currentPage < paginationInfo.totalPages);

          // Calculate total page groups
          const totalGroups = Math.ceil(
            paginationInfo.totalPages / PAGES_PER_GROUP
          );
          setTotalPageGroups(totalGroups);

          // Update showLoadMoreButton based on page groups
          if (
            currentPage % PAGES_PER_GROUP === 0 &&
            currentPage < paginationInfo.totalPages
          ) {
            setShowLoadMoreButton(true);
            setLoadedPageGroups(Math.floor(currentPage / PAGES_PER_GROUP));
            setHasMore(false); // Pause infinite scroll until user clicks "Load More"
          } else {
            setShowLoadMoreButton(false);
          }
        } else {
          setHasMore(false);
          setShowLoadMoreButton(false);
        }
      }
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      setError("Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  }, [
    categoryId,
    urlKey,
    currentPage,
    sortOption,
    filters,
    checkboxFilters,
    dynamicFilters,
  ]);

  // Call fetchProducts when dependencies change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Reset filters and products when category changes
  useEffect(() => {
    // Reset page to 1 and products array when filters change
    setProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    setShowLoadMoreButton(false);
    setLoadedPageGroups(0);
    setTotalPageGroups(0);
  }, [filters, checkboxFilters, dynamicFilters, sortOption]);

  useEffect(() => {
    // Handler cho sự kiện khi danh mục thay đổi từ CategoryBrowser
    const handleCategoryChange = (event) => {
      const { categoryId, urlKey } = event.detail;
      const numericId = categoryId.toString().replace(/^c/, "");
      // Cập nhật URL trên thanh địa chỉ để đồng bộ với CategoryBrowser
      window.history.replaceState(
        {},
        "",
        `/category/${numericId}?urlKey=${urlKey}`
      );
      // Gọi hàm fetch sản phẩm với categoryId và urlKey mới
      // fetchProducts(categoryId, urlKey); // Nếu bạn có hàm fetchProducts riêng

      // Hoặc, nếu bạn muốn tận dụng useEffect gọi sẵn:
      const URLSearchParams = new window.URLSearchParams(
        window.location.search
      );
      URLSearchParams.set("urlKey", urlKey);
    };

    // Đăng ký lắng nghe sự kiện
    window.addEventListener("categoryChanged", handleCategoryChange);

    // Cleanup khi component unmount
    return () => {
      window.removeEventListener("categoryChanged", handleCategoryChange);
    };
  }, []);

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
    setCurrentPage(1);
  };

  const handlePriceChange = (priceKey) => {
    // Nếu click vào giá đã chọn, bỏ chọn
    if (filters.price === priceKey) {
      setFilters({
        ...filters,
        price: null,
      });
    } else {
      // Nếu chọn giá mới
      setFilters({
        ...filters,
        price: priceKey,
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
      brands: [],
    });

    // Reset dynamic filters
    setDynamicFilters({});

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

  // Add a function to load more products when the user clicks the "Load More" button
  const loadMoreProducts = () => {
    setShowLoadMoreButton(false);
    setHasMore(true);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Count total active filters
  useEffect(() => {
    let count = 0;
    count += filters.materials?.length || 0;
    count += filters.patterns?.length || 0;
    count += filters.colors?.length || 0;
    count += filters.brands?.length || 0;
    if (filters.price) count++;

    // Đếm số lượng filter động
    Object.values(dynamicFilters).forEach((filterValues) => {
      if (Array.isArray(filterValues)) {
        count += filterValues.length;
      }
    });

    if (checkboxFilters.fastDelivery) count++;
    if (checkboxFilters.freeShip) count++;
    if (checkboxFilters.topDeal) count++;
    if (checkboxFilters.fourPlusStar) count++;

    setFiltersApplied(count);
  }, [filters, checkboxFilters, dynamicFilters]);

  // Generate breadcrumb items from ancestors
  const getBreadcrumbItems = () => {
    if (!categoryInfo || !categoryInfo.ancestors) return [];

    return categoryInfo.ancestors.map((ancestor) => ({
      label: ancestor.name,
      url: `/category/${ancestor.id}${ancestor.url_key ? `?urlKey=${ancestor.url_key}` : ""
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
        <Link to={`/detail/${product.id}`}>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full ">
            <div className="relative overflow-hidden">
              <img
                src={product.thumbnail_url}
                alt={product.name}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div
                className={`absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
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
              {/* <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.discount_rate > 0 && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded shadow-sm">
                    -{product.discount_rate}%
                  </span>
                )}
              </div> */}

              <div className="absolute bottom-0 left-0">
                <img className=" h-full object-cover rounded-lg mb-2 " src={product.badges_v3[0]?.image || ""} alt="" />
              </div>

              {/* {product.badges_new?.some(
                (badge) => badge.code === "authentic_brand"
              ) && (
                <div className="absolute bottom-0 right-0">
                  <img
                    src="https://salt.tikicdn.com/ts/upload/c2/bc/6d/ff18cc8968e2bbb43f7ac58efbfafdff.png"
                    alt=""
                  />
                </div>
              )} */}
            </div>

            <div className="p-3 m-1 flex flex-col flex-grow ">
              <h3 className="text-gray-800 max-w-60 text-sm font-medium mb-2 line-clamp-2 h-10 hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <div className="mb-1">
                <div className="  min-h-[25px] items-center ">
                  {product.original_price > product.price && (
                    <span className="text-sm text-gray-500 line-through italic mb-2">
                      {formatCurrency(product.original_price)}
                    </span>
                  )}
                  {product.discount_rate > 0 && (
                    <span className={`ml-2 mb-2 rounded-sm ${product.discount_rate ? 'bg-[#ff424e] px-1 py-1 text-xs text-white' : 'bg-transparent'}`}>
                      -{product.discount_rate}%
                    </span>
                  )}
                </div>
                <span className="text-xl font-bold text-[#ff424e] my-2 mb-2">
                  {formatCurrency(product.price)}
                </span>


                {/* <div className="flex justify-between items-center"> */}
                {/* <div className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                    {product.brand_name}
                  </div> */}
                {/* <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                    </span>
                    <span className="text-xs text-gray-600">
                      {product.rating_average} ({product.review_count})
                    </span>
                  </div> */}
                <div className="card flex justify-between">
                  <Rating value={product.rating_average} disabled cancel={false} />
                  <div className='text-sm text-gray-600'>Đã bán <FormattedSold sold={product.quantity_sold?.value} /></div>
                </div>
                {/* </div> */}
              </div>



              {/* <div className="flex flex-wrap gap-1 mb-2 min-h-[1.5rem]">
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
              </div> */}

              {/* {product.discount_rate > 0 && (
                <div className="flex items-center text-xs text-blue-600 mb-1">
                  <FontAwesomeIcon
                    icon={faTag}
                    className="mr-1.5 text-blue-600"
                    size="xs"
                  />
                  Giảm {formatCurrency(product.discount)}
                </div>
              )} */}

              {/* <div className="flex justify-between items-center mt-auto">
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
              </div> */}
            </div>
          </div>
        </Link>
      </div>
    );
  };

  // Hàm xử lý filter động
  const handleDynamicFilterChange = (filterCode, checked, value) => {
    setDynamicFilters((prev) => {
      const updatedFilters = { ...prev };

      // Nếu filter chưa tồn tại, tạo mảng mới
      if (!updatedFilters[filterCode]) {
        updatedFilters[filterCode] = [];
      }

      if (checked) {
        // Thêm giá trị nếu chưa tồn tại
        if (!updatedFilters[filterCode].includes(value)) {
          updatedFilters[filterCode] = [...updatedFilters[filterCode], value];
        }
      } else {
        // Xóa giá trị khỏi mảng
        updatedFilters[filterCode] = updatedFilters[filterCode].filter(
          (v) => v !== value
        );

        // Nếu mảng rỗng, xóa key này
        if (updatedFilters[filterCode].length === 0) {
          delete updatedFilters[filterCode];
        }
      }

      console.log(
        `Dynamic filter updated - ${filterCode}:`,
        updatedFilters[filterCode]
      );
      return updatedFilters;
    });

    setCurrentPage(1); // Reset về trang đầu
  };

  // Hàm mở dialog lọc - sao chép giá trị filter hiện tại vào temp
  const openFilterDialog = () => {
    setTempFilters({ ...filters });
    setTempDynamicFilters({ ...dynamicFilters });
    setTempCheckboxFilters({ ...checkboxFilters });
    setShowAllFiltersDialog(true);
  };

  // Hàm áp dụng filter khi click button "Áp dụng"
  const applyFilters = () => {
    setFilters({ ...tempFilters });
    setDynamicFilters({ ...tempDynamicFilters });
    setCheckboxFilters({ ...tempCheckboxFilters });
    setCurrentPage(1); // Reset về trang đầu
    setShowAllFiltersDialog(false);
  };

  // Hàm reset filter trong popup
  const resetTempFilters = () => {
    setTempFilters({
      materials: [],
      patterns: [],
      colors: [],
      price: null,
      brands: [],
    });
    setTempDynamicFilters({});
    setTempCheckboxFilters({
      fastDelivery: false,
      freeShip: false,
      fourPlusStar: false,
      topDeal: false,
    });
  };

  // Các hàm xử lý filter tạm thời trong popup
  const onTempFilterChange = (e, category, item) => {
    const checked = e.checked;
    let newFilters = { ...tempFilters };

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

    setTempFilters(newFilters);
  };

  // Toggle color filter tạm thời
  const toggleTempColorFilter = (color) => {
    // Đảm bảo mảng tồn tại
    let newColors = tempFilters.colors ? [...tempFilters.colors] : [];

    if (newColors.includes(color)) {
      newColors = newColors.filter((c) => c !== color);
    } else {
      newColors.push(color);
    }

    setTempFilters({
      ...tempFilters,
      colors: newColors,
    });
  };

  const handleTempPriceChange = (priceKey) => {
    // Nếu click vào giá đã chọn, bỏ chọn
    if (tempFilters.price === priceKey) {
      setTempFilters({
        ...tempFilters,
        price: null,
      });
    } else {
      // Nếu chọn giá mới
      setTempFilters({
        ...tempFilters,
        price: priceKey,
      });
    }
  };

  // Handle dynamic filter change trong popup
  const handleTempDynamicFilterChange = (filterCode, checked, value) => {
    setTempDynamicFilters((prev) => {
      const updatedFilters = { ...prev };

      // Nếu filter chưa tồn tại, tạo mảng mới
      if (!updatedFilters[filterCode]) {
        updatedFilters[filterCode] = [];
      }

      if (checked) {
        // Thêm giá trị nếu chưa tồn tại
        if (!updatedFilters[filterCode].includes(value)) {
          updatedFilters[filterCode] = [...updatedFilters[filterCode], value];
        }
      } else {
        // Xóa giá trị khỏi mảng
        updatedFilters[filterCode] = updatedFilters[filterCode].filter(
          (v) => v !== value
        );

        // Nếu mảng rỗng, xóa key này
        if (updatedFilters[filterCode].length === 0) {
          delete updatedFilters[filterCode];
        }
      }

      return updatedFilters;
    });
  };

  // Handle checkbox filter change trong popup
  const handleTempCheckboxChange = (e, key) => {
    setTempCheckboxFilters({
      ...tempCheckboxFilters,
      [key]: e.checked,
    });
  };

  // Add a new state to track if we should show the Load More button
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
  const [loadedPageGroups, setLoadedPageGroups] = useState(0);
  const [totalPageGroups, setTotalPageGroups] = useState(0);
  const PAGES_PER_GROUP = 4;

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
          <BreadCrumb model={getBreadcrumbItems()} home={breadcrumbHome} className="bg-transparent" />
        </div>
      )}
      <CategoryBrowser categoryId={normalizedCategoryId} urlKey={urlKey} />
      {/* <CategoryExplore  /> */}

      {/* Header with applied filters counter */}
      <div className="flex justify-between items-center my-4">
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
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col space-y-4">
            {/* Khoảng giá - Luôn hiển thị đầu tiên */}
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
                        className={`px-3 py-1.5 rounded-full border text-xs cursor-pointer border-gray-300 text-gray-700 hover:border-gray-400 ${filters.price === priceRange.key
                          ? "bg-blue-50 border-blue-400 text-blue-600 shadow-sm"
                          : ""
                          }`}
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

            {/* -------------------- Màu sắc (option_color) -------------------- */}
            {visibleFilters.includes("option_color") &&
              filterOptions?.colors &&
              filterOptions.colors.length > 0 && (
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

            {/* -------------------- Thương hiệu (brand) -------------------- */}
            {visibleFilters.includes("brand") &&
              filterOptions?.brands &&
              filterOptions.brands.length > 0 && (
                <div>
                  <p className="text-gray-500 text-sm mb-2.5 font-medium">
                    Thương hiệu
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.brands
                      .slice(0, 5) // Chỉ hiện 5 thương hiệu đầu tiên
                      .map((brand) => (
                        <div
                          key={brand.key}
                          className={`px-3 py-1.5 rounded-full border text-xs cursor-pointer transition-all duration-200 ${filters.brands?.includes(brand.key)
                            ? "bg-blue-50 border-blue-400 text-blue-600 shadow-sm"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                            }`}
                          onClick={() =>
                            onFilterChange(
                              { checked: !filters.brands?.includes(brand.key) },
                              "brands",
                              brand
                            )
                          }
                        >
                          {brand.name}{" "}
                          {brand.count > 0 && (
                            <span className="text-gray-500">
                              ({brand.count})
                            </span>
                          )}
                        </div>
                      ))}
                    {filterOptions.brands.length > 5 && (
                      <button
                        className="px-3 py-1.5 rounded-full border border-gray-300 text-xs text-gray-700 hover:border-gray-400"
                        onClick={() => setShowAllFiltersDialog(true)}
                      >
                        + {filterOptions.brands.length - 5} thương hiệu khác
                      </button>
                    )}
                  </div>
                </div>
              )}

            {/* -------------------- Chất liệu (cloth_material) -------------------- */}
            {visibleFilters.includes("cloth_material") &&
              filterOptions?.materials &&
              filterOptions.materials.length > 0 && (
                <div>
                  <p className="text-gray-500 text-sm mb-2.5 font-medium">
                    Chất liệu
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.materials
                      .slice(0, 5) // Chỉ hiện 5 chất liệu đầu tiên
                      .map((material) => (
                        <div
                          key={material.key}
                          className={`px-3 py-1.5 rounded-full border text-xs cursor-pointer transition-all duration-200 ${filters.materials?.includes(material.key)
                            ? "bg-blue-50 border-blue-400 text-blue-600 shadow-sm"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                            }`}
                          onClick={() =>
                            onFilterChange(
                              {
                                checked: !filters.materials?.includes(
                                  material.key
                                ),
                              },
                              "materials",
                              material
                            )
                          }
                        >
                          {material.name}{" "}
                          {material.count > 0 && (
                            <span className="text-gray-500">
                              ({material.count})
                            </span>
                          )}
                        </div>
                      ))}
                    {filterOptions.materials.length > 5 && (
                      <button
                        className="px-3 py-1.5 rounded-full border border-gray-300 text-xs text-gray-700 hover:border-gray-400"
                        onClick={() => setShowAllFiltersDialog(true)}
                      >
                        + {filterOptions.materials.length - 5} chất liệu khác
                      </button>
                    )}
                  </div>
                </div>
              )}

            {/* -------------------- Họa tiết (fashion_pattern) -------------------- */}
            {visibleFilters.includes("fashion_pattern") &&
              filterOptions?.patterns &&
              filterOptions.patterns.length > 0 && (
                <div>
                  <p className="text-gray-500 text-sm mb-2.5 font-medium">
                    Họa tiết
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.patterns
                      .slice(0, 5) // Chỉ hiện 5 họa tiết đầu tiên
                      .map((pattern) => (
                        <div
                          key={pattern.key}
                          className={`px-3 py-1.5 rounded-full border text-xs cursor-pointer transition-all duration-200 ${filters.patterns?.includes(pattern.key)
                            ? "bg-blue-50 border-blue-400 text-blue-600 shadow-sm"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                            }`}
                          onClick={() =>
                            onFilterChange(
                              {
                                checked: !filters.patterns?.includes(
                                  pattern.key
                                ),
                              },
                              "patterns",
                              pattern
                            )
                          }
                        >
                          {pattern.name}{" "}
                          {pattern.count > 0 && (
                            <span className="text-gray-500">
                              ({pattern.count})
                            </span>
                          )}
                        </div>
                      ))}
                    {filterOptions.patterns.length > 5 && (
                      <button
                        className="px-3 py-1.5 rounded-full border border-gray-300 text-xs text-gray-700 hover:border-gray-400"
                        onClick={() => setShowAllFiltersDialog(true)}
                      >
                        + {filterOptions.patterns.length - 5} họa tiết khác
                      </button>
                    )}
                  </div>
                </div>
              )}

            {/* Hiển thị các filter động khác từ visibleFilters */}
            {visibleFilters.map((filterCode) => {
              // Bỏ qua các filter đã được xử lý cụ thể ở trên
              if (
                [
                  "option_color",
                  "brand",
                  "cloth_material",
                  "fashion_pattern",
                ].includes(filterCode)
              ) {
                return null;
              }

              // Xem filter này có trong dynamic filters không
              const filterData = filterOptions.dynamicFilters?.[filterCode];
              if (!filterData) return null;

              return (
                <div key={filterCode}>
                  <p className="text-gray-500 text-sm mb-2.5 font-medium">
                    {filterData.display_name}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {filterData.values
                      .slice(0, 5) // Chỉ hiện 5 tùy chọn đầu tiên
                      .map((item) => (
                        <div
                          key={item.key}
                          className={`px-3 py-1.5 rounded-full border text-xs cursor-pointer transition-all duration-200 ${dynamicFilters[filterCode]?.includes(item.key)
                            ? "bg-blue-50 border-blue-400 text-blue-600 shadow-sm"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                            }`}
                          onClick={() => {
                            handleDynamicFilterChange(
                              filterCode,
                              !dynamicFilters[filterCode]?.includes(item.key),
                              item.key
                            );
                          }}
                        >
                          {item.name}{" "}
                          {item.count > 0 && (
                            <span className="text-gray-500">
                              ({item.count})
                            </span>
                          )}
                        </div>
                      ))}

                    {filterData.values.length > 5 && (
                      <button
                        className="px-3 py-1.5 rounded-full border border-gray-300 text-xs text-gray-700 hover:border-gray-400"
                        onClick={() => setShowAllFiltersDialog(true)}
                      >
                        + {filterData.values.length - 5} lựa chọn khác
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Nút hiển thị tất cả bộ lọc */}

            {/* Link đến trang tìm kiếm */}
            {/* <div className="mt-4 text-sm text-blue-600">
            <Link to={`/search?q=${categoryInfo?.name || ""}`}>
              Xem thêm sản phẩm {categoryInfo?.name || "liên quan"}
            </Link>
          </div> */}
          </div>
          <div className="mt-2">
            <Button
              label="Hiển thị tất cả bộ lọc"
              icon={<FontAwesomeIcon icon={faFilter} className="mr-2" />}
              className="p-button-outlined p-button-sm"
              onClick={openFilterDialog}
            />
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
                      className={`w-8 h-8 rounded-full border ${filters.colors?.includes(color.key)
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

      {/* Dialog hiển thị tất cả bộ lọc */}
      <Dialog
        contentStyle={{ padding: "0px", overflowY: "hidden" }}
        header={
          <div className="flex justify-between items-center p-2 ">
            <h2 className="text-xl font-medium text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faFilter} className="mr-3 text-primary" />
              Tất cả bộ lọc
              {Object.values(tempFilters).flat().filter(Boolean).length +
                Object.values(tempDynamicFilters).flat().filter(Boolean)
                  .length +
                Object.values(tempCheckboxFilters).filter(Boolean).length >
                0 && (
                  <Badge
                    value={
                      Object.values(tempFilters).flat().filter(Boolean).length +
                      Object.values(tempDynamicFilters).flat().filter(Boolean)
                        .length +
                      Object.values(tempCheckboxFilters).filter(Boolean).length
                    }
                    severity="info"
                    className="ml-2"
                  ></Badge>
                )}
            </h2>
            {/* <Button
              // icon="pi pi-times"
              className="p-button-rounded p-button-text"
              onClick={() => setShowAllFiltersDialog(false)}
              // aria-label="Close"
            /> */}
          </div>
        }
        visible={showAllFiltersDialog}
        style={{ width: "85vw", maxWidth: "1200px" }}
        onHide={() => setShowAllFiltersDialog(false)}
        footer={
          <div className="flex justify-between border-t border-gray-200 pt-4 px-2 ">
            <Button
              label="Xóa bộ lọc"
              icon="pi pi-filter-slash"
              className="p-button-outlined p-button-danger"
              onClick={resetTempFilters}
              disabled={
                Object.values(tempFilters).flat().filter(Boolean).length +
                Object.values(tempDynamicFilters).flat().filter(Boolean)
                  .length +
                Object.values(tempCheckboxFilters).filter(Boolean).length ===
                0
              }
            />
            <Button
              label="Áp dụng"
              icon="pi pi-check"
              className="p-button-primary"
              onClick={applyFilters}
            />
          </div>
        }
        blockScroll
        dismissableMask
        closeOnEscape
        className="filter-dialog"
      >
        <div className="flex flex-col md:flex-row gap-6 p-4   ">
          {/* Sidebar với danh mục filter */}
          <div className="md:w-1/4 lg:w-1/5   ">
            <div className="sticky top-0 bg-white h-full shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <h3 className="text-sm font-medium p-3 border-b bg-gray-50">
                Danh mục lọc
              </h3>
              <nav className="overflow-y-auto max-h-[64vh]">
                <ul className="divide-y divide-gray-200">
                  <li>
                    <a
                      href="#price-filter"
                      className="block p-3 hover:bg-blue-50 text-sm transition-colors duration-200"
                    >
                      Khoảng giá{" "}
                      {tempFilters.price && (
                        <span className="float-right text-blue-600">●</span>
                      )}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#color-filter"
                      className="block p-3 hover:bg-blue-50 text-sm transition-colors duration-200"
                    >
                      Màu sắc{" "}
                      {tempFilters.colors?.length > 0 && (
                        <span className="float-right text-blue-600">●</span>
                      )}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#brand-filter"
                      className="block p-3 hover:bg-blue-50 text-sm transition-colors duration-200"
                    >
                      Thương hiệu{" "}
                      {tempFilters.brands?.length > 0 && (
                        <span className="float-right text-blue-600">●</span>
                      )}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pattern-filter"
                      className="block p-3 hover:bg-blue-50 text-sm transition-colors duration-200"
                    >
                      Họa tiết{" "}
                      {tempFilters.patterns?.length > 0 && (
                        <span className="float-right text-blue-600">●</span>
                      )}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#material-filter"
                      className="block p-3 hover:bg-blue-50 text-sm transition-colors duration-200"
                    >
                      Chất liệu{" "}
                      {tempFilters.materials?.length > 0 && (
                        <span className="float-right text-blue-600">●</span>
                      )}
                    </a>
                  </li>
                  {Object.keys(filterOptions.dynamicFilters || {}).map(
                    (code) => (
                      <li key={code}>
                        <a
                          href={`#${code}-filter`}
                          className="block p-3 hover:bg-blue-50 text-sm transition-colors duration-200"
                        >
                          {filterOptions.dynamicFilters[code].display_name}
                          {tempDynamicFilters[code]?.length > 0 && (
                            <span className="float-right text-blue-600">●</span>
                          )}
                        </a>
                      </li>
                    )
                  )}
                  <li>
                    <a
                      href="#services-filter"
                      className="block p-3 hover:bg-blue-50 text-sm transition-colors duration-200"
                    >
                      Dịch vụ & Khuyến mãi
                      {(tempCheckboxFilters.fastDelivery ||
                        tempCheckboxFilters.freeShip ||
                        tempCheckboxFilters.topDeal ||
                        tempCheckboxFilters.fourPlusStar) && (
                          <span className="float-right text-blue-600">●</span>
                        )}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Vùng hiển thị filter */}
          <div className="md:w-3/4 lg:w-4/5 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
            <div className="space-y-8">
              {/* Khoảng giá */}
              {filterOptions?.priceRanges &&
                filterOptions.priceRanges.length > 0 && (
                  <div
                    id="price-filter"
                    className="border-b border-gray-200 pb-6 pt-2"
                  >
                    <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                      <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <i className="pi pi-dollar text-blue-600 text-xs"></i>
                      </span>
                      Khoảng giá
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {filterOptions.priceRanges.map((priceRange) => (
                        <div key={priceRange.key} className="flex items-center">
                          <Checkbox
                            inputId={`price_${priceRange.key}`}
                            checked={tempFilters.price === priceRange.key}
                            onChange={() =>
                              handleTempPriceChange(priceRange.key)
                            }
                            className="mr-2"
                          />
                          <label
                            htmlFor={`price_${priceRange.key}`}
                            className="text-sm cursor-pointer"
                          >
                            {priceRange.name}{" "}
                            {priceRange.count > 0 && (
                              <span className="text-gray-500">
                                ({priceRange.count})
                              </span>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Màu sắc */}
              {filterOptions?.colors && filterOptions.colors.length > 0 && (
                <div
                  id="color-filter"
                  className="border-b border-gray-200 pb-6 pt-2"
                >
                  <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <i className="pi pi-palette text-blue-600 text-xs"></i>
                    </span>
                    Màu sắc
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filterOptions.colors.map((color) => (
                      <div key={color.key} className="flex items-center">
                        <Checkbox
                          inputId={`color_${color.key}`}
                          checked={tempFilters.colors?.includes(color.key)}
                          onChange={() => toggleTempColorFilter(color.key)}
                          className="mr-2"
                        />
                        <label
                          htmlFor={`color_${color.key}`}
                          className="text-sm cursor-pointer flex items-center"
                        >
                          <span
                            className="w-4 h-4 rounded-full inline-block border border-gray-300"
                            style={{ backgroundColor: color.hex }}
                          ></span>
                          <span className="ml-2">
                            {color.name} {color.count > 0 && `(${color.count})`}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Thương hiệu */}
              {filterOptions?.brands && filterOptions.brands.length > 0 && (
                <div
                  id="brand-filter"
                  className="border-b border-gray-200 pb-6 pt-2"
                >
                  <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <i className="pi pi-tag text-blue-600 text-xs"></i>
                    </span>
                    Thương hiệu
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {filterOptions.brands.map((brand) => (
                      <div key={brand.key} className="flex items-center">
                        <Checkbox
                          inputId={`brand_${brand.key}`}
                          checked={tempFilters.brands?.includes(brand.key)}
                          onChange={(e) =>
                            onTempFilterChange(e, "brands", brand)
                          }
                          className="mr-2"
                        />
                        <label
                          htmlFor={`brand_${brand.key}`}
                          className="text-sm cursor-pointer truncate"
                        >
                          {brand.name} {brand.count > 0 && `(${brand.count})`}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Họa tiết */}
              {filterOptions?.patterns && filterOptions.patterns.length > 0 && (
                <div
                  id="pattern-filter"
                  className="border-b border-gray-200 pb-6 pt-2"
                >
                  <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <i className="pi pi-images text-blue-600 text-xs"></i>
                    </span>
                    Họa tiết
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {filterOptions.patterns.map((pattern) => (
                      <div key={pattern.key} className="flex items-center">
                        <Checkbox
                          inputId={`pattern_${pattern.key}`}
                          checked={tempFilters.patterns?.includes(pattern.key)}
                          onChange={(e) =>
                            onTempFilterChange(e, "patterns", pattern)
                          }
                          className="mr-2"
                        />
                        <label
                          htmlFor={`pattern_${pattern.key}`}
                          className="text-sm cursor-pointer"
                        >
                          {pattern.name}{" "}
                          {pattern.count > 0 && `(${pattern.count})`}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chất liệu */}
              {filterOptions?.materials &&
                filterOptions.materials.length > 0 && (
                  <div
                    id="material-filter"
                    className="border-b border-gray-200 pb-6 pt-2"
                  >
                    <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                      <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <i className="pi pi-box text-blue-600 text-xs"></i>
                      </span>
                      Chất liệu
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {filterOptions.materials.map((material) => (
                        <div key={material.key} className="flex items-center">
                          <Checkbox
                            inputId={`material_${material.key}`}
                            checked={tempFilters.materials?.includes(
                              material.key
                            )}
                            onChange={(e) =>
                              onTempFilterChange(e, "materials", material)
                            }
                            className="mr-2"
                          />
                          <label
                            htmlFor={`material_${material.key}`}
                            className="text-sm cursor-pointer"
                          >
                            {material.name}{" "}
                            {material.count > 0 && `(${material.count})`}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Filter động */}
              {filterOptions.dynamicFilters &&
                Object.entries(filterOptions.dynamicFilters).map(
                  ([code, filterData]) => (
                    <div
                      id={`${code}-filter`}
                      key={code}
                      className="border-b border-gray-200 pb-6 pt-2"
                    >
                      <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                        <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                          <i className="pi pi-filter text-blue-600 text-xs"></i>
                        </span>
                        {filterData.display_name}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {filterData.values.map((item) => (
                          <div key={item.key} className="flex items-center">
                            <Checkbox
                              inputId={`${code}_${item.key}`}
                              checked={tempDynamicFilters[code]?.includes(
                                item.key
                              )}
                              onChange={(e) =>
                                handleTempDynamicFilterChange(
                                  code,
                                  e.checked,
                                  item.key
                                )
                              }
                              className="mr-2"
                            />
                            <label
                              htmlFor={`${code}_${item.key}`}
                              className="text-sm cursor-pointer"
                            >
                              {item.name} {item.count > 0 && `(${item.count})`}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}

              {/* Dịch vụ */}
              <div id="services-filter" className="pb-6 pt-2">
                <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                    <i className="pi pi-truck text-blue-600 text-xs"></i>
                  </span>
                  Dịch vụ & Khuyến mãi
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <Checkbox
                      inputId="fastDelivery"
                      checked={tempCheckboxFilters.fastDelivery}
                      onChange={(e) =>
                        handleTempCheckboxChange(e, "fastDelivery")
                      }
                      className="mr-3"
                    />
                    <label
                      htmlFor="fastDelivery"
                      className="text-sm cursor-pointer flex items-center"
                    >
                      <img
                        src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                        alt="Giao siêu tốc 2H"
                        className="h-[25px] mr-2"
                      />
                      <span className="text-red-500 font-bold">
                        Giao siêu tốc 2H
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <Checkbox
                      inputId="topDeal"
                      checked={tempCheckboxFilters.topDeal}
                      onChange={(e) => handleTempCheckboxChange(e, "topDeal")}
                      className="mr-3"
                    />
                    <label
                      htmlFor="topDeal"
                      className="text-sm cursor-pointer flex items-center"
                    >
                      <img
                        src="https://salt.tikicdn.com/ts/upload/b5/aa/48/2305c5e08e536cfb840043df12818146.png"
                        alt="Siêu rẻ"
                        className="h-[25px] mr-2"
                      />
                      <span className="text-red-500 font-bold">Siêu rẻ</span>
                    </label>
                  </div>

                  <div className="flex items-center p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <Checkbox
                      inputId="freeShip"
                      checked={tempCheckboxFilters.freeShip}
                      onChange={(e) => handleTempCheckboxChange(e, "freeShip")}
                      className="mr-3"
                    />
                    <label
                      htmlFor="freeShip"
                      className="text-sm cursor-pointer flex items-center"
                    >
                      <img
                        src="https://salt.tikicdn.com/ts/upload/2f/20/77/0f96cfafdf7855d5e7fe076dd4f34ce0.png"
                        alt="Freeship"
                        className="h-[25px] mr-2"
                      />
                      <span className="text-gray-700">FreeShip Xtra</span>
                    </label>
                  </div>

                  <div className="flex items-center p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <Checkbox
                      inputId="fourStar"
                      checked={tempCheckboxFilters.fourPlusStar}
                      onChange={(e) =>
                        handleTempCheckboxChange(e, "fourPlusStar")
                      }
                      className="mr-3"
                    />
                    <label
                      htmlFor="fourStar"
                      className="text-sm cursor-pointer flex items-center"
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
                      <span className="ml-1">từ 4 sao</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex items-center">
              <Checkbox
                id="nowShipping"
                className=" border-gray-300 rounded mr-2"
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
                className=" border-gray-300 rounded mr-2"
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
                className=" border-gray-300 rounded mr-2"
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
                  className=" border-gray-300 rounded mr-2"
                  checked={checkboxFilters.fourPlusStar}
                  onChange={(e) => handleCheckboxChange(e, "fourPlusStar")}
                />
                <label
                  htmlFor="fourStar"
                  className="text-xs text-gray-700 flex  items-center "
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
                 
                </label>
                 <span className="text-gray-600">từ 4 sao</span>
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
      {/* <div className="text-sm text-gray-600 mb-3">
        Hiển thị {products.length} sản phẩm{" "}
        {filtersApplied > 0 ? "(đã lọc)" : ""}
      </div> */}

      {/* Products Grid with InfiniteScroll */}
      <InfiniteScroll
        dataLength={products.length}
        next={() => {
          // Only auto-increment page if we're not showing the Load More button
          if (!showLoadMoreButton) {
            setCurrentPage((prevPage) => prevPage + 1);
          }
        }}
        hasMore={hasMore}
        // loader={
        //   <div className="flex justify-center items-center my-8">
        //     <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        //   </div>
        // }
        endMessage={
          products.length > 0 &&
          !showLoadMoreButton && (
            <div className="text-center my-8 text-gray-500">
              Đã hiển thị tất cả {products.length} sản phẩm
            </div>
          )
        }
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id}>{itemTemplate(product)}</div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center my-8">
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

        {/* Show the "Load More" button when we've reached a page group boundary */}
        {showLoadMoreButton && products.length > 0 && (
          <div className="flex justify-center my-8">
            <Button
              label={`Xem thêm `}
              icon="pi pi-chevron-down"
              className="p-button-outlined p-button-lg"
              onClick={loadMoreProducts}
            />
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default ProductListing;
