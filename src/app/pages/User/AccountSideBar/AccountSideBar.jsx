import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AccountSideBar.css';

import TikiText from './TikiText.png';

export default function AccountSideBar() {

    const [Option, setOption] = useState(window.location.pathname.split('/').pop());

    const ListOption = [
        { name: 'Thông tin tài khoản', icon: 'fa-solid fa-user', link: 'information' },
        { name: 'Quản lý đơn hàng', icon: 'fa-solid fa-box', link: 'order' },
        { name: 'Hỗ trợ khách hàng', icon: 'fa-solid fa-headset', link: 'help-center' },
        { name: 'Thông báo của tôi', icon: 'fa-solid fa-bell', link: 'notification' },
        { name: 'Sổ địa chỉ', icon: 'fa-solid fa-map', link: 'address' },
        { name: 'Quản lý xu', icon: 'fa-solid fa-coins', link: 'coin' },
        { name: 'Xúc xắc may mắn', icon: 'fa-solid fa-dice', link: '/dice' },
    ];

    const User = {
        name: 'Đặng Ngọc Hải Triều',
        image: null,
    };

    return (
        <div className='accountsidebar-container'>
            <div className='thisuser'>
                <img src={TikiText} alt='TikiText' />
                <div>
                    <div>Tài khoản của</div>
                    <div className='user-name'>{User.name}</div>
                </div>
            </div>
            {ListOption.map((option, index) => (
                <Link to={`${option.link}`} key={index} onClick={() => setOption(option.link)}>
                    <div className='option' style={{ backgroundColor: Option == option.link && '#cfcfcf' }}>
                        <i className={option.icon}></i>
                        <div className='option-name'>{option.name}</div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
