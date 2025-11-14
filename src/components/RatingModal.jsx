import React, { useEffect, useState } from "react";

export default function RatingModal({ game, onClose, onSaveReview }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [progress, setProgress] = useState(0);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSave = () => {
    onSaveReview({
      rating,
      text,
      difficulty,
      progress,
      date: new Date()
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()} // evitar cerrar haciendo clic dentro
      >
        <span className="modal-close" onClick={onClose}>×</span>

        <h2>⭐ Calificar {game.name}</h2>

        {/* Estrellas */}
        <div style={{ display: "flex", gap: "8px", margin: "12px 0" }}>
          {[1,2,3,4,5].map((n) => (
            <span
              key={n}
              className="star"
              style={{ color: n <= rating ? "#ffd93d" : "#ccc" }}
              onClick={() => setRating(n)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Campo de texto */}
        <textarea
          placeholder="Escribe tu reseña…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            borderRadius: "10px",
            padding: "10px",
            border: "1px solid #ccc"
          }}
        />

        {/* Dificultad */}
        <label style={{ marginTop: "10px", display: "block" }}>
          Dificultad: {difficulty}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />

        {/* Progreso */}
        <label style={{ marginTop: "10px", display: "block" }}>
          Progreso del juego: {progress}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
        />

        <button
          className="btn primary"
          style={{ marginTop: "14px", width: "100%" }}
          onClick={handleSave}
        >
          Guardar Reseña
        </button>

        {/* Reseñas existentes */}
        <div className="modal-review-list">
          <h3>Reseñas:</h3>

          {game.reviews?.length === 0 && <p>No hay reseñas aún</p>}

          {game.reviews?.map((r, i) => (
            <div key={i} className="modal-review-item">
              <b>{r.rating} ★</b>
              <p>{r.text}</p>
              <small>Dificultad: {r.difficulty} / Progreso: {r.progress}%</small>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
