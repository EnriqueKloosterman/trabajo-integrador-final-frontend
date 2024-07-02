import { useContext } from "react";
import { UserContext } from "../componentes/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

function ProtectedAdminRoutes(){
    const { isAdmin } = useContext(UserContext);
  
    if (!isAdmin() ) {
      return <Navigate to="/" />;
    }
  
    return <Outlet />;
  }

  ProtectedAdminRoutes.propTypes = {
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


export default ProtectedAdminRoutes