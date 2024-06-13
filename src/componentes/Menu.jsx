import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="bg-blue-100 p-4 shadow-md">
      <div className="container mx-auto flex justify-around">
        <Link to="/" className="text-black text-lg hover:text-gray-600 transition-colors duration-300">
          Inicio
        </Link>
        <Link to="/recipes" className="text-black text-lg hover:text-gray-600 transition-colors duration-300">
          Recetas
        </Link>
        <Link to="/articles" className="text-black text-lg hover:text-gray-600 transition-colors duration-300">
          Artículos
        </Link>
        <Link to="/comments" className="text-black text-lg hover:text-gray-600 transition-colors duration-300">
          Comentarios
        </Link>
        <Link to="/categories" className="text-black text-lg hover:text-gray-600 transition-colors duration-300">
          Categorías
        </Link>
      </div>
    </div>
  );
};

export default Menu;

