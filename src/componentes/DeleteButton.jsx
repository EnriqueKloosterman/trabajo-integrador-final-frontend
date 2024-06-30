import PropTypes from 'prop-types';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import Swal from 'sweetalert2';

const DeleteButton = ({ authorName, commentId, onDelete }) => {
  const { user } = useContext(UserContext);

//   if (!user || user.userName !== authorName) return null; 

    

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3030/api/v2/comments/remove/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Swal.fire({
        icon: 'success',
        title: 'Comentario eliminado',
        showConfirmButton: false,
        timer: 1500,
      });
      onDelete();
      } else {
        console.error('Error deleting comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  const currentUserIsAuthor = user && `${user.userName} ${user.userLastName}` === authorName;

  if (!currentUserIsAuthor) return null;

  return (
    <button
      onClick={handleDelete}
      className="bg-rose-800 hover:bg-rose-600 text-white font-semibold py-2 px-2 focus:outline-none focus:ring-2 focus:ring-gray-800 active:bg-gray-900 transition-colors duration-300 rounded-full"
    >🗑</button>
  );
};

DeleteButton.propTypes = {
  authorName: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
