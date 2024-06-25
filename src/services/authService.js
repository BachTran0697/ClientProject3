import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct named import

const API_BASE_URL = 'https://localhost:7099';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedUser = decodeToken(storedToken);
        if (isTokenExpired(decodedUser)) {
          logout();
        } else {
          setUser(decodedUser);
          // console.log('Loaded user from token:', decodedUser); // Debug log
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        logout();
      }
    }
  }, []);

  const decodeToken = (token) => {
    const decoded = jwtDecode(token);
    return {
      username: decoded.Username,
      roleId: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      exp: decoded.exp, // Add token expiration
    };
  };

  const isTokenExpired = (decodedUser) => {
    const currentTime = Date.now() / 1000;
    return decodedUser.exp < currentTime;
  };

  const login = async (logiN_NAME, logiN_PASSWORD) => {
    const response = await fetch(`${API_BASE_URL}/api/Auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ logiN_NAME, logiN_PASSWORD }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const { token } = await response.json();
    const decodedUser = decodeToken(token);
    // console.log('Decoded user data:', decodedUser); // Debug log
    localStorage.setItem('token', token);
    setUser(decodedUser);
    return decodedUser;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
