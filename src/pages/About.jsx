import React from "react";

export default function About() {
  return (
    <div className="app-container">
      <h1>Acerca de GameStrike 🎮</h1>
      <p>
        GameStrike es una aplicación para gestionar tus juegos favoritos y
        compartir reseñas con otros jugadores.  
        Aquí puedes agregar, editar y eliminar juegos, además de dejar tu opinión
        y calificación.
      </p>

      <p style={{ marginTop: "1rem" }}>
        Proyecto creado con 💻 React + Node.js + MongoDB.
      </p>
    </div>
  );
}
