import React, { useEffect, useState } from "react";

export default function RatingModal({ game, onClose, onSaveReview }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [progress, setProgress] = useState(0);
  const [author, setAuthor] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");

  // Avatares kawaii disponibles
  const avatars = ["🦊", "🐱", "🐰", "🐼", "🐨", "🐸", "🦄", "🐙", "🦋", "🌸", "🎮", "⭐", "💜", "🌟", "🎨", "🎭", "🎪", "🎯", "🎲", "🎹"];

  // Seleccionar avatar aleatorio al inicio
  useEffect(() => {
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    setSelectedAvatar(randomAvatar);
  }, []);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSave = () => {
    if (!author.trim() || !text.trim()) {
      alert("Por favor completa tu nombre y reseña 💭");
      return;
    }

    if (rating === 0) {
      alert("Por favor califica el juego con estrellas ⭐");
      return;
    }

    onSaveReview({
      rating,
      text,
      difficulty,
      progress,
      author: author.trim(),
      avatar: selectedAvatar,
      date: new Date().toISOString()
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
            src={game.imageUrl.startsWith('http') ? game.imageUrl : `/images/${game.imageUrl}`}
            alt={game.name}
            className="rating-game-image"
            onError={(e) => { e.target.src = "/placeholder-game.png"; }}
          />
        )}

        {/* Selector de Avatar */}
        <div className="avatar-selector-section">
          <label className="rating-label">🎭 Elige tu avatar</label>
          <div className="avatar-grid">
            {avatars.map((emoji, index) => (
              <button
                key={index}
                type="button"
                className={`avatar-option ${selectedAvatar === emoji ? 'selected' : ''}`}
                onClick={() => setSelectedAvatar(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

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
                <span className="rating-review-avatar">
                  {r.avatar || "🎮"}
                </span>
                <div className="rating-review-info">
                  <span className="rating-review-author">
                    {r.author || "Anónimo"}
                  </span>
                  <div className="rating-review-stars">
                    {[...Array(5)].map((_, idx) => (
                      <span 
                        key={idx} 
                        className={idx < (r.rating || 0) ? "star-filled" : "star-empty"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="rating-review-text">{r.text || r.comment || "Sin comentario"}</p>
              <div className="rating-review-meta">
                {r.difficulty && <span>⚔️ Dificultad: {r.difficulty}/10</span>}
                {r.progress !== undefined && <span>🎮 Progreso: {r.progress}%</span>}
              </div>
              {r.date && (
                <div className="rating-review-date">
                  📅 {new Date(r.date).toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <style>{`
          .avatar-selector-section {
            margin-bottom: 1.5rem;
          }

          .avatar-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
            gap: 8px;
            margin-top: 0.8rem;
          }

          .avatar-option {
            font-size: 2rem;
            padding: 8px;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 124, 186, 0.3);
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            aspect-ratio: 1;
          }

          .avatar-option:hover {
            background: rgba(255, 124, 186, 0.2);
            transform: scale(1.1);
          }

          .avatar-option.selected {
            background: linear-gradient(135deg, rgba(255, 124, 186, 0.4), rgba(128, 208, 255, 0.4));
            border-color: #ff7cc8;
            box-shadow: 0 0 15px rgba(255, 124, 186, 0.5);
            transform: scale(1.15);
          }

          .rating-review-date {
            margin-top: 0.8rem;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.5);
            text-align: right;
          }
        `}</style>
      </div>
    </div>
  );
}