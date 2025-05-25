import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  // Se não estiver autenticado, não mostrar nada
  if (!user) return null;

  return (
    <nav className="navbar">
      <Link to="/">Dashboard</Link>
      {user.role === 'admin' && <Link to="/users">Gestão de Utilizadores</Link>}
      <button onClick={logout}>Sair</button>
    </nav>
  );
}
