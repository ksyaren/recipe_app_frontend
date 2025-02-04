import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './recipeCard.css';

const RecipeCard = ({ id, title, description, image, onFavoriteToggle, isFavorited }) => {
  return (
    <div className="recipe-card">
      <img src={image} alt={title} className="recipe-image" />
      <div className="recipe-content">
        <Link to={`/recipe/${id}`} className="recipe-title-link">
          <h3>{title}</h3>
        </Link>
        <p>{description}</p>
        <button onClick={() => onFavoriteToggle({ id, title, description, image })} className="favorite-button">
          {isFavorited ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
