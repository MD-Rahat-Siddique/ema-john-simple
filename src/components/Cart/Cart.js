import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const {cart} = props;
    // let total = 0;
    // for (const product of cart) {
    //     total = total + product.price;
    // }
    const total = cart.reduce( (previous, product) => previous + product.price, 0);
    return (
        <div>
           <div className="cart-header">
                <h3>Order Summary</h3>
                <p>Items Ordered : {cart.length}</p>
           </div>
           <div className='cart-body'>
                <p><small>Items : ${total}</small></p>
           </div>
        </div>
    );
};

export default Cart;