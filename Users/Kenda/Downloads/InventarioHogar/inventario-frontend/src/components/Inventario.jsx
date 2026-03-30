import React, { useState, useEffect } from 'react';
import { productoService } from '../services/api'; 
import '../App.css';

export default function Inventario({ idUbicacion }) {
  const [listaProductos, setListaProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Mantenemos tus categorías referenciales
  const categoriasEjemplo = [
    { id: 1, nombre: "Electrónica" }, { id: 2, nombre: "Hogar" },
    { id: 3, nombre: "Alimentos" }, { id: 4, nombre: "Espacio C4" }, { id: 5, nombre: "Espacio C5" }
  ];

  const [nuevoProducto, setNuevoProducto] = useState({ 
    nombre: '', cantidad: '', fecha_caducidad: '', unidad_medida: '', notas: '', 
    categoria_id: '', ubicacion_id: idUbicacion // Se pre-asigna la ubicación de la página
  });

  const cargarDatos = async () => {
    try {
      const respuesta = await productoService.getAll();
      const datos = respuesta.data || [];
      setListaProductos(datos);
      
      // Filtramos automáticamente según la página donde estemos (Cocina, Medicamentos, etc.)
      const filtrados = datos.filter(p => {
        const ubiId = p.ubicacion ? p.ubicacion.id : p.ubicacion_id;
        return Number(ubiId) === Number(idUbicacion);
      });
      setProductosFiltrados(filtrados);
    } catch (error) { console.error("Error al cargar:", error); }
  };

  useEffect(() => { 
    cargarDatos(); 
    // Actualizamos el estado del nuevo producto si cambia la página
    setNuevoProducto(prev => ({ ...prev, ubicacion_id: idUbicacion }));
  }, [idUbicacion]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const manejarGuardar = async (e) => {
    e.preventDefault();
    const productoParaJava = {
      nombre: nuevoProducto.nombre,
      cantidad: parseInt(nuevoProducto.cantidad),
      unidadMedida: nuevoProducto.unidad_medida, 
      fechaCaducidad: nuevoProducto.fecha_caducidad || null,
      notas: nuevoProducto.notas,
      categoria: { id: parseInt(nuevoProducto.categoria_id) },
      ubicacion: { id: parseInt(idUbicacion) } // Usamos el ID de la página actual
    };

    try {
      await productoService.create(productoParaJava);
      setMostrarFormulario(false);
      setNuevoProducto({ ...nuevoProducto, nombre: '', cantidad: '', fecha_caducidad: '', unidad_medida: '', notas: '', categoria_id: '' });
      cargarDatos(); 
      alert("¡Guardado en Neon!");
    } catch (error) { alert("Error al persistir."); }
  };

  return (
    <div className="w-100">
      {/* SECCIÓN DE GESTIÓN (Sin los 4 arcos antiguos) */}
      <section className="apartado-seccion mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-white">Inventario de la Sección</h2>
          <button className="boton-primario" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
            {mostrarFormulario ? "Cerrar" : "+ Nuevo Producto"}
          </button>
        </div>

        {mostrarFormulario && (
          <form onSubmit={manejarGuardar}>
            <div className="row g-3 mb-3 text-white">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input type="text" name="nombre" className="form-control" value={nuevoProducto.nombre} onChange={manejarCambio} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Cantidad</label>
                <input type="number" name="cantidad" className="form-control" value={nuevoProducto.cantidad} onChange={manejarCambio} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Unidad</label>
                <input type="text" name="unidad_medida" className="form-control" value={nuevoProducto.unidad_medida} onChange={manejarCambio} />
              </div>
            </div>
            <div className="row g-3 mb-3 text-white">
               <div className="col-md-6">
                <label className="form-label">Categoría</label>
                <select name="categoria_id" className="form-select" value={nuevoProducto.categoria_id} onChange={manejarCambio} required>
                  <option value="">Seleccione...</option>
                  {categoriasEjemplo.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Fecha de Caducidad</label>
                <input type="date" name="fecha_caducidad" className="form-control" value={nuevoProducto.fecha_caducidad} onChange={manejarCambio} />
              </div>
            </div>
            <div className="mb-4 text-white">
              <label className="form-label">Notas</label>
              <textarea name="notas" className="form-control" rows="2" value={nuevoProducto.notas} onChange={manejarCambio}></textarea>
            </div>
            <div className="text-end">
              <button type="submit" className="boton-primario">Registrar en esta Sección</button>
            </div>
          </form>
        )}
      </section>

      {/* TABLA DE RESULTADOS */}
      <section className="apartado-seccion">
        <div className="table-responsive">
          <table className="table table-hover align-middle bg-white rounded">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th><th>Stock</th><th>Medida</th><th>Vence</th><th>Notas</th><th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map(prod => (
                  <tr key={prod.id}>
                    <td><strong>{prod.nombre}</strong></td>
                    <td>{prod.cantidad}</td>
                    <td>{prod.unidadMedida || prod.unidad_medida}</td>
                    <td>{prod.fechaCaducidad || prod.fecha_caducidad || '---'}</td>
                    <td><small>{prod.notas}</small></td>
                    <td><button className="btn btn-outline-danger btn-sm" onClick={() => cargarDatos()}>🗑️</button></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" className="text-center py-4">No hay productos aquí.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}