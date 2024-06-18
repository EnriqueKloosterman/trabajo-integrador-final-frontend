import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryRecipes = () => {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3030/api/v2/categories/${id}/recipes`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      });
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recetas de la Categoría</h1>
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe, i) => (
          <div className="recipe-card" key={i}>
            <Link to={`/recipes/${recipe.recipeId}`} className="block group">
              <li className="bg-white shadow-md rounded-lg overflow-hidden h-full transition transform hover:scale-105 hover:shadow-lg duration-200 ease-in-out">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-semibold text-blue-900 mb-2 group-hover:text-blue-700 transition duration-200">
                    {recipe.title}
                  </h2>
                </div>
              </li>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CategoryRecipes;
