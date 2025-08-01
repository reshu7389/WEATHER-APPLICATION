const express = require('express');
const axios = require('axios');
const Weather = require('../models/Weather');
const router = express.Router();

// Get current weather by city name
router.get('/current/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      windSpeed: response.data.wind.speed,
      icon: response.data.weather[0].icon,
      coordinates: {
        lat: response.data.coord.lat,
        lon: response.data.coord.lon
      }
    };

    // Save to database
    const weather = new Weather(weatherData);
    await weather.save();

    res.json(weatherData);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'City not found' });
    }
    console.error('Weather API Error:', error.message);
    res.status(500).json({ message: 'Server error while fetching weather data' });
  }
});

// Get weather by coordinates
router.get('/coordinates/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      windSpeed: response.data.wind.speed,
      icon: response.data.weather[0].icon,
      coordinates: {
        lat: response.data.coord.lat,
        lon: response.data.coord.lon
      }
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API Error:', error.message);
    res.status(500).json({ message: 'Server error while fetching weather data' });
  }
});

// Get 5-day forecast
router.get('/forecast/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const forecast = response.data.list.map(item => ({
      date: new Date(item.dt * 1000).toLocaleDateString(),
      time: new Date(item.dt * 1000).toLocaleTimeString(),
      temperature: Math.round(item.main.temp),
      description: item.weather[0].description,
      icon: item.weather[0].icon
    }));

    res.json({
      city: response.data.city.name,
      country: response.data.city.country,
      forecast: forecast
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'City not found' });
    }
    console.error('Forecast API Error:', error.message);
    res.status(500).json({ message: 'Server error while fetching forecast data' });
  }
});

// Get search history
router.get('/history', async (req, res) => {
  try {
    const history = await Weather.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('city country temperature description createdAt');
    
    res.json(history);
  } catch (error) {
    console.error('History fetch error:', error.message);
    res.status(500).json({ message: 'Server error while fetching history' });
  }
});

module.exports = router;