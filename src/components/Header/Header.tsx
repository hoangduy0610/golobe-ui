// src/components/Header/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from "@/assets/logo.svg";
import "./Header.css";
import MainApiRequest from '@/redux/apis/MainApiRequest';

export default function Header() {
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

    return (
        <header className="app-header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            <nav className="navbar">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/trips">Trips</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/forum">Forum</Link></li>
                    <li><Link to="/chat">Chat</Link></li>
                    {
                        isAdmin && (
                            <li><Link to="/admin">Admin</Link></li>
                        )
                    }
                </ul>
                <ul className="btn-group">
                    {isLogin ? (
                        <>
                            <li className='fw-bold'><Link to="/profile">Hello, {user?.name?.split(' ')[user?.name?.split(' ')?.length - 1]}</Link></li>
                            <li className="btn btn-white" onClick={handleLogout}>Logout</li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li className="btn btn-white">Sign Up</li>
                        </>
                    )}
                </ul>
            </nav>
            <div className="hero">
                <h2>Helping Others</h2>
                <h1>LIVE & TRAVEL</h1>
                <h4>Special offers to suit your plan</h4>
            </div>
        </header>
    );
}
