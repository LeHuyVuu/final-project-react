import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Dice from '../User/Game/Dice/Dice';
import Minesweeper from '../User/Game/Minesweeper/Minesweeper';
import DiceLogo from './DiceLogo.png';
import MinesweeperLogo from './MinesweeperLogo.png';
import './GameShortCut.css';

export default function GameShortCut() {

    const [LinkAccount, setLinkAccount] = useState(false);
    const location = useLocation();
    useEffect(() => {
        setLinkAccount(location.pathname.includes('dice') || location.pathname.includes('minesweeper') || location.pathname.includes('account'));
    }, [location])

    const RandomNumber = useMemo(() => Math.floor(Math.random() * 2), []);

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
                            {RandomNumber === 1 ?
                                <img className='img-dice' src={DiceLogo} alt='DiceLogo' />
                                :
                                <img className='img-minesweeper' src={MinesweeperLogo} alt='MinesweeperLogo' />
                            }
                        </a>
                    </div>
                    <i className='fa-solid fa-xmark' onClick={() => { handleCloseShortCut() }}></i>
                </div>
            }

            {OpenPopup && (
                <div id='popup' className='overlay'>
                    <div className='popup'>
                        <button className='btn-close' onClick={() => { handleClosePopup() }}>CLOSE</button>
                        {RandomNumber === 1 ?
                            <Dice />
                            :
                            <Minesweeper />
                        }
                    </div>
                </div>
            )}
        </>
    )
}
