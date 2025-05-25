import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => api.get('/users').then(res => setUsers(res.data));

  useEffect(fetchUsers, []);

  const handleDelete = id => {
    if (window.confirm('Eliminar utilizador?')) {
      api.delete(`/users/${id}`).then(fetchUsers);
    }
  };

  return (
    <div className="admin-users">
      <h2>Gestão de Utilizadores</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th><th>Email</th><th>Role</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleDelete(u._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
