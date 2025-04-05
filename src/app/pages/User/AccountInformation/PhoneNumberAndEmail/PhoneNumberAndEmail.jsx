import React from 'react';
import { Link } from 'react-router-dom';
// import { Form, Button, Container } from "react-bootstrap";
import './PhoneNumberAndEmail.css';

export default function PhoneNumberAndEmail() {

    const LoginUser = localStorage.getItem('LoginUser');

    const ListPhoneNumberAndEmail = [
        {
            heading: 'Số điện thoại và Email',
            items: [
                { icon: 'fa-solid fa-phone', label: 'Số điện thoại', value: localStorage.getItem(`phoneNumber${LoginUser}`), button: 'Cập nhật', link: 'phonenumber' },
                { icon: 'fa-solid fa-envelope', label: 'Địa chỉ email', value: localStorage.getItem(`email${LoginUser}`), button: 'Cập nhật', link: 'email' },
            ]
        },
        {
            heading: 'Bảo mật',
            items: [
                { icon: 'fa-solid fa-lock', label: 'Đổi mật khẩu', value: null, button: 'Cập nhật', link: 'pasword' },
                { icon: 'fa-solid fa-shield', label: 'Thiết lập mã PIN', value: null, button: 'Thiết lập', link: 'pin' },
                { icon: 'fa-solid fa-trash-can', label: 'Yêu cầu xóa tài khoản', value: null, button: 'Yêu cầu', link: '' },
            ]
        },
        {
            heading: 'Liên kết mạng xã hội',
            items: [
                { icon: 'fa-brands fa-facebook', label: 'Facebook', value: null, button: 'Liên kết', link: '' },
                { icon: 'fa-brands fa-google', label: 'Google', value: null, button: 'Liên kết', link: '' },
            ]
        },
    ];

    return (
        <div className='phonenumberandemail-container'>

            {ListPhoneNumberAndEmail.map((list, index) => (
                <div key={index} className='phonenumberandemail-item'>

                    <h3>{list.heading}</h3>

                    {list.items.map((item, i) => (
                        <div key={i} className='content'>
                            <div className='left-content'>
                                {item.icon && <i className={item.icon}></i>}
                                <div className='item'>
                                    <span>{item.label}</span>
                                    <div className='value-text'>{item.value}</div>
                                </div>
                            </div>
                            <Link to={`${item.link}`}><button>{item.button}</button></Link>
                        </div>
                    ))}
                </div>
            ))}

            {/* <Container className="mt-5" style={{ maxWidth: "500px" }}>
                <h3 className="mb-4">Form nhập dữ liệu (React Bootstrap)</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control type="text" placeholder="Nhập họ và tên" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Nhập email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMessage">
                        <Form.Label>Nội dung</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Nhập nội dung" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Gửi
                    </Button>
                </Form>
            </Container> */}

            {/* <div className="plain-form-container">
                <h3>Form nhập dữ liệu (HTML & CSS thuần)</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Họ và tên</label>
                        <input type="text" id="name" name="name" placeholder="Nhập họ và tên" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Nhập email" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Nội dung</label>
                        <textarea id="message" name="message" placeholder="Nhập nội dung"></textarea>
                    </div>

                    <button type="submit">Gửi</button>
                </form>
            </div> */}
        </div>
    )
}
