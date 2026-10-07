import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <header className="w-full bg-emerald-900 dark:bg-stone-900 border-b border-emerald-800 dark:border-stone-800 text-stone-100 transition-colors duration-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-wide text-emerald-300 dark:text-emerald-400">
          CalMate y toMate un Mate<span className="text-stone-300 font-normal text-sm ml-1">Mates</span>
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-emerald-800 dark:bg-stone-800 border border-emerald-700 dark:border-stone-700 text-sm font-medium"
            title="Cambiar tema"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-stone-200 focus:outline-none rounded-lg hover:bg-emerald-800 dark:hover:bg-stone-800"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

  
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-emerald-300 font-medium">
            Inicio
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="hover:text-emerald-300 font-medium">
                Iniciar Sesión
              </Link>
              <Link to="/admin/login" className="hover:text-emerald-300 font-medium">
                Acceso Admin
              </Link>
            </>
          ) : user.userType === 'admin' ? (
            <>
              <span className="text-xs bg-emerald-800 dark:bg-emerald-950 text-emerald-200 px-2 py-1 rounded font-semibold">
                Admin: {user.nombre || 'Administrador'}
              </span>
              <Link to="/admin/dashboard" className="hover:text-emerald-300 font-medium">
                Dashboard
              </Link>
              <Link to="/admin/productos" className="hover:text-emerald-300 font-medium">
                Productos
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-300 hover:text-red-100 font-medium"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <span className="text-sm font-medium">
                Hola, <strong className="text-emerald-300">{user.nombre || 'Cliente'}</strong>
              </span>
              <Link to="/cliente/dashboard" className="hover:text-emerald-300 font-medium">
                Mi Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-300 hover:text-red-100 font-medium"
              >
                Salir
              </button>
            </>
          )}

          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-emerald-800 dark:bg-stone-800 border border-emerald-700 dark:border-stone-700 hover:bg-emerald-700 dark:hover:bg-stone-700 text-sm font-medium transition-colors"
            title="Cambiar tema"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </nav>
      </div>

      
      {isOpen && (
        <nav className="md:hidden bg-emerald-950 dark:bg-stone-950 border-t border-emerald-800 dark:border-stone-800 px-4 py-3 flex flex-col gap-3">
          <Link to="/" onClick={() => setIsOpen(false)} className="py-1 hover:text-emerald-300 font-medium">
            Inicio
          </Link>

          {!user ? (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="py-1 hover:text-emerald-300">
                Iniciar Sesión
              </Link>
              <Link to="/admin/login" onClick={() => setIsOpen(false)} className="py-1 hover:text-emerald-300">
                Acceso Admin
              </Link>
            </>
          ) : user.userType === 'admin' ? (
            <>
              <span className="text-xs bg-emerald-800 dark:bg-emerald-950 text-emerald-200 px-2 py-1 rounded font-semibold w-fit">
                Admin: {user.nombre || 'Administrador'}
              </span>
              <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="py-1 hover:text-emerald-300">
                Dashboard
              </Link>
              <Link to="/admin/productos" onClick={() => setIsOpen(false)} className="py-1 hover:text-emerald-300">
                Productos
              </Link>
              <button onClick={handleLogout} className="text-left text-red-300 py-1">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <span className="text-sm">
                Hola, <strong className="text-emerald-300">{user.nombre || 'Cliente'}</strong>
              </span>
              <Link to="/cliente/dashboard" onClick={() => setIsOpen(false)} className="py-1 hover:text-emerald-300">
                Mi Perfil
              </Link>
              <button onClick={handleLogout} className="text-left text-red-300 py-1">
                Salir
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
}