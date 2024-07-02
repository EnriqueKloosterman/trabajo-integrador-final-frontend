import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";

const RecipeUpdate = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const history = useHistory(); 
    const [recipe, setRecipe] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        ingredients: "",
        instructions: ""
    });

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await fetch(`http://localhost:3030/api/v2/recipes/${id}`);
                const data = await res.json();
                setRecipe(data);
                setFormData({
                    title: data.title,
                    description: data.description,
                    ingredients: data.ingredients.join("\n"),
                    instructions: data.instructions.join("\n")
                });
            } catch (error) {
                console.error("Error fetching recipe data:", error);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3030/api/v2/recipes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    ingredients: formData.ingredients.split("\n").map(item => item.trim()),
                    instructions: formData.instructions.split("\n").map(step => step.trim())
                })
            });
            if (res.ok) {
                history.push(`/recipes/${id}`);
            } else {
                console.error("Failed to update recipe");
            }
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    };

    if (!recipe) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-purple-600 border-solid"></div>
            </div>
        );
    }

    if (!user || recipe.authorEmail !== user.userEmail) {
        return <p>No tienes permisos para editar esta receta.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-purple-700 mb-8">Editar Receta</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Título de la receta"
                        className="block w-full px-4 py-3 placeholder-gray-500 border rounded-lg focus:outline-none focus:border-purple-700"
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Descripción"
                        className="block w-full px-4 py-3 placeholder-gray-500 border rounded-lg focus:outline-none focus:border-purple-700"
                        required
                    ></textarea>
                    <textarea
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Ingredientes (separa cada uno con una nueva línea)"
                        className="block w-full px-4 py-3 placeholder-gray-500 border rounded-lg focus:outline-none focus:border-purple-700"
                        required
                    ></textarea>
                    <textarea
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Instrucciones (separa cada paso con una nueva línea)"
                        className="block w-full px-4 py-3 placeholder-gray-500 border rounded-lg focus:outline-none focus:border-purple-700"
                        required
                    ></textarea>
                </div>
                <div className="flex justify-end mt-4">
                    <Link to={`/recipes/${id}`} className="mr-4 text-purple-700 hover:underline">
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 active:bg-purple-800 transition-colors duration-300"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RecipeUpdate;
