import React from 'react'
import { FaSearch, FaBell, FaShoppingCart, FaUser } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";

export default function Header() {
  return (
    <header className="bg-white shadow py-3 px-6 flex items-center justify-between">
    {/* Logo */}
    <div className="flex items-center space-x-2">
      <img
        src="/your-logo.png" // Thay bằng link logo của bạn
        alt="Fahasa"
        className="h-8"
      />
    </div>

    {/* Danh mục & Tìm kiếm */}
    <div className="flex flex-grow max-w-3xl mx-6">
      {/* Icon danh mục */}
      <button className="text-gray-600 hover:text-gray-900 mr-2">
        <IoGridOutline className="text-2xl" />
      </button>

      {/* Ô tìm kiếm */}
      <div className="relative flex flex-grow">
        <input
          type="text"
          placeholder="50 Đề Minh Họa Tốt Nghiệp"
          className="w-full px-4 py-2 border rounded-l-lg focus:outline-none"
        />
        <button className="bg-slate-500 text-white px-4 rounded-r-lg">
          <FaSearch />
        </button>
      </div>
    </div>

    {/* Biểu tượng thông báo, giỏ hàng, tài khoản */}
    <div className="flex items-center space-x-6 text-gray-600">
      <button className="hover:text-gray-900 flex flex-col items-center">
        <FaBell className="text-xl" />
        <span className="text-xs">Thông Báo</span>
      </button>

      <button className="hover:text-gray-900 flex flex-col items-center">
        <FaShoppingCart className="text-xl" />
        <span className="text-xs">Giỏ Hàng</span>
      </button>

      <button className="hover:text-gray-900 flex flex-col items-center">
        <FaUser className="text-xl" />
        <span className="text-xs">Tài Khoản</span>
      </button>

      
    </div>
  </header>
  )
}
