import React, { useState, useContext } from 'react';
import './LogInPage.css';
import logo from './Images/FinTrack2.png';
import google from './Images/Google.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from './UserContext';
import { useNavigate } from "react-router-dom";

const LogInPage = () => 
{
    const { userEmail, setUserEmail } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    const getCurrentDate = () => 
    {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleLogInClick = () => 
    {
        if (!validateEmail(email)) 
        {
            setEmailError(true);
            return;
        }

        axios.post("https://fintrack-backend-xwk6.onrender.com/userRoute/login-user", {email, password})
        .then(result => 
        {
            console.log(result);
            const { data, firstLogin } = result.data;
            console.log(firstLogin);
            if(data === "Success")
            {
                if (!firstLogin) 
                {
                    axios.post("https://fintrack-backend-xwk6.onrender.com/userRoute/update-date", { email, date: getCurrentDate() })
                        .then(() => 
                        {
                            setUserEmail(email);
                            navigate('/dashboard');
                        })
                        .catch(err => console.log(err));
                } 
                else 
                {
                    axios.post("https://fintrack-backend-xwk6.onrender.com/userRoute/update-date", { email, date: getCurrentDate() })
                        .then(() => {
                            setUserEmail(email);
                            navigate("/opening");
                        })
                        .catch(err => console.log(err));
                }
            }
            else if(data === "Incorrect")
            {
                alert("Incorrect Password!");
            }
            else
            {
                alert("User does not exist!");
            }
        })
        .catch(err => console.log(err))
    };

    const validateEmail = (email) => 
    {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    };

    return (
        <div className="login-page">
            <div className="container">
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
                        <button onClick={handleLogInClick} className="log-in">
                            Log-In
                        </button>
                        <br></br>
                        <div className="not-member">
                            Not a member? <Link to="/signup">Sign Up!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;
