import React from 'react';

export default function TablaInventario({ productos, alEliminar }) {
  return (
    <section className="apartado-seccion-cocina">
      <div className="table-responsive">
        <table className="table table-hover align-middle bg-white rounded">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Medida</th>
              <th>Caducidad</th>
              <th>Notas</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 ? (
              productos.map(prod => {
                // EXPLICACIÓN SENCILLA:
                // Aquí miramos el ID de la ubicación (1, 2, 3 o 4) para saber de qué color pintar la línea.
                // No importa la categoría del producto, solo dónde está guardado físicamente.
                const ubiId = prod.ubicacion?.id || prod.ubicacion_id;
                const idNumerico = Number(ubiId);
                
                let claseIdentidad = '';
                if (idNumerico === 1) claseIdentidad = 'fila-alacena';      // Color Café
                if (idNumerico === 2) claseIdentidad = 'fila-refrigerador'; // Color Azul
                if (idNumerico === 3) claseIdentidad = 'fila-verdurera';    // Color Verde
                if (idNumerico === 4) claseIdentidad = 'fila-caja';         // Color Naranja

                return (
                  <tr key={prod.id} className={claseIdentidad}>
                    <td><strong>{prod.nombre}</strong></td>
                    <td>{prod.cantidad}</td>
                    <td>{prod.unidadMedida || prod.unidad_medida || '---'}</td>
                    <td>{prod.fechaCaducidad || prod.fecha_caducidad || '---'}</td>
                    <td><small>{prod.notas || 'Sin notas'}</small></td>
                    <td className="text-center">
                      <button 
                        className="btn btn-outline-danger btn-sm border-0" 
                        onClick={() => alEliminar(prod.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5 text-muted">
                  <div className="fs-4 font-weight-bold">Vacío</div>
                  <small>No hay nada por aquí...</small>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}