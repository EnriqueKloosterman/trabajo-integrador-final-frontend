import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const recipesUrl = "http://localhost:3030/api/v2/recipes/recipes";

  useEffect(() => {
    fetch(recipesUrl)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  useEffect(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);

  return (
    <div className="container mx-auto p-4 bg-blue-50 min-h-screen">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Buscar recetas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="py-2 px-4 bg-gray-800 text-white rounded-r-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Limpiar
        </button>
      </div>
      <div className="flex-col">
        {filteredRecipes.map((recipe, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-lg overflow-hidden article-card"
          >
            <Link to={`/recipes/${recipe.recipeId}`}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-1/3 h-48 ml-5 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold text-blue-700 mb-2">
                  {recipe.title}
                </h2>
                <div className="pl-6">
                  {recipe.description.slice(0, 1).map((paragraph, j) => (
                    <p key={j} className="text-gray-700 text-base mb-2">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/create-recipe">
          <button className="text-white bg-gray-800 hover:bg-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 active:bg-gray-900">
            Crear nueva receta
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Recipe;
