const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  pressure: {
    type: Number,
    required: true
  },
  windSpeed: {
    type: Number,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  coordinates: {
    lat: Number,
    lon: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Weather', weatherSchema);