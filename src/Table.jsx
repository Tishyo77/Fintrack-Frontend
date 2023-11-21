import React, { useState, useContext, useEffect } from 'react';
import TransactionTable from './RecordsPage'; 
import UserContext from './UserContext';
import axios from 'axios';
import './RecordsPage.css';
import Navbar from './Navbar';
import './Dashboard.css';

const YourComponent = () => 
{
  const [transactions, setTransactions] = useState([]);
  const {userEmail} = useContext(UserContext);

  useEffect(() => 
  {
    // Fetch transactions
    axios.get(`https://fintrack-backend-xwk6.onrender.com/userRoute/retrieve-transactions?email=${userEmail}`)
      .then(response => 
      {
        const fetchedTransactions = response.data.transactions || [];
        setTransactions(fetchedTransactions);
      })
      .catch(error => 
      {
        console.error(error);
      });
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div className="table">
      <Navbar />
      {/* Other components or content */}
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default YourComponent;
