import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-around">
        <Link to="/recipes" className="text-white text-lg font-semibold hover:text-gray-400 transition-colors duration-300" style={{ textShadow: "1px 1px 3px #000000" }}>
          Recetas
        </Link>
        <Link to="/articles" className="text-white text-lg font-semibold hover:text-gray-400 transition-colors duration-300" style={{ textShadow: "1px 1px 3px #000000" }}>
          Artículos
        </Link>
        <Link to="/contact" className="text-white text-lg font-semibold hover:text-gray-400 transition-colors duration-300" style={{ textShadow: "1px 1px 3px #000000" }}>
          Contacto
        </Link>
      </div>
    </div>
  );
};

export default Menu;
