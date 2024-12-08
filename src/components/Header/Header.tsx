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
                    <li>Restaurants</li>
                    <li><Link to="/trips">Trips</Link></li>
                    <li>Thing to do</li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li>Forum</li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
                <ul className="btn-group">
                    <li>Partner</li>
                    <li>Login</li>
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
