import React, { useState } from "react";
import { Search, Filter, X, ChevronDown, Sparkles } from "lucide-react";
import "./Header.scss";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const tags = ["Rescued", "Vegan", "Delivery", ">100 cal", "Popular", "Trending", "New", "Under ₹200"];

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* App Logo/Title */}
        <div className="app-brand">
          <Sparkles size={22} className="sparkle-icon" />
          <h1>Foodie<span>Hub</span></h1>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          {/* <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search food, cravings, restaurants..." 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
              <button className="clear-btn" onClick={clearSearch}>
                <X size={16} />
              </button>
            )}
            <button 
              className={`filter-btn ${isFilterOpen ? 'active' : ''}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={18} />
              Filters
            </button>
          </div> */}

          {/* Expanded Filters (appears when filter button is clicked) */}
          {/* {isFilterOpen && (
            <div className="expanded-filters">
              <div className="filter-section">
                <h3>Dietary Preferences</h3>
                <div className="filter-options">
                  <span className="filter-option">Vegan</span>
                  <span className="filter-option">Vegetarian</span>
                  <span className="filter-option">Gluten-Free</span>
                  <span className="filter-option">Dairy-Free</span>
                </div>
              </div>
              <div className="filter-section">
                <h3>Price Range</h3>
                <div className="filter-options">
                  <span className="filter-option">Under ₹200</span>
                  <span className="filter-option">₹200-₹500</span>
                  <span className="filter-option">₹500+</span>
                </div>
              </div>
              <div className="filter-actions">
                <button className="apply-filters">Apply Filters</button>
                <button className="reset-filters" onClick={() => setIsFilterOpen(false)}>Cancel</button>
              </div>
            </div>
          )} */}
        </div>

        {/* Tags */}
        {/* <div className="tags-scroll-container">
          <div className="tags">
            {tags.map((tag, i) => (
              <span key={i} className="tag">
                {tag}
                {tag === "Trending" && <span className="fire-emoji">🔥</span>}
                {tag === "New" && <span className="new-badge">NEW</span>}
              </span>
            ))}
          </div>
          <button className="see-more-tags">
            More <ChevronDown size={16} />
          </button>
        </div> */}
      </div>
    </header>
  );
};

export default Header;