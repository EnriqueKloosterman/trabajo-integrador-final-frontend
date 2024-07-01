import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Comments({ articleId, recipeId, user, token }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(
                    articleId
                        ? `http://localhost:3030/api/v2/comments/article/${articleId}`
                        : `http://localhost:3030/api/v2/comments/recipe/${recipeId}`
                );
                const data = await res.json();
                if (Array.isArray(data)) {
                    setComments(data);
                } else {
                    console.error("Expected an array of comments but got:", data);
                    setComments([]);
                }
            } catch (err) {
                console.error("Error fetching comments:", err);
                setComments([]);
            }
        };

        fetchComments();
    }, [articleId, recipeId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await fetch(
                articleId
                    ? `http://localhost:3030/api/v2/comments/article/comment/${articleId}`
                    : `http://localhost:3030/api/v2/comments/recipe/comment/${recipeId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ comment: newComment }),
                }
            );

            if (response.ok) {
                const addedComment = await response.json();
                setComments([...comments, addedComment]);
                setNewComment("");
            } else {
                console.error("Error al enviar el comentario");
            }
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(
                `http://localhost:3030/api/v2/comments/remove/${commentId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const updatedComments = comments.filter(comment => comment.commentId !== commentId);
                setComments(updatedComments);
            } else {
                console.error("Error deleting comment");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Comentarios</h3>
            <div>
                {comments.map((comment) => (
                    <div key={comment.commentId} className="mb-4">
                        <div className="flex items-center">
                            <img
                                src={comment.user.image}
                                alt="user avatar"
                                className="h-8 w-8 mr-2 rounded-full object-cover"
                            />
                            <p className="text-sm text-gray-500">
                                {comment.user.name} {comment.user.lastName} 
                            </p>
                            {(user && (user.userEmail === comment.user.userEmail || user.role === 'admin')) && (
                                <button
                                    onClick={() => handleDeleteComment(comment.commentId)}
                                    className="ml-2 text-sm text-red-500"
                                >
                                    ❌
                                </button>
                            )}
                        </div>
                        <p className="text-gray-800">{comment.comment}</p>
                    </div>
                ))}
                {user ? (
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            className="w-full p-2 border rounded"
                            rows="4"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Escribe un comentario..."
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 active:bg-gray-900 transition-colors duration-300"
                        >
                            Comentar
                        </button>
                    </form>
                ) : (
                    <p className="text-gray-500">Debes iniciar sesión para comentar</p>
                )}
            </div>
        </div>
    );
}

Comments.propTypes = {
    articleId: PropTypes.string,
    recipeId: PropTypes.string,
    user: PropTypes.object,
    token: PropTypes.string,
};

export default Comments;
