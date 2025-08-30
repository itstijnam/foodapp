import React, { useState } from "react";
import { ArrowLeft, Heart, MessageCircle } from "lucide-react";
import "./ProductDetail.scss";
import QuantitySelector from "../../components/product/QuantitySelector";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { selectedFood } = useSelector(store => store.food);

    const handleAddToCart = () => {
        if (!selectedFood) return;

        dispatch(addToCart({
            id: selectedFood.id,
            foodname: selectedFood.foodname,
            price: selectedFood.discountedPrice,
            quantity,
            image_link: selectedFood.image_link
        }));

        navigate("/checkout"); // redirect after adding
    };

    const handleWhatsAppClick = () => {
        if (!selectedFood) return;

        // WhatsApp message content
        const phoneNumber = "919311795543"; // without + sign
        const message = `Hello! I'm interested in ordering:\n\n*${selectedFood.foodname}*\nQuantity: ${quantity}\nPrice: ₹${selectedFood.discountedPrice * quantity}\n\nCan you please provide more details?`;

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            <button className="back-btn" onClick={() => navigate(-1)} >
                <ArrowLeft />
            </button>
            <div className="product-detail">
                {/* Image Section */}
                <div className="image-container">
                    <img src={selectedFood?.image_link} alt={selectedFood?.foodname} />
                    {/* <button className="fav-btn">
                        <Heart />
                    </button> */}
                </div>

                {/* Details Section */}
                <div className="details">
                    <h2>{selectedFood?.foodname}</h2>

                    <div className="meta">
                        <span className="price">₹{selectedFood?.discountedPrice}/-</span>
                        <span className="calories">🔥 {selectedFood?.calories} calories</span>
                        <span className="cuisine">{selectedFood?.cuisine}</span>
                    </div>

                    <p className="description">{selectedFood?.description}</p>

                    <div className="quantity-section">
                        <h3>Quantity</h3>
                        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                    </div>

                    <div className="actions">
                        <button className="whatsapp-btn" onClick={handleWhatsAppClick}>
                            <MessageCircle size={20} />
                            Order via WhatsApp
                            <span>₹{selectedFood?.discountedPrice * quantity}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;