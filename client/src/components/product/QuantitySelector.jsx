import React from "react";
import "./QuantitySelector.scss";

const QuantitySelector = ({ quantity, setQuantity }) => {

    return (
        <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
    );
};

export default QuantitySelector;
