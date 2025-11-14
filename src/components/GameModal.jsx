import React from "react";
import "./modal.css";

export default function GameModal({ game, onClose, onEdit, onDelete }) {
  if (!game) return null;

  return (
    <div className="modal-overlay">
      <div className="modal retro-pop">

        <span className="close-btn" onClick={onClose}>✖</span>

        <h2 className="retro-accent">{game.name}</h2>

        <img className="modal-img pixel-border" src={game.image} />

        <p><b>Género:</b> {game.genre}</p>
        <p><b>Plataforma:</b> {game.platform}</p>
        <p><b>Año:</b> {game.year}</p>

        <div className="modal-buttons">
          <button className="btn-edit pulse" onClick={() => onEdit(game)}>
            Editar ✏
          </button>

          <button className="btn-delete" onClick={() => onDelete(game._id)}>
            Eliminar 🗑
          </button>
        </div>

      </div>
    </div>
  );
}
