import React, { useState, useEffect } from 'react';
import { getStoredCart, deleteFromDb, clearTheCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import happyImage from '../../images/fuck.png';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [cartProduct, setCartProduct] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON')
            .then(res => res.json())
            .then(data => setCartProduct(data))
    }, [])
    // console.log(cartProduct);
    // console.log(cartProduct.find(prd => prd.key === 'B002RL8IYK'));


    useEffect(() => {
        // Cart 
        const savedCart = getStoredCart();
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys);

        const cartProducts = productKeys.map(key => {
            const products = cartProduct.find(pd => pd.key === key);
            // products.quantity = savedCart[key];
            if (products) {
                products.quantity = savedCart[key];
            }
            return products;
        });
        setCart(cartProducts);
    }, [cartProduct])

    const removeProduct = productKey => {
        // console.log("remove clicked", productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        deleteFromDb(productKey);
    }

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        clearTheCart();
    }
    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt=""></img>
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                <h3>Review {cart.length}</h3>
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} product={pd}></ReviewItem>)
                }
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart key={cart.product?.key} cart={cart}>
                    <button onClick={handlePlaceOrder} className="btn-review">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;