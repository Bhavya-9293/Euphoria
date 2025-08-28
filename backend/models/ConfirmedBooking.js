const mongoose = require('mongoose');

const confirmedBookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  upiId: String,
  seatType: String,
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
  },
});

const ConfirmedBooking = mongoose.model('ConfirmedBooking', confirmedBookingSchema);
module.exports = ConfirmedBooking;
