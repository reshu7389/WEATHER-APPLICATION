import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import WeatherHistory from './components/WeatherHistory';
import { weatherAPI } from './services/api';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (city, lat, lon) => {
    setLoading(true);
    setError('');
    
    try {
      let weatherResponse;
      
      if (lat && lon) {
        // Search by coordinates
        weatherResponse = await weatherAPI.getWeatherByCoordinates(lat, lon);
        city = weatherResponse.city; // Get city name for forecast
      } else {
        // Search by city name
        weatherResponse = await weatherAPI.getCurrentWeather(city);
      }
      
      setWeatherData(weatherResponse);
      
      // Fetch forecast
      try {
        const forecastResponse = await weatherAPI.getForecast(city);
        setForecast(forecastResponse.forecast);
      } catch (forecastError) {
        console.error('Forecast error:', forecastError);
        // Don't show error for forecast, just continue without it
      }
      
    } catch (error) {
      console.error('Weather search error:', error);
      if (error.response && error.response.status === 404) {
        setError('City not found. Please check the spelling and try again.');
      } else {
        setError('Failed to fetch weather data. Please try again.');
      }
      setWeatherData(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Weather App</h1>
        <p>Get current weather and forecast for any city</p>
      </header>

      <main className="app-main">
        <SearchForm onSearch={handleSearch} loading={loading} />
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {loading && (
          <div className="loading">
            Fetching weather data...
          </div>
        )}
        
        <WeatherCard weatherData={weatherData} forecast={forecast} />
        
        <WeatherHistory />
      </main>

      <footer className="app-footer">
        <p>Powered by OpenWeatherMap API</p>
      </footer>
    </div>
  );
}

export default App;
