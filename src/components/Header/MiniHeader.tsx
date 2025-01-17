// src/components/Header/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from "@/assets/logo_black.svg";
import "./MiniHeader.css";
import MainApiRequest from '@/redux/apis/MainApiRequest';

export default function MiniHeader() {
    const isLogin = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('adminToken');
    const [user, setUser] = React.useState<any>({});

    const fetchUserInfo = async () => {
        const res = await MainApiRequest.get('/auth/callback');
        setUser(res.data.data);
    }

    React.useEffect(() => {
        if (isLogin) {
            fetchUserInfo();
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/';
    }

    const isActive = (path: string) => {
        return window.location.pathname === path;
    }

    return (
        <header className="app-mini-header">
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>
                <ul className="nav-links m-0">
                    <li className={`${isActive("/") ? 'active' : ''}`}><Link to="/">Home</Link></li>
                    <li className={`${isActive("/") ? 'active' : ''}`}><Link to="/services">Services</Link></li>
                    <li className={`${isActive("/") ? 'active' : ''}`}><Link to="/trips">Trips</Link></li>
                    <li className={`${isActive("/") ? 'active' : ''}`}><Link to="/blog">Blog</Link></li>
                    <li className={`${isActive("/") ? 'active' : ''}`}><Link to="/forum">Forum</Link></li>
                    <li className={`${isActive("/") ? 'active' : ''}`}><Link to="/chat">Chat</Link></li>
                    {/* {
                        isAdmin && (
                            <li className={`${isActive("/") ? 'active' : ''}`}><Link to="/admin">Admin</Link></li>
                        )
                    } */}
                </ul>
            </nav>
            <ul className="btn-group">
                {isLogin ? (
                    <>
                        <li className='fw-bold'><Link to="/profile">Hello, {user?.name?.split(' ')[user?.name?.split(' ')?.length - 1]}</Link></li>
                        <li className="btn btn-white" onClick={handleLogout}>Logout</li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li className="btn btn-white" onClick={() => { window.location.href = "/register" }}>Sign up</li>
                    </>
                )}
            </ul>
        </header >
    );
}
