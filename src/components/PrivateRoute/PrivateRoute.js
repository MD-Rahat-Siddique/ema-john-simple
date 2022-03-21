import React, { useContext } from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // Line number - 8 and in line number 10 i have added state;
    const location = useLocation();
    return  (
        loggedInUser.email ? children : <Navigate to={'/login'} state={{ from: location }} replace />
    ); 
};

export default PrivateRoute;