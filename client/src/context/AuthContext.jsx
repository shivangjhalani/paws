import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/api';

const AuthContext = createContext(null);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider component
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userType: null,
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    if (token) {
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: true,
        userType,
        loading: true
      }));
      auth.getCurrentUser()
        .then(user => {
          setAuthState(prev => ({
            ...prev,
            user,
            loading: false
          }));
        })
        .catch(() => {
          logout();
        });
    } else {
      setAuthState(prev => ({
        ...prev,
        loading: false
      }));
    }
  }, []);

  const login = async (email, password) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const data = await auth.login({ email, password });
      setAuthState({
        isAuthenticated: true,
        userType: data.userType,
        user: data,
        loading: false,
        error: null
      });
      navigate(`/dashboard/${data.userType}`);
      return data;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const data = await auth.signup(userData);
      await login(userData.email, userData.password);
      return data;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      throw error;
    }
  };

  const logout = () => {
    auth.logout();
    setAuthState({
      isAuthenticated: false,
      userType: null,
      user: null,
      loading: false,
      error: null
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        userType: authState.userType,
        user: authState.user,
        loading: authState.loading,
        error: authState.error,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
