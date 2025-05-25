import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();
    login(email, senha);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Entrar</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <label>Senha:</label>
      <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}
