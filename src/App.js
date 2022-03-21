import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import PageError from './components/PageError/PageError';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import React, { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>Email : {loggedInUser.email}</p>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="review" element={<Review />} />
        <Route path="manage" element={<PrivateRoute> <Manage /> </PrivateRoute>} />
        <Route path="/product/:key" element={<ProductDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="shipment" element={
          <PrivateRoute>
             <Shipment /> 
          </PrivateRoute>
        } />
        <Route path="*" element={<PageError />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
