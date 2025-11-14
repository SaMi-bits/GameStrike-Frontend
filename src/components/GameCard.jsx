// src/components/GameCard.jsx
import React from "react";

export default function GameCard({ game, onEdit, onDelete, onSelect }) {
  return (
    <li className="game-card" title={game.name}>
      <div className="game-card">
        <button
          onClick={() => onSelect && onSelect(game)} 
          className="game-link"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: "inherit",
            border: "none",
            background: "none",
            cursor: "pointer"
          }}
        >
          {game.imageUrl ? (
            <img
              className="game-image"
              src={`/images/${game.imageUrl}`}
              alt={game.name}
            />
          ) : (
            <div style={{
              width: 96,
              height: 96,
              borderRadius: 10,
              background: "linear-gradient(90deg,#222,#333)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999"
            }}>
              No Img
            </div>
          )}

          <div className="game-info">
            <b>{game.name}</b>
            <div className="meta-line">
              {game.genre || "—"} — {game.platform || "—"} — {game.releaseYear || "—"}
            </div>
          </div>
        </button>

        <div className="game-actions">
          <button className="btn" onClick={() => onEdit(game)}>✏️</button>
          <button className="btn danger" onClick={() => onDelete(game._id || game.id)}>🗑️</button>
        </div>
      </div>
    </li>
  );
}
