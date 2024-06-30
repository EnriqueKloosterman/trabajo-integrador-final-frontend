import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        if (!response.ok) {
          throw new Error("Error al obtener las categorías.");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
        Swal.fire({
          icon: "error",
          title: "Error al obtener las categorías",
          text: "Hubo un problema al cargar las categorías. Por favor, inténtalo de nuevo más tarde.",
        });
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
      const response = await fetch(
        "http://localhost:3030/api/v2/articles/register",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: data,
        }
      );
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
          text: `Hubo un problema al crear el artículo: ${
            errorData.message || "Error desconocido"
          }`,
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
    <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Crear un nuevo artículo</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">Instrucciones para subir artículos</h3>
        <p className="text-lg text-gray-700 mb-4">
          Para subir un nuevo artículo, sigue estos pasos:
        </p>
        <ol className="list-decimal list-inside text-lg text-gray-700 mb-6">
          <li className="mb-2">
            Completa todos los campos del formulario con la información de tu artículo.
          </li>
          <li className="mb-2">
            Al final de cada párrafo agrega <span className="font-bold">//</span> para separar los párrafos.
          </li>
          <li className="mb-2">
            Añade una imagen del artículo en el campo de archivo.
          </li>
          <li className="mb-2">
            Haz clic en <span className="font-bold">Crear Artículo</span> para subir la receta.
          </li>
          <li className="mb-2">
            Asegúrate de estar registrado y haber iniciado sesión antes de subir un artículo.
          </li>
        </ol>
        <p className="text-lg text-gray-700">
          Una vez publicado, tu artículo estará disponible para que otros usuarios lo vean y comenten.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg text-gray-800 mb-2">Título del Artículo</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="article" className="block text-lg text-gray-800 mb-2">Contenido del Artículo</label>
          <textarea
            id="article"
            name="article"
            value={formData.article}
            onChange={handleChange}
            required
            className="w-full h-48 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-lg text-gray-800 mb-2">Imagen</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="tag" className="block text-lg text-gray-800 mb-2">Categoría</label>
          <select
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-lg"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((tag) => (
              <option key={tag.tagId} value={tag.tagId}>
                {tag.tag}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-gray-900 transition duration-150 ease-in-out shadow-md hover:shadow-lg"
        >
          Crear Artículo
        </button>
      </form>
      <div className="text-center mt-8">
        <Link to="/profile">
            <button className="text-white bg-gray-800 hover:bg-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 active:bg-gray-900">
              Volver al perfil
            </button>
        </Link>
      </div>
    </div>
  );
}

export default CreateArticle;
