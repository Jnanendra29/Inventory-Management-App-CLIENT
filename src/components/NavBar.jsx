import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
            <div className="navbar-logo">
                    <img src="https://play-lh.googleusercontent.com/b7uemhn3RD_7eDGadpTO3HX7xw9lk6DX7lX2iDSK-b4fsXLX5vBQWOZr54OvUTdVMRY" 
                    alt="logo" className='logo'/>
                </div>
                {auth ? <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/" className="nav-links">
                            Products
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/add" className="nav-links">
                            Add products
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className="nav-links">
                            Profile
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/signup" className="nav-links" onClick={logout}>
                            Logout
                        </Link> </li>
                </ul>
                    :
                    <ul className="nav-menu nav-right">
                        <li className='nav-item'>
                            <Link to="/signup" className="nav-links">
                                SignUp
                            </Link> </li>
                        <li className='nav-item'>
                            <Link to="/login" className="nav-links">
                                Login
                            </Link></li>
                    </ul>
                }
            </div>
        </nav>
    );
};

export default Navbar;

