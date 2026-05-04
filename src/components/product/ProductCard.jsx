// ProductCard.jsx

import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <button className="cart-btn-animating">Add to Cart</button>
        </div>
    );
};

export default ProductCard;