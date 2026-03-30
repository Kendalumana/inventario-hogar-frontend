import React, { useState } from 'react';

export default function FormularioProducto({ idUbicacionActual, nombreUbicacion, alGuardar }) {
  const [nuevo, setNuevo] = useState({
    nombre: '', 
    cantidad: '', 
    unidad_medida: '', 
    fecha_caducidad: '', 
    notas: '', 
    categoria_id: '1' // Por defecto la primera categoría
  });

  // CATEGORÍAS ESPECÍFICAS DE COCINA
 
    const categoriasCocina = [
    { id: 1, nombre: "Proteínas" },
    { id: 2, nombre: "Granos" },
    { id: 3, nombre: "Pastas" },
    { id: 4, nombre: "Verduras y Frutas" },
    { id: 5, nombre: "Lacteos" },
    { id: 6, nombre: "Enlatados" },
    { id: 7, nombre: "Sazonadores" }
  ];
 
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevo({ ...nuevo, [name]: value });
  };

  const enviar = (e) => {
    e.preventDefault();
    const productoParaJava = {
      nombre: nuevo.nombre,
      cantidad: parseInt(nuevo.cantidad),
      unidadMedida: nuevo.unidad_medida,
      fechaCaducidad: nuevo.fecha_caducidad || null,
      notas: nuevo.notas,
      categoria: { id: parseInt(nuevo.categoria_id) }, // ID de la categoría seleccionada
      ubicacion: { id: parseInt(idUbicacionActual) }   // ID de Alacena, Refri, etc.
    };
    alGuardar(productoParaJava);
    // Resetear campos
    setNuevo({ nombre: '', cantidad: '', unidad_medida: '', fecha_caducidad: '', notas: '', categoria_id: '1' });
  };

  return (
    <section className="apartado-seccion mb-4 animate__animated animate__fadeIn">
      <h3 className="text-white mb-4">Añadir a: <span className="text-warning">{nombreUbicacion}</span></h3>
      <form onSubmit={enviar}>
        <div className="row g-3 mb-3 text-white">
          <div className="col-md-6">
            <label className="form-label fw-bold">Nombre del Producto</label>
            <input type="text" name="nombre" className="form-control shadow-sm" placeholder="Ej: Manzanas Rojas" value={nuevo.nombre} onChange={manejarCambio} required />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold">Cantidad</label>
            <input type="number" name="cantidad" className="form-control shadow-sm" value={nuevo.cantidad} onChange={manejarCambio} required />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold">Unidad</label>
            <input type="text" name="unidad_medida" className="form-control shadow-sm" placeholder="Ej: Kg, piezas" value={nuevo.unidad_medida} onChange={manejarCambio} />
          </div>
        </div>

        <div className="row g-3 mb-3 text-white">
          <div className="col-md-6">
            <label className="form-label fw-bold">Categoría de Cocina</label>
            <select name="categoria_id" className="form-select shadow-sm" value={nuevo.categoria_id} onChange={manejarCambio} required>
              {categoriasCocina.map(cat => (
                <option key={cat.id} value={cat.id} style={{color: 'black'}}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Fecha de Vencimiento</label>
            <input type="date" name="fecha_caducidad" className="form-control shadow-sm" value={nuevo.fecha_caducidad} onChange={manejarCambio} />
          </div>
        </div>

        <div className="mb-4 text-white">
          <label className="form-label fw-bold">Notas adicionales</label>
          <textarea name="notas" className="form-control shadow-sm" rows="2" placeholder="Ej: Comprar solo de marca X" value={nuevo.notas} onChange={manejarCambio}></textarea>
        </div>

        <div className="text-end">
          <button type="submit" className="boton-primario px-5 shadow fw-bold">
            🚀 Registrar en {nombreUbicacion}
          </button>
        </div>
      </form>
    </section>
  );
}