// src/components/Header.js
import React from 'react';
import logo from "@/assets/logo.svg";
import { Link } from 'react-router-dom';
import "./Header.css";

export function Header() {
    return (
        <header className="app-header">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <nav className="navbar">
                <ul className="nav-links">
                    <li>Hotels</li>
                    <li>Restaurants</li>
                    <li>Trips</li>
                    <li>Thing to do</li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li>Forum</li>
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
