import { useContext } from "react";
import { UserContext } from "../componentes/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

function ProtectedRouteLogin(){
    const { user } = useContext(UserContext);
  
    if (user) {
      return <Navigate to="/profile" />;
    }
  
    return <Outlet />;
  }

  ProtectedRouteLogin.propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      isAdmin: PropTypes.bool,
    }),
    admin: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  };


export default ProtectedRouteLogin