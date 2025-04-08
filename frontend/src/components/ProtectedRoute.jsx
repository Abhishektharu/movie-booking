import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles = ['admin'] }) => {
  const location = useLocation();
  
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('access-admin');
  const user = JSON.parse(localStorage.getItem('admin'));

  // If not authenticated, redirect to login page with return url
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and authorized, render child routes
  return <Outlet />;
};

export default ProtectedRoute;