import React, { useState } from 'react';
import NoOrder from './NoOrder.png';
import './OrderManagement.css';

export default function OrderManagement() {

    const [carousel, setCarousel] = useState('Tất cả đơn');

    const OrderStatuses = [
        { name: 'Tất cả đơn', link: 'all-orders' },
        { name: 'Chờ thanh toán', link: 'pending-payment' },
        { name: 'Đang xử lý', link: 'processing' },
        { name: 'Đang vận chuyển', link: 'shipping' },
        { name: 'Đã giao', link: 'delivered' },
        { name: 'Đã huỷ', link: 'cancelled' },
    ];

    return (
        <div className='ordermanagement-container'>
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

                {/* {carousel && ( */}
                <div className='carousel'>
                    <img src={NoOrder} alt='NoOrder' />
                    <p>'{carousel}' chưa có đơn hàng</p>
                </div>
                {/* )} */}
            </div>
        </div>
    )
}
