import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Cocina from './components/Cocina'; 
import Medicamentos from './components/Medicamentos'; 
import Inventario from './components/Inventario'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. INICIO */}
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        
        {/* 2. COCINA (Componente Especializado) */}
        <Route path="/cocina" element={
          <Layout tituloPagina="Gestión de Cocina">
            <Cocina /> 
          </Layout>
        } />

        {/* 3. MEDICAMENTOS (Componente Especializado) */}
        <Route path="/medicamentos" element={
          <Layout tituloPagina="Botiquín Personal">
            <Medicamentos /> 
          </Layout>
        } />

        {/* 4. LIMPIEZA (Usa el Inventario genérico por ahora) */}
        <Route path="/limpieza" element={
          <Layout tituloPagina="Productos de Limpieza">
            <Inventario idUbicacion={3} />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;