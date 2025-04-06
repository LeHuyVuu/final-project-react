import React from 'react';
import { Link } from 'react-router-dom';
import './CoinManagement.css';

export default function CoinManagement() {

    const LoginUser = localStorage.getItem('LoginUser');
    const Point = localStorage.getItem(`point${LoginUser}`);

    return (
        <div className='coinmanagement-container'>
            <h2>Quản lý xu</h2>
            <div className='coinmanagement-content'>
                <div className='heading'>
                    <div className='left-heading'>
                        <span>Số xu trong tài khoản</span>
                        <i className='fa-solid fa-coins'></i>
                        <span className='point'>{Point}</span>
                    </div>
                    <Link to='' className='right-heading'>
                        <span>Tiki Xu là gì?</span>
                        <i className='fa-regular fa-question-circle'></i>
                    </Link>
                </div>
                <div className='content'>
                    <h3>Nạp lượt chơi game vào tài khoản</h3>

                    <div className='content-box'>
                        ABC
                        <div className='info-vertical'></div>
                        XYZ
                    </div>
                </div>
            </div>
        </div>
    )
}
