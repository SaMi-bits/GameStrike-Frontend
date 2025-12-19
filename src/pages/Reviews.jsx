import React, { useState, useEffect } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API}/api/reviews`);
      if (res.ok) {
        const data = await res.json();
        console.log("Reseñas recibidas:", data); // Para debug
        setReviews(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error cargando reseñas:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredReviews = () => {
    let filtered = [...reviews];
    
    if (filter === "top") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filter === "recent") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.date || a.createdAt || 0);
        const dateB = new Date(b.date || b.createdAt || 0);
        return dateB - dateA;
      });
    }
    
    return filtered;
  };

  const filteredReviews = getFilteredReviews();

  // Función para obtener el nombre del autor
  const getAuthorName = (review) => {
    return review.author?.trim() || "Anónimo";
  };

  // Función para obtener el avatar
  const getAvatar = (review) => {
    if (review.avatar) return review.avatar;
    // Si no tiene avatar, asignar uno basado en el nombre para consistencia
    const avatars = ["🦊", "🐱", "🐰", "🐼", "🐨", "🐸", "🦄", "🐙", "🦋", "🌸"];
    const authorName = review.author || "anonymous";
    const index = authorName.length % avatars.length;
    return avatars[index];
  };

  // Función para obtener el texto de la reseña
  const getReviewText = (review) => {
    return review.text || review.comment || "Sin comentario";
  };

  return (
    <div className="reviews-page-container">
      {/* Hero Section */}
      <div className="reviews-hero">
        <div className="reviews-hero-content">
          <h1 className="reviews-hero-title">
            💬 Reseñas de la Comunidad
          </h1>
          <p className="reviews-hero-subtitle">
            Descubre lo que otros jugadores piensan sobre sus juegos favoritos
          </p>
        </div>
        <div className="reviews-hero-decoration">
          <span className="float-emoji">🎮</span>
          <span className="float-emoji">⭐</span>
          <span className="float-emoji">🌸</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="reviews-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          📚 Todas ({reviews.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'top' ? 'active' : ''}`}
          onClick={() => setFilter('top')}
        >
          ⭐ Mejor calificadas
        </button>
        <button 
          className={`filter-btn ${filter === 'recent' ? 'active' : ''}`}
          onClick={() => setFilter('recent')}
        >
          🕐 Más recientes
        </button>
      </div>

      {/* Stats */}
      <div className="reviews-stats">
        <div className="stat-card">
          <span className="stat-icon">📝</span>
          <div className="stat-info">
            <span className="stat-number">{reviews.length}</span>
            <span className="stat-label">Reseñas totales</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <div className="stat-info">
            <span className="stat-number">
              {reviews.length > 0 
                ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
                : "0"}
            </span>
            <span className="stat-label">Promedio</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <div className="stat-info">
            <span className="stat-number">
              {new Set(reviews.map(r => getAuthorName(r))).size}
            </span>
            <span className="stat-label">Jugadores</span>
          </div>
        </div>
      </div>

      {/* Lista de reseñas */}
      {loading ? (
        <p className="reviews-loading">Cargando reseñas... 🎮</p>
      ) : filteredReviews.length === 0 ? (
        <div className="reviews-empty">
          <span className="empty-icon">📭</span>
          <h3>No hay reseñas todavía</h3>
          <p>¡Sé el primero en compartir tu opinión!</p>
        </div>
      ) : (
        <div className="reviews-grid-layout">
          {filteredReviews.map((review, index) => (
            <div key={review._id || index} className="review-card-modern">
              <div className="review-card-header">
                <span className="review-avatar">{getAvatar(review)}</span>
                <div className="review-author-info">
                  <span className="review-author-name">{getAuthorName(review)}</span>
                  <div className="review-stars-display">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={i < (review.rating || 0) ? "star-filled" : "star-empty"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {review.gameId && (
                <div className="review-game-tag">
                  🎮 {typeof review.gameId === 'object' ? review.gameId.name : "Juego"}
                </div>
              )}

              <p className="review-card-text">{getReviewText(review)}</p>

              <div className="review-card-footer">
                {review.difficulty && (
                  <span className="review-meta-item">
                    ⚔️ Dificultad: {review.difficulty}/10
                  </span>
                )}
                {review.progress !== undefined && review.progress !== null && (
                  <span className="review-meta-item">
                    🎮 Progreso: {review.progress}%
                  </span>
                )}
                {(review.date || review.createdAt) && (
                  <span className="review-meta-item">
                    📅 {new Date(review.date || review.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .reviews-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .reviews-hero {
          text-align: center;
          padding: 3rem 1rem;
          background: linear-gradient(135deg, rgba(255, 124, 186, 0.15), rgba(128, 208, 255, 0.15));
          border-radius: 24px;
          margin-bottom: 2rem;
          border: 2px solid rgba(255, 124, 186, 0.3);
          position: relative;
          overflow: hidden;
        }

        .reviews-hero-content {
          position: relative;
          z-index: 1;
        }

        .reviews-hero-title {
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #ff7cc8, #c084fc, #80d0ff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .reviews-hero-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .reviews-hero-decoration {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          gap: 10px;
        }

        .float-emoji {
          font-size: 2rem;
          animation: floatEmoji 3s ease-in-out infinite;
          opacity: 0.6;
        }

        @keyframes floatEmoji {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .reviews-filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.8rem 1.5rem;
          border-radius: 12px;
          border: 2px solid rgba(255, 124, 186, 0.3);
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .filter-btn:hover {
          background: rgba(255, 124, 186, 0.2);
          transform: translateY(-2px);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #ff7cc8, #c084fc);
          border-color: #ff7cc8;
          box-shadow: 0 8px 20px rgba(255, 124, 186, 0.4);
        }

        .reviews-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, rgba(255, 124, 186, 0.1), rgba(128, 208, 255, 0.1));
          border-radius: 16px;
          border: 2px solid rgba(255, 124, 186, 0.2);
        }

        .stat-icon {
          font-size: 2.5rem;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(255, 124, 186, 0.3), rgba(128, 208, 255, 0.3));
          border-radius: 14px;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: 900;
          color: #ffd6f5;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .reviews-loading {
          text-align: center;
          padding: 3rem;
          font-size: 1.2rem;
          color: #ff7cc8;
        }

        .reviews-empty {
          text-align: center;
          padding: 4rem 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          border: 2px dashed rgba(255, 124, 186, 0.3);
        }

        .empty-icon {
          font-size: 4rem;
          display: block;
          margin-bottom: 1rem;
        }

        .reviews-grid-layout {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .review-card-modern {
          background: linear-gradient(135deg, rgba(255, 224, 247, 0.08), rgba(184, 232, 255, 0.08));
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 124, 186, 0.2);
          border-radius: 20px;
          padding: 1.5rem;
          transition: all 0.3s;
        }

        .review-card-modern:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(255, 124, 186, 0.3);
          border-color: rgba(255, 124, 186, 0.5);
        }

        .review-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1rem;
        }

        .review-avatar {
          font-size: 2.5rem;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(255, 124, 186, 0.3), rgba(128, 208, 255, 0.3));
          border-radius: 50%;
          border: 3px solid rgba(255, 124, 186, 0.4);
        }

        .review-author-info {
          flex: 1;
        }

        .review-author-name {
          display: block;
          font-weight: 700;
          font-size: 1.1rem;
          color: #ffd6f5;
          margin-bottom: 0.4rem;
        }

        .review-stars-display {
          display: flex;
          gap: 3px;
        }

        .star-filled {
          color: #ffd93d;
          font-size: 0.9rem;
          text-shadow: 0 0 8px rgba(255, 217, 61, 0.6);
        }

        .star-empty {
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.9rem;
        }

        .review-game-tag {
          display: inline-block;
          padding: 0.4rem 0.8rem;
          background: rgba(255, 124, 186, 0.2);
          border-radius: 8px;
          font-size: 0.85rem;
          color: #ffd6f5;
          margin-bottom: 1rem;
          border: 1px solid rgba(255, 124, 186, 0.3);
        }

        .review-card-text {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.7;
          margin-bottom: 1rem;
          font-size: 0.95rem;
        }

        .review-card-footer {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 124, 186, 0.2);
        }

        .review-meta-item {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        @media (max-width: 768px) {
          .reviews-hero-title {
            font-size: 1.8rem;
          }
          
          .reviews-grid-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}