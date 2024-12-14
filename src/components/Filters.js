import React, { useState } from 'react';
import './Filters.css';

const Filters = ({ onApplyFilters }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minPopularity, setMinPopularity] = useState('');
  const [maxPopularity, setMaxPopularity] = useState('');

  const handleApplyFilters = () => {
    onApplyFilters({ minPrice, maxPrice, minPopularity, maxPopularity });
  };

  return (
    <div className="filters">
      <h3>Filters</h3>
      <div className="filter-group">
        <label>Price Range:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min Price"
        /> -
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
        />
      </div>
      <div className="filter-group">
        <label>Popularity:</label>
        <input
          type="number"
          value={minPopularity}
          onChange={(e) => setMinPopularity(e.target.value)}
          placeholder="Min Popularity"
        /> -
        <input
          type="number"
          value={maxPopularity}
          onChange={(e) => setMaxPopularity(e.target.value)}
          placeholder="Max Popularity"
        />
      </div>
      <button onClick={handleApplyFilters} className="slide-underline-button">Apply</button>
    </div>
  );
};

export default Filters;
