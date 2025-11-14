import React from "react";
import "./stars.css";

export default function StarRating({ rating = 0, onRate, small = false }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`stars-wrap ${small ? 'stars-small' : ''}`}>
      {stars.map((s) => (
        <span
          key={s}
          className={`star ${rating >= s ? "filled" : ""}`}
          onClick={() => onRate && onRate(s)}
        >
          ★
        </span>
      ))}
    </div>
  );
}