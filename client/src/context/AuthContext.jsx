import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    userType: null, // 'adopter' or 'rehomer'
    user: null
  });

  const login = (userData, userType) => {
    setAuth({
      isAuthenticated: true,
      userType,
      user: userData
    });
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      userType: null,
      user: null
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
