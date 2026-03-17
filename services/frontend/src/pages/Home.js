import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const DEMO_MOVIES = [
  { _id: '1', title: 'The DevOps Chronicles', genre: 'Tech', emoji: '🚀', year: 2024, quality: 'HD' },
  { _id: '2', title: 'Container City', genre: 'Action', emoji: '🐳', year: 2024, quality: '4K' },
  { _id: '3', title: 'Kubernetes Rising', genre: 'Sci-Fi', emoji: '☸️', year: 2024, quality: 'HD' },
  { _id: '4', title: 'The Pipeline', genre: 'Thriller', emoji: '⚙️', year: 2024, quality: 'HD' },
  { _id: '5', title: 'GitOps Story', genre: 'Drama', emoji: '🔄', year: 2024, quality: '4K' },
  { _id: '6', title: 'Cloud Native', genre: 'Sci-Fi', emoji: '☁️', year: 2024, quality: 'HD' },
  { _id: '7', title: 'Microservices', genre: 'Action', emoji: '🔧', year: 2024, quality: 'HD' },
  { _id: '8', title: 'The Monitoring', genre: 'Mystery', emoji: '📊', year: 2024, quality: '4K' },
];

function Home() {
  const [movies] = useState(DEMO_MOVIES);
  const navigate = useNavigate();

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <div className="hero-badge">NOW STREAMING</div>
          <h1 className="hero-title">
            <span>Cinema</span>plex<br/>DevOps Platform
          </h1>
          <p className="hero-desc">
            Production-grade video streaming infrastructure powered by
            Kubernetes, Docker, FFmpeg and AWS S3.
          </p>
          <p style={{
            color: '#e50914',
            fontWeight: '700',
            fontSize: '0.9rem',
            marginBottom: '20px',
            letterSpacing: '1px'
          }}>
            ⚡ Made by Govind · Junior DevOps Engineer
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/player/1')}>
              ▶ Play Now
            </button>
            <button className="btn-secondary" onClick={() => navigate('/upload')}>
              + Upload Video
            </button>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">🔥 Trending Now</h2>
        <div className="movies-grid">
          {movies.map(movie => (
            <div
              key={movie._id}
              className="movie-card"
              onClick={() => navigate(`/player/${movie._id}`)}
            >
              <div className="movie-thumb">
                <span style={{fontSize:'4rem'}}>{movie.emoji}</span>
              </div>
              <span className="movie-badge">{movie.quality}</span>
              <div className="movie-info">
                <div className="movie-title">{movie.title}</div>
                <div className="movie-meta">{movie.genre} · {movie.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">⚙️ Infrastructure Stats</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">99.9%</div>
            <div className="stat-label">Uptime SLA</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">3</div>
            <div className="stat-label">Video Qualities</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">K8s</div>
            <div className="stat-label">Orchestration</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">AWS S3</div>
            <div className="stat-label">Storage</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
