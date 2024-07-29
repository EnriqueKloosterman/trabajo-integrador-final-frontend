import  { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { user, isAdmin } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [recipes, setRecipes] = useState([]);


  useEffect(() => {
    if(user) {
      fetch(`http://localhost:3030/api/v2/articles/articles/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      })
      .then(Response => Response.json())
      .then(data => setArticles(data))
      .catch(error => console.error(`Error fetching articles`,error));
      
      fetch(`http://localhost:3030/api/v2/recipes/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      })
        .then(response => response.json())
        .then(data => setRecipes(data))
        .catch(error => console.error('Error fetching recipes:', error));
    }
}, [user]);

  if (!user) {
    return <p className="text-center text-red-500">Por favor, inicia sesión para ver tu perfil.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-black text-center">Bienvenido {user.userName} {user.userLastName}</h1>
      <div className="flex items-center justify-center mb-4">
        <img src={user.image} alt="avatar" className="h-32 w-32 rounded-full object-cover" />
      </div>
      <div className="text-center mt-8">
        <Link to="/create-article">
          <button className="text-white bg-teal-600 hover:bg-teal-800 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 active:bg-gray-900">
            Crear nuevo Artículo
          </button>
        </Link>
      </div>
      <div className="text-center mt-8">
        <Link to="/create-recipe">
          <button className="bg-teal-600 hover:bg-teal-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-gray-900 transition duration-150 ease-in-out shadow-md hover:shadow-lg">
            Crear nueva receta
          </button>
        </Link>
      </div>
      {isAdmin() && (
        <div className="text-center mt-8">
          <Link to="/users">
            <button className="bg-teal-600 hover:bg-teal-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-gray-900 transition duration-150 ease-in-out shadow-md hover:shadow-lg">
              Lista de Usuarios
            </button>
          </Link>
        </div>
      )}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-black">Mis Artículos</h2>
        {articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map(article => (
                <Link to={`/articles/${article.articleId}`} key={article.articleId} className="p-4 rounded">
                  <img src={article.image} alt="imagen" className="h-16 w-16 object-cover rounded mb-2" />
                  <h2 className="text-lg font-bold">{article.title}</h2>
                </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No has creado ningún artículo.</p>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-black">Mis Recetas</h2>
        {recipes.length > 0 ? (
          <div className="space-y-4">
            {recipes.map(recipe => (
              <Link to={`/recipes/${recipe.recipeId}`} key={recipe.recipeId} className="p-4 rounded">
              <img src={recipe.image} alt="imagen" className="h-16 w-16 object-cover rounded mb-2" />
              <h2 className="text-2xl font-bold">{recipe.title}</h2>
            </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No has creado ninguna receta.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
