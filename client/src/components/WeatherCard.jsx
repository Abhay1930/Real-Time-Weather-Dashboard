import React from 'react';

const WeatherCard = ({ weatherData }) => {
  const { city, temperature, weather, icon, humidity, windSpeed } = weatherData;

  return (
    <div className="weather-card">
      <h2 className="city-name">{city}</h2>
      <div className="weather-info">
        <img src={icon} alt={weather} />
        <p className="weather-condition">{weather}</p>
        <p className="temperature">{Math.round(temperature)}°C</p>

        <div className="weather-details">
          <div className="weather-detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{humidity}%</span>
          </div>
          <div className="weather-detail-item">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
