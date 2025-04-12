import React from 'react';

// Component to display current weather information
function WeatherCard({ weatherData }) {
  // Extract the weather data properties we need
  const {
    city,       // City name
    temperature, // Temperature in Celsius
    weather,    // Weather condition (e.g., "Clear", "Rain")
    icon,       // Weather icon URL
    humidity,   // Humidity percentage
    windSpeed   // Wind speed in km/h
  } = weatherData;

  // Round the temperature to the nearest whole number
  const roundedTemp = Math.round(temperature);

  return (
    <article className="weather-card">
      {/* City name heading */}
      <h2 className="city-name">{city}</h2>

      <div className="weather-info">
        {/* Weather icon */}
        <img
          src={icon}
          alt={`${weather} weather icon`}
          className="weather-icon"
        />

        {/* Weather condition text */}
        <p className="weather-condition">{weather}</p>

        {/* Temperature display */}
        <p className="temperature">{roundedTemp}°C</p>

        {/* Additional weather details */}
        <div className="weather-details">
          {/* Humidity information */}
          <div className="weather-detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{humidity}%</span>
          </div>

          {/* Wind speed information */}
          <div className="weather-detail-item">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default WeatherCard;
