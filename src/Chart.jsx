import React, { useState, useEffect, useContext } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import UserContext from './UserContext';
import axios from 'axios'; 
import './Chart.css'; 
import Navbar from './Navbar';
import './Dashboard.css';

import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement
)

const Chart = () => 
{
    const { userEmail } = useContext(UserContext);
    const [expenditures, setExpenditures] = useState([]);

    useEffect(() => 
    {
        let chartInstance = null;

        const fetchData = async () => 
        {
            try 
            {
                const response = await axios.get(`https://fintrack-backend-xwk6.onrender.com/userRoute/retrieve?email=${userEmail}`);
                setExpenditures(response.data.expenditures || []);
                
            } 
            catch (error) 
            {
                console.error('Error fetching user balance:', error);
            }
        };

        fetchData();


        return () => 
        {
            if (chartInstance) 
            {
                chartInstance.destroy();
            }
        };
    }, [userEmail]);

    useEffect(() => 
    {
        console.log('Current Expenditures:', expenditures);
    }, [expenditures]);

    const chartData = 
    {
        labels: ['Charity', 'Clothing', 'Debts', 'Education', 'Entertainment', 'Food', 'Healthcare', 'Housing', 'Insurance', 'Personal Care', 'Savings', 'Transportation', 'Utilities', 'Other'],
        datasets: [
            {
                label: 'Expenditures',
                data: expenditures,
                backgroundColor: 'rgba(214, 64, 69, 1)',
                borderColor: 'rgba(214, 64, 69, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
        ],
    };

    const options = 
    {
        plugins:
        {
            legend: true
        },
        scales:
        {
            y:
            {
                //min: 3,
                //max: 6
            }
        }
    }

    

    return (
        <div className="chart-container">
            <Navbar />
            <h1>Visualize your Expenditures</h1>
            <div className="chart">
                <Bar
                    data = {chartData}
                    options = {options}
                ></Bar>
            </div>
        </div>
    );
};

export default Chart;
