import MainApiRequest from '@/redux/apis/MainApiRequest';
import { message, Spin, Card, Form, Input, Button, Row, Col, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bglogin from '@/assets/BG-Login.jpg';
import logo from '@/assets/logo.png'; // Logo
import login1 from '@/assets/Login1.png';
import login2 from '@/assets/Login2.jpg';
import login3 from '@/assets/Login3.jpg';
import login4 from '@/assets/Login4.jpg';
import './SignUp.scss';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
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
            const res = await MainApiRequest.post('/auth/signup', { firstName, lastName, email, phone, password });
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
        <div
            className="h-100 bg-login"
            style={{
                backgroundImage: `url(${bglogin})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            }}
        >
            <Spin spinning={isSigningUp} size="large" tip="Signing up...">
                <Row className="h-100" justify="center" align="middle">
                    {/* Image card */}
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <Card className="login-image-card shadow">
                            <img
                                src={currentImage} // Use image that changes over time
                                alt="Illustrative image"
                                className="img-fluid rounded"
                            />
                        </Card>
                    </Col>

                    {/* Sign-up card */}
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <Card className="login-form-card shadow">
                            <Row justify="center" align="middle">
                                <Col span={24} className="text-center">
                                    {/* Logo */}
                                    <img src={logo} alt="Golobe Logo" className="login-logo" />
                                    {/* Title "SIGN UP" */}
                                    <Typography.Title level={2}>
                                        SIGN UP
                                    </Typography.Title>
                                    {/* Description */}
                                    <Typography.Text type="secondary">
                                        Create an account to access your Golobe experience
                                    </Typography.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form layout="vertical" onFinish={handleSignUp}>
                                        <Form.Item
                                            label="First Name"
                                            name="firstName"
                                            rules={[{ required: true, message: 'Please enter your first name' }]}
                                        >
                                            <Input
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                placeholder="Enter your first name"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Last Name"
                                            name="lastName"
                                            rules={[{ required: true, message: 'Please enter your last name' }]}
                                        >
                                            <Input
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                placeholder="Enter your last name"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Invalid email' }]}
                                        >
                                            <Input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Phone Number"
                                            name="phone"
                                            rules={[{ required: true, message: 'Please enter your phone number' }]}
                                        >
                                            <Input
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Enter your phone number"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            rules={[{ required: true, message: 'Please enter your password' }]}
                                        >
                                            <Input.Password
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter your password"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            rules={[{ required: true, message: 'Please confirm your password' }]}
                                        >
                                            <Input.Password
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm your password"
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                block
                                                disabled={isSigningUp}
                                                style={{ backgroundColor: '#8DD3BB', borderColor: '#8DD3BB' }}
                                            >
                                                Sign Up
                                            </Button>
                                        </Form.Item>
                                        {/* Text and "Login" button */}
                                        <Form.Item>
                                            <div className="d-flex justify-content-between">
                                                <Typography.Text type="secondary">
                                                    Already have an account? 
                                                    <a href="/login" style={{ fontWeight: 'bold', color: 'black' }}>
                                                        Log in
                                                    </a>
                                                </Typography.Text>
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Spin>
        </div>
    );
};

export default SignUp;
