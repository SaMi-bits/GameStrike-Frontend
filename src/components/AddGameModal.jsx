// src/components/AddGameModal.jsx
import React, { useState } from "react";
import StarRating from "./StarRating";

export default function AddGameModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [rating, setRating] = useState(0);

  const handleSave = () => {
    if (!name.trim()) return;

    onSave({
      name,
      genre,
      platform,
      releaseYear,
      imageUrl,
      rating
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
          <label>Nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Género</label>
          <input value={genre} onChange={(e) => setGenre(e.target.value)} />

          <label>Plataforma</label>
          <input value={platform} onChange={(e) => setPlatform(e.target.value)} />

          <label>Año</label>
          <input
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />

          <label>Imagen (URL o archivo)</label>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

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
