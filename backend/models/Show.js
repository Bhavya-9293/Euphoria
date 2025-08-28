const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  band: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  boxPrice: {
    type: Number,
    required: true
  },
  upperPrice: {
    type: Number,
    required: true
  },
  generalPrice: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Show', showSchema);
