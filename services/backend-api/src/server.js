const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    service: 'cinemaplex-backend',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Get all videos
app.get('/api/videos', async (req, res) => {
  try {
    const videos = [
      {
        _id: '1',
        title: 'The DevOps Chronicles',
        genre: 'Tech',
        year: 2024,
        qualities: ['480p', '720p', '1080p'],
        s3_url: process.env.S3_BUCKET_URL || 'https://cinemaplex.s3.amazonaws.com',
        duration: '2h 15m',
        views: 15420
      },
      {
        _id: '2',
        title: 'Container City',
        genre: 'Action',
        year: 2024,
        qualities: ['480p', '720p', '1080p'],
        s3_url: process.env.S3_BUCKET_URL || 'https://cinemaplex.s3.amazonaws.com',
        duration: '1h 45m',
        views: 8930
      }
    ];
    res.json({ success: true, data: videos, count: videos.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get single video
app.get('/api/videos/:id', async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        _id: req.params.id,
        title: 'The DevOps Chronicles',
        genre: 'Tech',
        year: 2024,
        qualities: ['480p', '720p', '1080p'],
        s3_url: process.env.S3_BUCKET_URL || 'https://cinemaplex.s3.amazonaws.com',
        duration: '2h 15m',
        views: 15420,
        description: 'A deep dive into modern DevOps practices'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Stream video URL
app.get('/api/videos/:id/stream', async (req, res) => {
  const { quality = '720p' } = req.query;
  try {
    res.json({
      success: true,
      stream_url: `${process.env.S3_BUCKET_URL}/videos/${req.params.id}/${quality}/index.m3u8`,
      quality,
      cdn: 'AWS CloudFront',
      expires_in: 3600
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Metrics endpoint for Prometheus
app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`
# HELP cinemaplex_requests_total Total requests
# TYPE cinemaplex_requests_total counter
cinemaplex_requests_total 1234

# HELP cinemaplex_active_streams Active video streams
# TYPE cinemaplex_active_streams gauge
cinemaplex_active_streams 42

# HELP cinemaplex_bandwidth_bytes Bandwidth used in bytes
# TYPE cinemaplex_bandwidth_bytes counter
cinemaplex_bandwidth_bytes 987654321
  `);
});

app.listen(PORT, () => {
  console.log(`Cinemaplex Backend running on port ${PORT}`);
});

module.exports = app;
