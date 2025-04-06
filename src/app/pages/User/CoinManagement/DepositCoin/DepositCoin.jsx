import React, { useState } from 'react';

export default function DepositCoin() {
    console.log('DepositCoin render');

    const [FormPoint, setFormPoint] = useState(0);
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

    return (
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
                                <div
                                    key={index}
                                    className={`item ${value.toLocaleString('vi-VN') == FormPoint && 'chosen'}`}
                                    value={value}
                                    onClick={() => { setFormPoint(value.toLocaleString('vi-VN')) }}
                                >
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
    )
}
