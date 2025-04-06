import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CoinManagement.css';

export default function CoinManagement() {

    const LoginUser = localStorage.getItem('LoginUser');
    const [Point, setPoint] = useState(localStorage.getItem(`point${LoginUser}`));
    const [FormPoint, setFormPoint] = useState(0);
    const [FormToggle, setFormToggle] = useState('');
    const [FormCode, setFormCode] = useState('');

    const handleChange = (e) => {
        let rawValue = e.target.value.replace(/\./g, '');
        let numberValue = Number(rawValue);
        if (isNaN(numberValue)) {
            setFormPoint(0);
            return;
        }
        if (numberValue > 2000000) {
            numberValue = 2000000;
        }
        setFormPoint(numberValue.toLocaleString('vi-VN'));
    };

    const handleToggleChange = (e) => {
        console.log('Toggle change');
        setFormToggle(e.target.value);
    };

    const handleCodeChange = (e) => {
        console.log('Code change');
        setFormCode(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (FormCode == 'TIKISALE' && FormToggle == 'tiki') {
            console.log('Success');
            setPoint(Number(localStorage.getItem(`point${LoginUser}`)) + 200);
            localStorage.setItem(`point${LoginUser}`, Number(localStorage.getItem(`point${LoginUser}`)) + 200);
        }
    }

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
                    <h3>Nạp xu vào tài khoản</h3>

                    <div className='content-box'>
                        <div className='blue-box'>
                            <div className='title'>Số xu muốn nạp</div>

                            <div>
                                <div className='form-point form-group'>
                                    <label htmlFor='point'><i className='fa-solid fa-coins'></i></label>
                                    <input type='text' id='point' name='point'
                                        placeholder='0'
                                        value={FormPoint?.toLocaleString('vi-VN')}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='amount-box'>
                                    {[100000, 200000, 500000, 1000000, 2000000].map((value, index) => (
                                        <div key={index} className={`item ${value.toLocaleString('vi-VN') === FormPoint && 'chosen'}`} value={value} onClick={() => { setFormPoint(value) }}>
                                            {value.toLocaleString('vi-VN')}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='info-vertical'></div>

                        <div className='form-payment'>
                            <div>
                                <div className='item'>
                                    <div>Phí giao dịch:</div>
                                    <div>0%</div>
                                </div>
                                <div className='item'>
                                    <div>Tổng tiền:</div>
                                    <div>{FormPoint.toLocaleString('vi-VN')} VND</div>
                                </div>
                                <button>Tiến hành thanh toán</button>
                            </div>

                            <div>
                                <ul>
                                    <li>1 VND = 1 Tiki Xu</li>
                                    <li>Tiki Xu được nạp vào tài khoản sau khi thanh toán</li>
                                    <li>ĐH Top-up Tiki Xu không thể Hủy / Trả</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='content'>
                    <h3 className='title'>
                        <img src='https://frontend.tikicdn.com/_desktop-next/static/img/icons/TopUpXu/pqt-icon.svg' alt='xu' className='amount-title__img' />
                        <span>Dùng Phiếu Quà Tặng</span>
                    </h3>
                    <div className='voucher-content'>
                        <h4 className='sub-title'>Chọn nhà cung cấp</h4>
                        <form onSubmit={handleSubmit}>
                            <div className='form-radio'>
                                <label>
                                    <input type='radio' name='voucher' value='tiki'
                                        checked={FormToggle == 'tiki'}
                                        onChange={handleToggleChange}
                                    />
                                    <img src='https://frontend.tikicdn.com/_desktop-next/static/img/icons/TopUpXu/tiki-logo.svg' alt='xu' className='amount-title__img' />
                                </label>
                                <label>
                                    <input type='radio' name='voucher' value='urbox'
                                        checked={FormToggle == 'urbox'}
                                        onChange={handleToggleChange}
                                    />
                                    <img src='https://frontend.tikicdn.com/_desktop-next/static/img/icons/TopUpXu/urbox-logo.svg' alt='xu' className='amount-title__img' />
                                </label>
                            </div>
                            <div className='form-input'>
                                <label>Mã Phiếu quà tặng</label>
                                <input type='text' name='code'
                                    value={FormCode}
                                    onChange={handleCodeChange} />
                                <button type='submit' className='btn'>Đổi Tiki Xu</button>
                            </div>
                        </form>
                    </div>
                    {/* <div className='amount-bot'>
                        <p className='amount-bot__text'>
                            Nếu bạn chưa có Phiếu quà tặng?
                            <a href='https://tiki.vn/phieu-qua-tang/c13744' target='_blank'>Hãy click để mua</a>
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
