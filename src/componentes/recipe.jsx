import  { useState, useEffect } from "react";
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
    <div className="grid grid-cols-1 gap-4 mt-8">
      {filteredRecipes.map((recipe, i) => (
        <div
          key={i}
          className="bg-white shadow-md rounded-lg overflow-hidden recipe-card"
        >
          <Link to={`/recipes/${recipe.recipeId}`} className="block group">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {recipe.title}
              </h2>
              <div className="pl-6">
                {recipe.description.slice(0, 1).map((paragraph, j) => (
                  <p key={j} className="text-gray-700 text-base mb-2">
                    {paragraph.slice(0, 100)} 
                    {paragraph.length > 100 && "..."} 
                  </p>
                ))}
              </div>
            </div>
          </Link>
        </div>
      ))}

    </div>
  );
}

export default Recipe;
