// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = () => {
//   // Check if admin is logged in
//   const isAuthenticated = localStorage.getItem('access-admin');

//   // If not authenticated, redirect to login
//   if (!isAuthenticated) {
//     return <Navigate to="/admin/login" replace />;
//   }

//   // If authenticated, render child routes
//   return <Outlet />;
// };

// export default ProtectedRoute;