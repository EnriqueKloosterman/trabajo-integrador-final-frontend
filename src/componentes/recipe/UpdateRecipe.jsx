import { useState, useEffect, useContext } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const UpdateRecipe = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    categoryId: ""
  });
  const [categories, setCategories] = useState([]);
  const [authorEmail, setAuthorEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeAndCategories = async () => {
      try {
        const categoriesResponse = await fetch(
          "http://localhost:3030/api/v2/categories/categories"
        );
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const recipeResponse = await fetch(
          `http://localhost:3030/api/v2/recipes/recipe/${id}`
        );
        if (!recipeResponse.ok) {
          throw new Error("Recipe not found");
        }
        const recipeData = await recipeResponse.json();

        setAuthorEmail(recipeData.user.userEmail);
        setFormData({
          title: recipeData.title || "",
          description: recipeData.description ? recipeData.description.join("//") : "",
          ingredients: recipeData.ingredients ? recipeData.ingredients.join("//") : "",
          instructions: recipeData.instructions ? recipeData.instructions.join("//") : "",
          categoryId: recipeData.category ? recipeData.category.categoryId.toString() : ""
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRecipeAndCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!id) {
        console.error("No id");
        return;
      }

      const body = JSON.stringify({
        ...formData,
        description: formData.description.split("//"),
        ingredients: formData.ingredients.split("//"),
        instructions: formData.instructions.split("//"),
        categoryId: formData.categoryId
      });

      const response = await fetch(
        `http://localhost:3030/api/v2/recipes/update/recipe/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: body,
        }
      );

      if (!response.ok) {
        const responseText = await response.text();
        console.error("Failed to update recipe", responseText);
        throw new Error("Failed to update recipe");
      }
      navigate(`/recipes/${id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (user.userEmail !== authorEmail) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-lime-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Actualizar receta</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">Instrucciones para actualizar recetas</h3>
        <p className="text-gray-700 mb-2">
          Para actualizar la receta, sigue estos pasos:
        </p>
        <ol className="list-decimal list-inside text-gray-700 mb-4">
          <li className="mb-2">
            Completa todos los campos del formulario con la información actualizada de tu receta.
          </li>
          <li className="mb-2">
            Haz clic en Actualizar Receta para guardar los cambios.
          </li>
        </ol>
        <p className="text-gray-700">
          Una vez actualizada, tu receta estará disponible con la nueva información.
        </p>
      </div>
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
        <div className="text-right">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-gray-900"
          >
            Actualizar Receta
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRecipe;
