import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { key } = useParams();

    const [detail, setDetail] = useState([]);
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON')
            .then(res => res.json())
            .then(data => setDetail(data))
    }, [])

    const product = detail?.find(pd => pd.key === key);

    return (
        <div>
            <div className="detail-container">
                <b>Your Product Details - </b>
                <Product showAddToCart={false} product={product}></Product>
            </div>
        </div>
    );
};

export default ProductDetail;