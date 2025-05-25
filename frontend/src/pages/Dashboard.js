import React from 'react';
import MapaContentores from '../components/MapaContentores';
import ListaContentores from '../components/ListaContentores';

export default function Dashboard() {
  return (
    <div className="page dashboard-page">
      <h1>Dashboard de Contentores</h1>
      <MapaContentores />
      <ListaContentores />
    </div>
  );
}
