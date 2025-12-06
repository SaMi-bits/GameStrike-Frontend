import React from "react";
import "./spinner.css";

export default function Spinner({ message = "Cargando...", size = "medium" }) {
  return (
    <div className={`spinner-container ${size}`}>
      <div className="spinner"></div>
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );
}