import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { sCountItem } from "../../context/store.js";
import axios from "axios";
import Search from "./Search.jsx";

export default function Header() {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMenuPage, setCurrentMenuPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const ITEMS_PER_PAGE = 8; // Number of menu items to show per page
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const menuContainerRef = useRef(null);

  // Fetch main categories and menu items when component mounts
  useEffect(() => {
    const fetchMainCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://api.tiki.vn/raiden/v2/menu-config"
        );

        if (
          response.data &&
          response.data.menu_block &&
          response.data.menu_block.items
        ) {
          // Extract menu items from API
          setMenuItems(response.data.menu_block.items);

          // Map the categories and extract IDs from links
          const mappedCategories = response.data.menu_block.items.map(
            (item) => {
              // Extract the ID from the link (format: https://tiki.vn/xxx/cXXXX)
              const linkParts = item.link.split("/");
              const idPart = linkParts[linkParts.length - 1];
              const id = idPart.replace("c", "");

              return {
                id: parseInt(id),
                name: item.text,
                icon_url: item.icon_url,
                link: item.link,
                children: [], // Will be populated later
              };
            }
          );

          setCategories(mappedCategories);

          // Fetch the first category's children to display by default
          if (mappedCategories.length > 0) {
            setHoveredCategory(mappedCategories[0].id);
            fetchCategoryChildren(mappedCategories[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMainCategories();
  }, []);

  // Fetch children for a specific category
  const fetchCategoryChildren = async (categoryId) => {
    try {
      const response = await axios.get(`https://tiki.vn/api/v2/categories`, {
        params: {
          include: "children",
          parent_id: categoryId,
        },
      });

      if (response.data && response.data.data) {
        // Update the category with its children
        setCategories((prevCategories) => {
          return prevCategories.map((category) => {
            if (category.id === categoryId) {
              return {
                ...category,
                children: response.data.data.map((child) => ({
                  ...child,
                  hasChildren: child.is_leaf === false,
                })),
              };
            }
            return category;
          });
        });
      }
    } catch (error) {
      console.error(
        `Error fetching children for category ${categoryId}:`,
        error
      );
    }
  };

  // Function to close dropdowns when clicking elsewhere
  const handleOutsideClick = (e) => {
    if (
      !e.target.closest(".category-panel") &&
      !e.target.closest(".category-trigger") &&
      !e.target.closest(".menu-dropdown") &&
      !e.target.closest(".horizontal-nav-item")
    ) {
      setShowCategoryDropdown(false);
    }
  };

  // Extract category ID from Tiki link
  const extractCategoryId = (link) => {
    if (!link) return null;
    const linkParts = link.split("/");
    const lastPart = linkParts[linkParts.length - 1];
    if (lastPart && lastPart.startsWith("c")) {
      return parseInt(lastPart.replace("c", ""));
    }
    return null;
  };

  // Show dropdown when hovering any nav item
  const handleMenuItemHover = (menuItem) => {
    setShowCategoryDropdown(true);

    // Extract the category ID from the menu item's link
    const categoryId = extractCategoryId(menuItem.link);

    if (categoryId) {
      // Find the category in our loaded categories
      const matchingCategory = categories.find((cat) => cat.id === categoryId);

      if (matchingCategory) {
        setHoveredCategory(matchingCategory.id);

        // Load children if not already loaded
        if (
          !matchingCategory.children ||
          matchingCategory.children.length === 0
        ) {
          fetchCategoryChildren(matchingCategory.id);
        }
      } else if (categories.length > 0) {
        // Fallback to first category if no match
        setHoveredCategory(categories[0].id);
      }
    } else if (categories.length > 0) {
      // Fallback to first category for menu items without category IDs
      setHoveredCategory(categories[0].id);
    }
  };

  // Handle mouse leaving the navigation area
  const handleNavMouseLeave = () => {
    // Only close if the mouse isn't over the dropdown
    if (!dropdownRef.current?.contains(document.activeElement)) {
      setShowCategoryDropdown(false);
    }
  };

  // Toggle category dropdown
  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
    if (!showCategoryDropdown) {
      // Set default hovered category when opening
      setHoveredCategory(categories[0]?.id || null);
    }
  };

  // Handle category hover - fetch children if not already loaded
  const handleCategoryHover = (categoryId) => {
    setHoveredCategory(categoryId);

    // Find the category
    const category = categories.find((cat) => cat.id === categoryId);

    // If the category exists and has no children yet, fetch them
    if (category && (!category.children || category.children.length === 0)) {
      fetchCategoryChildren(categoryId);
    }
  };

  // Handle subcategory hover - fetch its children if needed
  const handleSubCategoryHover = (subCategory) => {
    if (
      subCategory &&
      subCategory.hasChildren &&
      (!subCategory.children || subCategory.children.length === 0)
    ) {
      // Fetch children for this subcategory
      fetchSubCategoryChildren(subCategory.id);
    }
  };

  // Fetch children for a subcategory
  const fetchSubCategoryChildren = async (subCategoryId) => {
    try {
      const response = await axios.get(`https://tiki.vn/api/v2/categories`, {
        params: {
          include: "children",
          parent_id: subCategoryId,
        },
      });

      if (response.data && response.data.data) {
        // Find the main category containing this subcategory
        const mainCategory = categories.find(
          (cat) =>
            cat.children &&
            cat.children.some((child) => child.id === subCategoryId)
        );

        if (mainCategory) {
          // Update the subcategory with its children
          setCategories((prevCategories) => {
            return prevCategories.map((category) => {
              if (category.id === mainCategory.id) {
                return {
                  ...category,
                  children: category.children.map((child) => {
                    if (child.id === subCategoryId) {
                      return {
                        ...child,
                        children: response.data.data.map((grandChild) => ({
                          ...grandChild,
                          hasChildren: grandChild.is_leaf === false,
                        })),
                      };
                    }
                    return child;
                  }),
                };
              }
              return category;
            });
          });
        }
      }
    } catch (error) {
      console.error(
        `Error fetching children for subcategory ${subCategoryId}:`,
        error
      );
    }
  };

  // Get the hovered category object
  const getHoveredCategory = () => {
    return categories.find((cat) => cat.id === hoveredCategory) || null;
  };

  // Calculate total number of pages for menu pagination
  const totalMenuPages = Math.ceil(menuItems.length / ITEMS_PER_PAGE);

  // Go to the next page of menu items with animation
  const handleNextPage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentMenuPage < totalMenuPages - 1 && !isAnimating) {
      setIsAnimating(true);

      // Apply exit animation to current items
      if (menuContainerRef.current) {
        menuContainerRef.current.classList.add("slide-out-left");
      }

      // Wait for exit animation to complete then change page
      setTimeout(() => {
        setCurrentMenuPage(currentMenuPage + 1);

        // Apply entry animation for new items
        if (menuContainerRef.current) {
          menuContainerRef.current.classList.remove("slide-out-left");
          menuContainerRef.current.classList.add("slide-in-right");

          // Remove the entry animation class after it completes
          setTimeout(() => {
            if (menuContainerRef.current) {
              menuContainerRef.current.classList.remove("slide-in-right");
            }
            setIsAnimating(false);
          }, 300);
        } else {
          setIsAnimating(false);
        }
      }, 300);
    }
  };

  // Go to the previous page of menu items with animation
  const handlePrevPage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentMenuPage > 0 && !isAnimating) {
      setIsAnimating(true);

      // Apply exit animation to current items
      if (menuContainerRef.current) {
        menuContainerRef.current.classList.add("slide-out-right");
      }

      // Wait for exit animation to complete then change page
      setTimeout(() => {
        setCurrentMenuPage(currentMenuPage - 1);

        // Apply entry animation for new items
        if (menuContainerRef.current) {
          menuContainerRef.current.classList.remove("slide-out-right");
          menuContainerRef.current.classList.add("slide-in-left");

          // Remove the entry animation class after it completes
          setTimeout(() => {
            if (menuContainerRef.current) {
              menuContainerRef.current.classList.remove("slide-in-left");
            }
            setIsAnimating(false);
          }, 300);
        } else {
          setIsAnimating(false);
        }
      }, 300);
    }
  };

  // Function to handle direct page selection
  const goToPage = (pageIndex) => {
    if (pageIndex !== currentMenuPage && !isAnimating) {
      setIsAnimating(true);

      // Apply exit animation based on direction
      const direction = pageIndex > currentMenuPage ? "left" : "right";
      if (menuContainerRef.current) {
        menuContainerRef.current.classList.add(`slide-out-${direction}`);
      }

      // Wait for exit animation to complete then change page
      setTimeout(() => {
        setCurrentMenuPage(pageIndex);

        // Apply entry animation for new items
        if (menuContainerRef.current) {
          menuContainerRef.current.classList.remove(`slide-out-${direction}`);
          menuContainerRef.current.classList.add(
            `slide-in-${direction === "left" ? "right" : "left"}`
          );

          // Remove the entry animation class after it completes
          setTimeout(() => {
            if (menuContainerRef.current) {
              menuContainerRef.current.classList.remove(
                `slide-in-${direction === "left" ? "right" : "left"}`
              );
            }
            setIsAnimating(false);
          }, 300);
        } else {
          setIsAnimating(false);
        }
      }, 300);
    }
  };

  // Get current page's menu items
  const currentMenuItems = menuItems.slice(
    currentMenuPage * ITEMS_PER_PAGE,
    (currentMenuPage + 1) * ITEMS_PER_PAGE
  );

  // Function to handle link clicks to hide dropdown
  const handleLinkClick = () => {
    setShowCategoryDropdown(false);
  };

  return (
    <header
      className="bg-white shadow-sm sticky top-0 z-50"
      onClick={handleOutsideClick}
    >
      {/* Top header section */}
      <div className="grid grid-cols-3 items-center w-full pt-2">
        <Link to="/">
          <div className="flex justify-center flex-col items-center group">
            <img
              src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
              alt="Logo"
              className="h-10 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-sm font-medium text-gray-600 group-hover:text-blue-500 transition-colors duration-300">
              Tốt &amp; Nhanh
            </span>
          </div>
        </Link>

        {/* <div className="flex justify-center">
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
        </div> */}
        <Search/>

        <div className="flex justify-end items-center space-x-5 pr-10">
          <div className="user cursor-pointer group">
            <Link to="/account/information">
              <svg
                className="icon icon--account transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
                focusable="false"
                role="presentation"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 5.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm1 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Zm-12.5 14c0-2.143.486-3.732 1.596-4.796C7.212 13.634 9.058 13 12 13c2.942 0 4.788.635 5.904 1.704 1.11 1.064 1.596 2.652 1.596 4.796a.5.5 0 0 0 1 0c0-2.275-.514-4.186-1.904-5.518C17.212 12.656 15.058 12 12 12c-3.058 0-5.212.656-6.596 1.982C4.014 15.314 3.5 17.225 3.5 19.5a.5.5 0 0 0 1 0Z"
                />
              </svg>
            </Link>
          </div>

          <div className="cart cursor-pointer relative group">
            <Link to="/cart">
              <svg
                className="icon icon--cart transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
                focusable="false"
                role="presentation"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 3.833c0-.818.247-1.395.595-1.763.349-.368.837-.57 1.405-.57.568 0 1.056.202 1.405.57.348.368.595.945.595 1.763V5.5h-4V3.833ZM9 6.5v2a.5.5 0 0 0 1 0v-2h4v2a.5.5 0 0 0 1 0v-2h3.564l.867 13H4.57l.867-13H9Zm0-1V3.833c0-1.023.313-1.862.869-2.45C10.425.794 11.187.5 12 .5c.813 0 1.575.294 2.131.883.556.588.869 1.427.869 2.45V5.5h4.5l1 15h-17l1-15H9Z"
                />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center animate-bounce">
                {sCountItem.use()}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation menu - top horizontal bar */}
      <div className="border-t border-b border-gray-200 mt-3">
        <style>{`
          @keyframes slide-out-left {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-10%); }
          }
          @keyframes slide-in-right {
            from { opacity: 0; transform: translateX(10%); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slide-out-right {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(10%); }
          }
          @keyframes slide-in-left {
            from { opacity: 0; transform: translateX(-10%); }
            to { opacity: 1; transform: translateX(0); }
          }
          .slide-out-left {
            animation: slide-out-left 0.3s ease forwards;
          }
          .slide-in-right {
            animation: slide-in-right 0.3s ease forwards;
          }
          .slide-out-right {
            animation: slide-out-right 0.3s ease forwards;
          }
          .slide-in-left {
            animation: slide-in-left 0.3s ease forwards;
          }
          .page-indicator {
            transition: all 0.3s ease;
          }
          .page-indicator:hover {
            background-color: #93c5fd;
            cursor: pointer;
          }
          .page-indicator.active {
            width: 1rem;
          }
        `}</style>
        <div className="container mx-auto">
          <nav
            className="flex items-center justify-between py-2 relative"
            ref={navRef}
            onMouseLeave={handleNavMouseLeave}
          >
            {/* Previous page button */}
            {menuItems.length > ITEMS_PER_PAGE && (
              <button
                onClick={handlePrevPage}
                disabled={currentMenuPage === 0 || isAnimating}
                className={`px-2 flex-shrink-0 focus:outline-none transition-all duration-200 transform ${
                  currentMenuPage === 0 || isAnimating
                    ? "text-gray-300 cursor-not-allowed opacity-50"
                    : "text-gray-700 hover:text-blue-500 hover:scale-110"
                }`}
                aria-label="Previous page"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Categories Dropdown Trigger - first item */}
            <div className="relative inline-block mr-4 flex-shrink-0">
              <button
                className="category-trigger flex items-center space-x-1 px-3 py-1 font-medium text-gray-800 hover:text-blue-500 rounded-md transition duration-300"
                onClick={toggleCategoryDropdown}
                onMouseEnter={() => setShowCategoryDropdown(true)}
              >
                <span>Categories</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showCategoryDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Menu items container with animation */}
            <div
              ref={menuContainerRef}
              className="flex items-center flex-grow justify-start relative overflow-hidden "
              style={{ minHeight: "3rem" }}
            >
              {currentMenuItems.map((item, index) => (
                <div
                  key={index}
                  className="horizontal-nav-item relative mr-4 flex-shrink-0 pb-1"
                  onMouseEnter={() => handleMenuItemHover(item)}
                >
                  <Link
                    to={`/category/${extractCategoryId(item.link) || ""}${
                      item.link && item.link.includes("/")
                        ? `?urlKey=${item.link.split("/").pop()}`
                        : ""
                    }`}
                    className="px-3 py-1 font-medium text-gray-700 hover:text-blue-500 transition duration-200 block whitespace-nowrap"
                    onClick={handleLinkClick}
                  >
                    {item.text}
                  </Link>
                </div>
              ))}
            </div>

            {/* Next page button */}
            {menuItems.length > ITEMS_PER_PAGE && (
              <button
                onClick={handleNextPage}
                disabled={currentMenuPage >= totalMenuPages - 1 || isAnimating}
                className={`px-2  flex-shrink-0 focus:outline-none transition-all duration-200 transform ${
                  currentMenuPage >= totalMenuPages - 1 || isAnimating
                    ? "text-gray-300 cursor-not-allowed opacity-50"
                    : "text-gray-700 hover:text-blue-500 hover:scale-110"
                }`}
                aria-label="Next page"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}

            {/* Pagination indicator */}
            {menuItems.length > ITEMS_PER_PAGE && (
              <div className="absolute -bottom-0 p-2 left-1/2 transform -translate-x-1/2 flex space-x-1 items-center">
                {Array.from({ length: totalMenuPages }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full page-indicator transition-all duration-300 ${
                      index === currentMenuPage
                        ? "w-4 bg-blue-500 active"
                        : "w-2 bg-gray-300"
                    }`}
                    onClick={() => goToPage(index)}
                    role="button"
                    aria-label={`Go to page ${index + 1}`}
                    aria-current={index === currentMenuPage ? "page" : "false"}
                  />
                ))}
              </div>
            )}
          </nav>
        </div>

        {/* Categories Dropdown Panel - now can be triggered by any menu item */}
        {showCategoryDropdown && (
          <div
            ref={dropdownRef}
            className="category-panel absolute left-28 right-28 mt-0 bg-white shadow-xl z-50 border-t border-gray-200 animate-fadeDown"
            onMouseEnter={() => setShowCategoryDropdown(true)}
            onMouseLeave={() => setShowCategoryDropdown(false)}
            style={{
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              transformOrigin: "top center",
            }}
          >
            <style>{`
              @keyframes fadeDown {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .animate-fadeDown {
                animation: fadeDown 0.2s ease-out forwards;
              }
              .category-item:hover {
                background-color: #f5f8ff;
                border-left-color: #1a6aff;
              }
              .subcategory-item {
                transition: all 0.2s ease;
              }
              .subcategory-item:hover {
                transform: translateY(-2px);
              }
            `}</style>

            <div className="container  flex">
              {/* Left category sidebar */}
              <div
                className="w-2/6 bg-gray-50 py-2  overflow-x-hidden"
                style={{
                  borderRight: "1px solid #edf2f7",
                  height: "810px",

                  // scrollbarWidth: "none" /* Firefox */,
                }}
              >
                <style>{`
                  /* Hide scrollbar for Chrome, Safari and Opera */
                  .overflow-y-auto::-webkit-scrollbar {
                    display: none;
                  }
                  /* IE and Edge */
                  .overflow-y-auto {
                    -ms-overflow-style: none;
                  }
                `}</style>
                {isLoading ? (
                  <div className="flex items-center justify-center h-20 p-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-sm text-gray-600">
                      Loading...
                    </span>
                  </div>
                ) : (
                  <ul className="py-1">
                    {categories.map((category) => (
                      <li
                        key={category.id}
                        className={`category-item py-2.5 px-4 cursor-pointer transition duration-150 border-l-3 ${
                          hoveredCategory === category.id
                            ? "border-l-blue-500 bg-blue-50 text-blue-600 font-medium"
                            : "border-l-transparent hover:border-l-blue-300"
                        }`}
                        onMouseEnter={() => handleCategoryHover(category.id)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{category.name}</span>
                          {(!category.is_leaf ||
                            (category.children &&
                              category.children.length > 0)) && (
                            <svg
                              className={`w-3 h-3 text-gray-400 ${
                                hoveredCategory === category.id
                                  ? "text-blue-500"
                                  : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              ></path>
                            </svg>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Right content area - subcategories with images */}
              <div
                className="w-5/6 p-6 bg-white overflow-y-auto"
                style={{
                  height: "820px",
                  scrollbarWidth: "none" /* Firefox */,
                }}
              >
                {hoveredCategory && getHoveredCategory() ? (
                  <div>
                    <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
                      <h3 className="text-lg font-bold text-gray-800">
                        {getHoveredCategory().name}
                      </h3>
                      <Link
                        to={`/category/${getHoveredCategory().id}${
                          getHoveredCategory().link &&
                          getHoveredCategory().link.includes("/")
                            ? `?urlKey=${getHoveredCategory()
                                .link.split("/")
                                .pop()}`
                            : ""
                        }`}
                        className="text-blue-500 text-sm hover:underline flex items-center group"
                        onClick={handleLinkClick}
                      >
                        <span>Xem tất cả</span>
                        <svg
                          className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                      </Link>
                    </div>

                    {getHoveredCategory().children &&
                    getHoveredCategory().children.length > 0 ? (
                      <>
                        <div className="grid grid-cols-6 gap-5 mb-8">
                          {getHoveredCategory()
                            .children.slice(0, 12)
                            .map((subCategory) => (
                              <div
                                key={subCategory.id}
                                className="text-center subcategory-item"
                                onMouseEnter={() =>
                                  handleSubCategoryHover(subCategory)
                                }
                              >
                                <Link
                                  to={
                                    subCategory.url_path
                                      ? `/category/${subCategory.id}?urlKey=${subCategory.url_path}`
                                      : `/category/${subCategory.id}`
                                  }
                                  className="flex flex-col items-center group"
                                  onClick={handleLinkClick}
                                >
                                  <div className="w-20 h-20 mb-2 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50 group-hover:border-blue-300 group-hover:shadow-md transition-all duration-200">
                                    {subCategory.thumbnail_url ? (
                                      <img
                                        src={subCategory.thumbnail_url}
                                        alt={subCategory.name}
                                        className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                                      />
                                    ) : (
                                      <div className="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-400 group-hover:text-blue-400 transition-colors duration-200">
                                        <svg
                                          className="w-8 h-8"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                  <span className="text-xs font-medium text-gray-700 group-hover:text-blue-500 transition-colors duration-200">
                                    {subCategory.name}
                                  </span>
                                </Link>
                              </div>
                            ))}
                        </div>

                        {/* Featured subcategories section */}
                        <div className="mt-8 bg-gray-50 rounded-lg p-5">
                          <h4 className="text-md font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-700">
                            <span className="border-l-4 border-blue-500 pl-2">
                              Mua sắm theo danh mục
                            </span>
                          </h4>
                          <div className="grid grid-cols-3 gap-6">
                            {getHoveredCategory()
                              .children.slice(0, 6)
                              .map((subCategory) => (
                                <div key={subCategory.id} className="mb-4">
                                  <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    {/* <svg
                                      className="w-4 h-4 mr-1 text-blue-500"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v14a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1H7z"
                                        clipRule="evenodd"
                                      />
                                    </svg> */}
                                    <Link
                                      to={
                                        subCategory.url_path
                                          ? `/category/${subCategory.id}?urlKey=${subCategory.url_path}`
                                          : `/category/${subCategory.id}`
                                      }
                                      className="hover:text-blue-500 transition-colors duration-200"
                                      onClick={handleLinkClick}
                                    >
                                      {subCategory.name}
                                    </Link>
                                  </h5>
                                  {subCategory.children &&
                                    subCategory.children.length > 0 && (
                                      <ul className="space-y-1 pl-6">
                                        {subCategory.children
                                          .slice(0, 5)
                                          .map((item) => (
                                            <li
                                              key={item.id}
                                              className="text-xs relative before:content-['•'] before:absolute before:left-[-10px] before:text-gray-400"
                                            >
                                              <Link
                                                to={
                                                  item.url_path
                                                    ? `/category/${item.id}?urlKey=${item.url_path}`
                                                    : `/category/${item.id}`
                                                }
                                                className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
                                                onClick={handleLinkClick}
                                              >
                                                {item.name}
                                              </Link>
                                            </li>
                                          ))}
                                      </ul>
                                    )}
                                </div>
                              ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-500">
                          Loading subcategories...
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-500">
                      Loading categories...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
