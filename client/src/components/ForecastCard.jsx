import React from 'react';

// Component to display 5-day weather forecast
const ForecastCard = ({ forecastData }) => {
  // Return null if no data is available
  if (!forecastData || !forecastData.length) {
    return null;
  }

  // My function to organize forecast data by day
  function organizeByDay(data) {
    let result = {};

    // Loop through each forecast item
    data.forEach(item => {
      // Convert timestamp to date
      let itemDate = new Date(item.dt * 1000);
      let weekday = itemDate.toLocaleDateString('en-US', { weekday: 'short' });

      // Create array for this day if it doesn't exist
      if (!result[weekday]) {
        result[weekday] = [];
      }

      // Add this forecast to the day's array
      result[weekday].push(item);
    });

    return result;
  }

  // Group the forecast data by day
  const groupedByDay = organizeByDay(forecastData);

  // Process each day's data
  const dailyForecast = [];

  // Process each day's data to get summary information
  for (const day in groupedByDay) {
    const dayData = groupedByDay[day];

    // Calculate average temperature for the day
    let tempSum = 0;
    dayData.forEach(item => {
      tempSum += item.main.temp;
    });
    const avgTemp = tempSum / dayData.length;

    // Find the most common weather condition
    const weatherTypes = {};
    dayData.forEach(item => {
      const condition = item.weather[0].main;
      weatherTypes[condition] = (weatherTypes[condition] || 0) + 1;
    });

    // Find which weather condition appears most often
    let mostCommonWeather = '';
    let highestCount = 0;

    for (const weather in weatherTypes) {
      if (weatherTypes[weather] > highestCount) {
        mostCommonWeather = weather;
        highestCount = weatherTypes[weather];
      }
    }

    // Get weather icon for the most common condition
    const weatherItem = dayData.find(item => item.weather[0].main === mostCommonWeather);
    const icon = weatherItem.weather[0].icon;

    // Get min and max temperatures
    let minTemp = dayData[0].main.temp_min;
    let maxTemp = dayData[0].main.temp_max;

    dayData.forEach(item => {
      if (item.main.temp_min < minTemp) minTemp = item.main.temp_min;
      if (item.main.temp_max > maxTemp) maxTemp = item.main.temp_max;
    });

    // Format the date
    const date = new Date(dayData[0].dt * 1000);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Add this day's forecast summary to our results
    dailyForecast.push({
      day,
      date: formattedDate,
      avgTemp: Math.round(avgTemp),
      weather: mostCommonWeather,
      icon: `http://openweathermap.org/img/wn/${icon}@2x.png`,
      minTemp: Math.round(minTemp),
      maxTemp: Math.round(maxTemp)
    });
  }

  // Make sure we only show 5 days
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
