import MainApiRequest from '@/redux/apis/MainApiRequest';
import { message, Spin, Card, Form, Input, Button, Row, Col, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login1 from '@/assets/Login1.png';
import login2 from '@/assets/Login2.jpg';
import login3 from '@/assets/Login3.jpg';
import login4 from '@/assets/Login4.jpg';
import bglogin from '@/assets/BG-Login.jpg';
import logo from '@/assets/logo.png'; // Logo
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
            <Spin spinning={isLoggingIn} size="large" tip="Logging in...">
                <Row className="h-100" justify="center" align="middle">
                    {/* Image Card */}
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <Card className="login-image-card shadow">
                            <img
                                src={currentImage}
                                alt="Illustrative image"
                                className="img-fluid rounded"
                            />
                        </Card>
                    </Col>

                    {/* Login Form Card */}
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <Card className="login-form-card shadow">
                            <Row justify="center" align="middle">
                                <Col span={24} className="text-center">
                                    {/* Logo */}
                                    <img src={logo} alt="Golobe Logo" className="login-logo" />
                                    {/* Title "LOGIN" */}
                                    <Typography.Title level={2}>
                                        LOGIN
                                    </Typography.Title>
                                    {/* Description */}
                                    <Typography.Text type="secondary">
                                        Login to access your Golobe account
                                    </Typography.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form layout="vertical" onFinish={handleLogin}>
                                        <Form.Item
                                            label="E-Mail"
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
                                        <Form.Item>
                                            <div className="d-flex justify-content-between">
                                                <a href="forgot.html" style={{ fontWeight: 'bold', color: 'black' }}>
                                                    Forgot password
                                                </a>
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                block
                                                disabled={isLoggingIn}
                                                style={{ backgroundColor: '#8DD3BB', borderColor: '#8DD3BB' }}
                                            >
                                                Login
                                            </Button>
                                        </Form.Item>
                                        {/* Sign up text and link */}
                                        <Form.Item>
                                            <div className="d-flex justify-content-between">
                                                <Typography.Text type="secondary">
                                                    Don’t have an account?
                                                    <Link to="/sign-up" style={{ fontWeight: 'bold', color: 'black' }}>
                                                        Sign up
                                                    </Link>
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

export default Login;
