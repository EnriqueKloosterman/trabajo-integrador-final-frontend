import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import Comments from "./Comments";
import EditButton from "./EditButton";
import Swal from 'sweetalert2';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { user, getToken } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3030/api/v2/recipes/recipe/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
      });
  }, [id]);

  const handleDelete = async () => {
    const token = getToken();
    try {
      const response = await fetch(`http://localhost:3030/api/v2/recipes/remove/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Receta eliminada correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/profile');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar la receta',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      throw new Error('Error deleting Recipe', error);
    }
  };

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-green-600 border-solid"></div>
      </div>
    );
  }

  const canDelete = user && recipe.user && (user.userEmail === recipe.user.userEmail || (user.role === 'admin' || user.user_role === 'admin'));

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
                <Comments recipeId={id} user={user} token={getToken()}/>
              </ul>
            </div>
            <div className="text-right mb-4">
              <EditButton authorEmail={recipe.user.userEmail} editLink={`/update/recipe/${id}`} />
            </div>
            {canDelete && (
              <div className="text-right mb-4">
                <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-red-600 active:bg-red-800">
                  Eliminar Receta
                </button>
              </div>
            )}
            <div className="text-center">
              <Link to="/recipes">
                <button className="bg-teal-600 hover:bg-teal-800 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 active:bg-gray-900 transition-colors duration-300">
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
