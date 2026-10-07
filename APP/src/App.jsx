import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { LoginClient } from './pages/LoginClient';
import { LoginAdmin } from './pages/LoginAdmin';
import { ClientDashboard } from './pages/ClientDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { SinPermiso } from './pages/SinPermiso';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { ClientRoute, AdminRoute, AdminRoleGuard } from './components/RutasProtegidas';
import { AdminProductos } from './pages/AdminProductos';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginClient />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/admin/sin-permiso" element={<SinPermiso />} />
          <Route element={<ClientRoute />}>
            <Route path="/cliente/dashboard" element={<ClientDashboard />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route element={<AdminRoleGuard allowedRoles={['superadmin']} />}>
              <Route path="/admin/usuarios" element={<h2>Sección Usuarios (Superadmin)</h2>} />
            </Route>

            <Route element={<AdminRoleGuard allowedRoles={['superadmin', 'gestor_productos']} />}>
              <Route path="/admin/productos" element={<AdminProductos />} />
            </Route>

            <Route element={<AdminRoleGuard allowedRoles={['superadmin', 'auditor']} />}>
              <Route path="/admin/reportes" element={<h2>Sección Reportes (Auditor/Superadmin)</h2>} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;