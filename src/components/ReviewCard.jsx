import React from "react";

export default function ReviewCard({ review }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.8)",
        padding: "1rem",
        margin: "0.5rem 0",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
      }}
    >
      <h3 style={{ color: "#ff7cc8" }}>{review.author}</h3>
      <p>{review.text}</p>
    </div>
  );
}
