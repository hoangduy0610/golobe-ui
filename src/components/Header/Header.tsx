// src/components/Header/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from "@/assets/logo.svg";
import "./Header.css";

export default function Header() {
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
                </ul>
                <ul className="btn-group">
                    <li><Link to="/login">Login</Link></li>
                    <li className="btn btn-white">Sign Up</li>
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
