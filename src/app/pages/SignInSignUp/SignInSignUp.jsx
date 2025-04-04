import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInSignUp.css';

import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin from @react-oauth/google
import SignUpImage from './LeftImage.png';
import SignInImage from './RightImage.png';

export default function SignInSignUp() {

    const moveImage = () => {
        const img = document.getElementById('movingImage');
        img.style.marginRight = '50%';
        img.style.background = `url(${SignUpImage}) center`;

        const signin = document.getElementById('card-signin');
        signin.classList.remove('card-appear');
        signin.classList.add('card-disappear');
        const signup = document.getElementById('card-signup');
        signup.classList.remove('card-disappear');
        signup.classList.add('card-appear');
    };

    const moveImageBack = () => {
        const img = document.getElementById('movingImage');
        img.style.marginRight = '0%';
        img.style.background = `url(${SignInImage}) center`;

        const signin = document.getElementById('card-signin');
        signin.classList.remove('card-disappear');
        signin.classList.add('card-appear');
        const signup = document.getElementById('card-signup');
        signup.classList.remove('card-appear');
        signup.classList.add('card-disappear');
    };

    const resetInputsBox1 = () => {
        var inputs = document.querySelectorAll('.form-box1 input');
        inputs.forEach(function (input) {
            input.value = '';
        });
        setErrorSignIn(null);
    };

    const resetInputsBox2 = () => {
        var inputs = document.querySelectorAll('.form-box2 input');
        inputs.forEach(function (input) {
            input.value = '';
        });
        setSuccessSignUp(null);
        setErrorSignUp(null);
    };

    const navigate = useNavigate();
    const LoginUser = localStorage.getItem('LoginUser');
    useEffect(() => {
        if (LoginUser) {
            navigate('/');
        }
    }, [LoginUser, navigate]);



    const [Accept, setAccept] = useState(false);

    const [loading, setLoading] = useState(true);
    const [errorSignIn, setErrorSignIn] = useState(null);
    const [errorSignUp, setErrorSignUp] = useState(null);
    const [successSignUp, setSuccessSignUp] = useState(null);

    const Login = async (SignInPhoneNumber, SignInPassword) => {
        if (!SignInPhoneNumber) {
            console.error('Invalid value');
            setErrorSignIn('Số điện thoại không hợp lệ');
            return;
        }
        if (!SignInPassword) {
            console.error('Invalid value');
            setErrorSignIn('Mật khẩu không hợp lệ');
            return;
        }

        const isExistId = localStorage.getItem(`id${SignInPhoneNumber}`);
        const isExistPassword = localStorage.getItem(`password${SignInPhoneNumber}`);
        if (isExistId == SignInPhoneNumber && isExistPassword == SignInPassword) {
            localStorage.removeItem('LoginUser');
            localStorage.setItem('LoginUser', SignInPhoneNumber);
            navigate('/');
        } else {
            setErrorSignIn('Tài khoản hoặc mật khẩu không chính xác');
            return;
        }
    };

    const SignUp = async (SignUpPhoneNumber, SignUpFullName, SignUpEmail, SignUpPassword, SignUpConfirm) => {

        console.log('Accept: ', Accept);

        if (!SignUpPhoneNumber) {
            console.error('Invalid phone number');
            setErrorSignUp('Số điện thoại không hợp lệ');
            return;
        }
        if (!/^\d+$/.test(SignUpPhoneNumber)) {
            console.error('Phone number must contain only digits');
            setErrorSignUp('Số điện thoại không hợp lệ');
            return;
        }
        if (SignUpPhoneNumber.length !== 10) {
            console.error('Phone number must contain exactly 10 digits');
            setErrorSignUp('Số điện thoại phải có 10 chữ số');
            return;
        }

        if (!SignUpFullName) {
            console.error('Invalid full name');
            setErrorSignUp('Họ tên không hợp lệ');
            return;
        }

        if (!SignUpEmail) {
            console.error('Invalid email');
            setErrorSignUp('Email không hợp lệ');
            return;
        }

        if (!SignUpPassword) {
            console.error('Invalid password');
            setErrorSignUp('Mật khẩu không hợp lệ');
            return;
        }
        if (SignUpPassword.length < 6) {
            console.error('Password must be at least 6 characters long');
            setErrorSignUp('Mật khẩu phải ít nhất 6 kí tự');
            return;
        }

        if (!SignUpConfirm) {
            console.error('Invalid password confirmation');
            setErrorSignUp('Xác nhận mật khẩu không hợp lệ');
            return;
        }
        if (SignUpPassword != SignUpConfirm) {
            console.error('Wrong password confirmation');
            setErrorSignUp('Mật khẩu xác nhận không khớp');
            return;
        }

        if (Accept === false) {
            console.error('Accept is false');
            setErrorSignUp('Bạn phải đồng ý điều khoản');
            return;
        }

        const signupData = {
            id: SignUpPhoneNumber,
            phoneNumber: SignUpPhoneNumber,
            password: SignUpPassword,
            name: SignUpFullName,
            email: SignUpEmail,
            nickname: '',
            birthday: '',
            sex: '',
            nationality: '',
            image: 'https://i.pinimg.com/474x/46/7f/be/467fbe9b03913de9dcd39eb0ee1e06ab.jpg',
            role: 'User',
            type: 'Regular',
            point: 0,
            gameplay: 0,
            voucher: '',
            description: 'Khách hàng mới',
            address: 'Lô E3 Đ. Võ Chí Công, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh 71216',
        };
        console.log('Sign Up Data:', signupData);

        const isExist = localStorage.getItem(`id${SignUpPhoneNumber}`);
        if (isExist == SignUpPhoneNumber) {
            setErrorSignUp('Tài khoản đã tồn tại');
            return;
        }

        localStorage.setItem(`id${SignUpPhoneNumber}`, signupData.id);
        localStorage.setItem(`phoneNumber${SignUpPhoneNumber}`, signupData.phoneNumber);
        localStorage.setItem(`password${SignUpPhoneNumber}`, signupData.password);
        localStorage.setItem(`name${SignUpPhoneNumber}`, signupData.name);
        localStorage.setItem(`email${SignUpPhoneNumber}`, signupData.email);
        localStorage.setItem(`nickname${SignUpPhoneNumber}`, signupData.nickname);
        localStorage.setItem(`birthday${SignUpPhoneNumber}`, signupData.birthday);
        localStorage.setItem(`sex${SignUpPhoneNumber}`, signupData.sex);
        localStorage.setItem(`nationality${SignUpPhoneNumber}`, signupData.nationality);
        localStorage.setItem(`image${SignUpPhoneNumber}`, signupData.image);
        localStorage.setItem(`role${SignUpPhoneNumber}`, signupData.role);
        localStorage.setItem(`type${SignUpPhoneNumber}`, signupData.type);
        localStorage.setItem(`point${SignUpPhoneNumber}`, signupData.point);
        localStorage.setItem(`gameplay${SignUpPhoneNumber}`, signupData.gameplay);
        localStorage.setItem(`voucher${SignUpPhoneNumber}`, signupData.voucher);
        localStorage.setItem(`description${SignUpPhoneNumber}`, signupData.description);
        localStorage.setItem(`address${SignUpPhoneNumber}`, signupData.address);

        setSuccessSignUp('Đăng kí thành công!');
    };

    const handleSubmitSignIn = (e) => {
        e.preventDefault();
        setErrorSignIn(null);
        const SignInPhoneNumber = e.target.SignInPhoneNumber.value;
        const SignInPassword = e.target.SignInPassword.value;
        console.log({ SignInPhoneNumber, SignInPassword });
        Login(SignInPhoneNumber, SignInPassword);
    };

    const handleSubmitSignUp = (e) => {
        e.preventDefault();
        setSuccessSignUp(null);
        setErrorSignUp(null);
        const SignUpPhoneNumber = e.target.SignUpPhoneNumber.value;
        const SignUpFullName = e.target.SignUpFullName.value;
        const SignUpEmail = e.target.SignUpEmail.value;
        const SignUpPassword = e.target.SignUpPassword.value;
        const SignUpConfirm = e.target.SignUpConfirm.value;
        console.log({
            SignUpPhoneNumber,
            SignUpFullName,
            SignUpEmail,
            SignUpPassword,
            SignUpConfirm,
        });
        SignUp(
            SignUpPhoneNumber,
            SignUpFullName,
            SignUpEmail,
            SignUpPassword,
            SignUpConfirm
        );
    };

    const handleAccept = () => {
        setAccept(p => !p);
        console.log(Accept);
        // console.log('ABC');
    };

    return (
        <div className='user-signin-signup'>
            <div className='signinsignup-container'>
                <div className='card-box'>
                    <div className='card-side card-appear' id='card-signin'>
                        <h1>Đăng Nhập</h1>
                        <form className='form-box form-box1' onSubmit={handleSubmitSignIn}>
                            <div className='form-group form-input'>
                                {/* <i className='fa-solid fa-phone'></i> */}
                                <input name='SignInPhoneNumber' className='input form-control' type='text' placeholder='Số điện thoại'
                                    style={{
                                        border: errorSignIn && (
                                            errorSignIn == 'Số điện thoại không hợp lệ' ||
                                            errorSignIn == 'Tài khoản hoặc mật khẩu không chính xác'
                                        ) && '1px solid #dc3545',
                                    }} />
                            </div>
                            <div className='form-group form-input'>
                                {/* <i className='fa-solid fa-key'></i> */}
                                <input name='SignInPassword' className='input form-control' type='password' placeholder='Mật khẩu đăng nhập'
                                    style={{
                                        border: errorSignIn && (
                                            errorSignIn == 'Mật khẩu không hợp lệ' ||
                                            errorSignIn == 'Tài khoản hoặc mật khẩu không chính xác'
                                        ) && '1px solid #dc3545',
                                    }} />
                            </div>

                            <a href='#' className='forget-link'>Quên mật khẩu?</a>

                            {errorSignIn && (<div className='error-message'>{errorSignIn}</div>)}

                            <div className='btn-box'>
                                <button type='submit' className='btn btn-submit' id='btn-signin'>Đăng nhập</button>
                                {/* <button type='reset' className='btn btn-reset' id='btn-reset-signin' onClick={resetInputsBox1}>Xóa</button> */}
                            </div>
                        </form>
                        <div class="flex items-center">
                            <hr class="flex-grow  border-gray-400" />
                            <span class="mx-2 text-gray-600">Hoặc</span>
                            <hr class="flex-grow  border-gray-400" />
                        </div>
                        <GoogleLogin
                            onSuccess={(response) => {
                                console.log('Google Login Success:', response);
                            }}
                            onError={(error) => {
                                console.error('Google Login Error:', error);
                            }}
                            useOneTap
                            clientId="456747866058-bogtqirkbf1sqrj2ee48275h0157domk.apps.googleusercontent.com"
                        />

                        <button className=' mt-10 text-left' onClick={moveImage}>Chưa có tài khoản?<span className='text-blue-500 mx-2'>Đăng kí</span></button>

                    </div>

                    <div className='card-side card-disappear' id='card-signup'>
                        <h1 className='title'>Đăng kí</h1>
                        <form className='form-box form-box2' onSubmit={handleSubmitSignUp}>
                            <div className='form-group form-input'>
                                {/* <i className='fa-solid fa-phone'></i> */}
                                <input name='SignUpPhoneNumber' className='input form-control' type='text' placeholder='Số điện thoại'
                                    style={{
                                        border: errorSignUp && (
                                            errorSignUp == 'Số điện thoại không hợp lệ' ||
                                            errorSignUp == 'Số điện thoại phải có 10 chữ số' ||
                                            errorSignUp == 'Tài khoản đã tồn tại'
                                        ) && '1px solid #dc3545',
                                    }} />
                            </div>
                            <div className='form-group form-input'>
                                {/* <i className='fa-solid fa-user'></i> */}
                                <input name='SignUpFullName' className='input form-control' type='text' placeholder='Họ tên'
                                    style={{
                                        border: errorSignUp && (
                                            errorSignUp == 'Họ tên không hợp lệ'
                                        ) && '1px solid #dc3545',
                                    }} />
                            </div><div className='form-group form-input'>
                                {/* <i className='fa-solid fa-envelope'></i> */}
                                <input name='SignUpEmail' className='input form-control' type='email' placeholder='Email đăng kí'
                                    style={{
                                        border: errorSignUp && (
                                            errorSignUp == 'Email không hợp lệ')
                                            && '1px solid #dc3545',
                                    }} />
                            </div>
                            <div className='form-group form-input'>
                                {/* <i className='fa-solid fa-key'></i> */}
                                <input name='SignUpPassword' className='input form-control' type='password' placeholder='Mật khẩu đăng kí'
                                    style={{
                                        border: errorSignUp && (
                                            errorSignUp == 'Mật khẩu không hợp lệ' ||
                                            errorSignUp == 'Mật khẩu phải ít nhất 6 kí tự'
                                        ) && '1px solid #dc3545',
                                    }} />
                            </div>
                            <div className='form-group form-input'>
                                {/* <i className='fa-solid fa-key'></i> */}
                                {/* <i className='fa-solid fa-key double-icon'></i> */}
                                <input name='SignUpConfirm' className='input form-control' type='password' placeholder='Xác nhận mật khẩu'
                                    style={{
                                        border: errorSignUp && (
                                            errorSignUp == 'Xác nhận mật khẩu không hợp lệ' ||
                                            errorSignUp == 'Mật khẩu xác nhận không khớp'
                                        ) && '1px solid #dc3545',
                                    }} />
                            </div>



                            {errorSignUp && (<div className='error-message'>{errorSignUp}</div>)}
                            {successSignUp && (<div className='success-message'>{successSignUp}</div>)}

                            <div className='btn-box'>
                                <button type='submit' className='btn btn-submit' id='btn-signup'>Đăng kí</button>
                                {/* <button type='reset' className='btn btn-reset' id='btn-reset-signup' onClick={resetInputsBox2}>Xóa</button> */}
                            </div>
                        </form>

                        <button className='mt-4 text-left' onClick={moveImageBack}>Đã có tài khoản?<span className='text-blue-500 mx-2'>Đăng nhập</span></button>
                        <div className='accept-box mt-5 text-xs italic  '><b> Bằng việc đăng kí bạn đã đồng ý với </b>
                            <a href='https://hotro.tiki.vn/s/article/dieu-khoan-su-dung' className='provision text-blue-500' target='_blank'> Điều Khoản</a>

                            {/* <div className='form-check'>
                                <label>
                                    <input type='checkbox' checked={Accept} name='Accept' onChange={handleAccept} />
                                    Đồng ý điều khoản
                                </label>
                            </div> */}
                        </div>
                    </div>

                    <div className='movingImage' id='movingImage'></div>
                </div>
            </div>
        </div>
    );
}
