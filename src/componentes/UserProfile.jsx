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
    return <p>Por favor, inicia sesión para ver tu perfil.</p>;
  }

  return (
    <div>
      <h1>Perfil de {user.name}</h1>
      <h2>Mis Artículos</h2>
      {articles.length > 0 ? (
        articles.map(article => (
          <Article key={article.id} {...article} />
        ))
      ) : (
        <p>No has creado ningún artículo.</p>
      )}
      <h2>Mis Recetas</h2>
      {recipes.length > 0 ? (
        recipes.map(recipe => (
          <Recipe key={recipe.id} {...recipe} />
        ))
      ) : (
        <p>No has creado ninguna receta.</p>
      )}
    </div>
  );
};

export default UserProfile;

