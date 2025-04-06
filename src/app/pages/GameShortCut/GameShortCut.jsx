import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dice from '../User/Game/Dice/Dice';
import './GameShortCut.css';
import DiceLogo from './DiceLogo.png';

export default function GameShortCut() {

    const [OpenPopup, setOpenPopup] = useState(false);
    const navigate = useNavigate();
    const handleOpenPopup = () => {
        console.log('Open');
        setOpenPopup(true);
    }
    const handleClosePopup = () => {
        console.log('Close');
        setOpenPopup(false);
        navigate('/');
    }

    return (
        <>
            <div className='dice-logo'>
                <a href='#popup' onClick={() => { handleOpenPopup() }}>
                    <img src={DiceLogo} alt='DiceLogo' />
                </a>
            </div>

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
