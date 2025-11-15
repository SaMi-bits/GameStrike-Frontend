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

  const handleSave = () => {
    // 🔥 FIX: Validación mejorada
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
    
    if (!releaseYear || releaseYear < 1950 || releaseYear > new Date().getFullYear() + 1) {
      alert("❌ El año debe estar entre 1950 y " + (new Date().getFullYear() + 1));
      return;
    }

    onSave({
      name: name.trim(),
      genre: genre.trim(),
      platform: platform.trim(),
      releaseYear: Number(releaseYear),
      imageUrl: imageUrl.trim(),
      rating,
      description: description.trim()
    });
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
            placeholder="Ej: Nintendo Switch, PS5"
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

          <label>Imagen (URL)</label>
          <input 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
          />

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