import React from 'react';
import { useAuth } from './userContext';
import { Navigate } from 'react-router-dom';

const ProtectedComponent = ({ roles, children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (roles && !roles.includes(user.role)) {
    return <div>Access Denied</div>;
  }
  return <>{children}</>;
};
export default ProtectedComponent;