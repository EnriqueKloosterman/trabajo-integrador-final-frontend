import { useState, useEffect, useContext} from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';   
import { UserContext } from '../UserContext';


const UpdateArticle = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        title: '',
        article: '',
        tagId: ''
    });
    const [tags, setTags] = useState([]);
    const [authorEmail, setAuthorEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticleAndTags = async () => {
            try {
                const tagResponse = await fetch(
                    "http://localhost:3030/api/v2/tag/tags"
                );
                if(!tagResponse.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const tagData = await tagResponse.json();
                setTags(tagData);

                const articleResponse = await fetch(
                    `http://localhost:3030/api/v2/articles/article/${id}`
                );
                if(!articleResponse.ok) {
                    throw new Error("Failed to fetch article");
                }
                const articleData = await articleResponse.json();
                setAuthorEmail(articleData.user.userEmail);
                setFormData({
                    title: articleData.title || "",
                    article: articleData.article ? articleData.article.join("//") : "",
                    tagId: articleData.tag ? articleData.tag.tagId.toString() : ""
                });
                setLoading(false);
            } catch (error) {
                throw new Error("Error fetching data", error.message);
            }
        };

        fetchArticleAndTags();
    }, [id]);

    const handleChange = (e) => {
        const  { name, value } = e.target;
        setFormData({ ...formData, [name]: value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if(!token) {
                throw new Error("No token found");
            }
            if(!id) {
                throw new Error("Article ID is missing");
            }

            const body = JSON.stringify({
                ...formData,
                article: formData.article.split("//"),
                tagId: formData.tagId
            });

            const response = await fetch(
                `http://localhost:3030/api/v2/articles/update/article/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: body,
                }
            );
            if(!response.ok){
                const responseText = await response.text();
                throw new Error("Failed to update recipe", responseText);
            }
            navigate(`/articles/${id}`);
        } catch (error) {
            throw new Error("Error updating article", error.message);
        }
    }

    if(loading){
        return <div>Cargando...</div>
    }

    if(user.userEmail !== authorEmail){
        return (
            <div>
                <h1>No tienes permiso para editar este articulo</h1>
                <NavLink to="/">Volver</NavLink>
            </div>
        )
    }


    return (
        <div className="bg-lime-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Actualizar Articulo</h2>
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Instrucciones para actualizar articulos</h3>
                <p className="text-gray-700 mb-2">
                    Para actualizar el articulo, sigue estos pasos:
                </p>
                <ol className="list-decimal list-inside text-gray-700 mb-4">
                    <li className="mb-2">
                    Completa todos los campos del formulario con la información actualizada de tu articulo.
                    </li>
                    <li className="mb-2">
                    Al final de cada párrafo agrega <span className="font-bold">//</span> para separar los párrafos.
                    </li>
                    <li className="mb-2">
                    Haz clic en <span className='font-bold font'>Actualizar Articulo</span> para guardar los cambios.
                    </li>
                </ol>
                <p className="text-gray-700">
                    Una vez actualizada, tu receta estará disponible con la nueva información.
                </p>
            </div>
            <form onSubmit={handleSubmit} >
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
                    <label htmlFor="title" className="block text-gray-800">
                        Artículo
                    </label>
                    <textarea
                        type="text"
                        id="article"
                        name="article"
                        value={formData.article}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor="tagId" className="block text-gray-800">
                        Categoria
                    </label>
                    <select
                        id="tagId"
                        name="tagId"
                        value={formData.tagId}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                        <option value="" >Seleccione una categoría</option>
                        {tags.map((tag) => (
                            <option key={tag.tagId} value={tag.tagId}>
                                {tag.tag}
                            </option>
                        ))}
                    </select>
                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-teal-600 hover:bg-teal-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-gray-900 mt-5"
                        >
                            Actualizar Artículo
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default UpdateArticle