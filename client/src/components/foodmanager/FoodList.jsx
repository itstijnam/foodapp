import React from "react";
import { Edit3, Trash2, Eye, EyeOff } from "lucide-react";
import './FoodManager.scss'

const FoodList = ({ foods, onEdit, onDelete, onToggleLive }) => {
    return (
        <div className="food-list">
            <h2>Menu Items ({foods.length})</h2>
 
            {foods.length === 0 ? (
                <div className="empty-state">
                    <p>No food items yet. Add your first item to get started!</p>
                </div>
            ) : (
                <div className="food-grid">
                    {foods.map((food) => (
                        <div key={food.id} className={`food-card ${!food.isLive ? "inactive" : ""}`}>
                            <div className="food-image">
                                <img src={food?.image_link} alt={food.name} />
                                <div className="food-status">
                                    {food.isLive ? "🟢 Live" : "🔴 Hidden"}
                                </div>
                            </div>

                            <div className="food-info">
                                <h3>{food.foodname}</h3>
                                <p className="food-description">{food.description}</p>

                                <div className="food-details">
                                    <div className="detail-item">
                                        <span className="label">Cuisine:</span>
                                        <span>{food.cuisine}</span>
                                    </div>
                                </div>

                                <div className="price-section">
                                    {food.originalPrice && (
                                        <span className="old-price">₹{food.originalPrice}</span>
                                    )}
                                    <span className="current-price">₹{food.discountedPrice}</span>
                                    <span className="calories">🔥 {food.calories} cal</span>
                                </div>

                                {food.rating && (
                                    <div className="rating">
                                        ⭐ {food.rating}
                                    </div>
                                )}
                            </div>

                            <div className="food-actions">
                                <button
                                    className="action-btn edit"
                                    onClick={() => onEdit(food)}
                                    title="Edit"
                                >
                                    <Edit3 size={16} />
                                </button>
                                <button
                                    className="action-btn delete"
                                    onClick={() => onDelete(food._id)}
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <button
                                    className="action-btn toggle"
                                    onClick={() => onToggleLive(food.id)}
                                    title={food.isLive ? "Hide from menu" : "Show on menu"}
                                >
                                    {food.isLive ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FoodList;