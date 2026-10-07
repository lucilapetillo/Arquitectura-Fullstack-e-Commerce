import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const initializeAuth = async () => {
      const storedRefreshToken = localStorage.getItem('refreshToken');

      if (storedRefreshToken) {
        try {
          const response = await fetch('http://localhost:3000/api/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: storedRefreshToken })
          });

          if (response.ok) {
            const data = await response.json();
            const activeRole = data.role || data.rol;

            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('userType', data.userType);
            if (activeRole) localStorage.setItem('role', activeRole);
            if (data.nombre) localStorage.setItem('nombre', data.nombre);

            setToken(data.token);
            setRefreshToken(data.refreshToken);
            setUser({
              userType: data.userType,
              role: activeRole || null,
              rol: activeRole || null,
              nombre: data.nombre || ''
            });
          } else {
            clearSessionData();
          }
        } catch (error) {
          console.error('Error al restaurar sesión:', error);
          clearSessionData();
        }
      } else {
        clearSessionData();
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const clearSessionData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('role');
    localStorage.removeItem('nombre');
    setToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const login = (authData) => {
    const activeRole = authData.role || authData.rol;

    localStorage.setItem('token', authData.token);
    localStorage.setItem('refreshToken', authData.refreshToken);
    localStorage.setItem('userType', authData.userType);
    if (activeRole) localStorage.setItem('role', activeRole);
    if (authData.nombre) localStorage.setItem('nombre', authData.nombre);

    setToken(authData.token);
    setRefreshToken(authData.refreshToken);
    setUser({
      userType: authData.userType,
      role: activeRole || null,
      rol: activeRole || null,
      nombre: authData.nombre || ''
    });
  };

  const logout = async () => {
    const currentRefreshToken = refreshToken || localStorage.getItem('refreshToken');
    if (currentRefreshToken) {
      try {
        await fetch('http://localhost:3000/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: currentRefreshToken })
        });
      } catch (error) {
        console.error('Error en logout:', error);
      }
    }
    clearSessionData();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('error');
  }
  return context;
};