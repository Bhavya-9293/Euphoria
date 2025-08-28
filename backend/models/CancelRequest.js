// models/CancelRequest.js
const mongoose = require('mongoose');

const cancelRequestSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ConfirmedBooking',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CancelRequest', cancelRequestSchema);
