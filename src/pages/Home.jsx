import React, { useEffect, useState } from "react";

export default function Home() {
  const [games, setGames] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadGames = async () => {
      try {
        const res = await fetch(`${API}/games`);
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error("Error al cargar juegos:", err);
      }
    };
    loadGames();
  }, []);

  return (
    <div className="page">
      <h2>Lista de Juegos</h2>
      {games.length === 0 ? (
        <p>No hay juegos cargados.</p>
      ) : (
        <ul>
          {games.map((g) => (
            <li key={g._id}>{g.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
