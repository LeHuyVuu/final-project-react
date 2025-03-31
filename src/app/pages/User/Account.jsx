import React from 'react';
import { Outlet } from 'react-router-dom';
import './Account.css';
import AccountSideBar from './AccountSideBar/AccountSideBar.jsx';

export default function Account() {
    return (
        <div className='account-container'>
            <div className='account-content'>
                <AccountSideBar />
                <Outlet />
            </div>
        </div>
    )
}
