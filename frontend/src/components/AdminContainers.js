import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function AdminContainers() {
  const [contentores, setContentores] = useState([]);
  const [form, setForm] = useState({ lat: '', lng: '' });

  const fetchContainers = () =>
    api.get('/contentores').then(res => setContentores(res.data));

  useEffect(fetchContainers, []);

  const handleDelete = id => {
    if (window.confirm('Eliminar este contentor?')) {
      api.delete(`/contentores/${id}`).then(fetchContainers);
    }
  };

  const handleNivel = (id, nivelAtual) => {
    const novo = prompt('Novo nível (%):', nivelAtual);
    if (novo != null) {
      const nivelNum = parseInt(novo, 10);
      if (!isNaN(nivelNum)) {
        api.put(`/contentores/${id}/nivel`, { nivel: nivelNum })
           .then(fetchContainers);
      } else {
        alert('Valor inválido.');
      }
    }
  };

  const handleAdd = e => {
    e.preventDefault();
    const lat = parseFloat(form.lat);
    const lng = parseFloat(form.lng);
    if (isNaN(lat) || isNaN(lng)) {
      alert('Coordenadas inválidas.');
      return;
    }
    api.post('/contentores', {
      gps: { lat, lng },
      nivel: 0
    }).then(() => {
      setForm({ lat: '', lng: '' });
      fetchContainers();
    });
  };

  return (
    <div className="admin-containers">
      <h2>Gestão de Contentores</h2>

      <form onSubmit={handleAdd} style={{ marginBottom: '1em' }}>
        <label>Lat: </label>
        <input
          type="text"
          value={form.lat}
          onChange={e => setForm({ ...form, lat: e.target.value })}
          required
        />
        <label> Lng: </label>
        <input
          type="text"
          value={form.lng}
          onChange={e => setForm({ ...form, lng: e.target.value })}
          required
        />
        <button type="submit">Adicionar Contentor</button>
      </form>

      <table className="lista-contentores">
        <thead>
          <tr>
            <th>ID</th><th>Lat</th><th>Lng</th><th>Nível</th><th>Estado</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contentores.map(c => (
            <tr key={c._id}>
              <td>{c._id}</td>
              <td>{c.gps.lat.toFixed(5)}</td>
              <td>{c.gps.lng.toFixed(5)}</td>
              <td>{c.nivel}%</td>
              <td>{c.estado}</td>
              <td>
                <button onClick={() => handleNivel(c._id, c.nivel)}>
                  Editar Nível
                </button>{' '}
                <button onClick={() => handleDelete(c._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
