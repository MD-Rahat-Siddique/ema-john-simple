import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    // const { name, quantity } = props.product;
    // console.log(props);
    return (
        <div className="item-container">
            <div className="item-img">
                <img src={props.product?.img} alt="img"></img>
            </div>
            <div className="item-body">
                <h4>{props.product?.name}</h4>
                <p>Quantity : {props.product?.quantity}</p>
                <br></br>
                <button onClick={() => props.removeProduct(props.product?.key)} className="btn-regular">Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;