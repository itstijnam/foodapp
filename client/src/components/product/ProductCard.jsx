import React, { useState } from "react";
import "./ProductCard.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFood } from "../../redux/foodSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isAppOwner } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isAppOwner) {
      dispatch(setSelectedFood(product));
      navigate('food-manage');
    } else {
      dispatch(setSelectedFood(product));
      navigate('/product');
    }
  };

  return (
    <div
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image-container">
        <img src={product?.image_link} alt={product?.foodname} />
        <div className="card-badges">
          <span className="rating-badge">⭐ {product?.rating}</span>
          {product?.discountedPrice < product?.originalPrice && (
            <span className="discount-badge">
              {Math.round((1 - product.discountedPrice / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
        <div className="add-to-cart-preview">
          <button className="quick-add-btn">
            <span>+</span> Add to Cart
          </button>
        </div>
      </div>

      <div className="info">
        <div className="title-row">
          <h3>{product?.foodname}</h3>
          <p className="cuisine">{product?.cuisine}</p>
        </div>

        <div className="description">
          <p>Crispy, delicious and freshly made just for you!</p>
        </div>

        <div className="price-row">
          <div className="pricing">
            <span className="new-price">₹{product?.discountedPrice}</span>
            {product?.discountedPrice < product?.originalPrice && (
              <span className="old-price">₹{product?.originalPrice}</span>
            )}
          </div>
          <div className="calories">🔥 {product?.calories} cal</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;