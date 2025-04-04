import axios from "axios";

const api = axios.create({
  baseURL: "",
  timeout: 10000, // Thời gian timeout mặc định
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Hàm gọi API tùy biến với phương thức (GET, POST, v.v...)
 * @param {string} method - Phương thức HTTP (GET, POST, PUT, DELETE, v.v...)
 * @param {string} url - Địa chỉ API
 * @param {object} [data] - Dữ liệu cần gửi (chỉ áp dụng cho POST, PUT, v.v...)
 * @param {object} [params] - Các tham số cần gửi trong URL (chỉ áp dụng cho GET, v.v...)
 * @returns {Promise} - Trả về Promise chứa dữ liệu API trả về
 */
const callApi = async (method, url, data = {}, params = {}) => {
  try {
    const response = await api({
      method,
      url,
      data,
      params,
    });
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

// Các phương thức gọi API cho tiện dụng
export const getData = (url, params) => callApi("get", url, {}, params);
// export const postData = (url, data) => callApi('post', url, data);
// export const putData = (url, data) => callApi('put', url, data);
// export const deleteData = (url, data) => callApi('delete', url, data);

///////////////////////////////////////////////////////////////////////////////
/**
 * Lấy danh mục sản phẩm từ Tiki
 * @param {number} parentId - ID của danh mục cha (mặc định là 931 - danh mục thời trang nữ)
 * @returns {Promise} - Trả về Promise chứa dữ liệu danh mục
 */
export const getCategories = async (parentId) => {
  try {
    const response = await axios.get(`https://tiki.vn/api/v2/categories`, {
      params: {
        include: "children",
        parent_id: parentId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

/**
 * Lấy thông tin chi tiết của danh mục từ Tiki
 * @param {number} categoryId - ID của danh mục cần lấy thông tin
 * @returns {Promise} - Trả về Promise chứa thông tin chi tiết danh mục
 */
export const getCategoryDetail = async (categoryId) => {
  try {
    const response = await axios.get(
      `https://tiki.vn/api/v2/categories/${categoryId}`,
      {
        params: {
          include: "ancestors,children",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching category detail:", error);
    throw error;
  }
};

/**
 * Lấy danh sách sản phẩm theo danh mục từ Tiki
 * @param {Object} params - Các tham số truy vấn
 * @param {string} params.urlKey - Khóa URL của danh mục (ví dụ: "dam-dang-xoe")
 * @param {number} params.categoryId - ID của danh mục (ví dụ: 27582)
 * @param {number} params.page - Số trang (mặc định: 1)
 * @param {number} params.limit - Số sản phẩm trên một trang (mặc định: 24)
 * @param {string} params.sort - Cách sắp xếp (mặc định: "top_seller")
 * @returns {Promise} - Trả về Promise chứa danh sách sản phẩm
 */
export const getProductListing = async ({
  urlKey,
  categoryId,
  page = 1,
  limit = 24,
  sort = "top_seller",
}) => {
  try {
    const response = await axios.get(
      `https://tiki.vn/api/personalish/v1/blocks/listings`,
      {
        params: {
          urlKey,
          category: categoryId,
          page,
          limit,
          sort,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching product listing:", error);
    throw error;
  }
};

/**
 * Lấy danh sách con của một danh mục từ Tiki
 * @param {number} categoryId - ID của danh mục cần lấy con
 * @returns {Promise} - Trả về Promise chứa danh sách con
 */
export const getCategoryChildren = async (categoryId) => {
  try {
    // First try to get from categories API
    const response = await axios.get(`https://tiki.vn/api/v2/categories`, {
      params: {
        parent_id: categoryId,
      },
    });

    if (response.data && response.data.data && response.data.data.length > 0) {
      return response;
    }

    // If no results, try the category detail API
    const detailResponse = await getCategoryDetail(categoryId);
    if (detailResponse.data && detailResponse.data.children) {
      return {
        data: {
          data: detailResponse.data.children,
        },
      };
    }

    // Return empty result if nothing found
    return { data: { data: [] } };
  } catch (error) {
    console.error("Error fetching category children:", error);
    throw error;
  }
};

///api tổng rồi chiết ra thành các hàm riêng
export const getProductsByCategory = async (
  category = "27582",
  page = 1,
  limit = 40,
  urlKey = "dam-dang-xoe"
) => {
  const url = `https://tiki.vn/api/personalish/v1/blocks/listings?limit=${limit}&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=182be9b9-76ed-6222-e51b-b73a2c7de71f&category=${category}&page=${page}&urlKey=${urlKey}`;

  try {
    return await getData(url);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

// Hàm riêng để lấy dữ liệu banner từ API Tiki
export const getBannersByCategory = async (category = "", urlKey = "") => {
  try {
    const response = await getProductsByCategory(category, 1, 40, urlKey);
    const bannersData = response.data.widgets;
    return bannersData.map((banner) => ({
      image: banner.banner.image,
    }));
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
};

/**
 * Lấy dữ liệu filter từ API Tiki theo danh mục và URL key
 * @param {string} category - ID của danh mục (ví dụ: "27582")
 * @param {string} urlKey - URL key của danh mục (ví dụ: "dam-dang-xoe")
 * @returns {Promise} - Trả về Promise chứa dữ liệu filter đã được xử lý
 */
export const getFilters = async (category = "", urlKey = "") => {
  try {
    const response = await getProductsByCategory(category, 1, 40, urlKey);

    // Kiểm tra và trích xuất dữ liệu filter từ phản hồi API
    if (response?.data?.filters) {
      const filters = response.data.filters;

      // Trả về dữ liệu filter đã được xử lý theo nhóm
      return {
        // Filter danh mục sản phẩm
        category: filters.find((filter) => filter.code === "category") || null,

        // Nhóm các dịch vụ
        services: filters.filter((filter) =>
          ["support_p2h_delivery", "tiki_hero", "freeship_campaign"].includes(
            filter.code
          )
        ),

        // Filter đánh giá
        rating: filters.find((filter) => filter.code === "rating") || null,

        // Filter giá
        price: filters.find((filter) => filter.code === "price") || null,

        // Filter theo các thuộc tính sản phẩm (vải, chất liệu...)
        attributes: filters.filter(
          (filter) =>
            ![
              "category",
              "support_p2h_delivery",
              "tiki_hero",
              "freeship_campaign",
              "rating",
              "price",
            ].includes(filter.code)
        ),
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching filters:", error);
    return null;
  }
};

/**
 * Áp dụng filter vào truy vấn sản phẩm
 * @param {string} category - ID của danh mục (ví dụ: "27582")
 * @param {string} urlKey - URL key của danh mục (ví dụ: "dam-dang-xoe")
 * @param {Object} filters - Các filter được chọn
 * @param {string} filters.price - Khoảng giá (ví dụ: "150000,400000")
 * @param {string} filters.rating - Đánh giá tối thiểu (ví dụ: "4")
 * @param {Array} filters.cloth_material - Mảng chất liệu vải được chọn
 * @param {Object} filters.services - Các dịch vụ được chọn
 * @param {number} page - Số trang hiện tại
 * @param {number} limit - Số sản phẩm mỗi trang
 * @returns {Promise} - Trả về Promise chứa dữ liệu sản phẩm được lọc
 */
/**
 * Áp dụng filter vào truy vấn sản phẩm kèm phân trang
 * @param {string} category - ID của danh mục (ví dụ: "27582")
 * @param {string} urlKey - URL key của danh mục (ví dụ: "dam-dang-xoe")
 * @param {Object} filters - Các filter được chọn
 * @param {string} filters.price - Khoảng giá (ví dụ: "150000,400000")
 * @param {string} filters.rating - Đánh giá tối thiểu (ví dụ: "4")
 * @param {Array} filters.cloth_material - Mảng chất liệu vải được chọn
 * @param {Object} filters.services - Các dịch vụ được chọn
 * @param {Object} pagination - Tham số phân trang
 * @param {number} pagination.page - Số trang hiện tại (mặc định: 1)
 * @param {number} pagination.limit - Số sản phẩm mỗi trang (mặc định: 40)
 * @param {string} sort - Cách sắp xếp sản phẩm (mặc định: "top_seller")
 * @returns {Promise} - Trả về Promise chứa dữ liệu sản phẩm được lọc và thông tin phân trang
 */
export const getFilteredProducts = async (
  category = "",
  urlKey = "",
  filters = {},
  pagination = { page: 1, limit: 40 },
  sort = "top_seller"
) => {
  try {
    const { page = 1, limit = 40 } = pagination;

    // Xây dựng URL cơ bản với phân trang và sắp xếp
    let url = `https://tiki.vn/api/personalish/v1/blocks/listings?limit=${limit}&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=182be9b9-76ed-6222-e51b-b73a2c7de71f&category=${category}&page=${page}&urlKey=${urlKey}&sort=${sort}`;

    // Thêm các filter vào URL
    if (filters.price) {
      url += `&price=${filters.price}`;
    }

    if (filters.rating) {
      url += `&rating=${filters.rating}`;
    }

    // Xử lý filter cho chất liệu vải (multi-select)
    if (filters.cloth_material && filters.cloth_material.length > 0) {
      url += `&cloth_material=${filters.cloth_material.join(",")}`;
    }

    // Xử lý filter cho họa tiết (pattern)
    if (filters.fashion_pattern && filters.fashion_pattern.length > 0) {
      url += `&fashion_pattern=${filters.fashion_pattern.join(",")}`;
    }

    // Xử lý filter cho màu sắc
    if (filters.option_color && filters.option_color.length > 0) {
      url += `&option_color=${filters.option_color.join(",")}`;
    }

    // Xử lý filter thương hiệu
    if (filters.brand && filters.brand.length > 0) {
      url += `&brand=${filters.brand.join(",")}`;
    }

    // Xử lý các dịch vụ
    if (filters.services) {
      if (filters.services.support_p2h_delivery) {
        url += "&support_p2h_delivery=1";
      }
      if (filters.services.tiki_hero) {
        url += "&tiki_hero=1";
      }
      if (filters.services.freeship_campaign) {
        url += "&freeship_campaign=freeship_xtra";
      }
    }

    // Xử lý các filter động
    Object.entries(filters).forEach(([key, value]) => {
      // Bỏ qua các filter đã xử lý riêng ở trên
      if (
        ![
          "price",
          "rating",
          "cloth_material",
          "fashion_pattern",
          "option_color",
          "brand",
          "services",
        ].includes(key) &&
        value &&
        (Array.isArray(value) ? value.length > 0 : true)
      ) {
        // Nếu là mảng thì join bằng dấu phẩy
        if (Array.isArray(value)) {
          url += `&${key}=${value.join(",")}`;
        }
        // Nếu là giá trị đơn
        else if (typeof value === "string" || typeof value === "number") {
          url += `&${key}=${value}`;
        }
      }
    });

    console.log("Final API URL:", url);

    // Gọi API với URL đã được xây dựng
    const response = await getData(url);

    // Trả về response với dữ liệu và thông tin phân trang
    return {
      data: response.data.data,
      paging: response.data.paging,
      filters: response.data.filters, // Trả về cả filter mới nếu có
      aggregations: response.data.aggregations, // Thống kê bổ sung
    };
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw error;
  }
};

/**
 * Lấy dữ liệu phân trang cho sản phẩm
 * @param {Object} paging - Đối tượng phân trang từ API
 * @returns {Object} - Thông tin phân trang đã được xử lý
 */
export const getPaginationInfo = (paging) => {
  if (!paging)
    return {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      perPage: 40,
      hasNextPage: false,
      hasPrevPage: false,
    };

  const { current_page, last_page, total, per_page } = paging;

  return {
    currentPage: current_page || 1,
    totalPages: last_page || 1,
    totalItems: total || 0,
    perPage: per_page || 40,
    hasNextPage: current_page < last_page,
    hasPrevPage: current_page > 1,
  };
};
