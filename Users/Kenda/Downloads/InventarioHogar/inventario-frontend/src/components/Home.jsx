import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import cocinaImg from '../assets/cocinaButton.jpg';
import medicamentosImg from '../assets/medicamentosButton.jpg';
import limpiezaImg from '../assets/limpiezaButton.jpg';

export default function Home() {
  return (
    <section className="row g-4 mb-5 mt-2">
      {/* 1. VENTANA COCINA */}
      <div className="col-md-4">
        <Link to="/cocina" className="text-decoration-none">
          <button className="ventana-arco-btn w-100">
            <div className="ventana-header">
              <img src={cocinaImg} className="imagen-arco" alt="Cocina" />
            </div>
            <div className="ventana-body">
              <span className="titulo">GESTIONAR COCINA</span>
              <p className="subtitulo">Alacena y Refrigerador</p>
            </div>
          </button>
        </Link>
      </div>

      {/* 2. VENTANA MEDICAMENTOS */}
      <div className="col-md-4">
        <Link to="/medicamentos" className="text-decoration-none">
          <button className="ventana-arco-btn w-100">
            <div className="ventana-header">
              <img src={medicamentosImg} className="imagen-arco" alt="Medicamentos" />
            </div>
            <div className="ventana-body">
              <span className="titulo">BOTIQUÍN PERSONAL</span>
              <p className="subtitulo">Salud y Bienestar</p>
            </div>
          </button>
        </Link>
      </div>

      {/* 3. VENTANA LIMPIEZA */}
      <div className="col-md-4">
        <Link to="/limpieza" className="text-decoration-none">
          <button className="ventana-arco-btn w-100">
            <div className="ventana-header">
              <img src={limpiezaImg} className="imagen-arco" alt="Limpieza" />
            </div>
            <div className="ventana-body">
              <span className="titulo">PRODUCTOS LIMPIEZA</span>
              <p className="subtitulo">Hogar y Aseo</p>
            </div>
          </button>
        </Link>
      </div>
    </section>
  );
}