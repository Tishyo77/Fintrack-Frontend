import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './Images/FinTrack.png';
import { Link } from 'react-router-dom';
import UserContext from './UserContext'; 

function Navbar() 
{
  const navigate = useNavigate();
  const { userEmail, setUserEmail } = useContext(UserContext);

  const handleLogout = () => 
  {
    setUserEmail(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-light navbar-custom">
      <div className="container-fluid">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <form className="d-flex">
          <Link to="/records">
            <button className="btn btn-outline-dark me-2">Records</button>
          </Link>
          <Link to="/charts">
            <button className="btn btn-outline-dark me-5">Charts</button>
          </Link>
          <Link to="/sip">
            <button className="btn btn-outline-dark me-5">SIP Calculator</button>
          </Link>
          <button className="btn btn-outline-dark me-2" onClick={handleLogout}>
            Log out
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
