import React from 'react';

const WeatherCard = ({ weatherData }) => {
  const { city, temperature, weather, icon, humidity, windSpeed } = weatherData;
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <div className="weather-info">
        <img src={icon} alt={weather} />
        <p>{weather}</p>
        <p className="temperature">{Math.round(temperature)}°C</p>

        <div className="weather-details">
          <div className="weather-detail-item">
            <p><strong>Humidity</strong></p>
            <p>{humidity}%</p>
          </div>
          <div className="weather-detail-item">
            <p><strong>Wind</strong></p>
            <p>{windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
