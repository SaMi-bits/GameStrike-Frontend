// src/config/api.js

// Detectar si estamos en desarrollo o producción
const isDevelopment = 
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1';

// URL del backend según el entorno
export const API_URL = isDevelopment 
  ? "http://localhost:4000"  // Desarrollo local
  : "https://gamestrike-api.onrender.com"; // 👈 TU URL de Render

console.log("🌍 Entorno:", isDevelopment ? "Desarrollo" : "Producción");
console.log("🔗 API URL:", API_URL);

// Helper para construir URLs completas
export const buildUrl = (endpoint) => {
  // Asegurarse de que el endpoint empiece con /
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_URL}${cleanEndpoint}`;
};

// Helper para manejar rutas de imágenes
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return "/placeholder-game.png";
  // Si ya incluye http/https, usar directamente
  if (imageUrl.startsWith('http')) return imageUrl;
  // Si no, asumir que está en /images/
  return `/images/${imageUrl}`;
};

// Configuración de fetch con manejo de errores
export const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(buildUrl(endpoint), {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default {
  API_URL,
  buildUrl,
  getImageUrl,
  fetchAPI,
};