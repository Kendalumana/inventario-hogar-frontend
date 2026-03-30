// URL de tu backend en Render con el prefijo /api que definiste en Java
const API_URL = 'https://inventario-hogar-backend.onrender.com/api';

export const productoService = {
    // 1. Obtener todos los productos (GET)
    getAll: async () => {
        const response = await fetch(`${API_URL}/productos`);
        const data = await response.json();
        return { data }; 
    },

    // 2. CREAR un nuevo producto (POST)
    create: async (producto) => {
        const response = await fetch(`${API_URL}/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto)
        });
        return await response.json();
    },

    // 3. Eliminar un producto (DELETE)
    delete: async (id) => {
        return await fetch(`${API_URL}/productos/${id}`, { 
            method: 'DELETE' 
        });
    },

    // 4. Actualizar un producto (PUT) - Por si lo ocupas luego
    update: async (id, producto) => {
        const response = await fetch(`${API_URL}/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto)
        });
        return await response.json();
    }
};