import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalInformation.css';
import TikiDefaultAvatar from './TikiDefaultAvatar.png';

export default function PersonalInformation() {

    const LoginUser = localStorage.getItem('LoginUser');
    const avatarUrl = localStorage.getItem(`image${LoginUser}`);
    const finalUrl = (avatarUrl != null && avatarUrl != '') ? avatarUrl : TikiDefaultAvatar;

    const [formData, setFormData] = useState({
        name: localStorage.getItem(`name${LoginUser}`),
        nickname: localStorage.getItem(`nickname${LoginUser}`),
        date: localStorage.getItem(`birthday${LoginUser}`)?.substring(0, 2),
        month: localStorage.getItem(`birthday${LoginUser}`)?.substring(3, 5),
        year: localStorage.getItem(`birthday${LoginUser}`)?.substring(6, 10),
        nationality: localStorage.getItem(`nationality${LoginUser}`),
        sex: localStorage.getItem(`sex${LoginUser}`)
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleGenderChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            sex: e.target.value,
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(formData);
        localStorage.setItem(`name${LoginUser}`, formData.name);
        localStorage.setItem(`nickname${LoginUser}`, formData.nickname);
        localStorage.setItem(`birthday${LoginUser}`, formData.date + '/' + formData.month + '/' + formData.year);
        localStorage.setItem(`sex${LoginUser}`, formData.sex);
        localStorage.setItem(`nationality${LoginUser}`, formData.nationality);
    }

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('LoginUser');
        navigate('/login');
    }

    return (
        <div className='personalinformation-container'>

            <h3>Thông tin cá nhân</h3>

            <form onSubmit={handleUpdate}>

                <div className='head-form'>
                    <div className='form-avatar'>
                        <img src={finalUrl} alt='avatar' />
                    </div>
                    <div>
                        <div className='form-name form-group'>
                            <label htmlFor='name'>Họ và tên</label>
                            <input type='text' id='name' name='name'
                                placeholder='Nhập họ tên'
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-nickname form-group'>
                            <label htmlFor='nickname'>Nickname</label>
                            <input type='text' id='nickname' name='nickname'
                                placeholder='Nhập nickname'
                                value={formData.nickname}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className='form-date form-group'>
                    <label>Ngày sinh</label>
                    <div className='select-items'>
                        <select id='date' name='date'
                            value={formData.date}
                            onChange={handleChange}
                        >
                            <option value='00'>Ngày</option>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(date => (
                                <option key={date} value={String(date).padStart(2, '0')}>{date}</option>
                            ))}
                        </select>
                        <select id='month' name='month'
                            value={formData.month}
                            onChange={handleChange}
                        >
                            <option value='00'>Tháng</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                <option key={month} value={String(month).padStart(2, '0')}>{month}</option>
                            ))}
                        </select>
                        <select id='year' name='year'
                            value={formData.year}
                            onChange={handleChange}
                        >
                            <option value='0000'>Năm</option>
                            {Array.from({ length: 100 }, (_, i) => 2022 - i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='form-sex form-group'>
                    <label>Giới tính</label>
                    <div className='toggle-options'>
                        <label>
                            <input type='radio' name='sex' value='male'
                                checked={formData.sex == 'male'}
                                onChange={handleGenderChange}
                            />
                            <span>Nam</span>
                        </label>
                        <label>
                            <input type='radio' name='sex' value='female'
                                checked={formData.sex == 'female'}
                                onChange={handleGenderChange}
                            />
                            <span>Nữ</span>
                        </label>
                        <label>
                            <input type='radio' name='sex' value='other'
                                checked={formData.sex == 'other'}
                                onChange={handleGenderChange}
                            />
                            <span>Khác</span>
                        </label>
                    </div>
                </div>

                <div className='form-nationality form-group'>
                    <label>Quốc tịch</label>
                    <div className='select-items'>
                        <select id='nationality' name='nationality'
                            value={formData.nationality}
                            onChange={handleChange}
                        >
                            <option value=''>Chọn quốc tịch</option>
                            <option value='Việt Nam'>Việt Nam</option>
                            <option value='Nhật Bản'>Nhật Bản</option>
                            <option value='Trung Quốc'>Trung Quốc</option>
                            <option value='Hàn Quốc'>Hàn Quốc</option>
                        </select>
                    </div>
                </div>

                <div className='btn-box'>
                    <button type='submit' className='btn'>CẬP NHẬT</button>
                    <button className='btn btn-logout' onClick={() => { handleLogOut() }}>ĐĂNG XUẤT</button>
                </div>

            </form>
        </div>
    )
}
