// import { useState, useEffect } from 'react';

// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem('access-admin');
//       setIsAuthenticated(!!token);
//       setLoading(false);
//     };

//     checkAuth();
//   }, []);

//   return { isAuthenticated, loading };
// };

// export default useAuth;