import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedUser = jwtDecode(storedToken);
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

  const isAdmin = async () => {
    return await user?.role === 'admin';
  };

  const isUser =  () => {
    return user?.role === 'user';
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
