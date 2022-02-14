import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const {cart} = props;
    let total = 0;
    for (const product of cart) {
        total = total + product?.price * product?.quantity;
    }
    // const total = cart.reduce( (previous, product) => previous + product.price * product.quantity, 0);
    return (
        <div className="cart-container">
           <div className="cart-header">
                <h3>Order Summary</h3>
                <p>Items Ordered : {cart.length}</p>
           </div>
           <div className='cart-body'>
                <p><small>Product Price : ${total.toFixed(2)}</small></p>
                <br/>
                {
                    props.children
                }
           </div>
        </div>
    );
};

export default Cart;