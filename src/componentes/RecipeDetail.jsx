import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { UserContext } from "./UserContext";
import Comments from "./Comments";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:3030/api/v2/recipes/recipe/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
      });
  }, [id]);

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-green-600 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h2 className="text-4xl font-semibold text-green-800 mb-4">{recipe.title}</h2>
            <p className="text-m mb-4 italic">{recipe.user.userName} {recipe.user.userLastName} <span className="font-semibold"> {recipe.user.userEmail}</span></p>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-green-700 mb-2">Descripción:</h3>
              {recipe.description.map((paragraph, i) => (
                <p key={i} className="text-gray-800 text-base">{paragraph}</p>
              ))}
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Ingredientes:</h3>
              <ul>
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i} className="text-gray-800 text-base mb-4">{ingredient}</li>
                ))}
              </ul>
              <ul>
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Instrucciones:</h3>
                {recipe.instructions.map((recipe, i) => (
                  <li key={i} className="text-gray-800 text-base mb-2">{recipe}</li>
                ))}
                <Comments recipeId={id} user={user}/>
              </ul>
            </div>
            <div className="text-center">
              <Link to="/recipes">
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 active:bg-green-800">
                  Volver a recetas
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
