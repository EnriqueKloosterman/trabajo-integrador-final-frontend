import { createContext, useState, useEffect } from "react";

//* Contexto para el usuario
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  }

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  }
  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogOut }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };