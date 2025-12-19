import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL, getImageUrl } from "../config/api.js"; // 🔥 FIX: Usar helpers de API
import Spinner from "../components/Spinner";
import "../styles.css";

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ author: "", comment: "", rating: 5 });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const resGame = await fetch(`${API_URL}/api/games/${id}`);
        const resReviews = await fetch(`${API_URL}/api/reviews/game/${id}`);
        
        if (!resGame.ok) throw new Error("Error al cargar el juego");
        
        const gameData = await resGame.json();
        const reviewsData = resReviews.ok ? await resReviews.json() : [];
        
        setGame(gameData);
        setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGameData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newReview.author.trim() || !newReview.comment.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }
    
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/reviews/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: newReview.comment,
          rating: newReview.rating,
          author: newReview.author
        }),
      });
      
      if (!res.ok) throw new Error("Error al enviar reseña");
      
      const saved = await res.json();
      setReviews([saved, ...reviews]);
      setNewReview({ author: "", comment: "", rating: 5 });
    } catch (err) {
      console.error(err);
      alert("❌ No se pudo enviar la reseña");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <Spinner message="Cargando datos del juego..." />;

  return (
    <div className="game-detail retro-bg">
      <Link to="/" className="back-btn">← Volver</Link>

      <div className="game-info-card">
        {game?.imageUrl && (
          <img 
            src={getImageUrl(game.imageUrl)} 
            alt={game.name} 
            className="detail-image" 
          />
        )}
        <div className="info">
          <h1 className="retro-title">{game?.name}</h1>
          <p><strong>🎮 Plataforma:</strong> {game?.platform}</p>
          <p><strong>🌸 Género:</strong> {game?.genre}</p>
          <p><strong>🕓 Año:</strong> {game?.releaseYear}</p>
        </div>
      </div>

      <div className="reviews-section">
        <h2 className="retro-subtitle">💬 Reseñas</h2>
        {reviews.length === 0 ? (
          <p className="muted">No hay reseñas todavía. ¡Sé el primero!</p>
        ) : (
          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <div key={r._id || i} className="review-card pop-in">
                <p className="review-author">⭐ {r.rating}/5 — {r.author}</p>
                <p>{r.text || r.comment}</p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="review-form pop-in">
          <input
            type="text"
            placeholder="Tu nombre"
            value={newReview.author}
            onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
            required
          />
          <textarea
            placeholder="Escribe tu reseña..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
          />
          <input
            type="number"
            min="0"
            max="5"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
          />
          <button type="submit" disabled={sending}>
            {sending ? "Enviando..." : "✨ Publicar Reseña"}
          </button>
        </form>
      </div>
    </div>
  );
}