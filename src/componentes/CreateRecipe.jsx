import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: [],
    ingredients: [],
    category: '',
    img: '',
    userId: 1, // Usar mientras no haya inicio de sesión de usuarios
  });

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'description' || name === 'ingredients') {
      const arrayValue = value.split('/');
      setFormData({ ...formData, [name]: arrayValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3306/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Receta creada con éxito',
          showConfirmButton: false,
          timer: 10000,
        });
        Navigate('/recipes');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la receta',
          text: 'Hubo un problema al crear la receta. Por favor, inténtalo de nuevo.',
        });
      }
    } catch (error) {
      console.error('Error al crear la receta:', error);
    }
  };

  return (
    <div className="bg-green-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">Crear una nueva receta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-black">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-black">Descripción (Agregar / al final de cada párrafo)</label>
          <textarea
            id="description"
            name="description"
            value={formData.description.join('/')}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-black">Ingredientes (Agregar / al final de cada ingrediente para separarlos)</label>
          <input
            type="text"
            id="ingredients"
            name="ingredients"
            value={formData.ingredients.join('/')}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-black">Categoría</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="carnes blancas">Carnes Blancas</option>
            <option value="carnes rojas">Carnes Rojas</option>
            <option value="pescados">Pescados</option>
            <option value="vegetariana">Vegetariana</option>
            <option value="vegana">Vegana</option>
            <option value="postres">Postres</option>
            <option value="ensaladas">Ensaladas</option>
            <option value="sopas">Sopas</option>
            <option value="aperitivos">Aperitivos</option>
            <option value="otros">Otros</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="img" className="block text-black">URL de la imagen</label>
          <input
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green active:bg-green-700"
        >
          Crear Receta
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;