import React, { useState } from "react";
import StarRating from "./StarRating";

export default function AddGameModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  // Manejar cambio de URL de imagen
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    
    // Preview si es una URL válida
    if (url.startsWith('http')) {
      setImagePreview(url);
    }
  };

  const handleSave = () => {
    // Validación mejorada
    if (!name.trim()) {
      alert("❌ El nombre del juego es obligatorio");
      return;
    }
    
    if (!genre.trim()) {
      alert("❌ El género es obligatorio");
      return;
    }
    
    if (!platform.trim()) {
      alert("❌ La plataforma es obligatoria");
      return;
    }
    
    const year = Number(releaseYear);
    const currentYear = new Date().getFullYear();
    
    if (!releaseYear || year < 1950 || year > currentYear + 1) {
      alert(`❌ El año debe estar entre 1950 y ${currentYear + 1}`);
      return;
    }

    const gameData = {
      name: name.trim(),
      genre: genre.trim(),
      platform: platform.trim(),
      releaseYear: year,
      imageUrl: imageUrl.trim(),
      rating: Number(rating),
      description: description.trim()
    };

    console.log("Datos del juego a enviar:", gameData);
    onSave(gameData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal edit-modal">
        <header className="modal-header">
          <h2>➕ Agregar Juego</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </header>

        <div className="modal-body">
          <label>Nombre *</label>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: The Legend of Zelda"
            autoFocus
          />

          <label>Género *</label>
          <input 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Ej: RPG, Aventura, Acción"
          />

          <label>Plataforma *</label>
          <input 
            value={platform} 
            onChange={(e) => setPlatform(e.target.value)}
            placeholder="Ej: Nintendo Switch, PS5, Xbox"
          />

          <label>Año *</label>
          <input
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            placeholder="Ej: 2024"
            min="1950"
            max={new Date().getFullYear() + 1}
          />

          <label>Imagen (URL completa o nombre de archivo)</label>
          <input 
            value={imageUrl} 
            onChange={handleImageUrlChange}
            placeholder="https://ejemplo.com/imagen.jpg o zelda.jpg"
          />
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.3rem' }}>
            💡 Puedes usar una URL completa de internet o el nombre de un archivo en /public/images/
          </p>

          {/* Preview de imagen */}
          {imagePreview && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Preview:</p>
              <img 
                src={imagePreview} 
                alt="Preview"
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '200px', 
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 124, 186, 0.3)'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  setImagePreview("");
                }}
              />
            </div>
          )}

          <label>Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe el juego..."
            rows={3}
          />

          <label>Calificación Inicial</label>
          <StarRating rating={rating} onRate={setRating} />
        </div>

        <footer className="modal-footer">
          <button className="btn danger" onClick={onClose}>Cancelar</button>
          <button className="btn primary" onClick={handleSave}>Guardar</button>
        </footer>
      </div>
    </div>
  );
}