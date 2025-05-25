import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) setUser({ role });
  }, []);

  const login = async (email, senha) => {
    const res = await api.post('/auth/login', { email, senha });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role);
    setUser({ role: res.data.role });
    navigate('/');
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
