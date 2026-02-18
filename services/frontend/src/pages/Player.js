import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Player() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quality, setQuality] = useState('720p');
  const [isPlaying, setIsPlaying] = useState(false);

  const qualities = ['480p', '720p', '1080p'];

  return (
    <div className="player-page">
      <div className="player-container">
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent', border: '1px solid #444',
            color: '#fff', padding: '8px 16px', borderRadius: '4px',
            cursor: 'pointer', marginBottom: '20px'
          }}
        >
          ← Back
        </button>

        <div className="video-wrapper">
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexDirection: 'column',
            background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e)',
gap: '20px'
          }}>
            <div style={{ fontSize: '5rem' }}>🎬</div>
            <button
              className="btn-primary"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <p style={{ color: '#aaa', fontSize: '0.85rem' }}>
              Streaming at {quality} via AWS S3 + CloudFront
            </p>
          </div>
        </div>

        <div className="quality-selector">
          <span style={{ color: '#aaa', fontSize: '0.9rem', marginRight: '8px' }}>
            Quality:
          </span>
          {qualities.map(q => (
            <button
              key={q}
              className={`quality-btn ${quality === q ? 'active' : ''}`}
              onClick={() => setQuality(q)}
            >
              {q}
            </button>
          ))}
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{quality}</div>
            <div className="stat-label">Current Quality</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">2.4MB/s</div>
            <div className="stat-label">Bandwidth</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">12ms</div>
            <div className="stat-label">Latency</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">AWS S3</div>
            <div className="stat-label">Storage</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
