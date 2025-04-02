import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInSignUp.css';

import SignUpImage from './LeftImage.png';
import SignInImage from './RightImage.png';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleLogin from @react-oauth/google

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


    const [Accept, setAccept] = useState(false);

    const [MaxUserID, setMaxUserID] = useState(null);
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

        const isExistPhoneNumber = localStorage.getItem(`phoneNumber${SignInPhoneNumber}`);
        const isExistPassword = localStorage.getItem(`password${SignInPhoneNumber}`);
        if (isExistPhoneNumber == SignInPhoneNumber && isExistPassword == SignInPassword) {
            localStorage.removeItem('LoginUser');
            localStorage.setItem('LoginUser', SignInPhoneNumber);
            navigate('/');
        } else {
            setErrorSignIn('Tài khoản hoặc mật khẩu không chính xác');
            return;
        }

        // try {
        //     const response = await fetch('https://localhost:7166/api/Login/authenticate',
        //         {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({
        //                 email: SignInEmail,
        //                 password: SignInPassword,
        //             }),
        //         }
        //     );

        //     if (!response.ok) throw new Error('Network response was not ok');
        //     const data = await response.json();
        //     setLoading(false);

        //     localStorage.removeItem('token');
        //     localStorage.setItem('token', data.token);
        //     localStorage.removeItem('UserId');
        //     localStorage.setItem('UserId', data.id);
        //     localStorage.removeItem('UserRole');
        //     localStorage.setItem('UserRole', data.role);
        //     localStorage.removeItem('isLogIn');
        //     localStorage.setItem('isLogIn', 'true');

        //     if (data.role && data.role === 'User') {
        //         navigate('/user/information');
        //     } else {
        //         navigate('/');
        //     }
        // } catch (error) {
        //     setErrorSignIn('Tài khoản hoặc mật khẩu không chính xác');
        //     setLoading(false);
        // }
    };

    const SignUp = async (SignUpFullName, SignUpPhoneNumber, SignUpPassword, SignUpConfirm) => {

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
            phoneNumber: SignUpPhoneNumber,
            password: SignUpPassword,
            name: SignUpFullName,
            nickname: '',
            birthday: '',
            sex: '',
            nation: '',
            image: 'https://i.pinimg.com/474x/46/7f/be/467fbe9b03913de9dcd39eb0ee1e06ab.jpg',
            role: 'User',
            type: 'Regular',
            point: 0,
            voucher: '',
            description: 'Khách hàng mới',
        };
        console.log('Sign Up Data:', signupData);

        const isExist = localStorage.getItem(`phoneNumber${SignUpPhoneNumber}`);
        if (isExist == SignUpPhoneNumber) {
            setErrorSignUp('Tài khoản đã tồn tại');
            return;
        }

        localStorage.setItem(`phoneNumber${SignUpPhoneNumber}`, signupData.phoneNumber);
        localStorage.setItem(`password${SignUpPhoneNumber}`, signupData.password);
        localStorage.setItem(`name${SignUpPhoneNumber}`, signupData.name);
        localStorage.setItem(`nickname${SignUpPhoneNumber}`, signupData.nickname);
        localStorage.setItem(`birthday${SignUpPhoneNumber}`, signupData.birthday);
        localStorage.setItem(`sex${SignUpPhoneNumber}`, signupData.sex);
        localStorage.setItem(`nation${SignUpPhoneNumber}`, signupData.nation);
        localStorage.setItem(`image${SignUpPhoneNumber}`, signupData.image);
        localStorage.setItem(`role${SignUpPhoneNumber}`, signupData.role);
        localStorage.setItem(`type${SignUpPhoneNumber}`, signupData.type);
        localStorage.setItem(`point${SignUpPhoneNumber}`, signupData.point);
        localStorage.setItem(`voucher${SignUpPhoneNumber}`, signupData.voucher);
        localStorage.setItem(`description${SignUpPhoneNumber}`, signupData.description);

        // try {
        //     const userResponse = await fetch(`https://localhost:7166/api/User/GetUserByEmail/${SignUpEmail}`);
        //     if (!userResponse.ok) throw new Error('Network response was not ok');
        //     const userData = await userResponse.json();
        //     if (userData.email === SignUpEmail) {
        //         setSignUpEmailError('Email đã tồn tại');
        //         return;
        //     }
        // } catch (error) {
        //     setLoading(false);
        // }

        // try {
        //     const response = await fetch('https://localhost:7166/api/User',
        //         {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(signupData),
        //         }
        //     );

        //     if (!response.ok) throw new Error('Network response was not ok');
        //     const data = await response.json();
        //     setLoading(false);

        //     if (data.role && data.role === 'User') {
        //         setSuccessSignUp('Đăng kí thành công!');
        //         // moveImageBack();
        //     }
        // } catch (error) {
        //     setErrorSignUp('Đăng kí thất bại');
        //     console.log('Đăng kí thất bại:', error);
        //     setLoading(false);
        // }

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
        const SignUpFullName = e.target.SignUpFullName.value;
        const SignUpPhoneNumber = e.target.SignUpPhoneNumber.value;
        const SignUpPassword = e.target.SignUpPassword.value;
        const SignUpConfirm = e.target.SignUpConfirm.value;
        console.log({
            SignUpFullName,
            SignUpPhoneNumber,
            SignUpPassword,
            SignUpConfirm,
        });
        SignUp(
            SignUpFullName,
            SignUpPhoneNumber,
            SignUpPassword,
            SignUpConfirm
        );
    };

    const handleAccept = () => {
        setAccept(p => !p);
        console.log(Accept);
        console.log('ABC');

        // const fetchMaxID = async () => {
        //     try {
        //         const userResponse = await fetch('https://localhost:7166/api/User/GetIDandName');
        //         if (!userResponse.ok) throw new Error('Network response was not ok');
        //         const userData = await userResponse.json();
        //         const MaxUserID = userData.reduce((max, user) => Math.max(max, user.id), 0);
        //         setMaxUserID(MaxUserID);
        //         console.log('Max User ID:', MaxUserID);
        //     } catch (error) {
        //         console.error('Error fetching users:', error);
        //     }
        // };
        // await fetchMaxID();
    };

    return (
        <div className='user-signin-signup'>
            <div className='signinsignup-container'>
                <div className='card-box'>
                    <div className='card-side card-appear' id='card-signin'>
                        <h1>ĐĂNG NHẬP</h1>
                        <form className='form-box form-box1' onSubmit={handleSubmitSignIn}>
                            <div className='form-group form-input'>
                                <i className='fa-solid fa-phone'></i>
                                <input name='SignInPhoneNumber' className='input form-control' type='text' placeholder='Số điện thoại'
                                    style={{
                                        border: errorSignIn && (
                                            errorSignIn == 'Số điện thoại không hợp lệ' ||
                                            errorSignIn == 'Tài khoản hoặc mật khẩu không chính xác'
                                        ) && '1px solid #dc3545',
                                    }} />
                            </div>
                            <div className='form-group form-input'>
                                <i className='fa-solid fa-key'></i>
                                <input name='SignInPassword' className='input form-control' type='password' placeholder='Mật khẩu đăng nhập'
                                    style={{
                                        border: errorSignIn && (
                                            errorSignIn == 'Mật khẩu không hợp lệ' ||
                                            errorSignIn == 'Tài khoản hoặc mật khẩu không chính xác'
                                        ) && '1px solid #dc3545',
                                    }} />
                            </div>

                            <a href='#' className='forget-link'>Forgot password?</a>

                            {errorSignIn && (<div className='error-message'>{errorSignIn}</div>)}

                            <div className='btn-box'>
                                <button type='submit' className='btn btn-submit' id='btn-signin'>ĐĂNG NHẬP</button>
                                <button type='reset' className='btn btn-reset' id='btn-reset-signin' onClick={resetInputsBox1}>XÓA</button>
                            </div>

                            <button id='btn btn-switch-signup' className='btn' onClick={moveImage}>CHƯA CÓ TÀI KHOẢN?</button>
                            {/* Google Login Button */}
                            <GoogleLogin
                                onSuccess={(response) => {
                                    console.log('Google Login Success:', response);
                                    // Handle the Google Login success logic here
                                }}
                                onError={(error) => {
                                    console.error('Google Login Error:', error);
                                }}
                                useOneTap
                                clientId="456747866058-bogtqirkbf1sqrj2ee48275h0157domk.apps.googleusercontent.com"
                            />
                        </form>

                        <button className='btn' onClick={moveImage}>CHƯA CÓ TÀI KHOẢN?</button>

                        <hr />
                    </div>

                    <div className='card-side card-disappear' id='card-signup'>
                        <h1 className='title'>ĐĂNG KÍ</h1>
                        <form className='form-box form-box2' onSubmit={handleSubmitSignUp}>
                            <div className='form-group form-input'>
                                <i className='fa-solid fa-phone'></i>
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
                                <i className='fa-solid fa-user'></i>
                                <input name='SignUpFullName' className='input form-control' type='text' placeholder='Họ tên'
                                    style={{
                                        border: errorSignUp && (
                                            errorSignUp == 'Họ tên không hợp lệ'
                                        ) && '1px solid #dc3545',
                                    }} />
                            </div>
                            <div className='form-group form-input'>
                                <i className='fa-solid fa-key'></i>
                                <input name='SignUpPassword' className='input form-control' type='password' placeholder='Mật khẩu đăng kí'
                                    style={{
                                        border: errorSignUp && (
                                            errorSignUp == 'Mật khẩu không hợp lệ' ||
                                            errorSignUp == 'Mật khẩu phải ít nhất 6 kí tự'
                                        ) && '1px solid #dc3545',
                                    }} />
                            </div>
                            <div className='form-group form-input'>
                                <i className='fa-solid fa-key'></i>
                                <i className='fa-solid fa-key double-icon'></i>
                                <input name='SignUpConfirm' className='input form-control' type='password' placeholder='Xác nhận mật khẩu'
                                    style={{
                                        border: errorSignUp && (
                                            errorSignUp == 'Xác nhận mật khẩu không hợp lệ' ||
                                            errorSignUp == 'Mật khẩu xác nhận không khớp'
                                        ) && '1px solid #dc3545',
                                    }} />
                            </div>

                            <div className='accept-box'>
                                <a href='https://hotro.tiki.vn/s/article/dieu-khoan-su-dung' className='provision' target='_blank'><b>ĐIỀU KHOẢN</b></a>

                                <div className='form-check'>
                                    <label>
                                        <input type='checkbox' checked={Accept} name='Accept' onChange={handleAccept} />
                                        Đồng ý điều khoản
                                    </label>
                                </div>
                            </div>

                            {errorSignUp && (<div className='error-message'>{errorSignUp}</div>)}
                            {successSignUp && (<div className='success-message'>{successSignUp}</div>)}

                            <div className='btn-box'>
                                <button type='submit' className='btn btn-submit' id='btn-signup'>ĐĂNG KÍ</button>
                                <button type='reset' className='btn btn-reset' id='btn-reset-signup' onClick={resetInputsBox2}>XÓA</button>
                            </div>
                        </form>

                        <button className='btn' onClick={moveImageBack}>ĐÃ CÓ TÀI KHOẢN?</button>
                    </div>

                    <div className='movingImage' id='movingImage'></div>
                </div>
            </div>
        </div>
    );
}
