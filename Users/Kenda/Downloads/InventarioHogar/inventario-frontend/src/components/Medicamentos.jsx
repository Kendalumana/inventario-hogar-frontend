import React, { useState, useEffect } from 'react';
import { productoService } from '../services/api'; 
import TablaInventario from './TablaInventario';
import FormularioMedicamentos from './FormularioMedicamentos';
import '../App.css';

// --- LOGICA DE IDENTIFICACION VISUAL (Mapeo de iconos/imágenes por categoría) ---
const identificarVisual = (categoriaNombre) => {
  const nombre = categoriaNombre?.toLowerCase() || "";
  
  if (nombre.includes("analgésico") || nombre.includes("inflamatorio")) {
    return { icono: "💊", color: "#f87171" };
  }
  if (nombre.includes("antibiótico")) {
    return { icono: "🧬", color: "#34d399" };
  }
  if (nombre.includes("vitamina") || nombre.includes("suplemento")) {
    return { icono: "🍎", color: "#fbbf24" };
  }
  if (nombre.includes("jarabe") || nombre.includes("líquido")) {
    return { icono: "🧪", color: "#a78bfa" };
  }
  // Default si no reconoce la categoría
  return { icono: "🩹", color: "#38bdf8" };
};

export default function Medicamentos() {
  const [listaProductos, setListaProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [subFiltroActivo, setSubFiltroActivo] = useState('Todos');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [medSeleccionado, setMedSeleccionado] = useState(null);

  const subUbicaciones = [{ id: 5, nombre: "Botiquín Principal", icono: "🚑" }];

  const cargarDatos = async () => {
    try {
      const respuesta = await productoService.getAll();
      const todos = respuesta.data || [];
      const soloMedicamentos = todos.filter(p => [5, 6, 7].includes(Number(p.ubicacion?.id || p.ubicacion_id)));
      setListaProductos(soloMedicamentos);
      setProductosFiltrados(soloMedicamentos);
    } catch (error) { console.error("Falla sistémica al cargar datos:", error); }
  };

  useEffect(() => { cargarDatos(); }, []);

  const filtrarSubUbicacion = (id, nombre) => {
    setSubFiltroActivo(nombre);
    const filtrados = id === 'todos' ? listaProductos : listaProductos.filter(p => Number(p.ubicacion?.id || p.ubicacion_id) === id);
    setProductosFiltrados(filtrados);
  };

  // Obtener el visual según la categoría del medicamento seleccionado
  const visual = identificarVisual(medSeleccionado?.categoria?.nombre);

  return (
    <div className="modo-laboratorio-full">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="display-4 fw-bold" style={{color: '#38bdf8'}}>LAB-SENSE INVENTORY</h1>
          <p className="text-secondary uppercase tracking-widest">Medical Control System v2.0</p>
        </div>
        <button className="btn btn-outline-light rounded-pill px-4" onClick={() => window.location.href = '/'}>
          ✖ Salir del Panel
        </button>
      </div>

      <div className="row">
        <div className="col-md-3">
          <div className="panel-vidrio-medico mb-4">
            <h5 className="text-info mb-3">Filtros de Red</h5>
            <button className={`btn w-100 mb-2 ${subFiltroActivo === 'Todos' ? 'btn-info' : 'btn-outline-info'}`} onClick={() => filtrarSubUbicacion('todos', 'Todos')}>
              💊 Ver Todo
            </button>
            {subUbicaciones.map(sub => (
              <button key={sub.id} className={`btn w-100 mb-2 ${subFiltroActivo === sub.nombre ? 'btn-info' : 'btn-outline-info'}`} onClick={() => filtrarSubUbicacion(sub.id, sub.nombre)}>
                {sub.icono} {sub.nombre}
              </button>
            ))}
          </div>
          <button className={`btn w-100 py-3 fw-bold ${mostrarForm ? 'btn-secondary' : 'btn-danger shadow-glow'}`} onClick={() => setMostrarForm(!mostrarForm)}>
            {mostrarForm ? "VER LISTADO" : "NUEVO REGISTRO"}
          </button>
        </div>

        <div className="col-md-9">
          <div className="panel-vidrio-medico mb-4">
            {mostrarForm ? (
              <FormularioMedicamentos 
                idUbicacionActual={subFiltroActivo === 'Todos' ? 5 : subUbicaciones.find(s => s.nombre === subFiltroActivo).id}
                nombreUbicacion={subFiltroActivo}
                alGuardar={async (p) => { await productoService.create(p); setMostrarForm(false); cargarDatos(); }}
              />
            ) : (
              <>
                <h3 className="mb-4 text-white">Base de Datos: {subFiltroActivo}</h3>
                <TablaInventario 
                  productos={productosFiltrados} 
                  onHoverProducto={setMedSeleccionado} 
                  alEliminar={async (id) => { if(window.confirm("¿Confirmar eliminación?")){await productoService.delete(id); cargarDatos();} }} 
                />
              </>
            )}
          </div>

          <div style={{ height: '30px' }}></div> 

          {!mostrarForm && (
            <div className="row g-4">
              <div className="col-md-12">
                <div className="ficha-informativa-medica animate__animated animate__fadeInUp">
                  
                  {/* --- EL CIRCULO INTELIGENTE --- */}
                  <div className="foto-medicamento-circulo overflow-hidden d-flex justify-content-center align-items-center" 
                       style={{ border: `3px dashed ${visual.color}`, background: 'rgba(255,255,255,0.05)' }}>
                    {medSeleccionado?.url_imagen ? (
                        <img src={medSeleccionado.url_imagen} alt="Ref" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                    ) : (
                        <span style={{fontSize: '4.5rem', filter: `drop-shadow(0 0 10px ${visual.color})`}}>
                          {medSeleccionado ? visual.icono : '🔬'}
                        </span>
                    )}
                  </div>
                  
                  <div className="info-texto-ficha flex-grow-1">
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <h2 style={{color: medSeleccionado ? visual.color : '#38bdf8'}}>
                        {medSeleccionado ? medSeleccionado.nombre : "Identificando..."}
                      </h2>
                      {medSeleccionado && <span className="badge-frecuencia" style={{background: visual.color}}>{medSeleccionado.categoria?.nombre || 'General'}</span>}
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <p className="text-secondary mb-1 text-uppercase small fw-bold">Análisis Terapéutico:</p>
                        <p className="text-white">
                          {medSeleccionado?.notas || "Pase el cursor sobre la tabla para cargar la información de referencia."}
                        </p>
                      </div>
                      <div className="col-md-6 border-start border-secondary" style={{borderColor: 'rgba(56, 189, 248, 0.3) !important'}}>
                        <p className="text-secondary mb-1 text-uppercase small fw-bold">Protocolo de Seguridad:</p>
                        <ul className="text-info small ps-3">
                          <li>Control estricto de temperatura.</li>
                          <li>No administrar sin validación médica.</li>
                          <li>Categoría: {medSeleccionado?.categoria?.nombre || "No definida"}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}