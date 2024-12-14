import React, { useEffect, useState, useRef } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from './ProductCard';
import Filters from './Filters';
import './ProductList.css';
import { useSwipeable } from 'react-swipeable';
import { ChevronLeft, ChevronRight } from 'react-feather';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const carouselRef = useRef(null);

  const fetchFilteredProducts = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const data = await fetchProducts(params);
    setProducts(data);
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, []);

  const scrollCarousel = (direction) => {
    const scrollAmount = carouselRef.current.offsetWidth;
    if (direction === 'left') {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };


  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => scrollCarousel('right'),
    onSwipedRight: () => scrollCarousel('left'),
  });

  const applyFilters = (filters) => {
    fetchFilteredProducts(filters);
    setShowFilters(false);
  };

  return (
    <div className="product-list">
      <button className="slide-underline-button" onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? 'Close' : 'Show Filters'}
      </button>

      {showFilters && (
        <div className="filter-menu">
          <Filters onApplyFilters={applyFilters} />
        </div>
      )}

      <div className="carousel-wrapper">
        <div className="carousel-container" {...swipeHandlers}>
          <button className="arrow left-arrow" onClick={() => scrollCarousel('left')}>
            <ChevronLeft size={48} strokeWidth={1.5} />
          </button>
          <div className="carousel" ref={carouselRef}>
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
          <button className="arrow right-arrow" onClick={() => scrollCarousel('right')}>
            <ChevronRight size={48} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
