import { Link } from "react-router-dom";
import Menu from "../../pages/MenuHeader/Menu.jsx";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="grid grid-cols-3 gap-4 items-center w-full pt-2">
        <Link to='/'>
          <div className="flex justify-center flex-col items-center group">
            <img
              src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
              alt="Bluefly Logo"
              className="h-10 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-sm font-medium text-gray-600 group-hover:text-blue-500 transition-colors duration-300">
              Tốt &amp; Nhanh
            </span>
          </div>
        </Link>
        <div className="flex space-x-4 ml-24">
          <nav>
            <ul className="flex space-x-20">
              <Link to='/'>
                <li className="relative group">
                  <span className="hover:text-blue-500 cursor-pointer transition-colors duration-300">
                    Home
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </li>
              </Link>
              <li className="relative group">
                <span className="hover:text-blue-500 cursor-pointer transition-colors duration-300">
                  Shop
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="relative group">
                <span className="hover:text-blue-500 cursor-pointer transition-colors duration-300">
                  Categories
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="relative group">
                <span className="hover:text-blue-500 cursor-pointer transition-colors duration-300">
                  Sale
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex justify-end items-center space-x-5 pr-10 mt-5">
          <div className="search relative group">
            <div className="header-search">
              <input
                type="search"
                name="q"
                id="HeaderSearchInput"
                className="header-search__input input__field input__field--has-button border border-gray-300 rounded-full py-2 px-4 pl-10 w-72 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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

          <div className="user cursor-pointer group">
            <Link to='/login'>
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
            <Link to='/cart'>
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
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex justify-center items-center gap-16 px-10 py-4">

        <Menu />

        <nav className="block">
          <ul className="flex justify-center gap-6 items-center text-gray-500 text-sm font-semibold">
            <li className="relative group">
              <div className="hover:text-blue-500 cursor-pointer transition-colors duration-300 flex items-center">
                <span>Điện gia dụng</span>
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-[960px] opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white shadow-xl mt-2 py-6 px-8 rounded-xl z-10 transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100">
                <div className="grid grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Điện lạnh
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Tủ lạnh
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Máy giặt
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Điều hòa
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Tủ đông
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Điện tử
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Tivi
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Loa
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Amply
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Đầu kỹ thuật số
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Điện dân dụng
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Nồi cơm điện
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Máy hút bụi
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Bình nóng lạnh
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Lò vi sóng
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Phụ kiện
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Dây điện
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Ổ cắm
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Công tắc
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Bóng đèn
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="relative group">
              <div className="hover:text-blue-500 cursor-pointer transition-colors duration-300 flex items-center">
                <span>Thời trang</span>
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-[960px] opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white shadow-xl mt-2 py-6 px-8 rounded-xl z-10 transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100">
                <div className="grid grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Thời trang nam
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Áo sơ mi
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Quần tây
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Áo khoác
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Giày tây
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Thời trang nữ
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Đầm
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Áo
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Quần
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Giày
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Phụ kiện
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Túi xách
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Ví
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Thắt lưng
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Đồng hồ
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Thời trang trẻ em
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Quần áo trẻ em
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Giày dép trẻ em
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Phụ kiện trẻ em
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Đồ chơi
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="relative group">
              <div className="hover:text-blue-500 cursor-pointer transition-colors duration-300 flex items-center">
                <span>Mỹ phẩm</span>
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-[960px] opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white shadow-xl mt-2 py-6 px-8 rounded-xl z-10 transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100">
                <div className="grid grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Chăm sóc da
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Kem dưỡng da
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Sữa rửa mặt
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Mặt nạ
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Kem chống nắng
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Trang điểm
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Son môi
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Phấn nền
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Mascara
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Kẻ mắt
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Chăm sóc tóc
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Dầu gội
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Dầu xả
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Kem ủ tóc
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Xịt tóc
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Nước hoa
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Nước hoa nam
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Nước hoa nữ
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Nước hoa unisex
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Mini size
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="relative group">
              <div className="hover:text-blue-500 cursor-pointer transition-colors duration-300 flex items-center">
                <span>Thực phẩm</span>
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-[960px] opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white shadow-xl mt-2 py-6 px-8 rounded-xl z-10 transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100">
                <div className="grid grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Thực phẩm tươi sống
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Rau củ quả
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Thịt tươi
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Hải sản
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Trứng
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Thực phẩm đóng hộp
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Đồ hộp
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Mì ăn liền
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Xúc xích
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Thịt hộp
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Đồ uống
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Nước ngọt
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Nước trái cây
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Sữa
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Cà phê
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4 text-base">
                      Đồ khô
                    </h3>
                    <ul className="space-y-2">
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Gạo
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Đậu
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Hạt dinh dưỡng
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer transition-colors duration-300 text-gray-600 hover:translate-x-1">
                        Mứt
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* <div className="flex justify-between items-center mt-2 p-[1px] bg-gray-100"></div> */}
    </header>
  );
}
