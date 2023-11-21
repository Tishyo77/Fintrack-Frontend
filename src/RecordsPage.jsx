import React from 'react';
import './RecordsPage.css';

const TransactionTable = ({ transactions }) => {
  return (
    <div>
      <h2>Transactions</h2>
      <table className='body'>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.map((transaction, index) => (
            <tr key={index}>
              <td>Rs. {transaction.value}</td>
              <td>{transaction.category}</td>
              <td>{transaction.option}</td>
              <td>{transaction.time}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;