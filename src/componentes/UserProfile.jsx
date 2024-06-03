import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import Article from './article';
import Recipe from './recipe';

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3030/api/v2/articles/articles?userId=${user.id}`)
        .then(response => response.json())
        .then(data => setArticles(data))
        .catch(error => console.error('Error fetching articles:', error));

      fetch(`http://localhost:3030/api/v2/recipes/recipes?userId=${user.id}`)
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
      <h1 className="text-3xl font-bold mb-4 text-black">Perfil de {user.name}</h1>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-black">Mis Artículos</h2>
        {articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map(article => (
              <Article key={article.id} {...article} />
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
              <Recipe key={recipe.id} {...recipe} />
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
