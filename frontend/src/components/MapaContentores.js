import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../api/api';

export default function MapaContentores() {
  const [contentores, setContentores] = useState([]);

  useEffect(() => {
    api.get('/contentores').then(res => setContentores(res.data));
  }, []);

  return (
    <MapContainer center={[-25.9655, 32.5892]} zoom={12} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {contentores.map(c => (
        <Marker key={c._id} position={[c.gps.lat, c.gps.lng]}>
          <Popup>
            Nível: {c.nivel}%<br />Estado: {c.estado}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
