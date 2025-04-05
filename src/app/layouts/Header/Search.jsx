import React, { useState, useEffect, useRef } from "react";
import { getData } from "../../context/api"; // Assuming this is your API utility

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dropdownRef = useRef(null);

    // Hàm lấy giá trị cookie
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    };

    // Hàm thiết lập trackity_id
    const getTrackityId = () => {
        let trackityId = getCookie("trackity");
        if (!trackityId) {
            console.warn(
                "Không tìm thấy trackity_id trong cookie, sử dụng giá trị giả lập"
            );
            trackityId = "9ca266ff-e45f-a26c-c34b-403e42e1af4c";
        }
        return trackityId;
    };

    // Hàm gọi API tìm kiếm gợi ý
    const fetchSuggestions = async (query) => {
        const trackityId = getTrackityId();
        if (!trackityId) {
            setError("Không thể lấy trackity_id");
            return [];
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await getData(
                `https://tiki.vn/api/v2/search/suggestion?q=${query}`
            );
            setIsLoading(false);
            return response.data.data || [];
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            setError(
                error.response?.data?.message || "Lỗi khi gọi API (có thể do CORS)"
            );
            setIsLoading(false);
            return [];
        }
    };

    // Xử lý khi người dùng nhập từ khóa
    useEffect(() => {
        const debounceTimeout = setTimeout(async () => {
            if (keyword.length < 2) {
                setSuggestions([]);
                setIsDropdownOpen(false);
                setError(null);
                return;
            }

            const results = await fetchSuggestions(keyword);
            setSuggestions(results);
            setIsDropdownOpen(results.length > 0);
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [keyword]);

    // Ẩn dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Xử lý khi nhấp Enter để tìm kiếm
    const handleSearch = async () => {
        if (keyword.length < 2) {
            setError("Vui lòng nhập ít nhất 2 ký tự để tìm kiếm!");
            return;
        }

        const results = await fetchSuggestions(keyword);
        if (results.length > 0) {
            window.location.href = results[0].url || `/search?q=${keyword}`;
        } else {
            setError("Không tìm thấy kết quả!");
        }
    };

    return (
          <div className="flex justify-center">
          <div className="search relative group w-full">
            <div className="header-search">
              <input
                type="search"
                name="q"
                id="HeaderSearchInput"
                className="header-search__input input__field input__field--has-button border border-gray-300 rounded-full py-2 px-4 pl-10 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Search products..."
              />
              <div className="absolute left-2 top-2.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
      
        
     

            {isLoading && (
                <div className="absolute top-full left-0 w-full max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20 text-gray-500 text-base">
                    Đang tải...
                </div>
            )}
            {error && (
                <div className="absolute top-full left-0 w-full max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mt-2 bg-white border border-red-200 rounded-lg shadow-lg p-4 z-20 text-red-600 text-base">
                    {error}
                </div>
            )}
            {isDropdownOpen && suggestions.length > 0 && !isLoading && !error && (
                <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 w-full max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto"
                >
                    {suggestions.map((item, index) => (
                        <div
                            key={index}
                            className="p-4 text-gray-700 text-base cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                            onClick={() => {
                                window.location.href = item.url;
                            }}
                        >
                            {item.keyword}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;