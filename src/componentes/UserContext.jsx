import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';


const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
      const decodedUser = jwtDecode(storedUser);
      setUser(decodedUser);
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate("/");
  };

  const isAdmin = () => {
    return user?.user_role === 'admin';
  };

  const isUser = () => {
    return user?.user_role === 'user';
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogOut, isAdmin, isUser, getToken }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
