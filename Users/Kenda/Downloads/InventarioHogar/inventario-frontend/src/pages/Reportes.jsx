import React from 'react';
import '../App.css';

const Reportes = () => {
  return (
    <div className="contenedor-principal">
      <section className="apartado-seccion">
        <h2 className="mb-4">📊 Reportes de Inventario</h2>
        
        {/* Tarjetas de Resumen */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="p-4 border rounded bg-light shadow-sm">
              <h5 className="text-muted">Bajo Stock</h5>
              <p className="h2 text-warning">12</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 border rounded bg-light shadow-sm">
              <h5 className="text-muted">Valor Total</h5>
              <p className="h2 text-primary">$45,230</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 border rounded bg-light shadow-sm">
              <h5 className="text-muted">Total Productos</h5>
              <p className="h2 text-success">87</p>
            </div>
          </div>
        </div>
      </section>

      <section className="apartado-seccion">
        <h3>Movimientos por Categoría</h3>
        <table className="table mt-3">
          <thead className="table-light">
            <tr>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Electrónicos</td>
              <td>23</td>
              <td>$15,450.00</td>
            </tr>
            <tr>
              <td>Hogar</td>
              <td>34</td>
              <td>$12,890.50</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Reportes;