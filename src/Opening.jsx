import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import './Opening.css';
import logo from './Images/FinTrack2.png';
import axios from 'axios';

const Opening = () => 
{
    const navigate = useNavigate();
    const {userEmail} = useContext(UserContext);
    const [monthlyBudget, setMonthlyBudget] = useState("");
    const [totalBalance, setTotalBalance] = useState("");

    const handleProceedClick = () => 
    {
        axios.post("https://fintrack-backend-xwk6.onrender.com/userRoute/initialize", {
            email: userEmail,
            budget: monthlyBudget,
            balance: totalBalance
        })
        .then(response => {
            console.log(response.data.message); 
            navigate('/dashboard');
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="budget-page">
            <div className="container">
                <div className="content">
                    <img src={logo} alt="Logo" className="logo" />
                    <div className="form-container">
                        <input
                            type="number"
                            placeholder="Monthly Budget"
                            className={"custom-input"}
                            value={monthlyBudget}
                            onChange={(e) => setMonthlyBudget(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Total Balance"
                            className={"custom-input"}
                            value={totalBalance}
                            onChange={(e) => setTotalBalance(e.target.value)}
                        />
                        <button onClick={handleProceedClick} className="proceed">
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Opening;
