import React from 'react';
import { useAuth } from './userContext';

const ProtectedComponent = ({ roles, children }) => {
  const { user } = useAuth(); 

  if (!roles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedComponent;