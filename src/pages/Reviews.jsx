import React, { useState, useEffect } from "react";
import "../styles.css";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, top, recent

  const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API}/reviews`);
      if (res.ok) {
        const data = await res.json();
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
      filtered.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    }
    
    return filtered;
  };

  const filteredReviews = getFilteredReviews();

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
          📚 Todas
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
              {new Set(reviews.map(r => r.author)).size}
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
            <div key={index} className="review-card-modern">
              <div className="review-card-header">
                <span className="review-avatar">{review.avatar || "🎮"}</span>
                <div className="review-author-info">
                  <span className="review-author-name">{review.author || "Anónimo"}</span>
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
                  🎮 {review.gameId.name || "Juego"}
                </div>
              )}

              <p className="review-card-text">{review.text || review.comment}</p>

              <div className="review-card-footer">
                {review.difficulty && (
                  <span className="review-meta-item">
                    ⚔️ Dificultad: {review.difficulty}/10
                  </span>
                )}
                {review.progress !== undefined && (
                  <span className="review-meta-item">
                    🎮 Progreso: {review.progress}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}