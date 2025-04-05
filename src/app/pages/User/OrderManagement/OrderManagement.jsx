import React, { useState, useEffect } from 'react';
import NoOrder from './NoOrder.png';
import { Paginator } from 'primereact/paginator'; // Import Paginator
import './OrderManagement.css';
import { Link } from 'react-router-dom';

export default function OrderManagement() {
    const [carousel, setCarousel] = useState('Tất cả đơn');
    const [orderHistory, setOrderHistory] = useState([]);
    const [first, setFirst] = useState(0); // Trạng thái phân trang
    const [rows, setRows] = useState(2); // Số lượng đơn hàng hiển thị mỗi trang

    // Lấy dữ liệu từ localStorage khi component được render
    useEffect(() => {
        const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
        setOrderHistory(orders);
    }, []);

    const OrderStatuses = [
        { name: 'Tất cả đơn', link: 'all-orders' },
        { name: 'Chờ thanh toán', link: 'pending-payment' },
        { name: 'Đang xử lý', link: 'processing' },
        { name: 'Đang vận chuyển', link: 'shipping' },
        { name: 'Đã giao', link: 'delivered' },
        { name: 'Đã huỷ', link: 'cancelled' },
    ];

    // Lọc các đơn hàng theo trạng thái
    const filteredOrders = orderHistory.filter(order => {
        if (carousel === 'Tất cả đơn') return true;  // Nếu chọn 'Tất cả đơn'
        // Lọc theo trạng thái đơn hàng
        return order.status === carousel;
    });

    // Thay đổi trang
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    return (
        <div className='ordermanagement-container mb-44'>
            <h2>Quản lý đơn hàng</h2>
            <div className='ordermanagement-content'>
                <div className='headings'>
                    {OrderStatuses.map((status, index) => (
                        <div
                            key={index}
                            className='filter-option'
                            onClick={() => setCarousel(status.name)}
                            style={{
                                borderBottom: carousel === status.name && '2px solid #007bff',
                                color: carousel === status.name && '#007bff',
                            }}
                        >
                            {status.name}
                        </div>
                    ))}
                </div>

                <form className='search-form'>
                    <div className='form-container'>
                        <i className='fa-solid fa-magnifying-glass'></i>
                        <input type='text' placeholder='Tìm kiếm đơn hàng...' />
                        <button>Tìm đơn hàng</button>
                    </div>
                </form>

                <div className='carousel'>
                    {filteredOrders.length === 0 ? (
                        <>
                            <img src={NoOrder} alt='NoOrder' />
                            <p>'{carousel}' chưa có đơn hàng</p>
                        </>
                    ) : (
                        <div className="mx-auto p-1 ">
                            {filteredOrders.slice(first, first + rows).map((order, index) => (
                                <div
                                    key={index}
                                    className="flex items-start bg-white border-b border-gray-200 py-2 px-2"
                                >
                                    {/* Product Image */}
                                    <img
                                        src={order.thumbnail_url}
                                        alt={order.name}
                                        className="w-[20px] h-[20px] object-contain mr-3"
                                    />

                                    {/* Order Info */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                {/* Product Name */}
                                                <h4 className="text-sm font-medium text-gray-800 line-clamp-1">
                                                    {order.name}
                                                </h4>
                                                {/* Seller Info */}
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    Thẻ giới: {order.current_seller}
                                                </p>
                                            </div>
                                            {/* Price */}
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-red-600">
                                                    {order.price.toLocaleString()} đ
                                                </p>
                                            </div>
                                        </div>

                                        {/* Additional Info */}
                                        <div className="mt-1 text-xs text-gray-600 space-y-1">
                                            {/* Quantity */}
                                            <p>
                                                <span className="font-medium">x{order.quantity}</span>
                                            </p>
                                        </div>

                                        {/* Total Price and Buttons */}
                                        <div className="flex justify-end items-center mt-2 space-x-2">
                                            <p className="text-sm text-gray-800 mr-2">
                                                Tổng tiền: <span className="font-medium">{(order.price * order.quantity).toLocaleString()} đ</span>
                                            </p>
                                            <Link to={`/detail/${order.id}`}>
                                                <button className="text-blue-600 border border-blue-600 rounded px-3 py-1 text-xs hover:bg-blue-50">
                                                    Mua lại
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <Paginator
                        first={first}
                        rows={rows}
                        totalRecords={filteredOrders.length}
                        onPageChange={onPageChange}
                        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    />
                </div>
            </div>
        </div>
    );
}
