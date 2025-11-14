import React from "react";
import StarRating from "./StarRating";

export default function GameModal({ game, onClose, onEdit, onDelete }) {
  if (!game) return null;

  // Función helper para manejar rutas de imágenes
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "/placeholder-game.png";
    if (imageUrl.startsWith('http')) return imageUrl;
    return `/images/${imageUrl}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="game-info-modal" onClick={(e) => e.stopPropagation()}>
        
        <span className="modal-close" onClick={onClose}>×</span>
        
        <h2 className="game-modal-title">{game.name}</h2>

        <img 
          className="game-modal-image"
          src={getImageUrl(game.imageUrl)}
          alt={game.name}
        />

        <div className="game-modal-details">
          <div className="game-detail-item">
            <span className="detail-icon">🎮</span>
            <div>
              <span className="detail-label">Plataforma</span>
              <span className="detail-value">{game.platform}</span>
            </div>
          </div>

          <div className="game-detail-item">
            <span className="detail-icon">🌸</span>
            <div>
              <span className="detail-label">Género</span>
              <span className="detail-value">{game.genre}</span>
            </div>
          </div>

          <div className="game-detail-item">
            <span className="detail-icon">📅</span>
            <div>
              <span className="detail-label">Año</span>
              <span className="detail-value">{game.releaseYear}</span>
            </div>
          </div>
        </div>

        {/* Descripción del juego */}
        <div className="game-modal-description">
          <h3 className="description-title">📖 Descripción</h3>
          <p className="description-text">
            {game.description || 
              `${game.name} es un increíble juego de ${game.genre} lanzado en ${game.releaseYear}. 
              Una experiencia única que combina acción, estrategia y entretenimiento. 
              ¡Perfecto para los amantes de ${game.genre}!`
            }
          </p>
        </div>
        
        <div className="game-modal-rating">
          <h3 className="rating-section-title">⭐ Calificación</h3>
          <StarRating 
            rating={game.rating || 0}
            onRate={(r) => onEdit({ ...game, rating: r })}
          />
        </div>

        <div className="game-modal-actions">
          <button className="game-modal-btn edit" onClick={() => onEdit(game)}>
            ✏️ Editar
          </button>
          <button className="game-modal-btn delete" onClick={() => onDelete(game._id)}>
            🗑️ Eliminar
          </button>
          <button className="game-modal-btn close" onClick={onClose}>
            ✕ Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}