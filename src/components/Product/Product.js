import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // const {name, img, seller, stock, price, key} = props.product;
    // console.log(props);
    const element = <FontAwesomeIcon icon={faShoppingCart} />
    const key = props.product?.key;
    return (
        <div className='product'>
            <div className='product-image'>
                <img src={props.product?.img} alt="ProductImage" />
            </div>
            <div className='productInfo'>
                <h4 className='product-name'><Link to={`/product/${key}`}>{props.product?.name}</Link></h4>
                <p><small>by : {props.product?.seller}</small></p>
                <p>Price : ${props.product?.price}</p>
                <p><small>Only {props.product?.stock} left in stock - order soon.</small></p>
                {props.showAddToCart && <button onClick={() => props.handleAddToCart(props.product)} className='btn-regular'> {element} Add to cart</button>}
            </div>
        </div>
    );
};

export default Product;