import React, { useState } from 'react';

export default function FormularioMedicamentos({ idUbicacionActual, nombreUbicacion, alGuardar }) {
  const [nuevo, setNuevo] = useState({
    nombre: '', 
    cantidad: '', 
    unidad_medida: '', 
    fecha_caducidad: '', 
    notas: '', 
    url_imagen: '', // Nuevo campo para la imagen
    categoria_id: '8' 
  });

  const categoriasSalud = [
    { id: 8, nombre: "Analgésicos y Antiinflamatorios" },
    { id: 9, nombre: "Antibióticos" },
    { id: 10, nombre: "Cuidado de Heridas / Material" },
    { id: 11, nombre: "Suplementos y Vitaminas" },
    { id: 12, nombre: "Antigripales" },
    { id: 13, nombre: "AntiGomas y Suplementos (*guiño guiño)" }
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
      url_imagen: nuevo.url_imagen, // Se envía al servidor
      categoria: { id: parseInt(nuevo.categoria_id) },
      ubicacion: { id: parseInt(idUbicacionActual) }
    };
    alGuardar(productoParaJava);
    
    // Resetear formulario (Limpieza post-operatoria)
    setNuevo({ 
      nombre: '', cantidad: '', unidad_medida: '', 
      fecha_caducidad: '', notas: '', url_imagen: '', categoria_id: '8' 
    });
  };

  return (
    <section className="apartado-seccion-cocina mb-4 animate__animated animate__fadeIn">
      <h3 className="texto-cocina mb-4">Añadir a: <span className="text-danger">{nombreUbicacion}</span></h3>
      <form onSubmit={enviar}>
        {/* FILA 1: Nombre, Cantidad, Formato */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-bold texto-cocina">Nombre del Medicamento</label>
            <input type="text" name="nombre" className="form-control" placeholder="Ej: Paracetamol 500mg" value={nuevo.nombre} onChange={manejarCambio} required />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold texto-cocina">Cantidad</label>
            <input type="number" name="cantidad" className="form-control" value={nuevo.cantidad} onChange={manejarCambio} required />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold texto-cocina">Formato</label>
            <input type="text" name="unidad_medida" className="form-control" placeholder="Ej: Tabletas, Frasco" value={nuevo.unidad_medida} onChange={manejarCambio} />
          </div>
        </div>

        {/* FILA 2: Categoría, Vencimiento */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-bold texto-cocina">Tipo de Medicamento</label>
            <select name="categoria_id" className="form-select" value={nuevo.categoria_id} onChange={manejarCambio} required>
              {categoriasSalud.map(cat => (
                <option key={cat.id} value={cat.id} style={{color: 'black'}}>{cat.nombre}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold texto-cocina">Vencimiento</label>
            <input type="date" name="fecha_caducidad" className="form-control" value={nuevo.fecha_caducidad} onChange={manejarCambio} />
          </div>
        </div>

        {/* FILA 3: URL de Imagen (NUEVO INJERTO) */}
        <div className="mb-3">
          <label className="form-label fw-bold texto-cocina">Imagen de Referencia (URL)</label>
          <input 
            type="text" 
            name="url_imagen" 
            className="form-control" 
            placeholder="Pegue aquí el link de la imagen (Google, Pinterest, etc.)" 
            value={nuevo.url_imagen} 
            onChange={manejarCambio} 
          />
        </div>

        {/* FILA 4: Notas */}
        <div className="mb-4">
          <label className="form-label fw-bold texto-cocina">Instrucciones o Notas</label>
          <textarea name="notas" className="form-control" rows="2" placeholder="Ej: 1 cada 8 horas después de comer" value={nuevo.notas} onChange={manejarCambio}></textarea>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-danger px-5 shadow fw-bold rounded-pill">
            🚑 Registrar en Botiquín
          </button>
        </div>
      </form>
    </section>
  );
}