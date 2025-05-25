import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function ListaContentores() {
  const [contentores, setContentores] = useState([]);

  useEffect(() => {
    api.get('/contentores').then(res => setContentores(res.data));
  }, []);

  return (
    <table className="lista-contentores">
      <thead>
        <tr>
          <th>ID</th><th>Lat</th><th>Lng</th><th>Nível</th><th>Estado</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
