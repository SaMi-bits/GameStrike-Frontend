import React, { useState, useEffect } from "react";

export default function Stats() {
  const [games, setGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [gamesRes, reviewsRes] = await Promise.all([
        fetch(`${API}/games`),
        fetch(`${API}/reviews`)
      ]);
      
      if (gamesRes.ok) setGames(await gamesRes.json());
      if (reviewsRes.ok) setReviews(await reviewsRes.json());
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cálculos de estadísticas
  const totalGames = games.length;
  const totalReviews = reviews.length;
  
  const avgRating = games.length > 0
    ? (games.reduce((sum, g) => sum + (g.rating || 0), 0) / games.length).toFixed(1)
    : 0;

  const genreCounts = games.reduce((acc, game) => {
    acc[game.genre] = (acc[game.genre] || 0) + 1;
    return acc;
  }, {});

  const topGenre = Object.entries(genreCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A";

  const platformCounts = games.reduce((acc, game) => {
    acc[game.platform] = (acc[game.platform] || 0) + 1;
    return acc;
  }, {});

  const recentGames = [...games]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const topRatedGames = [...games]
    .filter(g => g.rating > 0)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ fontSize: '1.2rem', color: '#ff7cc8' }}>Cargando estadísticas... 📊</p>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <div className="stats-hero">
        <h1 className="stats-title">📊 Estadísticas Personales</h1>
        <p className="stats-subtitle">Resumen de tu actividad en GameStrike</p>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="stats-grid">
        <div className="stat-card-large">
          <span className="stat-icon">🎮</span>
          <div className="stat-content">
            <span className="stat-number">{totalGames}</span>
            <span className="stat-label">Juegos en Biblioteca</span>
          </div>
        </div>

        <div className="stat-card-large">
          <span className="stat-icon">💬</span>
          <div className="stat-content">
            <span className="stat-number">{totalReviews}</span>
            <span className="stat-label">Reseñas Escritas</span>
          </div>
        </div>

        <div className="stat-card-large">
          <span className="stat-icon">⭐</span>
          <div className="stat-content">
            <span className="stat-number">{avgRating}</span>
            <span className="stat-label">Calificación Promedio</span>
          </div>
        </div>

        <div className="stat-card-large">
          <span className="stat-icon">🎯</span>
          <div className="stat-content">
            <span className="stat-number">{topGenre}</span>
            <span className="stat-label">Género Favorito</span>
          </div>
        </div>
      </div>

      {/* Juegos por género */}
      <div className="stats-section">
        <h2 className="section-title">📂 Distribución por Género</h2>
        <div className="genre-chart">
          {Object.entries(genreCounts).map(([genre, count]) => (
            <div key={genre} className="genre-bar-container">
              <span className="genre-label">{genre}</span>
              <div className="genre-bar-bg">
                <div 
                  className="genre-bar-fill" 
                  style={{ 
                    width: `${(count / totalGames) * 100}%`,
                    background: 'linear-gradient(90deg, #ff7cc8, #c084fc)'
                  }}
                />
              </div>
              <span className="genre-count">{count} juegos</span>
            </div>
          ))}
        </div>
      </div>

      {/* Juegos por plataforma */}
      <div className="stats-section">
        <h2 className="section-title">🎮 Plataformas</h2>
        <div className="platforms-grid">
          {Object.entries(platformCounts).map(([platform, count]) => (
            <div key={platform} className="platform-card">
              <span className="platform-emoji">🎯</span>
              <span className="platform-name">{platform}</span>
              <span className="platform-count">{count} juegos</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top 5 mejor calificados */}
      <div className="stats-section">
        <h2 className="section-title">⭐ Top 5 Mejor Calificados</h2>
        <div className="top-games-list">
          {topRatedGames.length === 0 ? (
            <p className="empty-message">No hay juegos calificados todavía</p>
          ) : (
            topRatedGames.map((game, index) => (
              <div key={game._id} className="top-game-item">
                <span className="game-rank">#{index + 1}</span>
                <div className="game-info-inline">
                  <span className="game-name">{game.name}</span>
                  <span className="game-meta">{game.genre} • {game.platform}</span>
                </div>
                <div className="game-rating-inline">
                  {"★".repeat(Math.floor(game.rating))}
                  <span className="rating-number">{game.rating.toFixed(1)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Juegos recientes */}
      <div className="stats-section">
        <h2 className="section-title">🕐 Agregados Recientemente</h2>
        <div className="recent-games-list">
          {recentGames.length === 0 ? (
            <p className="empty-message">No hay juegos agregados todavía</p>
          ) : (
            recentGames.map(game => (
              <div key={game._id} className="recent-game-item">
                <span className="game-emoji">🎮</span>
                <div className="game-info-inline">
                  <span className="game-name">{game.name}</span>
                  <span className="game-meta">
                    {new Date(game.createdAt).toLocaleDateString('es-ES')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .stats-hero {
          text-align: center;
          padding: 3rem 1rem;
          background: linear-gradient(135deg, rgba(255, 124, 186, 0.15), rgba(128, 208, 255, 0.15));
          border-radius: 24px;
          margin-bottom: 2rem;
          border: 2px solid rgba(255, 124, 186, 0.3);
        }

        .stats-title {
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #ff7cc8, #c084fc, #80d0ff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .stats-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card-large {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(255, 124, 186, 0.1), rgba(128, 208, 255, 0.1));
          border-radius: 20px;
          border: 2px solid rgba(255, 124, 186, 0.2);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .stat-card-large:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(255, 124, 186, 0.3);
        }

        .stat-icon {
          font-size: 3rem;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(255, 124, 186, 0.3), rgba(128, 208, 255, 0.3));
          border-radius: 16px;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 900;
          color: #ffd6f5;
        }

        .stat-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .stats-section {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 124, 186, 0.2);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #ffd6f5;
          margin-bottom: 1.5rem;
        }

        .genre-bar-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .genre-label {
          min-width: 120px;
          font-weight: 600;
          color: #ffd6f5;
        }

        .genre-bar-bg {
          flex: 1;
          height: 30px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .genre-bar-fill {
          height: 100%;
          border-radius: 10px;
          transition: width 0.5s ease;
        }

        .genre-count {
          min-width: 80px;
          text-align: right;
          color: rgba(255, 255, 255, 0.7);
        }

        .platforms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
        }

        .platform-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem;
          background: linear-gradient(135deg, rgba(255, 124, 186, 0.1), rgba(128, 208, 255, 0.1));
          border-radius: 16px;
          border: 2px solid rgba(255, 124, 186, 0.2);
          text-align: center;
        }

        .platform-emoji {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .platform-name {
          font-weight: 600;
          color: #ffd6f5;
          margin-bottom: 0.3rem;
        }

        .platform-count {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .top-games-list,
        .recent-games-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .top-game-item,
        .recent-game-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 124, 186, 0.15);
        }

        .game-rank {
          font-size: 1.5rem;
          font-weight: 900;
          color: #ff7cc8;
          min-width: 40px;
        }

        .game-emoji {
          font-size: 1.5rem;
        }

        .game-info-inline {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .game-name {
          font-weight: 600;
          color: #ffd6f5;
        }

        .game-meta {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .game-rating-inline {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #ffd93d;
          font-size: 1.2rem;
        }

        .rating-number {
          font-weight: 700;
          color: #ffd6f5;
        }

        .empty-message {
          text-align: center;
          padding: 2rem;
          color: rgba(255, 255, 255, 0.5);
          font-style: italic;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .genre-bar-container {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}