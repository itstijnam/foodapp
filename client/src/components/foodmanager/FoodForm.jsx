import React, { useState, useEffect } from "react";
import './FoodForm.scss'

const FoodForm = ({ onSubmit, editingFood, onCancel }) => {
    const [food, setFood] = useState({
        sku: "",
        foodname: "",
        cuisine: "",
        originalPrice: "",
        discountedPrice: "",
        calories: "",
        description: "",
        image_link: "",
    });

    useEffect(() => {
        if (editingFood) {
            setFood(editingFood);
        } else {
            setFood({
                sku: "",
                foodname: "",
                cuisine: "",
                originalPrice: "",
                discountedPrice: "",
                calories: "",
                description: "",
                image_link: "",
            });
        }
    }, [editingFood]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFood({ ...food, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!food.sku || !food.foodname) return;
        onSubmit(food);
    };

    return (
        <div className="food-form-container">
            <form className="food-form" onSubmit={handleSubmit}>
                <h3>{editingFood ? "Edit Food Item" : "Add New Food Item"}</h3>

                <div className="form-row">
                    <div className="form-group">
                        <label>SKU *</label>
                        <input
                            type="text"
                            name="sku"
                            placeholder="Unique SKU"
                            value={food.sku}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Food Name *</label>
                        <input
                            type="text"
                            name="foodname"
                            placeholder="e.g., Cheese Burger"
                            value={food.foodname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Cuisine</label>
                        <input
                            type="text"
                            name="cuisine"
                            placeholder="e.g., American, Italian"
                            value={food.cuisine}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Calories</label>
                        <input
                            type="number"
                            name="calories"
                            placeholder="Calories"
                            value={food.calories}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Original Price (₹)</label>
                        <input
                            type="number"
                            name="originalPrice"
                            placeholder="Original price"
                            value={food.originalPrice}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Discounted Price (₹)</label>
                        <input
                            type="number"
                            name="discountedPrice"
                            placeholder="Discounted price"
                            value={food.discountedPrice}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group full-width">
                    <label>Image URL</label>
                    <input
                        type="text"
                        name="image_link"
                        placeholder="Paste image URL here"
                        value={food.image_link}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={food.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                        {editingFood ? "Update Food" : "Add Food"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FoodForm;
