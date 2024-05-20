import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const usersUrl = "http://localhost:3306/users";

  useEffect(() => {
    fetch(usersUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8">Lista de Usuarios</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user, i) => (
          <li key={i} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold text-green-900 mb-2">{user.name} {user.lastName}</h2>
            <p className="text-lg text-green-700 mb-2">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
