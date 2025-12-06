import React, { useState } from "react";
import StarRating from "./StarRating";

export default function GameCard({ game, onSelect, onEdit, onDelete, onRate }) {
  const [showActions, setShowActions] = useState(false);

  // Función helper para manejar rutas de imágenes consistentemente
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "/placeholder-game.png";
    // Si ya incluye http/https, usar directamente
    if (imageUrl.startsWith('http')) return imageUrl;
    // Si no, asumir que está en /images/
    return `/images/${imageUrl}`;
  };

  return (
    <li
      className="game-card retro-card"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Imagen */}
      <img
        src={getImageUrl(game.imageUrl)}
        className="game-image pixel-shadow"
        alt={game.name}
        onClick={() => onSelect(game)}
      />

      {/* Información */}
      <div className="game-info">
        <b className="game-title neon-text">{game.name}</b>
        <p className="meta-line">{game.genre} • {game.platform}</p>
        <p className="meta-line">Año: {game.releaseYear}</p>

        {/* Estrellas dentro de la card */}
        <StarRating rating={game.rating || 0} small />
      </div>

      {/* BOTONES RETRO-POP */}
      {showActions && (
        <div className="card-actions pop-in">
          <button className="btn retro-btn" onClick={() => onSelect(game)}>
            🔍 Info
          </button>

          <button className="btn retro-btn" onClick={() => onEdit(game)}>
            ✏️ Editar
          </button>

          <button className="btn purple" onClick={() => onRate(game)}>
            ⭐ Calificar
          </button>

          <button className="btn retro-btn danger" onClick={() => onDelete(game._id)}>
            ❌ Eliminar
          </button>
        </div>
      )}
    </li>
  );
}