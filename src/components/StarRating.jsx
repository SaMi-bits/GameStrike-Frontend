import React from "react";
import "./stars.css";

export default function StarRating({ value = 0, onChange }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="stars-wrap">
      {stars.map((s) => (
        <span
          key={s}
          className={`star ${value >= s ? "filled" : ""}`}
          onClick={() => onChange && onChange(s)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
