/**
 * Weather API Routes
 * These routes handle fetching weather data from OpenWeatherMap API
 */

// Import required packages
const express = require('express');
const axios = require('axios');

// Create router
const router = express.Router();

/**
 * GET /weather
 * Fetches current weather data for a specified city
 */
router.get('/', async (req, res) => {
  // Get city from query parameters
  const city = req.query.city;

  // Validate city parameter
  if (!city || city.trim() === '') {
    return res.status(400).json({
      error: 'City name is required',
      message: 'Please provide a city name in the query parameters'
    });
  }

  // Get API key from environment variables
  const API_KEY = process.env.WEATHER_API_KEY;

  // Construct OpenWeatherMap API URL
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    // Make request to OpenWeatherMap API
    const response = await axios.get(weatherApiUrl);
    const weatherData = response.data;

    // Format and return the weather data
    res.json({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      weather: weatherData.weather[0].main,
      icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed
    });
  } catch (error) {
    // Handle errors
    if (error.response?.status === 404) {
      // City not found
      res.status(404).json({
        error: 'City not found',
        message: `Could not find weather data for "${city}". Please check the spelling and try again.`
      });
    } else {
      // Server or API error
      console.error('Error fetching weather data:', error.message);
      res.status(500).json({
        error: 'Server error',
        message: 'An error occurred while fetching weather data. Please try again later.'
      });
    }
  }
});

/**
 * GET /weather/forecast
 * Fetches 5-day weather forecast for a specified city
 */
router.get('/forecast', async (req, res) => {
  // Get city from query parameters
  const city = req.query.city;

  // Validate city parameter
  if (!city || city.trim() === '') {
    return res.status(400).json({
      error: 'City name is required',
      message: 'Please provide a city name in the query parameters'
    });
  }

  // Get API key from environment variables
  const API_KEY = process.env.WEATHER_API_KEY;

  // Construct OpenWeatherMap forecast API URL
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    // Make request to OpenWeatherMap API
    const response = await axios.get(forecastApiUrl);
    const forecastData = response.data;

    // Return the forecast data
    res.json({
      city: forecastData.city.name,
      list: forecastData.list
    });
  } catch (error) {
    // Handle errors
    if (error.response?.status === 404) {
      // City not found
      res.status(404).json({
        error: 'City not found',
        message: `Could not find forecast data for "${city}". Please check the spelling and try again.`
      });
    } else {
      // Server or API error
      console.error('Forecast API error:', error.message);
      res.status(500).json({
        error: 'Server error',
        message: 'An error occurred while fetching forecast data. Please try again later.'
      });
    }
  }
});

module.exports = router;