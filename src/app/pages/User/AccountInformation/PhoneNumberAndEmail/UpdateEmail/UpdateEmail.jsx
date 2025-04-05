import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateEmail.css';

export default function UpdateEmail() {

    const LoginUser = localStorage.getItem('LoginUser');
    const [Email, setEmail] = useState(localStorage.getItem(`email${LoginUser}`));
    const [Error, setError] = useState();

    useEffect(() => {
        if (!Email) {
            setError('Email không hợp lệ');
            return;
        }
        if (!/^[\w-\.]+@([\w-]+\.)+com$/.test(Email)) {
            setError('Email không đúng form');
            return;
        }
        setError();
    }, [Email])

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const navigate = useNavigate();
    const handleUpdate = (e) => {
        e.preventDefault();
        localStorage.setItem(`email${LoginUser}`, Email);
        navigate('/account/information');
    }

    return (
        <div className='updateemail-container'>
            <h2>Cập nhật email</h2>
            <div className='updateemail-content'>
                <form onSubmit={handleUpdate}>
                    <div className='form-email form-group'>
                        <label htmlFor='email'>Địa chỉ email</label>
                        <div>
                            <i className='fa-solid fa-envelope'></i>
                            <input type='text' id='email' name='email'
                                placeholder='Nhập email'
                                value={Email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='error-message'>{Error}</div>
                    </div>
                    {Error ?
                        <div className='btn btn-div'>Lưu thay đổi</div>
                        :
                        <button className='btn'>Lưu thay đổi</button>
                    }
                </form>
            </div>
        </div>
    )
}
