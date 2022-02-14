import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    // console.log(products);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const savedCart = getStoredCart();
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys);
        const previousCart = productKeys.map(existingKey => {
            // console.log(existingKey);
            const product = products.find(pd => pd.key === existingKey);
            // console.log(product);
            if(product){
                product.quantity = savedCart[existingKey];
            }
            // console.log(product);
            // product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    }, [products])

    const handleAddToCart = (product) => {
        console.log(product);
        const sameProduct = cart.find(pd => pd.key === product.key);
        console.log(sameProduct);

        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDb(product.key);
    }

    return (
        <div className='twin-container'>
            <div className="product-container">
                {
                    products.map(product => <Product key={product.key} showAddToCart={true} product={product} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review"><button className="btn-review">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;