// frontend/src/components/ProtectedLayout.js
import React from 'react';
import Navbar from './Navbar';

export default function ProtectedLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        {children}
      </main>
    </>
  );
}
