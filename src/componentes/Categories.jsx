import React from 'react';
const Categories = () => {
  const categories = [
    "Carnes y Aves",
    "Pastas",
    "Legumbres y Verduras",
    "Salsas",
    "Postres y Dulces",
    "Repostería",
    "Bebidas y Cócteles",
    "Sopas y Cremas",
    "Pescados y Mariscos",
    "Masas y Pan",
    "Arroz"
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Categorías</h1>
      <ul className="list-disc list-inside">
        {categories.map((category, index) => (
          <li key={index} className="text-lg mb-2">{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
