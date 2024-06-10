import  { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from './UserContext';

const RecipeForm = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    category: '',
    image: '',
  
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
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleFlieChange = (e) => {
  const { files } = e.target;
  setFormData({ ...formData, image: files[0] });
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes iniciar sesión para crear una receta.',
      });
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('ingredients', formData.ingredients);
    data.append('instructions', formData.instructions);
    data.append("image", formData.image);
    data.append("userId", user.userId);

    try {
      const response = await fetch('http://localhost:3030/api/v2/recipes/register', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
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
        }, 2000)
      } else {
        const errorData = await response.json()
        console.error('Error al crear la receta:', errorData);
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la receta',
          text: 'Hubo un problema al crear la receta. Por favor, inténtalo de nuevo.',
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
          <label htmlFor="description" className="block text-black">Descripción (Agregar // al final de cada párrafo)</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-black">Ingredientes (Agregar // al final de cada ingrediente para separarlos)</label>
          <input
            type="text"
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
          />
        <div className="mb-4">
          <label htmlFor="instructions" className="block text-black">Instrucciones (Agregar // al final de cada párrafo)</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
          />
        </div>
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-black">Categoría</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.categoryId}>{category.category} </option> 
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-black">Imagen</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFlieChange}
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
