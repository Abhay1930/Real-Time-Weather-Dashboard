import React from 'react';

const ForecastCard = ({ forecastData }) => {
  if (!forecastData || !forecastData.length) {
    return null;
  }

  // Group forecast data by day
  const groupedByDay = forecastData.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    if (!acc[day]) {
      acc[day] = [];
    }
    
    acc[day].push(item);
    return acc;
  }, {});

  // Get the average temperature and most frequent weather condition for each day
  const dailyForecast = Object.keys(groupedByDay).map(day => {
    const dayData = groupedByDay[day];
    
    // Calculate average temperature
    const avgTemp = dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length;
    
    // Find most frequent weather condition
    const weatherCounts = dayData.reduce((counts, item) => {
      const weather = item.weather[0].main;
      counts[weather] = (counts[weather] || 0) + 1;
      return counts;
    }, {});
    
    const mostFrequentWeather = Object.keys(weatherCounts).reduce((a, b) => 
      weatherCounts[a] > weatherCounts[b] ? a : b
    );
    
    // Get icon for the most frequent weather
    const icon = dayData.find(item => item.weather[0].main === mostFrequentWeather).weather[0].icon;
    
    // Get the date
    const date = new Date(dayData[0].dt * 1000);
    
    return {
      day,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      avgTemp: Math.round(avgTemp),
      weather: mostFrequentWeather,
      icon: `http://openweathermap.org/img/wn/${icon}@2x.png`,
      minTemp: Math.round(Math.min(...dayData.map(item => item.main.temp_min))),
      maxTemp: Math.round(Math.max(...dayData.map(item => item.main.temp_max)))
    };
  });

  // Limit to 5 days
  const fiveDayForecast = dailyForecast.slice(0, 5);

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-cards">
        {fiveDayForecast.map((forecast, index) => (
          <div key={index} className="forecast-day-card">
            <div className="forecast-day">{forecast.day}</div>
            <div className="forecast-date">{forecast.date}</div>
            <img src={forecast.icon} alt={forecast.weather} className="forecast-icon" />
            <div className="forecast-temp">{forecast.avgTemp}°C</div>
            <div className="forecast-min-max">
              <span>{forecast.minTemp}°</span>
              <span className="forecast-temp-separator"></span>
              <span>{forecast.maxTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
