import React, { useState, useEffect } from "react";
import "./Home.scss";
import ProductCard from "../../components/product/ProductCard";
import { useSelector } from "react-redux";
import useGetAllFoodList from "../../hooks/useGetAllFoodList";

const Home = () => {
  const { isAppOwner } = useSelector(store => store.auth);
  const { foods } = useSelector(store => store.food);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredFoods, setFilteredFoods] = useState([]);

  useGetAllFoodList();

  // Define categories based on your food data
  const categories = [
    "All",
    "Gol Gappe",
    "Poha",
    "Healthy",
    "Popular",
    "Under 200 cal",
    "Discounts"
  ];

  // Filter foods based on active category
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredFoods(foods);
    }
    else if (activeCategory === "Gol Gappe") {
      setFilteredFoods(foods.filter(food =>
        food.foodname.toLowerCase().includes("gol gappe") ||
        food.foodname.toLowerCase().includes("pani puri") ||
        food.foodname.toLowerCase().includes("puchka")
      ));
    }
    else if (activeCategory === "Poha") {
      setFilteredFoods(foods.filter(food =>
        food.foodname.toLowerCase().includes("poha")
      ));
    }
    else if (activeCategory === "Healthy") {
      setFilteredFoods(foods.filter(food =>
        food.calories < 300 ||
        food.foodname.toLowerCase().includes("salad") ||
        food.foodname.toLowerCase().includes("healthy")
      ));
    }
    else if (activeCategory === "Popular") {
      // Since we don't have rating in schema, we'll use discount as popularity indicator
      setFilteredFoods(foods.filter(food =>
        food.discountedPrice < food.originalPrice * 0.8 // 20%+ discount
      ));
    }
    else if (activeCategory === "Under 200 cal") {
      setFilteredFoods(foods.filter(food =>
        food.calories > 0 && food.calories <= 200
      ));
    }
    else if (activeCategory === "Discounts") {
      setFilteredFoods(foods.filter(food =>
        food.discountedPrice < food.originalPrice
      ));
    }
    else {
      // Filter by cuisine for other categories
      setFilteredFoods(foods.filter(food =>
        food.cuisine && food.cuisine.some(c =>
          c.toLowerCase().includes(activeCategory.toLowerCase())
        )
      ));
    }
  }, [activeCategory, foods]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Cam<span>fro</span></h1>
        <p>Discover delicious meals delivered to your door</p>
      </header>

      {isAppOwner && (
        <div className="admin-notice">
          <span>👋 Admin Mode: Click on any product to manage</span>
        </div>
      )}

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
            {category === "Popular" && " 🔥"}
            {category === "Discounts" && " 💰"}
            {category === "Under 200 cal" && " ⚡"}
          </button>
        ))}
      </div>

      <main className="product-list">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))
        ) : (
          <div className="no-results">
            <h3>No food items found in "{activeCategory}" category</h3>
            <p>Try selecting a different category or check back later</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;