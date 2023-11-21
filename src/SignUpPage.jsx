import React, { useState, useEffect, useContext } from 'react';
import './SignUpPage.css';
import logo from './Images/FinTrack2.png';
import google from './Images/Google.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => 
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const handleSignUpClick = () => 
    {
        if (!validateEmail(email)) 
        {
            setEmailError(true);
            return;
        }

        if (!validatePassword(password)) 
        {
            setPasswordError(true);
            return;
        }

        if (password !== confirmPassword) 
        {
            setConfirmPasswordError(true);
            return;
        }

        let userExists = 0;

        axios.get(`https://fintrack-backend-xwk6.onrender.com/userRoute/retrieve?email=${email}`)
        .then((userExistsResponse) => 
        {
            if (userExistsResponse.status === 200) 
            {
                alert("Email already in use!");
                userExists = 1;
            }
        })
        .catch((error) => 
        {
            console.error("Error checking for existing user:", error);
        })
        .then(() => 
        {
            if(!userExists)
            {
            const data = { email: email, password: password };

            axios.post("https://fintrack-backend-xwk6.onrender.com/userRoute/create-user", data)
                .then((createUserResponse) => 
                {
                    if (createUserResponse.status === 200) 
                    {
                        alert("Account Created!");
                    }  
                    else 
                    {
                        alert("Failed to create account");
                    }
                })
                .catch((error) => 
                {
                    console.error("Error creating account:", error);
                    alert("Error creating account");
                });
            }
        });
    };

    const validateEmail = (email) => 
    {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => 
    {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordRegex.test(password);
    };

    return (
        <div className="signup-page">
            <div className="container2">
                <div className="content">
                    <img src={logo} alt="Logo" className="logo" />
                    <div className="form-container">
                        <input
                            type="email"
                            placeholder="Email"
                            className={emailError ? "custom-input error-input" : "custom-input"}
                            value={email}
                            onChange={(e) => 
                            {
                                setEmail(e.target.value);
                                setEmailError(false);
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className={passwordError ? "custom-input error-input" : "custom-input"}
                            value={password}
                            onChange={(e) => 
                            {
                                setPassword(e.target.value);
                                setPasswordError(false);
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={confirmPasswordError ? "custom-input error-input" : "custom-input"}
                            value={confirmPassword}
                            onChange={(e) => 
                            {
                                setConfirmPassword(e.target.value);
                                setConfirmPasswordError(false);
                            }}
                        />
                        <button onClick={handleSignUpClick} className="sign-up">
                            Sign-Up
                        </button>
                        <br></br>
                        <div className="already-member">
                            Already a member? <Link to="/login">Try logging in.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
