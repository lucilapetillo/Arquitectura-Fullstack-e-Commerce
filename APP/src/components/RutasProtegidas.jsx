import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const LoadingScreen = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
    <h3>Verificando sesión...</h3>
  </div>
);


export const ClientRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;

  const userType = user?.userType || localStorage.getItem('userType');

  if (userType !== 'client') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};


export const AdminRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;

  const userType = user?.userType || localStorage.getItem('userType');

  if (userType !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};


export const AdminRoleGuard = ({ allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;

  const currentRole = user?.role || user?.rol || localStorage.getItem('role');

  if (!currentRole || !allowedRoles.includes(currentRole)) {
    return <Navigate to="/admin/sin-permiso" replace />;
  }

  
  return <Outlet />;
};