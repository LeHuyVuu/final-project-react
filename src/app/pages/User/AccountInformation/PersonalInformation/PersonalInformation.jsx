import React, { useEffect, useState } from 'react';
import './PersonalInformation.css';
import TikiDefaultAvatar from './TikiDefaultAvatar.png';

export default function PersonalInformation() {

    const LoginUser = localStorage.getItem('LoginUser');

    const [formData, setFormData] = useState({
        name: '',
        nickname: '',
        date: '',
        month: '',
        year: '',
        nationality: '',
        sex: ''
    });

    // Hàm xử lý khi input thay đổi
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value, // Cập nhật giá trị của trường tương ứng
        }));
    };

    // Hàm xử lý khi radio button thay đổi
    const handleGenderChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            gender: e.target.value,
        }));
    };

    return (
        <div className='personalinformation-container'>

            <h3>Thông tin cá nhân</h3>

            <form>

                <div className='head-form'>
                    <div className='form-avatar'>
                        <img src={TikiDefaultAvatar} alt='avatar'></img>
                    </div>
                    <div>
                        <div className='form-name form-group'>
                            <label htmlFor='name'>Họ và tên</label>
                            <input type='text' id='name' name='name'
                                // value={localStorage.getItem(`name${LoginUser}`) || ''}
                            />
                        </div>
                        <div className='form-nickname form-group'>
                            <label htmlFor='nickname'>Nickname</label>
                            <input type='text' id='nickname' name='nickname' />
                        </div>
                    </div>
                </div>

                <div className='form-date form-group'>
                    <label>Ngày sinh</label>
                    <div className='select-items'>
                        <select id='date' name='date'>
                            <option value=''>Ngày</option>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                        <select id='month' name='month'>
                            <option value=''>Tháng</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                        <select id='year' name='year'>
                            <option value=''>Năm</option>
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
                            <input type='radio' name='sex' value='male' />
                            <span>Nam</span>
                        </label>
                        <label>
                            <input type='radio' name='sex' value='female' />
                            <span>Nữ</span>
                        </label>
                        <label>
                            <input type='radio' name='sex' value='other' />
                            <span>Khác</span>
                        </label>
                    </div>
                </div>

                <div className='form-nationality form-group'>
                    <label>Quốc tịch</label>
                    <div className='select-items'>
                        <select id='nationality' name='nationality'>
                            <option value=''>Chọn quốc tịch</option>
                        </select>
                    </div>
                </div>

                <button type="submit">CẬP NHẬT</button>

            </form>

        </div>
    )
}
