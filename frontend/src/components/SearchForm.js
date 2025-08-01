import React, { useState } from 'react';

const SearchForm = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');
  const [useLocation, setUseLocation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleLocationSearch = () => {
    setUseLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSearch(null, position.coords.latitude, position.coords.longitude);
          setUseLocation(false);
        },
        (error) => {
          console.error('Location error:', error);
          alert('Unable to get location. Please search by city name.');
          setUseLocation(false);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setUseLocation(false);
    }
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit} className="search-container">
        <div className="input-group">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="search-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-btn"
            disabled={loading || !city.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      <div className="location-section">
        <button 
          onClick={handleLocationSearch}
          className="location-btn"
          disabled={useLocation || loading}
        >
          {useLocation ? 'Getting Location...' : 'Use My Location'}
        </button>
      </div>
    </div>
  );
};

export default SearchForm;