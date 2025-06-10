import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Vérifier le token au chargement
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Récupérer les informations utilisateur du token
        const userData = await authAPI.getCurrentUser();
        console.log('Initial user data:', userData);
        setUser(userData);
        setIsAdmin(userData.role === 'admin');
      } catch (err) {
        console.error('Auth init error:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const { token, user: userData } = await authAPI.login(email, password);
      console.log('Login successful:', { token, userData });

      localStorage.setItem('token', token);
      setUser(userData);
      setIsAdmin(userData.role === 'admin');
      return userData;
    } catch (err) {
      const errorMessage = err.message || 'Erreur lors de la connexion';
      console.error('Login error:', errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('token');
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      setError(null);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteUser = async (email) => {
    try {
      await authAPI.deleteUser(email);
      setError(null);
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erreur lors de la suppression de l\'utilisateur';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateUser = async (email, userData) => {
    try {
      const updatedUser = await authAPI.updateUser(email, userData);
      setError(null);
      return updatedUser;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erreur lors de la mise à jour de l\'utilisateur';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const value = {
    user,
    error,
    isAdmin,
    register,
    deleteUser,
    updateUser,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

export default AuthContext;