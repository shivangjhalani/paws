// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Changed from @/context/AuthContext

const ProtectedRoute = ({
  children,
  allowedUserTypes = [],
  requireAuth = true
}) => {
  const { isAuthenticated, userType } = useAuth();
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (requireAuth && allowedUserTypes.length > 0 &&
    !allowedUserTypes.includes(userType)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
