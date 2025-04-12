import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  const fetchWeather = async (city) => {
    setLoading(true);
    setError('');
    try {
      // Fetch current weather
      const weatherRes = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeatherData(weatherRes.data);

      // Fetch forecast data
      const forecastRes = await axios.get(`http://localhost:5000/weather/forecast?city=${city}`);
      setForecastData(forecastRes.data.list);

      localStorage.setItem('lastCity', city);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) fetchWeather(lastCity);
  }, []);

  // Set initial theme on component mount
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">Real-Time Weather Dashboard</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
        </button>
      </div>

      <SearchBar onSearch={fetchWeather} />

      {loading && <div className="loading-spinner"></div>}

      {error && <div className="error-message">{error}</div>}

      <div className="weather-content">
        {weatherData && <WeatherCard weatherData={weatherData} />}
        {forecastData && <ForecastCard forecastData={forecastData} />}
      </div>
    </div>
  );
}

export default App;