import React, { useState, useContext, useEffect } from 'react';
import './Dashboard.css';
import Navbar from './Navbar'
import UserContext from './UserContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function Calculate() 
{
    const {userEmail} = useContext(UserContext);
    const [userExpenditures, setUserExpenditures] = useState([]);
    const [userBalance, setUserBalance] = useState(0);
    const [userBudget, setUserBudget] = useState(0);
    const [displayValue, setDisplayValue] = useState('0');
    const [selectedCategoryType, setSelectedCategoryType] = useState('Income');
    const [singleOption, setSingleOption] = useState("Update Budget");
    const [categoryOptions, setCategoryOptions] = useState(['Update Budget', "Don't Update"]);

    const handleEditBudget = () => 
    {
        let newBudget;
        let numberValue;
        do 
        {
            newBudget = prompt("ENTER NEW BUDGET:");
            numberValue = Number(newBudget);
            if (!isNaN(numberValue)) 
            {
                break; 
            } 
            else 
            {
                alert("Invalid input. Please enter a valid number!");
            }
        } 
        while (true);
        setUserBudget(numberValue);
        axios.post('https://fintrack-backend-xwk6.onrender.com/userRoute/update', 
        {
            email: userEmail,
            budget: numberValue,
        })
        .then(response => 
        {
            console.log('Update successful:', response.data);
        })
        .catch(error => 
        {
            console.error('Error updating balance and budget:', error);
        });
    }

    const getCurrentDate = () => 
    {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getCurrentTime = () => 
    {
        const today = new Date();
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const [userTransactions, setUserTransactions] = useState({
        date: getCurrentDate(),
        time: getCurrentTime(),
        value: 0,
        category: selectedCategoryType,
        option: singleOption,
    });

    useEffect(() => 
    {
        axios.get(`https://fintrack-backend-xwk6.onrender.com/userRoute/retrieve?email=${userEmail}`)
        .then(response => 
        {
            setUserBalance(response.data.balance); 
            setUserBudget(response.data.budget);
            setUserExpenditures(response.data.expenditures || []);
            setUserTransactions(response.data.transactions || []);
        })
        .catch(error => 
        {
            console.error('Error fetching user balance:', error);
        });
    }, [userEmail]);

    const handleButtonClick = (value) => 
    {
        setDisplayValue((prevValue) => 
        {
            if (prevValue === 'Error' || prevValue === 'Infinity') 
            {
                return value;
            }
            const updatedValue = prevValue === '0' || prevValue === 'Error' ? String(value) : prevValue + String(value);
            return updatedValue;
        });
    };
    
    const handleEvaluate = () => 
    {
        try 
        {
            const result = eval(displayValue);
            const Result2 = parseFloat(result.toFixed(2));
            setDisplayValue(Result2.toString());
        } 
        catch (error) 
        {
            setDisplayValue('Error');
        }
    };

    const handleAddRecord = () => 
    {
        if (displayValue !== 'Error' && displayValue !== 'Infinity') 
        {
            try 
            {
                const evaluatedValue = eval(displayValue);
                let updatedBalance = userBalance;
                let updatedBudget = userBudget;
                

                if (selectedCategoryType === 'Expenditure') 
                {
                    updatedBalance -= evaluatedValue;
                    updatedBudget -= evaluatedValue;

                    if(singleOption === "Charity")
                        userExpenditures[0] += evaluatedValue;
                    else if(singleOption === "Clothing") 
                        userExpenditures[1] += evaluatedValue;
                    else if(singleOption === "Debts") 
                        userExpenditures[2] += evaluatedValue;
                    else if(singleOption === "Education") 
                        userExpenditures[3] += evaluatedValue;
                    else if(singleOption === "Entertainment") 
                        userExpenditures[4] += evaluatedValue;
                    else if(singleOption === "Food") 
                        userExpenditures[5] += evaluatedValue;
                    else if(singleOption === "Healthcare") 
                        userExpenditures[6] += evaluatedValue;
                    else if(singleOption === "Housing") 
                        userExpenditures[7] += evaluatedValue;
                    else if(singleOption === "Insurance") 
                        userExpenditures[8] += evaluatedValue;
                    else if(singleOption === "Personal Care") 
                        userExpenditures[9] += evaluatedValue;
                    else if(singleOption === "Savings") 
                        userExpenditures[10] += evaluatedValue;
                    else if(singleOption === "Transportation") 
                        userExpenditures[11] += evaluatedValue;
                    else if(singleOption === "Utilities") 
                        userExpenditures[12] += evaluatedValue;
                    else if(singleOption === "Other") 
                        userExpenditures[13] += evaluatedValue;

                    const updatedTransactions = [
                        ...userTransactions,
                        {
                            date: getCurrentDate(),
                            time: getCurrentTime(),
                            value: evaluatedValue,
                            category: selectedCategoryType,
                            option: singleOption,
                        },
                    ];
                    setUserTransactions(updatedTransactions);

                    setUserBalance(updatedBalance);
                    setUserBudget(updatedBudget);
          
                    axios.post('https://fintrack-backend-xwk6.onrender.com/userRoute/update', 
                    {
                        email: userEmail,
                        balance: updatedBalance,
                        budget: updatedBudget,
                        expenditures: userExpenditures,
                        transactions: updatedTransactions,
                    })
                    .then(response => 
                    {
                        console.log('Update successful:', response.data);
                    })
                    .catch(error => 
                    {
                        console.error('Error updating balance and budget:', error);
                    });
                }
                else
                {
                    if(singleOption === 'Update Budget')
                    {
                        updatedBalance += evaluatedValue;
                        updatedBudget += evaluatedValue;

                        setUserBalance(updatedBalance);
                        setUserBudget(updatedBudget);

                        const updatedTransactions = [
                            ...userTransactions,
                            {
                                date: getCurrentDate(),
                                time: getCurrentTime(),
                                value: evaluatedValue,
                                category: selectedCategoryType,
                                option: singleOption,
                            },
                        ];
                        setUserTransactions(updatedTransactions);
          
                        axios.post('https://fintrack-backend-xwk6.onrender.com/userRoute/update', 
                        {
                            email: userEmail,
                            balance: updatedBalance,
                            budget: updatedBudget,
                            transactions: updatedTransactions,
                        })
                        .then(response => 
                        {
                            console.log('Update successful:', response.data);
                        })
                        .catch(error => 
                        {
                            console.error('Error updating balance and budget:', error);
                        });
                    }
                    else
                    {
                        updatedBalance += evaluatedValue;

                        const updatedTransactions = [
                            ...userTransactions,
                            {
                                date: getCurrentDate(),
                                time: getCurrentTime(),
                                value: evaluatedValue,
                                category: selectedCategoryType,
                                option: singleOption,
                            },
                        ];
                        setUserTransactions(updatedTransactions);

                        setUserBalance(updatedBalance);
          
                        axios.post('https://fintrack-backend-xwk6.onrender.com/userRoute/update', 
                        {
                            email: userEmail,
                            balance: updatedBalance,
                            budget: updatedBudget,
                            transactions: updatedTransactions,
                        })
                        .then(response => 
                        {
                            console.log('Update successful:', response.data);
                        })
                        .catch(error => 
                        {
                            console.error('Error updating balance and budget:', error);
                        });
                    }
                }
            } 
            catch (error) 
            {
                console.error('Error evaluating and updating:', error);
            }
        }
    };
    
    const handleClear = () => 
    {
        setDisplayValue('0');
    };
    
    const handleCategoryTypeChange = (value) => 
    {
        setSelectedCategoryType(value);
        if (value === 'Income') 
        {
            setCategoryOptions(['Update Budget', "Don't Update"]);
            setSingleOption("Don't Update");
        } 
        else 
        {
            setCategoryOptions(['Charity', 'Clothing', 'Debts', 'Education', 'Entertainment', 'Food', 'Healthcare', 'Housing', 'Insurance', 'Personal Care', 'Savings', 'Transportation', 'Utilities', 'Other']);
            setSingleOption("Other");
        }
    };

    const handleCategoryOptionChange = (value) =>
    {
        setSingleOption(value);
    }

    return (
        <div className='full-container'>
        <div className='dashboard'>
            <Navbar /> 
            <div className="container mt-5">
                <div className="row">
                        <div className="col-6">
                            <div className="card card-gradient-left">
                                <div className="card-body">
                                    <h2 className="card-text">Rs. {userBalance}</h2>
                                    <h5 className="card-title"> Available Balance</h5>
                                </div>
                            </div>
                            <br></br><br></br>
                            <div className="card card-gradient">
                                <div className="card-body">
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        className=" editIcon float-end"
                                        onClick={handleEditBudget}
                                    ></FontAwesomeIcon>
                                    <h2 className="card-text">Rs. {userBudget}</h2>
                                    <p className="card-days">30 days to go</p>
                                    <h5 className="card-title">Budget</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card card-gradient-right">
                                <div className="card-body">
                                    <h5 className="card-title">Calculator</h5>
                                    <div className="calculator-container">
                                        <div className="display">
                                            <input type="text" value={displayValue} readOnly className='mb-1'></input>
                                        </div>
                                        <div className="buttons">
                                        <div className="button-row d-flex justify-content-center">
                                            {[7, 8, 9, '/'].map((value) => (
                                                <button key={value} className="btn btn-info btn-sm me-1 mb-2" onClick={() => handleButtonClick(value)}>
                                                    {value}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="button-row">
                                            {[4, 5, 6, '*'].map((value) => (
                                                <button key={value} className="btn btn-info btn-sm me-1 mb-2" onClick={() => handleButtonClick(value)}>
                                                    {value}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="button-row">
                                            {[1, 2, 3, '-'].map((value) => (
                                                <button key={value} className="btn btn-info btn-sm me-1 mb-2" onClick={() => handleButtonClick(value)}>
                                                    {value}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="button-row">
                                            {[0, ".", "C", '+'].map((value) => (
                                                <button key={value} className="btn btn-info btn-sm me-1 mb-2" onClick={() => (value === 'C' ? handleClear() :  handleButtonClick(value))}>
                                                    {value}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-between">
                                    {/* Add two dropdowns here */}
                                    <select className="form-select me-4" value={singleOption} onChange={(e) => handleCategoryOptionChange(e.target.value)}>
                                        {categoryOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <select value={selectedCategoryType} onChange={(e) => handleCategoryTypeChange(e.target.value)} className="form-select me-4" >
                                        <option value="Income">Income</option>
                                        <option value="Expenditure">Expenditure</option>
                                    </select>
                                    {/* Add two buttons here */}
                                    <button className="btn btn-outline-dark me-2 add-record-button" onClick={handleAddRecord}>Add Record</button>
                                    <button className="btn btn-outline-dark me-2 evaluate-button" onClick={handleEvaluate}>Evaluate</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Calculate;