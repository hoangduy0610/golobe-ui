import '@/pages/Login/Login.css';
import MainApiRequest from '@/redux/apis/MainApiRequest';
import { login } from '@/redux/reducers/userReducers';
import { RootState } from '@/redux/store';
import { LoadingOverlay } from '@achmadk/react-loading-overlay';
import { message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);

    const handleLogin = async () => {
        setIsLoggingIn(true);
        // dispatch(login({ username: email, password }));
        const res = await MainApiRequest.post('/auth/signin', { email, password });

        if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } else {
            message.error('Đăng nhập thất bại');
        }
        setIsLoggingIn(false)
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, []);

    return (
        <LoadingOverlay
            active={isLoggingIn}
            styles={{
                wrapper: {
                    height: "100vh"
                }
            }}
            spinner
        >
            <section className="h-100 bg-login">
                <div className="container h-100">
                    <div className="row justify-content-sm-center h-100">
                        <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                            <div className="text-center my-5">
                                {/* <img src={huyHieuCA} alt="logo" width="100" /> */}
                            </div>
                            <div className="card shadow-lg">
                                <div className="card-body p-5">
                                    <h1 className="fs-4 card-title fw-bold mb-4">Đăng nhập</h1>
                                    <form method="POST" className="needs-validation">
                                        <div className="mb-3">
                                            <label className="mb-2 text-muted">E-Mail</label>
                                            <input id="email" type="email" className="form-control" name="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                                            <div className="invalid-feedback">
                                                Email không hợp lệ
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="mb-2 w-100">
                                                <label className="text-muted">Mật khẩu</label>
                                                <a href="forgot.html" className="float-end">
                                                    Quên mật khẩu?
                                                </a>
                                            </div>
                                            <input id="password" type="password" className="form-control" name="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                                            <div className="invalid-feedback">
                                                Mật khẩu không hợp lệ
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center">
                                            <button type="button" onClick={handleLogin} className="btn btn-primary ms-auto">
                                                Đăng nhập
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="text-center mt-5 text-muted">
                                Copyright &copy; 2024 &mdash; CXZ
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LoadingOverlay>
    );
};

export default Login;
