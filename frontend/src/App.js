import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedLayout from './components/ProtectedLayout';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import UsersAdminPage from './pages/UsersAdminPage';
import ContainersAdminPage from './pages/ContainersAdminPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Dashboard (qualquer utilizador autenticado) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Dashboard />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />

          {/* Gestão de Contentores (apenas admin) */}
          <Route
            path="/containers"
            element={
              <ProtectedRoute adminOnly>
                <ProtectedLayout>
                  <ContainersAdminPage />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />

          {/* Gestão de Utilizadores (apenas admin) */}
          <Route
            path="/users"
            element={
              <ProtectedRoute adminOnly>
                <ProtectedLayout>
                  <UsersAdminPage />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
