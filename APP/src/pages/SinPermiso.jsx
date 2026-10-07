import React from 'react';
import { Link } from 'react-router-dom';

export const SinPermiso = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#dc2626' }}>Acceso Denegado</h1>
      <p>No tiene los permisos necesarios para acceder a esta sección.</p>
      <Link to="/admin/dashboard" style={{ marginTop: '1rem', display: 'inline-block', color: '#2563eb' }}>
        Volver al Panel Principal
      </Link>
    </div>
  );
};