import React, { useState } from 'react';
import SignUpPage from './SignUpPage'; 
import LogInPage from './LogInPage';
import LandingPage from './LandingPage'; 
import Opening from './Opening';
import UserContext from './UserContext';
import Dashboard from './Dashboard';
import Chart from './Chart';
import Sip from './Sip';
import RecordsPage from './RecordsPage';
import Table from './Table';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const App = () => 
{
    const [userEmail, setUserEmail] = useState('');
    return (
        <UserContext.Provider value={{ userEmail, setUserEmail }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />}> </Route>
                    <Route path='/signup' element={<SignUpPage />}> </Route>
                    <Route path='/login' element={<LogInPage />}> </Route>
                    <Route path='/opening' element={<Opening />}> </Route>
                    <Route path='/dashboard' element={<Dashboard />}> </Route>
                    <Route path="/charts" element={<Chart />}> </Route>
                    <Route path="/records" element={<Table />}> </Route>
                    <Route path="/sip" element={<Sip />}> </Route>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
};

export default App;
