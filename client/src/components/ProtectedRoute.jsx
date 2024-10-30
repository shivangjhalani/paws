// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ 
  children, 
  allowedUserTypes = [], 
  requireAuth = true 
}) => {
  const { auth } = useAuth();

  if (requireAuth && !auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAuth && allowedUserTypes.length > 0 && 
      !allowedUserTypes.includes(auth.userType)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
