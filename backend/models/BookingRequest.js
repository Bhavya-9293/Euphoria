const mongoose = require('mongoose');

const bookingRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  upiId: String,
  seatType: String,
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show'   
  }
});

module.exports = mongoose.model('BookingRequest', bookingRequestSchema);
