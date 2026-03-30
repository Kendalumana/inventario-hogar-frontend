import React, { useState, useEffect } from 'react';
import { productoService } from '../services/api'; 
import TablaInventario from './TablaInventario';
import FormularioProducto from './FormularioProducto';
import '../App.css';

export default function Cocina() {
  const [listaProductos, setListaProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [subFiltroActivo, setSubFiltroActivo] = useState('Todos');
  const [mostrarForm, setMostrarForm] = useState(false);

  // IDs SOLICITADOS: 1: Alacena, 2: Refrigerador, 3: Verdurera, 4: Caja
  const subUbicaciones = [
    { id: 1, nombre: "Alacena", icono: "🥫" },
    { id: 2, nombre: "Refrigerador", icono: "❄️" },
    { id: 3, nombre: "Verdurera", icono: "🥦" },
    { id: 4, nombre: "Caja de Almacenamiento", icono: "📦" }
  ];

  const cargarDatos = async () => {
    try {
      const respuesta = await productoService.getAll();
      const todos = respuesta.data || [];
      const soloCocina = todos.filter(p => [1, 2, 3, 4].includes(Number(p.ubicacion?.id || p.ubicacion_id)));
      setListaProductos(soloCocina);
      setProductosFiltrados(soloCocina);
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const filtrarSubUbicacion = (id, nombre) => {
    setSubFiltroActivo(nombre);
    if (id === 'todos') {
      setProductosFiltrados(listaProductos);
    } else {
      const filtrados = listaProductos.filter(p => Number(p.ubicacion?.id || p.ubicacion_id) === id);
      setProductosFiltrados(filtrados);
    }
  };

  const guardarEnNeon = async (productoParaJava) => {
    try {
      await productoService.create(productoParaJava);
      setMostrarForm(false);
      cargarDatos();
      alert(`¡Producto guardado exitosamente en ${subFiltroActivo}!`);
    } catch (error) {
      alert("Error al persistir datos en Neon/Java");
    }
  };

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await productoService.delete(id);
        cargarDatos();
      } catch (error) {
        alert("Error al eliminar");
      }
    }
  };

  const obtenerIdUbicacionActual = () => {
    const encontrada = subUbicaciones.find(s => s.nombre === subFiltroActivo);
    return encontrada ? encontrada.id : 1;
  };

  return (
    <div className="w-100">
      {/* 1. BOTONES DE SUB-NAVEGACIÓN ACTUALIZADOS PARA EL CSS */}
      <div className="row mb-4 g-3">
        <div className="col-md-2">
          <button 
            className={`btn-sub-ubicacion w-100 ${subFiltroActivo === 'Todos' ? 'active' : ''}`} 
            onClick={() => filtrarSubUbicacion('todos', 'Todos')}
          >
            <span>🏠</span> Ver Todo
          </button>
        </div>
        {subUbicaciones.map(sub => (
          <div className="col-md-2" key={sub.id}>
            <button 
              className={`btn-sub-ubicacion w-100 ${subFiltroActivo === sub.nombre ? 'active' : ''}`}
              onClick={() => filtrarSubUbicacion(sub.id, sub.nombre)}
            >
              <span>{sub.icono}</span> {sub.nombre}
            </button>
          </div>
        ))}
      </div>

      {/* 2. CABECERA DINÁMICA */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="texto-cocina m-0">Inventario: {subFiltroActivo}</h2>
          <p className="text-muted m-0">Gestiona los productos de esta sub-área</p>
        </div>
        <button 
          className={`btn ${mostrarForm ? 'btn-danger' : 'btn-success'} fw-bold px-4 shadow rounded-pill`}
          onClick={() => setMostrarForm(!mostrarForm)}
        >
          {mostrarForm ? "✖ Cerrar" : "➕ Nuevo Producto"}
        </button>
      </div>

      {/* 3. FORMULARIO ENVOLVEMOS EN LA CLASE CRISTAL */}
      {mostrarForm && (
        <div className="apartado-seccion-cocina mb-4">
          <FormularioProducto 
            idUbicacionActual={obtenerIdUbicacionActual()}
            nombreUbicacion={subFiltroActivo === 'Todos' ? 'Cocina (Alacena)' : subFiltroActivo}
            alGuardar={guardarEnNeon}
          />
        </div>
      )}

      {/* 4. TABLA DE DATOS */}
      <div className="apartado-seccion-cocina">
        <TablaInventario 
          productos={productosFiltrados} 
          alEliminar={eliminarProducto} 
        />
      </div>
    </div>
  );
}