// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import GameModal from "../components/GameModal";
import EditModal from "../components/EditModal";
import Toast from "../components/Toast";
import AddGameModal from "../components/AddGameModal";
import RatingModal from "../components/RatingModal";
import "../styles.css";

export default function Home() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [editing, setEditing] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [ratingGame, setRatingGame] = useState(null);
  const [ratings, setRatings] = useState([]);

  const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const [games, setGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newGame, setNewGame] = useState({
    name: "",
    genre: "",
    platform: "",
    releaseYear: "",
    imageUrl: ""
  });

  const [toasts, setToasts] = useState([]);

  // ---------------------------
  // NOTIFICACIONES
  // ---------------------------
  const pushToast = (message, type = "success", ttl = 3800) => {
    const id = Date.now() + Math.random();
    setToasts((s) => [{ id, message, type }, ...s]);
    if (ttl > 0) setTimeout(() =>
      setToasts((s) => s.filter((x) => x.id !== id)), ttl);
  };

  const removeToast = (id) => {
    setToasts((s) => s.filter((x) => x.id !== id));
  };

  // ---------------------------
  // CARGAR JUEGOS
  // ---------------------------
  const fetchGames = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/games`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setGames(Array.isArray(data) ? data : data.games || []);
    } catch {
      pushToast("Error al cargar juegos", "error");
    }
    setLoading(false);
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API}/reviews`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : data.reviews || []);
    } catch {
      pushToast("Error al cargar reseñas", "warn");
    }
  };

  const loadGameReviews = async (gameId) => {
    try {
      const res = await fetch(`${API}/reviews/game/${gameId}`);
      const data = await res.json();
      setRatings(data);
    } catch {
      pushToast("Error cargando reseñas", "error");
    }
  };

  const saveReview = async (gameId, reviewData) => {
    try {
      const res = await fetch(`${API}/reviews/${gameId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData)
      });

      if (!res.ok) throw new Error();

      pushToast("Reseña guardada ⭐", "success");
      loadGameReviews(gameId);
    } catch (err) {
      pushToast("No se pudo guardar la reseña", "error");
    }
  };

  useEffect(() => {
    fetchGames();
    fetchReviews();
  }, []);

  // ---------------------------
  // GUARDAR (crear o editar)
  // ---------------------------
  const saveGame = async (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing ? `${API}/games/${editing}` : `${API}/games`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGame)
      });
      if (!res.ok) throw new Error();

      pushToast(editing ? "Juego actualizado" : "Juego creado");
      setNewGame({ name: "", genre: "", platform: "", releaseYear: "", imageUrl: "" });
      setEditing(null);
      fetchGames();

    } catch {
      pushToast("No se pudo guardar", "error");
    }
  };

  // ---------------------------
  // GUARDAR DESDE EDIT MODAL
  // ---------------------------
  const saveEditedGame = async (updatedGame) => {
    try {
      const res = await fetch(`${API}/games/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedGame)
      });

      if (!res.ok) throw new Error();

      pushToast("Juego actualizado 🎉");
      setEditing(null);
      fetchGames();

    } catch {
      pushToast("Error al actualizar", "error");
    }
  };

  // ---------------------------
  // ELIMINAR JUEGO
  // ---------------------------
  const deleteGame = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este juego?")) return;

    try {
      const res = await fetch(`${API}/games/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();
      pushToast("Juego eliminado ✔");
      fetchGames();

    } catch {
      pushToast("Error al eliminar", "error");
    }
  };

  const startEdit = (game) => {
    setEditing(game._id || game.id);

    setNewGame({
      name: game.name,
      genre: game.genre,
      platform: game.platform,
      releaseYear: game.releaseYear,
      imageUrl: game.imageUrl
    });

    pushToast("Editando " + game.name);
  };

  // ------------------------------------------------------
  // 🔥 UI
  // ------------------------------------------------------
  return (
    <div className="app-container">
      <Toast items={toasts} onRemove={removeToast} />

      {/* NAVBAR RETRO POP */}
      <header className="topbar">
        <div className="logo-area">
          <img src="/icons/controller.png" className="logo-icon" />
          <h1>GameStrike</h1>
        </div>

        <nav className="nav-links">
          <a href="/">Inicio</a>
          <a href="/reviews">Reseñas</a>
          <a href="/about">Acerca</a>
        </nav>

        <button className="btn primary" onClick={() => setAddModal(true)}>
          Agregar Juego
        </button>
      </header>

      {/* LISTA DE JUEGOS */}
      <section className="panel panel-games">
        {loading ? (
          <p>Cargando…</p>
        ) : (
          <ul className="games-list">
            {games.map((g) => (
              <GameCard
                key={g._id || g.id}
                game={g}
                onEdit={startEdit}
                onDelete={deleteGame}
                onSelect={() => setSelectedGame(g)}
                onRate={(game) => {
                  setRatingGame(game);
                  loadGameReviews(game._id || game.id);
                }}
              />
            ))}
          </ul>
        )}
      </section>

      {/* MODAL DE JUEGO */}
      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onEdit={(g) => {
            setSelectedGame(null);
            startEdit(g);
          }}
          onDelete={(id) => {
            setSelectedGame(null);
            deleteGame(id);
          }}
        />
      )}

      {/* MODAL DE EDICIÓN */}
      {editing && (
        <EditModal
          game={newGame}
          onClose={() => setEditing(null)}
          onSave={async (updated) => {
            try {
              const res = await fetch(`${API}/games/${editing}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated)
              });
              if (!res.ok) throw new Error();

              pushToast("Juego actualizado", "success");
              setEditing(null);
              fetchGames();
            } catch (err) {
              console.error(err);
              pushToast("Error al editar", "error");
            }
          }}
        />
      )}

      {/* MODAL DE AGREGAR */}
      {addModal && (
        <AddGameModal
          onClose={() => setAddModal(false)}
          onSave={async (gameData) => {
            try {
              const res = await fetch(`${API}/games`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(gameData)
              });

              if (!res.ok) throw new Error();

              pushToast("Juego agregado 🎉");
              setAddModal(false);
              fetchGames();
            } catch {
              pushToast("Error al agregar", "error");
            }
          }}
        />
      )}

      {/* RATING MODAL */}
      {ratingGame && (
        <RatingModal
          game={{ ...ratingGame, reviews: ratings }}
          onClose={() => setRatingGame(null)}
          onSaveReview={(reviewData) => saveReview(ratingGame._id || ratingGame.id, reviewData)}
        />
      )}
    </div>
  );
}