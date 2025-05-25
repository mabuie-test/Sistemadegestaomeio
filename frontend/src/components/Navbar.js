import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  if (!user) return null;

  return (
    <nav className="navbar">
      <Link to="/">Dashboard</Link>
      {user.role === 'admin' && (
        <>
          <Link to="/containers">Gestão Contentores</Link>
          <Link to="/users">Gestão Utilizadores</Link>
        </>
      )}
      <button onClick={logout}>Sair</button>
    </nav>
  );
}
