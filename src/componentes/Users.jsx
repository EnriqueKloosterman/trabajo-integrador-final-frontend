import { Navigate } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

function Users() {
  const [users, setUsers] = useState([]);
  const usersUrl = "http://localhost:3030/api/v2/users/users";
  const { user, isAdmin, getToken } = useContext(UserContext); 

  useEffect(() => {
    if(!isAdmin){
      return;
    }
    
    fetch(usersUrl, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Expected an array of users but got:", data);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [isAdmin, getToken]);
  if(!isAdmin()) return <Navigate to="/" />

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8">Lista de Usuarios</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user, i) => (
          <li key={i} className="bg-white shadow-lg rounded-lg p-4">
            <img className="w-10 h-10 rounded-full mb-4" src={user.image} alt={user.userName} />
            <h2 className="text-xl font-semibold text-green-900 mb-2">{user.userName} {user.userLastName}</h2>
            <p className="text-lg text-green-700 mb-2">{user.userEmail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
