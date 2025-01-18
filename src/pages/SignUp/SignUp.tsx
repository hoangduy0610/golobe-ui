import MainApiRequest from '@/redux/apis/MainApiRequest';
import { message, Spin, Card, Form, Input, Button, Row, Col, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bglogin from '@/assets/BG-Login.jpg';
import logo from '@/assets/logo.png'; // Logo
import login1 from '@/assets/Login1.png';
import login2 from '@/assets/Login2.jpg';
import login3 from '@/assets/Login3.jpg';
import login4 from '@/assets/Login4.jpg';
import './SignUp.scss';
import FloatInput from '@/components/FloatInput/FloatInput';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [currentImage, setCurrentImage] = useState(login1);

    const images = [login1, login2, login3, login4];

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            message.error('Password and confirm password do not match');
            return;
        }

        setIsSigningUp(true);
        try {
            const res = await MainApiRequest.post('/auth/register', {
                name: fullName,
                email,
                password
            });
            if (res.status === 200) {
                message.success('Sign up successful');
                navigate('/login'); // Redirect to login page after successful sign-up
            } else {
                message.error('Sign up failed');
            }
        } catch (error) {
            message.error('System error, please try again');
        }
        setIsSigningUp(false);
    };

    useEffect(() => {
        // Change image every 5 seconds
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
        <div className="container-fluid justify-content-center d-flex register-page">
            <div className="row w-100 gap-2 gap-md-0" style={{ marginTop: 50, maxWidth: 1000 }}>
                <div className="col-12 col-md-5 d-none d-md-flex">
                    <Card
                        style={{ width: '100%', maxHeight: 635, aspectRatio: '9/16' }}
                        cover={
                            <div style={{ overflow: "hidden", height: '100%' }}>
                                <img src={currentImage} alt="register" className="register-image" />
                            </div>
                        }
                        className="register-card">
                        <div className="indicator">
                            {images.map((image, index) => (
                                <div key={index} className={`indicator-dot ${currentImage === image ? 'active' : ''}`} />
                            ))}
                        </div>
                    </Card>
                </div>
                <div className="col-12 col-md-7">
                    <img src={logo} alt="logo" className="logo" width={80} />
                    <h2 className='mt-4'>Sign up</h2>
                    <p className='mt-2'>Let's get you all setup so you can access your personal account</p>
                    <Card
                        style={{ width: '100%', maxHeight: 250, aspectRatio: '16/9' }}
                        cover={
                            <div style={{ overflow: "hidden", height: '100%', transform: 'translateY(-50%)' }}>
                                <img src={currentImage} alt="register" className="register-image" />
                            </div>
                        }
                        className="register-card">
                        <div className="indicator">
                            {images.map((image, index) => (
                                <div key={index} className={`indicator-dot ${currentImage === image ? 'active' : ''}`} />
                            ))}
                        </div>
                    </Card>
                    <FloatInput
                        label="Full name"
                        placeholder="Full name"
                        name="fullName"
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        value={fullName}
                        style={{ marginTop: 20 }}
                        inputStyle={{
                            minHeight: 50,
                        }}
                    />
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
                    {/* <FloatInput
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
                    <FloatInput
                        label="Confirm password"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        value={confirmPassword}
                        style={{ marginTop: 20 }}
                        inputStyle={{
                            minHeight: 50,
                        }}
                    /> */}
                    {/* form group with 2 input in a line */}
                    <div className="row">
                        <div className="col-6">
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
                        </div>
                        <div className="col-6">
                            <FloatInput
                                label="Confirm password"
                                placeholder="Confirm password"
                                name="confirmPassword"
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                value={confirmPassword}
                                style={{ marginTop: 20 }}
                                inputStyle={{
                                    minHeight: 50,
                                }}
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-start align-items-center my-4">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                I agree to all the <Link to="#" className="forgot-password">Terms & Conditions</Link>
                            </label>
                        </div>
                    </div>
                    <button
                        style={{ height: 50 }}
                        onClick={handleSignUp}
                        disabled={isSigningUp}
                        className='btn d-block w-100 btn-primary'
                    >
                        {isSigningUp ? <Spin /> : 'Create account'}
                    </button>
                    <div className="d-flex flex-row justify-content-center gap-2 align-items-center mt-4">
                        <p className='m-0'>Already have an account?</p>
                        <Link to="/login" className="register">Sign in</Link>
                    </div>

                    {/* Or signin with divider */}
                    <div className="d-flex flex-row justify-content-center align-items-center" style={{ marginTop: 50, marginBottom: 20 }}>
                        <div className="divider" />
                        <p className="m-0 mx-2" style={{ color: "#ccc" }}>Or sign up with</p>
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
            </div>
        </div >
    );
};

export default SignUp;
