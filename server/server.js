/**
 * Weather Dashboard API Server
 * This server provides weather data from OpenWeatherMap API
 */

// Import required packages
const express = require('express');
const cors = require('cors');
const weatherRoute = require('./routes/weather');

// Load environment variables from .env file
require('dotenv').config();

// Create Express application
const app = express();

// Set port from environment variables or use default
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Register weather routes
app.use('/weather', weatherRoute);

// Add a simple root route
app.get('/', (req, res) => {
  res.send('Weather Dashboard API is running. Use /weather endpoint to get weather data.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Weather Dashboard server is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/weather`);
});
