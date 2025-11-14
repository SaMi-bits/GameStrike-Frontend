// src/components/GameModal.jsx
import React from "react";
import StarRating from "./StarRating";

export default function GameModal({ game, onClose, onEdit, onDelete }) {
  if (!game) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        <h2 className="modal-title">{game.name}</h2>

        <img 
          className="modal-image"
          src={`/images/${game.imageUrl}`}
          alt={game.name}
        />

        <p><b>Género:</b> {game.genre}</p>
        <p><b>Plataforma:</b> {game.platform}</p>
        <p><b>Año:</b> {game.releaseYear}</p>
        <div style={{ marginTop: "12px" }}>
        <h3>Calificación</h3>
         <StarRating 
            value={game.rating || 0}
          onChange={(r) => onEdit({ ...game, rating: r })}
            />
      </div>


        <div className="modal-actions">
          <button className="modal-btn edit" onClick={() => onEdit(game)}>Editar</button>
          <button className="modal-btn delete" onClick={() => onDelete(game._id)}>Eliminar</button>
          <button className="modal-btn close" onClick={onClose}>Cerrar</button>
        </div>

      </div>
    </div>
  );
}
