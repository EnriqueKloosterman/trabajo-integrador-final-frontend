
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "./UserContext";

function CreateArticle() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    article: "",
    image: null,
    tag: "",
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:3030/api/v2/tag/tags");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData({ ...formData, image: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Error al crear el artículo",
        text: "Debes iniciar sesión para crear un artículo.",
      });
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("article", formData.article);
    data.append("image", formData.image);
    data.append("userId", user.userId);

    try {
      const response = await fetch("http://localhost:3030/api/v2/articles/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: data,
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Artículo creado con éxito",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        Swal.fire({
          icon: "error",
          title: "Error al crear el artículo",
          text: `Hubo un problema al crear el artículo: ${errorData.message || 'Error desconocido'}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear el artículo",
        text: "Hubo un problema al crear el artículo. Por favor, inténtalo de nuevo.",
      });
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
            value={formData.article}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-black">Imagen</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tag" className="block text-black">Categoría</label>
          <select
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((tag) => (
              <option key={tag.tagId} value={tag.tagId}>{tag.tag}</option>
            ))}
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

