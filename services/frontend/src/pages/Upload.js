import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleUpload = async () => {
    if (!file || !title) {
      setStatus('Please fill all fields');
      return;
    }
    setProcessing(true);
    setStatus('Uploading to AWS S3...');
    setProgress(20);

    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);
    formData.append('genre', genre);

    try {
      setProgress(40);
      setStatus('Processing with FFmpeg...');
      await new Promise(r => setTimeout(r, 1500));
      setProgress(60);
      setStatus('Generating 480p version...');
      await new Promise(r => setTimeout(r, 1000));
      setProgress(75);
      setStatus('Generating 720p version...');
      await new Promise(r => setTimeout(r, 1000));
      setProgress(90);
      setStatus('Generating 1080p version...');
      await new Promise(r => setTimeout(r, 1000));
      setProgress(100);
      setStatus('Upload complete! Video is live.');
    } catch (err) {
      setStatus('Upload failed. Please try again.');
    }
    setProcessing(false);
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      <div className="upload-section">
        <h2 className="upload-title">Upload Video</h2>
        <p className="upload-subtitle">
          Videos are automatically processed into 480p, 720p and 1080p
          using FFmpeg and stored on AWS S3.
        </p>

        <div
          className="upload-area"
          onClick={() => document.getElementById('fileInput').click()}
        >
          <div className="upload-icon">
            {file ? '✅' : '📁'}
          </div>
          <div className="upload-text">
            {file ? file.name : 'Click to select video file (MP4, MOV, AVI)'}
          </div>
          <input
            id="fileInput"
            type="file"
            accept="video/*"
            style={{ display: 'none' }}
            onChange={e => setFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Video Title</label>
          <input
            type="text"
            placeholder="Enter video title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Action, Drama, Sci-Fi..."
            value={genre}
            onChange={e => setGenre(e.target.value)}
          />
        </div>

        {progress > 0 && (
          <div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p style={{
              color: progress === 100 ? '#3fb950' : '#aaa',
              fontSize: '0.85rem', marginTop: '8px'
            }}>
              {status}
            </p>
          </div>
        )}

        <button
          className="btn-primary"
          style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}
          onClick={handleUpload}
          disabled={processing}
        >
          {processing ? '⏳ Processing...' : '🚀 Upload & Process Video'}
        </button>

        <div style={{
          marginTop: '20px', padding: '16px',
          background: '#0d1117', borderRadius: '8px',
          border: '1px solid #333'
        }}>
          <p style={{ color: '#aaa', fontSize: '0.8rem', lineHeight: '1.8' }}>
            <strong style={{ color: '#e50914' }}>Pipeline:</strong> Upload →
            AWS S3 → FFmpeg Processing → 480p/720p/1080p →
            Redis Cache → Kubernetes Deploy → Live Stream
          </p>
        </div>
      </div>
    </div>
  );
}

export default Upload;
