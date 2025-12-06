import React from "react";

export default function About() {
  const features = [
    {
      icon: "🎮",
      title: "Gestión de Juegos",
      description: "Organiza tu colección de videojuegos en un solo lugar"
    },
    {
      icon: "⭐",
      title: "Sistema de Calificación",
      description: "Califica tus juegos con un intuitivo sistema de estrellas"
    },
    {
      icon: "💬",
      title: "Reseñas Detalladas",
      description: "Comparte tu experiencia con dificultad y progreso"
    },
    {
      icon: "🌸",
      title: "Diseño Kawaii",
      description: "Interfaz moderna inspirada en la estética pop japonesa"
    }
  ];

  const techStack = [
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "💚" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Vite", icon: "⚡" }
  ];

  return (
    <div className="about-page-container">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <span className="about-hero-emoji">🎮</span>
          <h1 className="about-hero-title">GameStrike</h1>
          <p className="about-hero-subtitle">
            Tu biblioteca personal de videojuegos en la nube
          </p>
        </div>
      </div>

      {/* Descripción principal */}
      <div className="about-section">
        <h2 className="about-section-title">¿Qué es GameStrike?</h2>
        <p className="about-text">
          GameStrike es una aplicación web moderna diseñada para los amantes de los videojuegos.
          Te permite gestionar tu colección personal, calificar tus juegos favoritos y compartir
          reseñas detalladas con otros jugadores de la comunidad.
        </p>
        <p className="about-text">
          Con un diseño inspirado en la estética <strong>Y2K japonesa</strong> y efectos visuales
          únicos, GameStrike combina funcionalidad con una experiencia visual memorable. 
        </p>
      </div>

      {/* Características */}
      <div className="about-section">
        <h2 className="about-section-title">✨ Características</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <span className="feature-icon">{feature.icon}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stack tecnológico */}
      <div className="about-section">
        <h2 className="about-section-title">🛠️ Tecnologías</h2>
        <p className="about-text">
          Construido con tecnologías modernas y probadas:
        </p>
        <div className="tech-stack">
          {techStack.map((tech, index) => (
            <div key={index} className="tech-badge">
              <span className="tech-icon">{tech.icon}</span>
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="about-section">
        <h2 className="about-section-title">🚀 Próximamente</h2>
        <div className="roadmap-list">
          <div className="roadmap-item">
            <span className="roadmap-status pending">📋</span>
            <span className="roadmap-text">Sistema de logros y badges</span>
          </div>
          <div className="roadmap-item">
            <span className="roadmap-status pending">🔍</span>
            <span className="roadmap-text">Búsqueda avanzada y filtros</span>
          </div>
          <div className="roadmap-item">
            <span className="roadmap-status pending">👥</span>
            <span className="roadmap-text">Perfiles de usuario y seguir amigos</span>
          </div>
          <div className="roadmap-item">
            <span className="roadmap-status pending">📊</span>
            <span className="roadmap-text">Estadísticas personalizadas</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="about-footer">
        <p className="about-footer-text">
          Hecho con 💜 por desarrolladores que aman los videojuegos
        </p>
        <div className="about-footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            <span>💻 GitHub</span>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            <span>🐦 Twitter</span>
          </a>
        </div>
      </div>
    </div>
  );
}