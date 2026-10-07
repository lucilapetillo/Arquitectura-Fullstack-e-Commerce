import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Dashboard Cliente</h1>
      <p>Bienvenido, <strong>{user?.nombre || user?.email}</strong></p>
      <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '5px', marginTop: '1rem' }}>
        <h3>Datos de Perfil:</h3>
        <p><strong>ID:</strong> {user?.id}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Dirección:</strong> {user?.direccion || 'No especificada'}</p>
        <p><strong>Teléfono:</strong> {user?.telefono || 'No especificado'}</p>
      </div>
      <button onClick={handleLogout} style={{ marginTop: '1.5rem', padding: '8px 16px', cursor: 'pointer' }}>
        Cerrar Sesión
      </button>
    </div>
  );
};