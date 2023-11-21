import React, { useState } from 'react';
import logo from './Images/FinTrack.png';
import './LandingPage.css';
import art from './Images/Art.png';
import money from './Images/BG2.png';
import { Link } from 'react-router-dom';

const LandingPage = () => 
{
    return (
        <div className = 'landing-page'>
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="login-button">
                    <Link to="login">
                        <button>Log In</button>
                    </Link>
                </div>
            </nav>
            <div className="container-mt-1">
                <div className="row">
                    {/* Left Column */}
                    <div className="col-7">
                        <div className="left-container ">
                            {/* Content Container */}
                            <div className="content-container">
                                Shut Up <br /> & <br /> Save Your Money 
                                <img src={art} alt="Image" className="art" />
                            </div>
                            {/* Bottom Container */}
                            <div className="bottom-container">
                                <div className="text">Navigate your Financial Journey <br /> with Precision</div>
                                <div className="overlay"></div>
                            </div>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="col-5">
                        <div className="right-container"> 
                            <img src={money} alt="Image"  className="money"/>
                            <div className="points">
                                Track, adapt, and achieve financial success <br />
                                Effortlessly categorize, budget, and excel <br />
                                Visualize your finances, set achievable goals <br />
                                <Link to="/signup" style={{ textDecoration: 'none' }}>
                                    <button className="center-button">START SAVING NOW!</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;

