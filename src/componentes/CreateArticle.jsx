import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreateArticle() {
  const [formData, setFormData] = useState({
    title: "",
    article: [],
    img: "",
    category: "", // Cambiar a una cadena para almacenar la categoría seleccionada
    user_id: 1, // Usar mientras no haya inicio de sesión de usuarios
  });

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3306articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Artículo creado con éxito",
          showConfirmButton: false,
          timer: 7000,
        });
        Navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al crear el artículo",
          text: "Hubo un problema al crear el artículo. Por favor, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      console.error("Error al crear el artículo:", error);
    }
  };

  return (
    <div className="bg-green-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">Crear un nuevo artículo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-black">Título del Artículo</label>
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
          <label htmlFor="article" className="block text-black">Contenido del Artículo</label>
          <textarea
            id="article"
            name="article"
            value={formData.article.join("/")}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
          />
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
            <option value="Carnes Blancas">Carnes Blancas</option>
            <option value="Carnes Rojas">Carnes Rojas</option>
            <option value="Pescados y Mariscos">Pescados y Mariscos</option>
            <option value="Vegetariana">Vegetariana</option>
            <option value="Vegana">Vegana</option>
            <option value="Postres">Postres</option>
            <option value="Bebidas">Bebidas</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green active:bg-green-700"
        >
          Crear Artículo
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;
