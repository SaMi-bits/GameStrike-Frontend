import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Reviews from "./pages/Reviews.jsx";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="navbar">
          <div className="logo-area">
            <span className="logo-emoji">🎮</span>
            <h1>GameStrike</h1>
          </div>
          <div className="nav-links">
            <Link to="/">Inicio</Link>
            <Link to="/about">Acerca de</Link>
            <Link to="/reviews">Reseñas</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}