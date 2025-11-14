// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import GameModal from "../components/GameModal";   // ⬅ IMPORTANTE
import Toast from "../components/Toast";
import "../styles.css";

export default function Home() {
  const [selectedGame, setSelectedGame] = useState(null);
  const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const [games, setGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newGame, setNewGame] = useState({ name: "", genre: "", platform: "", releaseYear: "", imageUrl: "" });
  const [editing, setEditing] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(false);

  // toast helpers
  const pushToast = (message, type = "success", ttl = 3800) => {
    const id = Date.now() + Math.random();
    setToasts((s) => [{ id, message, type }, ...s]);
    if (ttl > 0) setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), ttl);
  };
  const removeToast = (id) => setToasts((s) => s.filter((x) => x.id !== id));

  const fetchGames = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/games`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setGames(Array.isArray(data) ? data : data.games || data.data || []);
    } catch (err) {
      console.error(err);
      pushToast("Error al cargar juegos", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API}/reviews`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : data.reviews || data.data || []);
    } catch (err) {
      console.error(err);
      pushToast("Error al cargar reseñas", "warn");
    }
  };

  useEffect(() => {
    fetchGames();
    fetchReviews();
  }, []);

  const saveGame = async (e) => {
    e.preventDefault();
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `${API}/games/${editing}` : `${API}/games`;
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
    } catch (err) {
      console.error(err);
      pushToast("No se pudo guardar", "error");
    }
  };

  const deleteGame = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este juego?")) return;

    try {
      const res = await fetch(`${API}/games/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      pushToast("Juego eliminado", "success");
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
      imageUrl: game.imageUrl,
    });
    pushToast("Editando " + game.name);
  };

  return (
    <div className="app-container">
      <Toast items={toasts} onRemove={removeToast} />

      <header>
        <h1>🎮 GameStrike</h1>
      </header>

      {/* FORMULARIO */}
      <section className="panel panel-form">
        (tu formulario sigue igual)
      </section>

      {/* LISTA DE JUEGOS */}
      <section className="panel panel-games">
        {loading ? <p>Cargando…</p> : (
          <ul className="games-list">
            {games.map((g) => (
              <GameCard
                key={g._id || g.id}
                game={g}
                onEdit={startEdit}
                onDelete={deleteGame}
                onSelect={(game) => setSelectedGame(game)}
              />
            ))}
          </ul>
        )}
      </section>

      {/* MODAL (dentro del return) */}
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
    </div>
  );
}
