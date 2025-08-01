import React, { useState, useEffect } from 'react';
import { weatherAPI } from '../services/api';

const WeatherHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await weatherAPI.getHistory();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading history...</div>;

  return (
    <div className="weather-history">
      <h3>Recent Searches</h3>
      {history.length === 0 ? (
        <p>No search history available</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item._id} className="history-item">
              <div className="history-location">
                <strong>{item.city}, {item.country}</strong>
              </div>
              <div className="history-details">
                <span>{item.temperature}°C</span>
                <span>{item.description}</span>
                <span className="history-date">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherHistory;