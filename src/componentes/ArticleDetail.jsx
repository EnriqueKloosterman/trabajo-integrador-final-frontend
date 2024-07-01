import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Comments from "./Comments";
import { UserContext } from "./UserContext"; 
import EditButton from "./EditButton";
import Swal from 'sweetalert2';

function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const { user, getToken } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetch(`http://localhost:3030/api/v2/articles/article/${id}`);
                const data = await res.json();
                setArticle(data);
            } catch (error) {
                console.error("Error fetching article data:", error);
            }
        };

        fetchArticle();
    }, [id]);

    const handleDelete = async () => {
        const token = getToken();
        try {
            const response = await fetch(`http://localhost:3030/api/v2/articles/remove/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            if(response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Artículo eliminado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/profile');
            } else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar el artículo',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            throw new Error("Error deleting article:", error);
        }
    }

    if (!article) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-purple-600 border-solid"></div>
            </div>
        );
    }

    const canDelete = user && article.user && (user.userEmail === article.user.userEmail || user.user_role === "admin");

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-12 px-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-64 object-cover" />
                    <div className="p-6">
                        <h2 className="text-3xl font-semibold text-black mb-4">{article.title}</h2>
                        <p className="text-m mb-4 italic">
                            {article.user.userName} {article.user.userLastName}{" "}
                            <span className="font-semibold"> {article.user.userEmail}</span>
                        </p>
                        {article.article.map((paragraph, i) => (
                            <p key={i} className="text-gray-800 text-base mb-4">{paragraph}</p>
                        ))}
                        <Comments articleId={id} user={user} token={getToken()}/>
                        <div className="text-right mb-4">
                            <EditButton authorEmail={article.user.userEmail} editLink={`/update/article/${id}`} />
                        </div>
                        {canDelete && (
                            <div className="text-right mb-4">
                                <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-red-600 active:bg-red-800"> 
                                    Eliminar Artículo
                                </button>
                            </div>
                        )}
                        <div className="text-center">
                            <Link to="/">
                                <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 active:bg-gray-900 transition-colors duration-300">
                                    Volver
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleDetail;
