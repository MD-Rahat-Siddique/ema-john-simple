import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <img src={logo} alt="Logo" />
            <nav>
                <Link to="/" >Shop</Link>
                <Link to="/review" >Order Review</Link>
                <Link to="/manage" >Manage Inventory</Link>
                {/* <Link to="/shipment" >Shipment</Link>
                <Link to="/login" >Login</Link> */}
                <button onClick={ () => setLoggedInUser({}) }>Sign out</button>
            </nav>
        </div>
    );
};

export default Header;