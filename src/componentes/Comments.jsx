import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Comments({ articleId, user }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

useEffect(() => {
    const fetchComments = async () => {
        try {
            const res = await fetch(`http://localhost:3030/api/v2/comments/article/${articleId}`);
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
}, [articleId]);


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await fetch(`http://localhost:3030/api/v2/comments/article/comment/${articleId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                },
                body: JSON.stringify({ comment: newComment }),
            });

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

    return (
        <div>
            <h3 className='text-xl font-semibold mb-4'>Comentarios</h3>
            <div>
                {comments.map((comment) => (
                    <div key={comment.commentId} className='mb-4'>
                        <div className='flex items-center'>
                            <img src={comment.user.image} alt="user avatar" className='h-8 mr-2 rounded-full object-cover' />
                            <p className='text-sm text-gray-500'>{comment.user.name} {comment.user.lastName}</p>
                        </div>
                        <p className='text-gray-800'>{comment.comment}</p>

                    </div>
                ))}
                {user ? (
                    <form onSubmit={handleCommentSubmit}>
                        <textarea className='w-full p-2 border rounded' rows="4" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder='Escribe un comentario...'></textarea>
                        <button type='submit' className='bg-purple-600 text-white py-2 px-4 rounded mt-2'>Comentar</button>
                    </form>
                ) : (
                    <p className='text-gray-500'>Debes iniciar sesión para comentar</p>
                )}
            </div>
        </div>
    );
}

Comments.propTypes = {
    articleId: PropTypes.string,
    user: PropTypes.object
};

export default Comments;
