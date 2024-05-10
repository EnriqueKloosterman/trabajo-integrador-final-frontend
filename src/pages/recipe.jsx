import React from 'react';
import './styles/Recipe.css';

const Recipe = ({ recipe }) => {
  return (
    <div className="recipe">
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-details">
        <h2>{recipe.title}</h2>
        <p>{recipe.description}</p>
      </div>
    </div>
  );
}

export default Recipe;