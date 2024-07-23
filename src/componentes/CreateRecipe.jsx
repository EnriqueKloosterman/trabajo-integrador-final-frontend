import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from './UserContext';

const RecipeForm = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    categoryId: '',
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3030/api/v2/categories/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes iniciar sesión para crear una receta.',
      });
      return;
    }
  
    const descriptionArray = formData.description.split("//").filter(str => str.trim() !== '');
    const ingredientsArray = formData.ingredients.split("//").filter(str => str.trim() !== '');
    const instructionsArray = formData.instructions.split("//").filter(str => str.trim() !== '');
  
    const data = new FormData();
    data.append('title', formData.title);
    descriptionArray.forEach((desc, index) => data.append(`description[${index}]`, desc));
    ingredientsArray.forEach((ing, index) => data.append(`ingredients[${index}]`, ing));
    instructionsArray.forEach((ins, index) => data.append(`instructions[${index}]`, ins));
    data.append('image', formData.image);
    data.append('categoryId', formData.categoryId);
    data.append('userId', user.userId);
  
    try {
      const response = await fetch('http://localhost:3030/api/v2/recipes/register', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: data,
      });
  
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Receta creada con éxito',
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          navigate('/recipes');
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error('Error al crear la receta:', errorData);
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la receta',
          text: `Hubo un problema al crear la receta: ${errorData.message || 'Error desconocido'}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear la receta',
        text: 'Hubo un problema al crear la receta. Por favor, inténtalo de nuevo.',
      });
      console.error('Error al crear la receta:', error);
    }
  };

  return (
    <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Crear nueva receta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-800">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-800">
            Descripción (Agregar // al final de cada párrafo)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-gray-800">
            Ingredientes (Agregar // al final de cada ingrediente para separarlos)
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="instructions" className="block text-gray-800">
            Instrucciones (Agregar // al final de cada párrafo)
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryId" className="block text-gray-800">
            Categoría
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-800">
            Imagen
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-gray-900"
          >
            Crear Receta
          </button>
        </div>
      </form>
      <div className="text-center mt-8">
        <Link to="/profile">
            <button className="text-white bg-teal-600 hover:bg-teal-800 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 active:bg-gray-900">
              Volver al perfil
            </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeForm;
