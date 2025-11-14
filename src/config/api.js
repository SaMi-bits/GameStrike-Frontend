// src/config/api.js

// URL base de la API
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

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
      throw new Error(`HTTP error! status: ${response.status}`);
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