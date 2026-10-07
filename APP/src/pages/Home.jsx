import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export const Home = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    fetch('http://localhost:3000/api/products?limit=50&sortBy=id&order=DESC')
      .then((res) => res.json())
      .then((data) => {
        const lista = Array.isArray(data) 
          ? data 
          : (data.products || data.data || data.productos || []);
        
        setProductos(lista);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar productos:', err);
        setLoading(false);
      });
  }, []);

  
  const categorias = [
    { id: 1, nombre: 'Yerbas', items: 'Ediciones Especiales' },
    { id: 2, nombre: 'Mates', items: 'Cuero y Calabaza' },
    { id: 3, nombre: 'Termos', items: 'Acero Inoxidable' },
    { id: 4, nombre: 'Bombillas', items: 'Alpaca y Acero' },
  ];

  return (
    <div className="bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 min-h-screen font-sans transition-colors duration-200">
      
      
      <section className="bg-emerald-100/60 dark:bg-emerald-950/40 py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left space-y-4">
            <span className="text-emerald-800 dark:text-emerald-400 font-semibold text-sm tracking-wider uppercase">
              Tienda de Mates y Accesorios
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 dark:text-stone-50 leading-tight">
              El ritual de todos los dias, llevalo a otro nivel.
            </h1>
            <p className="text-stone-600 dark:text-stone-300 text-base md:text-lg">
              Encontrá Mates, Bombillas, Termos y más.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a
                href="#vitrina"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-6 py-3 rounded-lg transition-colors text-center shadow-sm"
              >
                Ver Catalogo
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="https://http2.mlstatic.com/D_NQ_NP_603409-MLA115959227000_092026-F.webp"
              alt="img"
              className="rounded-2xl shadow-xl w-full max-w-md object-cover aspect-4/3"
            />
          </div>
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-50 mb-6 text-center md:text-left">
          Categorías Destacadas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categorias.map((cat) => (
            <div
              key={cat.id}
              className="bg-emerald-50 dark:bg-stone-900 border border-emerald-200/60 dark:border-stone-800 p-6 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm"
            >
              <h3 className="font-bold text-lg text-emerald-950 dark:text-emerald-300">{cat.nombre}</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{cat.items}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section id="vitrina" className="max-w-7xl mx-auto px-4 py-12 border-t border-stone-200 dark:border-stone-800">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-50 text-center md:text-left">
              Nuestros Productos
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-stone-500">Cargando catalogo</div>
        ) : productos.length === 0 ? (
          <div className="text-center py-12 text-stone-500">No hay productos disponibles.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productos.map((prod) => {
              const nombre = prod.nombre || prod.name || 'Producto';
              const descripcion = prod.descripcion || prod.description || 'Producto de primera calidad.';
              const precio = prod.precio || prod.price || 0;
              
              
              const imagen = (prod.imagen || prod.image || '').trim();

              return (
                <div
                  key={prod._id || prod.id}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow"
                >
                  
                  {imagen ? (
                    <div className="relative aspect-square bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <img
                        src={imagen}
                        alt={nombre}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-emerald-700 text-white text-xs font-bold px-2 py-1 rounded">
                        DESTACADO
                      </span>
                    </div>
                  ) : (
                    
                    <div className="relative aspect-square bg-stone-100 dark:bg-stone-800/50 flex items-center justify-center text-stone-400 text-xs italic p-4 text-center">
                      <span>Sin imagen disponible</span>
                      <span className="absolute top-2 left-2 bg-emerald-700 text-white text-xs font-bold px-2 py-1 rounded not-italic">
                        DESTACADO
                      </span>
                    </div>
                  )}

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base line-clamp-1">
                      {nombre}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 flex-grow">
                      {descripcion}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-black text-emerald-800 dark:text-emerald-400">
                        ${Number(precio).toLocaleString('es-AR')}
                      </span>
                      <button className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium px-3 py-2 rounded-md transition-colors">
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      
      <Footer />

    </div>
  );
};