import React from "react";
import "./CartItem.scss";

const CartItem = ({ item }) => {
  return (
    <div className="cart-item">
      <img src={item.image_link} alt={item.foodname} />
      <div className="info">
        <h4>{item.foodname}</h4>
        <p className="desc">{item?.description}</p>
        {item.extra && <p className="extra">Extra: {item.extra}</p>}
        <p className="note">{item.note}</p>
      </div>
      <div className="price">
        <span>Quantity: {item.quantity}</span>
        <span className="amount">Price: ₹{item.price}/-</span>
      </div>
    </div>
  );
};

export default CartItem;
