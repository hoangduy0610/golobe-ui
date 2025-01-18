import login1 from '@/assets/Login1.png';
import login2 from '@/assets/Login2.jpg';
import login3 from '@/assets/Login3.jpg';
import login4 from '@/assets/Login4.jpg';
import logo from '@/assets/logo.png'; // Logo
import FloatInput from '@/components/FloatInput/FloatInput';
import MainApiRequest from '@/redux/apis/MainApiRequest';
import { Card, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [currentImage, setCurrentImage] = useState(login1);

    const images = [login1, login2, login3, login4];

    const handleLogin = async () => {
        setIsLoggingIn(true);
        try {
            const res = await MainApiRequest.post('/auth/signin', { email, password });
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.info.id);
                message.success('Login successful');
                navigate('/');
            } else {
                message.error('Login failed');
            }
        } catch (error) {
            message.error('System error, please try again');
        }
        setIsLoggingIn(false);
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }

        const interval = setInterval(() => {
            setCurrentImage((prev) => {
                const currentIndex = images.indexOf(prev);
                const nextIndex = (currentIndex + 1) % images.length;
                return images[nextIndex];
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container-fluid justify-content-center d-flex login-page">
            <div className="row w-100 gap-2 gap-md-0" style={{ marginTop: 50, maxWidth: 1000 }}>
                <div className="col-12 col-md-6">
                    <img src={logo} alt="logo" className="logo" width={80} />
                    <h2 className='mt-4'>Login</h2>
                    <p className='mt-2'>Login to access your Golobe resource</p>
                    <Card
                        style={{ width: '100%', maxHeight: 250, aspectRatio: '16/9' }}
                        cover={
                            <div style={{ overflow: "hidden", height: '100%', transform: 'translateY(-50%)' }}>
                                <img src={currentImage} alt="login" className="login-image" />
                            </div>
                        }
                        className="login-card d-md-none">
                        <div className="indicator">
                            {images.map((image, index) => (
                                <div key={index} className={`indicator-dot ${currentImage === image ? 'active' : ''}`} />
                            ))}
                        </div>
                    </Card>
                    <FloatInput
                        label="Email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        value={email}
                        style={{ marginTop: 20 }}
                        inputStyle={{
                            minHeight: 50,
                        }}
                    />
                    <FloatInput
                        label="Password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        value={password}
                        style={{ marginTop: 20 }}
                        inputStyle={{
                            minHeight: 50,
                        }}
                    />
                    <div className="d-flex flex-row justify-content-between align-items-center my-4">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Remember me
                            </label>
                        </div>
                        <Link to="#" className="forgot-password">Forgot password?</Link>
                    </div>
                    <button
                        style={{ height: 50 }}
                        onClick={handleLogin}
                        disabled={isLoggingIn}
                        className='btn d-block w-100 btn-primary'
                    >
                        {isLoggingIn ? <Spin /> : 'Login'}
                    </button>
                    <div className="d-flex flex-row justify-content-center gap-2 align-items-center mt-4">
                        <p className='m-0'>Don't have an account?</p>
                        <Link to="/register" className="register">Sign up</Link>
                    </div>

                    {/* Or signin with divider */}
                    <div className="d-flex flex-row justify-content-center align-items-center" style={{ marginTop: 50, marginBottom: 20 }}>
                        <div className="divider" />
                        <p className="m-0 mx-2" style={{ color: "#ccc" }}>Or sign in with</p>
                        <div className="divider" />
                    </div>

                    {/* Bootstrap button groups with 3 button outline primary */}
                    <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                        <button className="d-flex flex-1 justify-content-center btn btn-outline-primary">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" alt="google" height={24} />
                        </button>
                        <button className="d-flex flex-1 justify-content-center btn btn-outline-primary">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="google" height={24} />
                        </button>
                        <button className="d-flex flex-1 justify-content-center btn btn-outline-primary">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/625px-Apple_logo_black.svg.png" alt="google" height={24} />
                        </button>
                    </div>
                </div>
                <div className="col-12 col-md-6 d-none d-md-flex">
                    <Card
                        style={{ width: '100%', maxHeight: 565, aspectRatio: '9/16' }}
                        cover={
                            <div style={{ overflow: "hidden", height: '100%' }}>
                                <img src={currentImage} alt="login" className="login-image" />
                            </div>
                        }
                        className="login-card">
                        <div className="indicator">
                            {images.map((image, index) => (
                                <div key={index} className={`indicator-dot ${currentImage === image ? 'active' : ''}`} />
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div >
    );
};

export default Login;
