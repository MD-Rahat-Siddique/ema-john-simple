import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <img src={logo} alt="Logo" />
            <nav>
                <NavLink to="/" >Shop</NavLink>
                <NavLink to="/review" >Order Review</NavLink>
                <NavLink to="/manage" >Manage Inventory</NavLink>
            </nav>
        </div>
    );
};

export default Header;