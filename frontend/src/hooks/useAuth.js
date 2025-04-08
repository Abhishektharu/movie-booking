import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('access-admin');
    const userData = JSON.parse(localStorage.getItem('admin'));

    setIsAuthenticated(!!token);
    setUser(userData);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('access-admin');
    localStorage.removeItem('admin');
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, user, loading, logout };
};

export default useAuth;