import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <img src={logo} alt="Logo" />
            <nav>
                <Link to="/" >Shop</Link>
                <Link to="/review" >Order Review</Link>
                <Link to="/manage" >Manage Inventory</Link>
                {/* <Link to="/shipment" >Shipment</Link>
                <Link to="/login" >Login</Link> */}
            </nav>
        </div>
    );
};

export default Header;