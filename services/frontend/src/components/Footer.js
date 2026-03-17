import React from 'react';

function Footer() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '40px',
      borderTop: '1px solid #222',
      marginTop: '40px',
      color: '#555'
    }}>
      <p style={{ fontSize: '1rem', marginBottom: '8px' }}>
        <span style={{ color: '#e50914', fontWeight: '900', fontSize: '1.2rem' }}>
          CINEMAPLEX
        </span>
        {' '}DevOps Pipeline
      </p>
      <p style={{ fontSize: '0.85rem', color: '#444' }}>
        Designed & Built by{' '}
        <span style={{
          color: '#e50914',
          fontWeight: '700',
          fontSize: '1rem'
        }}>
          Govind
        </span>
        {' '}· Junior DevOps Engineer
      </p>
      <p style={{ fontSize: '0.75rem', color: '#333', marginTop: '8px' }}>
        🐳 Docker · ☸️ Kubernetes · ⚙️ Jenkins · 🔄 GitHub Actions · 📊 Prometheus · 🎬 FFmpeg
      </p>
      <p style={{ fontSize: '0.75rem', color: '#333', marginTop: '4px' }}>
        © 2026 Govind · All Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
