// src/components/GameModal.jsx
import React from "react";
import "../styles.css";

export default function GameModal({ game, onClose, onEdit, onDelete }) {
  if (!game) return null;

  return (
    <div className="modal-overlay">
      <div className="modal retro-pop">
        
        <h2 className="retro-title">{game.name}</h2>

        <img 
          src={`/images/${game.imageUrl}`} 
          alt={game.name} 
          className="modal-image"
        />

        <p className="meta-line">{game.genre} — {game.platform}</p>

        <div className="modal-actions">
          <button className="btn primary" onClick={() => onEdit(game)}>
            ✏️ Editar
          </button>

          <button className="btn danger" onClick={() => onDelete(game._id)}>
            🗑️ Eliminar
          </button>

          <button className="btn" onClick={onClose}>
            ❌ Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
