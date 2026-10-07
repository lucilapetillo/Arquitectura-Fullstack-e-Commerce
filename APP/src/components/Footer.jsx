import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-emerald-400">CalMate y ToMate un Mate</h3>
          <p className="text-sm text-stone-400">
            Mates, Bombillas, Termos, Yerbas. Todo lo que necesitas para un buen mate.
          </p>
        </div>

        
        <div>
          <h4 className="font-semibold text-white mb-3">Navegación</h4>
          <ul className="space-y-2 text-sm text-stone-400">
            <li><a href="#vitrina" className="hover:text-emerald-400">Catálogo</a></li>
          </ul>
        </div>

       
        <div>
          <h4 className="font-semibold text-white mb-3">Información</h4>
          <ul className="space-y-2 text-sm text-stone-400">
            <li><a href="#" className="hover:text-emerald-400">Términos y Condiciones</a></li>
            <li><a href="#" className="hover:text-emerald-400">Política de Privacidad</a></li>
            <li><a href="#" className="hover:text-emerald-400">Envíos y Devoluciones</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="font-semibold text-white mb-3">Contacto</h4>
          <p className="text-sm font-medium text-emerald-400 mt-1">info@tiendamates.com</p>
        </div>
      </div>

      <div className="border-t border-stone-800 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} CalMate y ToMate un Mate. Todos los derechos reservados.
      </div>
    </footer>
  );
}