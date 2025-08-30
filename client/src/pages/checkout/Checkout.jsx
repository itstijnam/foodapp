import React from "react";
import "./Checkout.scss";
import CartItem from "../../components/product/CartItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Checkout = () => {
    const navigate = useNavigate();
    const cartItems = useSelector(store => store.cart.items);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="checkout">
            <section className="cart-section">
                <h2>My Cart</h2>
                {cartItems.length === 0 ? (
                    <p>No items in cart</p>
                ) : (
                    cartItems.map((item) => (
                        <CartItem key={item?._id} item={item} />
                    ))
                )}
                <button className="discount-btn">+ Add discount</button>
            </section>

            <aside className="summary">
                <h3>Total Payment</h3>
                <div className="summary-box">
                    <div className="row">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Fee</span>
                        <span>₹0</span>
                    </div>
                    <div className="row total">
                        <span>Remaining</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <button className="order-btn" onClick={() => navigate('/address')}>
                        Send Order
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default Checkout;