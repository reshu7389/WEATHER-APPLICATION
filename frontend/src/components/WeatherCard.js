import React from 'react';

const WeatherCard = ({ weatherData, forecast }) => {
  if (!weatherData) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  return (
    <div className="weather-card">
      <div className="weather-main">
        <div className="weather-header">
          <h2>{weatherData.city}, {weatherData.country}</h2>
          <div className="weather-icon">
            <img src={iconUrl} alt={weatherData.description} />
          </div>
        </div>
        
        <div className="weather-temp">
          <span className="temperature">{weatherData.temperature}°C</span>
          <p className="description">{weatherData.description}</p>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <span className="label">Humidity</span>
            <span className="value">{weatherData.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="label">Pressure</span>
            <span className="value">{weatherData.pressure} hPa</span>
          </div>
          <div className="detail-item">
            <span className="label">Wind Speed</span>
            <span className="value">{weatherData.windSpeed} m/s</span>
          </div>
        </div>
      </div>

      {forecast && forecast.length > 0 && (
        <div className="forecast-section">
          <h3>5-Day Forecast</h3>
          <div className="forecast-container">
            {forecast.slice(0, 5).map((item, index) => (
              <div key={index} className="forecast-item">
                <p className="forecast-date">{item.date}</p>
                <img 
                  src={`https://openweathermap.org/img/wn/${item.icon}.png`} 
                  alt={item.description}
                  className="forecast-icon"
                />
                <p className="forecast-temp">{item.temperature}°C</p>
                <p className="forecast-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;