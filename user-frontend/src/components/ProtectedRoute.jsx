import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles = ['admin'] }) => {
  const location = useLocation();
  
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('access-user');
  const user = JSON.parse(localStorage.getItem('user'));

  // If not authenticated, redirect to login page with return url
  if (!isAuthenticated) {
    return <Navigate to="/user/login" state={{ from: location }} replace />;
  }



  // If authenticated and authorized, render child routes
  return <Outlet />;
};

export default ProtectedRoute;