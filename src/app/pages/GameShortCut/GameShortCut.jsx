import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Dice from '../User/Game/Dice/Dice';
import DiceLogo from './DiceLogo.png';
import './GameShortCut.css';

export default function GameShortCut() {

    const [LinkAccount, setLinkAccount] = useState(false);
    const location = useLocation();
    useEffect(() => {
        setLinkAccount(location.pathname.includes('dice') || location.pathname.includes('minesweeper') || location.pathname.includes('account'));
    }, [location])

    const [OpenPopup, setOpenPopup] = useState(false);
    const [OpenShortCut, setOpenShortCut] = useState(true);
    const navigate = useNavigate();
    const handleOpenPopup = () => {
        console.log('OpenPopup');
        setOpenPopup(true);
    }
    const handleClosePopup = () => {
        console.log('ClosePopup');
        setOpenPopup(false);
        navigate('#');
    }
    const handleCloseShortCut = () => {
        console.log('CloseShortCut');
        setOpenShortCut(false);
    }

    return (
        <>
            {OpenShortCut && LinkAccount === false &&
                <div className='dice-logo'>
                    <div className='link-logo'>
                        <a href='#popup' onClick={() => { handleOpenPopup() }}>
                            <img src={DiceLogo} alt='DiceLogo' />
                        </a>
                    </div>
                    <i className='fa-solid fa-xmark' onClick={() => { handleCloseShortCut() }}></i>
                </div>
            }

            {OpenPopup && (
                <div id='popup' className='overlay'>
                    <div className='popup'>
                        <button className='btn-close' onClick={() => { handleClosePopup() }}>CLOSE</button>
                        <Dice />
                    </div>
                </div>
            )}
        </>
    )
}
