import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function AdminDashboard() {
  const { user, logout } = useAuth();

  
  const currentRole = user?.role || user?.rol || localStorage.getItem('role') || 'Sin Rol';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      <div style={{ width: '260px', backgroundColor: '#7aa786', color: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h2>Panel Admin</h2>
          <p style={{ color: '#171717', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Rol actual: <strong style={{ color: '#111112' }}>{currentRole}</strong>
          </p>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {currentRole === 'superadmin' ? (
              <Link to="/admin/usuarios" style={{ color: 'white', textDecoration: 'none' }}> Usuarios</Link>
            ) : (
              <span style={{ color: '#64748b' }}> Usuarios (Sin Permiso)</span>
            )}

            
            {['superadmin', 'gestor_productos'].includes(currentRole) ? (
              <Link to="/admin/productos" style={{ color: 'white', textDecoration: 'none' }}>Productos</Link>
            ) : (
              <span style={{ color: '#64748b' }}>Productos (Sin Permiso)</span>
            )}

            
            {['superadmin', 'auditor'].includes(currentRole) ? (
              <Link to="/admin/reportes" style={{ color: 'white', textDecoration: 'none' }}>Reportes</Link>
            ) : (
              <span style={{ color: '#64748b' }}>Reportes (Sin Permiso)</span>
            )}
          </nav>
        </div>

        <button 
          onClick={logout}
          style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Cerrar Sesión
        </button>
      </div>

      
      <div style={{ flex: 1, padding: '2rem' }}>
        <h1>Bienvenido, Admin General</h1>
        <hr style={{ marginY: '1rem', borderColor: '#e2e8f0' }} />
      </div>
    </div>
  );
}