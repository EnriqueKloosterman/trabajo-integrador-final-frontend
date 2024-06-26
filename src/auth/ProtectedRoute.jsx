import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../componentes/UserContext'; // Asegúrate de ajustar la ruta según la ubicación exacta de tu UserContext

function ProtectedRoute() {
  const { user } = useContext(UserContext); // Usa correctamente useContext para obtener el contexto

  if (!user) {
    return <Navigate to="/login" />; // Redirige al inicio de sesión si el usuario no está autenticado
  } else {
    return <Outlet />; // Renderiza las rutas secundarias anidadas
  }
}

export default ProtectedRoute;
