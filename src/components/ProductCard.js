import React, { useState } from 'react';
import './ProductCard.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) stars.push(<FaStar key={i} className="filled-star" />);
    else if (i - rating < 1) stars.push(<FaStarHalfAlt key={i} className="half-star" />);
    else stars.push(<FaRegStar key={i} className="empty-star" />);
  }
  return stars;
};

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.images.yellow);
  const [selectedColor, setSelectedColor] = useState('yellow');

  const handleColorChange = (color, url) => {
    setCurrentImage(url);
    setSelectedColor(color);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={currentImage} alt={product.name} />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)} USD</p>
      <div className="color-options">
        {Object.entries(product.images).map(([color, url]) => (
          <button
            key={color}
            className={`color-button ${color} ${selectedColor === color ? 'selected' : ''}`}
            onClick={() => handleColorChange(color, url)}
          ></button>
          
        ))}
      </div>

      <div className="product-color-text">
        {selectedColor === 'yellow' && 'Yellow Gold'}
        {selectedColor === 'rose' && 'Rose Gold'}
        {selectedColor === 'white' && 'White Gold'}
      </div>

      <p className="product-rating">
        {renderStars(product.popularityScore)}
        <span>{product.popularityScore}</span>
      </p>
    </div>
  );
};

export default ProductCard;