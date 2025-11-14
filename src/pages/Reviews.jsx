 //src/pages/Reviews.jsx
import React from "react";
import ReviewCard from "../components/ReviewCard.jsx"; // si ya tienes este componente
//import "../style.css";

export default function Reviews() { 
  const reviews = [
    { _id: "1", author: "Juan", text: "¡Gran juego!" },
    { _id: "2", author: "María", text: "Me encantó la historia." },
  ];

  return (
    <div className="reviews-page">
      <h1>💬 Reseñas de GameStrike</h1>
      <p>
        Aquí podrás explorar las reseñas de los juegos que otros jugadores han
        agregado. Pronto añadiremos filtros por calificación y fecha.
      </p>

      <div className="reviews-grid">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}
