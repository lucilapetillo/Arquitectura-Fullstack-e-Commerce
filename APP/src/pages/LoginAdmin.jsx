import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  if (user?.userType === 'client') {
    return (
      <div style={{ padding: '2rem', maxWidth: '400px', margin: '2rem auto', border: '1px solid #e11d48', borderRadius: '8px', backgroundColor: '#fff1f2' }}>
        <h3 style={{ color: '#be123c', marginTop: 0 }}>Advertencia de Sesion</h3>
        <p>Ya tiene una sesión de Cliente activa. Para ingresar al panel de Administración, tiene que cerrar su sesión actual.</p>
        <button
          onClick={async () => {
            await logout();
            navigate('/admin/login');
          }}
          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#be123c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Cerrar sesión de Cliente y continuar
        </button>
      </div>
    );
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/admin/login', {
        email,
        password
      });

      login(response.data);

      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Error en LoginAdmin:', err);
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Ingreso de Administradores</h2>

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Gmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}