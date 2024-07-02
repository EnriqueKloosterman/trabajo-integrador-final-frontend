import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useParams } from "react-router-dom";

const UserList = () => {
  const { isAdmin, getToken } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getToken();
        const url = id
          ? `http://localhost:3030/api/v2/users/${id}`
          : "http://localhost:3030/api/v2/users";
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(
          "Error al obtener los usuarios. Por favor, inténtalo de nuevo más tarde."
        );
      }
    };

    fetchUsers();
  }, [getToken, id]);

  const handleRemoveUser = async (userId) => {
    try {
      const token = getToken();
      const response = await fetch(
        `http://localhost:3030/api/v2/users/remove/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user.userId !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(
        "Error al eliminar usuario. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        Lista de Usuarios
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user, i) => (
          <li key={i} className="bg-white shadow-lg rounded-lg p-4">
            <img
              className="w-10 h-10 rounded-full mb-4"
              src={user.image}
              alt={`${user.userName} ${user.userLastName}`}
            />
            <h2 className="text-xl font-semibold text-green-900 mb-2">
              {user.userName} {user.userLastName}
            </h2>
            <p className="text-lg text-green-700 mb-2">{user.userEmail}</p>
            {isAdmin() && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleRemoveUser(user.userId)}
              >
                Eliminar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
