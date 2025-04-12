import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import './App.css';

// Main App component
function App() {
  // State variables for our application
  const [weatherData, setWeatherData] = useState(null);  // Current weather data
  const [forecastData, setForecastData] = useState(null); // Forecast data
  const [loading, setLoading] = useState(false);          // Loading state
  const [error, setError] = useState('');                 // Error messages
  const [theme, setTheme] = useState('light');            // Theme (light/dark)

  // Function to toggle between light and dark themes
  function toggleTheme() {
    // If current theme is light, switch to dark, otherwise switch to light
    if (theme === 'light') {
      setTheme('dark');
      document.body.className = 'dark';
    } else {
      setTheme('light');
      document.body.className = 'light';
    }
  }

  // Function to fetch weather data from our API
  async function fetchWeather(city) {
    // Show loading indicator and clear any previous errors
    setLoading(true);
    setError('');

    try {
      // First, get the current weather for the city
      const currentWeatherURL = `https://real-time-weather-dashboard.onrender.com/weather?city=${city}`;
      const weatherResponse = await axios.get(currentWeatherURL);

      // Update state with current weather data
      setWeatherData(weatherResponse.data);

      // Next, get the 5-day forecast for the city
      const forecastURL = `https://real-time-weather-dashboard.onrender.com/weather/forecast?city=${city}`;
      const forecastResponse = await axios.get(forecastURL);

      // Update state with forecast data
      setForecastData(forecastResponse.data.list);

      // Save the city in localStorage for future visits
      localStorage.setItem('lastCity', city);
    } catch (err) {
      // Handle any errors that occur during the API calls
      const errorMessage = err.response?.data?.error || 'Something went wrong';
      setError(errorMessage);

      // Clear any previous weather data
      setWeatherData(null);
      setForecastData(null);
    } finally {
      // Hide loading indicator when done
      setLoading(false);
    }
  }

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) fetchWeather(lastCity);
  }, []);

  // Set initial theme on component mount
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Render the application UI
  return (
    <div className="app-container">
      {/* Header section with title and theme toggle */}
      <header className="app-header">
        <h1 className="app-title">My Weather Dashboard</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {/* Show different icon based on current theme */}
          {theme === 'light' ? '🌙 Switch to Dark' : '☀️ Switch to Light'}
        </button>
      </header>

      {/* Search bar component */}
      <SearchBar onSearch={fetchWeather} />

      {/* Show loading spinner when fetching data */}
      {loading && (
        <div className="loading-spinner" aria-label="Loading weather data"></div>
      )}

      {/* Show error message if something went wrong */}
      {error && (
        <div className="error-message" role="alert">{error}</div>
      )}

      {/* Weather content section */}
      <main className="weather-content">
        {/* Current weather card */}
        {weatherData && <WeatherCard weatherData={weatherData} />}

        {/* 5-day forecast */}
        {forecastData && <ForecastCard forecastData={forecastData} />}
      </main>
    </div>
  );
}

export default App;
