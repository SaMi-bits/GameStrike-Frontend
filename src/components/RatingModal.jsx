import React, { useEffect, useState } from "react";

export default function RatingModal({ game, onClose, onSaveReview }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [progress, setProgress] = useState(0);
  const [author, setAuthor] = useState("");

  // Avatares kawaii random
  const avatars = ["🦊", "🐱", "🐰", "🐼", "🐨", "🐸", "🦄", "🐙", "🦋", "🌸"];
  
  const getRandomAvatar = () => {
    return avatars[Math.floor(Math.random() * avatars.length)];
  };

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSave = () => {
    if (!author.trim() || !text.trim()) {
      alert("Por favor completa tu nombre y reseña 💭");
      return;
    }

    onSaveReview({
      rating,
      text,
      difficulty,
      progress,
      author,
      avatar: getRandomAvatar(),
      date: new Date()
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="rating-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="modal-close" onClick={onClose}>×</span>

        <h2 className="rating-title">⭐ Calificar {game.name}</h2>

        {/* Imagen del juego */}
        {game.imageUrl && (
          <img 
            src={game.imageUrl || "/placeholder-game.png"} 
            alt={game.name}
            className="rating-game-image"
          />
        )}

        {/* Nombre del autor */}
        <div className="rating-input-group">
          <label className="rating-label">👤 Tu nombre</label>
          <input
            type="text"
            placeholder="Ingresa tu nombre..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="rating-input"
          />
        </div>

        {/* Estrellas */}
        <div className="rating-stars-section">
          <label className="rating-label">Tu calificación</label>
          <div className="rating-stars">
            {[1,2,3,4,5].map((n) => (
              <span
                key={n}
                className={`rating-star ${n <= rating ? 'active' : ''}`}
                onClick={() => setRating(n)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Campo de texto */}
        <div className="rating-input-group">
          <label className="rating-label">💬 Tu reseña</label>
          <textarea
            placeholder="Comparte tu experiencia con este juego..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="rating-textarea"
          />
        </div>

        {/* Dificultad */}
        <div className="rating-slider-group">
          <label className="rating-label">
            ⚔️ Dificultad: <span className="rating-value">{difficulty}/10</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="rating-slider"
          />
        </div>

        {/* Progreso */}
        <div className="rating-slider-group">
          <label className="rating-label">
            🎮 Progreso: <span className="rating-value">{progress}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            className="rating-slider"
          />
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          className="btn rating-save-btn"
          onClick={handleSave}
        >
          ✨ Guardar Reseña
        </button>

        {/* Reseñas existentes */}
        <div className="rating-reviews-list">
          <h3 className="rating-reviews-title">📚 Reseñas anteriores</h3>

          {(!game.reviews || game.reviews.length === 0) && (
            <p className="rating-no-reviews">
              No hay reseñas aún. ¡Sé el primero en dejar una! 🌟
            </p>
          )}

          {game.reviews?.map((r, i) => (
            <div key={i} className="rating-review-card">
              <div className="rating-review-header">
                <span className="rating-review-avatar">{r.avatar || "🎮"}</span>
                <div className="rating-review-info">
                  <span className="rating-review-author">{r.author || "Anónimo"}</span>
                  <div className="rating-review-stars">
                    {[...Array(5)].map((_, idx) => (
                      <span key={idx} className={idx < r.rating ? "star-filled" : "star-empty"}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="rating-review-text">{r.text}</p>
              <div className="rating-review-meta">
                <span>⚔️ Dificultad: {r.difficulty}/10</span>
                <span>🎮 Progreso: {r.progress}%</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}