import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [order, setOrder] = useState('ASC');


  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: 'Mates',
    descripcion: '',
    imagen: ''
  });

  const { token } = useAuth();

  useEffect(() => {
    fetchProductos();
  }, [page, category, sortBy, order]);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError('');

      const authToken = token || localStorage.getItem('token');

      
      const params = {
        page,
        limit: 5,
        search: search || undefined,
        category: category || undefined,
        sortBy,
        order
      };

      const response = await axios.get('http://localhost:3000/api/products', {
        headers: { Authorization: authToken ? `Bearer ${authToken}` : '' },
        params
      });

      
      const data = response.data;
      const list = data.products || data.productos || (Array.isArray(data) ? data : []);
      const pages = data.totalPages || data.totalPaginas || 1;

      setProductos(list);
      setTotalPages(pages);
    } catch (err) {
      console.error('Error al obtener productos:', err);
      setError(err.response?.data?.message || 'Error al cargar productos.');
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); 
    fetchProductos();
  };

 
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const authToken = token || localStorage.getItem('token');
      const headers = { Authorization: authToken ? `Bearer ${authToken}` : '' };

      
      const imageValue = formData.imagen.trim() !== '' ? formData.imagen.trim() : null;

      const payload = {
        nombre: formData.nombre,
        name: formData.nombre,
        precio: Number(formData.precio),
        price: Number(formData.precio),
        stock: Number(formData.stock),
        categoria: formData.categoria,
        category: formData.categoria,
        descripcion: formData.descripcion,
        description: formData.descripcion,
        imagen: imageValue,
        image: imageValue
      };

      if (editingId) {
        await axios.put(`http://localhost:3000/api/products/${editingId}`, payload, { headers });
      } else {
        await axios.post('http://localhost:3000/api/products', payload, { headers });
      }

      
      resetForm();
      fetchProductos();
    } catch (err) {
      console.error('Error al guardar producto:', err);
      alert(err.response?.data?.message || 'Error al procesar la solicitud.');
    }
  };

  
  const handleEdit = (prod) => {
    setEditingId(prod.id || prod._id);
    setFormData({
      nombre: prod.nombre || prod.name || '',
      precio: prod.precio || prod.price || '',
      stock: prod.stock || 0,
      categoria: prod.categoria || prod.category || 'Mates',
      descripcion: prod.descripcion || prod.description || '',
      imagen: prod.imagen || prod.image || ''
    });
    setShowForm(true);
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;

    try {
      const authToken = token || localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: { Authorization: authToken ? `Bearer ${authToken}` : '' }
      });
      fetchProductos();
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      alert(err.response?.data?.message || 'Error al eliminar el producto.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      nombre: '',
      precio: '',
      stock: '',
      categoria: 'Mates',
      descripcion: '',
      imagen: ''
    });
    setShowForm(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Catálogo y Gestión de Productos</h2>

      
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: showForm ? '#e2e8f0' : '#10b981',
            color: showForm ? '#000' : '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {showForm ? 'Cancelar' : '+ Agregar Producto'}
        </button>
      </div>

      
      {showForm && (
        <form
          onSubmit={handleSubmitForm}
          style={{
            backgroundColor: '#f1f5f9',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <h3>{editingId ? 'Editar Producto' : 'Crear Nuevo Producto'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Nombre del Producto"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
              type="number"
              placeholder="Precio"
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              required
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              required
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="Mates">Mates</option>
              <option value="Bombillas">Bombillas</option>
              <option value="Termos">Termos</option>
              <option value="Yerbas">Yerbas</option>
              <option value="Accesorios">Accesorios</option>
            </select>
          </div>

          
          <input
            type="text"
            placeholder="URL de la Imagen (ej: https://... - Opcional)"
            value={formData.imagen}
            onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
          />

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="submit"
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {editingId ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#94a3b8',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
        
        
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Buscar mate, termo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Buscar</button>
        </form>

        
        <select 
          value={category} 
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Todas las Categorías</option>
          <option value="Mates">Mates</option>
          <option value="Bombillas">Bombillas</option>
          <option value="Termos">Termos</option>
          <option value="Yerbas">Yerbas</option>
          <option value="Accesorios">Accesorios</option>
        </select>

        
        <select 
          value={`${sortBy}-${order}`} 
          onChange={(e) => {
            const [field, dir] = e.target.value.split('-');
            setSortBy(field);
            setOrder(dir);
            setPage(1);
          }}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="price-ASC">Precio: Menor a Mayor</option>
          <option value="price-DESC">Precio: Mayor a Menor</option>
          <option value="name-ASC">Nombre: A - Z</option>
          <option value="name-DESC">Nombre: Z - A</option>
        </select>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>error {error}</div>}

      
      {loading ? (
        <p>Cargando datos</p>
      ) : productos.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#e2e8f0' }}>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => {
              const currentId = prod.id || prod._id;
              return (
                <tr key={currentId}>
                  <td>{currentId}</td>
                  <td>{prod.nombre || prod.name}</td>
                  <td>{prod.categoria || prod.category}</td>
                  <td>${prod.precio || prod.price}</td>
                  <td>{prod.stock}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => handleEdit(prod)}
                      style={{ marginRight: '0.5rem', padding: '0.2rem 0.5rem', cursor: 'pointer' }}
                    >
                      editar
                    </button>
                    <button
                      onClick={() => handleDelete(currentId)}
                      style={{ padding: '0.2rem 0.5rem', cursor: 'pointer', color: 'red' }}
                    >
                      borrar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
        <button 
          disabled={page <= 1} 
          onClick={() => setPage((prev) => prev - 1)}
          style={{ padding: '0.5rem 1rem', cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
        >
          Anterior
        </button>

        <span>Página {page} de {totalPages}</span>

        <button 
          disabled={page >= totalPages} 
          onClick={() => setPage((prev) => prev + 1)}
          style={{ padding: '0.5rem 1rem', cursor: page >= totalPages ? 'not-allowed' : 'pointer' }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}