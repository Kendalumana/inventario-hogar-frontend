import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Sube un nivel para encontrar el CSS
import fondoImagen from '../assets/fondoEncabezado.jpeg'; // Sube un nivel para la imagen

export default function Layout({ children, tituloPagina }) {
  return (
    <div className="wrapper-total">
      <header className="barra-navegacion-total">
        <img src={fondoImagen} className="fondo-imagen-header" alt="Fondo" />
        <div className="capa-interactiva">
          <Link to="/" className="texto-branding">MI INVENTARIO</Link>
          <nav className="menu-enlaces-pc">
            <Link to="/" className="enlace-menu">Inicio</Link>
          </nav>
        </div>
      </header>

      <main className="contenedor-principal">
        {/* Aquí mostramos el título dinámico (Ej: Gestión de Cocina) */}
        {tituloPagina && <h2 className="text-dark mb-4" style={{fontWeight: 'bold'}}>{tituloPagina}</h2>}
        {children}
      </main>
    </div>
  );
}