import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const weatherAPI = {
  getCurrentWeather: async (city) => {
    try {
      const response = await api.get(`/weather/current/${encodeURIComponent(city)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getWeatherByCoordinates: async (lat, lon) => {
    try {
      const response = await api.get(`/weather/coordinates/${lat}/${lon}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getForecast: async (city) => {
    try {
      const response = await api.get(`/weather/forecast/${encodeURIComponent(city)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getHistory: async () => {
    try {
      const response = await api.get('/weather/history');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;