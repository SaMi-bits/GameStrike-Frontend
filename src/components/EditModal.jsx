// src/components/EditModal.jsx
import React, { useState } from "react";
import StarRating from "./StarRating";

export default function EditModal({ game, onClose, onSave }) {
  if (!game) return null;

  // Estados individuales para cada campo editable
  const [name, setName] = useState(game.name || "");
  const [genre, setGenre] = useState(game.genre || "");
  const [platform, setPlatform] = useState(game.platform || "");
  const [releaseYear, setReleaseYear] = useState(game.releaseYear || "");
  const [imageUrl, setImageUrl] = useState(game.imageUrl || "");
  const [rating, setRating] = useState(game.rating || 0);

  const handleSave = () => {
    onSave({
      ...game,
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

        {/* CABECERA */}
        <header className="modal-header">
          <h2>✏ Editar Juego</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </header>

        {/* CUERPO */}
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

          <label>Imagen (URL o nombre)</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <label>Calificación ⭐</label>
          <StarRating rating={rating} onRate={setRating} />

        </div>

        {/* BOTONES */}
        <footer className="modal-footer">
          <button className="btn danger" onClick={onClose}>Cancelar</button>
          <button className="btn primary" onClick={handleSave}>Guardar</button>
        </footer>

      </div>
    </div>
  );
}
