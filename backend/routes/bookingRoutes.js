const express = require('express');
const router = express.Router();
const BookingRequest = require('../models/BookingRequest');
const ConfirmedBooking = require('../models/ConfirmedBooking');
const CancelRequest = require('../models/CancelRequest');
const nodemailer = require('nodemailer');

// Submit a new booking request
router.post('/submit', async (req, res) => {
  try {
    const { name, email, seatType, showId, upiId } = req.body;

    const newRequest = new BookingRequest({
      name,
      email,
      upiId,
      seatType,
      showId
    });

    await newRequest.save();
    console.log('[Booking] New booking request saved:', newRequest);
    res.status(201).json({ message: 'Booking request submitted' });
  } catch (error) {
    console.error('Booking request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all booking requests for admin (with populated show details)
router.get('/requests', async (req, res) => {
  try {
    const requests = await BookingRequest.find().populate('showId');
    res.json(requests);
  } catch (error) {
    console.error('Fetching requests error:', error);
    res.status(500).json({ message: 'Error fetching requests' });
  }
});

// Approve a request: send email + save confirmed booking
router.post('/approve/:id', async (req, res) => {
  try {
    const request = await BookingRequest.findById(req.params.id).populate('showId');
    if (!request) return res.status(404).json({ message: 'Request not found' });

    // Save to ConfirmedBookings
    const confirmed = new ConfirmedBooking({
      name: request.name,
      email: request.email,
      upiId: request.upiId,
      seatType: request.seatType,
      showId: request.showId._id
    });
    await confirmed.save();
    console.log('[Booking] Approved & saved confirmed booking:', confirmed);

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bhavyachandana168@gmail.com',
        pass: 'vspsdkodmgxsttyu'
      }
    });

    const mailOptions = {
      from: 'bhavyachandana168@gmail.com',
      to: request.email,
      subject: 'Your Show Booking is Confirmed!',
      html: `
        <h2>Thanks for booking with Euphoria!</h2>
        <p><strong>Show:</strong> ${request.showId.band}</p>
        <p><strong>Date:</strong> ${new Date(request.showId.date).toDateString()}</p>
        <p><strong>Location:</strong> ${request.showId.location}</p>
        <p><strong>Show ID:</strong> ${request.showId._id}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    await BookingRequest.findByIdAndDelete(req.params.id);

    res.json({ message: 'Approved and email sent' });
  } catch (error) {
    console.error('Approval error:', error);
    res.status(500).json({ message: 'Error approving request' });
  }
});

// Fetch confirmed bookings for a user
router.get('/user-bookings', async (req, res) => {
  try {
    const { email } = req.query;
    const bookings = await ConfirmedBooking.find({ email }).populate('showId');
    res.json(bookings);
  } catch (error) {
    console.error('Fetching user bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel request: now saves a cancel request instead of deleting immediately
router.post('/cancel-request', async (req, res) => {
  const { bookingId } = req.body;
  console.log('[Cancel] Cancel request received for bookingId:', bookingId);

  try {
    const booking = await ConfirmedBooking.findById(bookingId);
    if (!booking) {
      console.log('[Cancel] Booking not found for id:', bookingId);
      return res.status(404).json({ message: 'Booking not found' });
    }

    const existingRequest = await CancelRequest.findOne({ bookingId });
    if (existingRequest) {
      console.log('[Cancel] Duplicate cancel request found for bookingId:', bookingId);
      return res.status(400).json({ message: 'Cancellation already requested' });
    }

    const newCancel = new CancelRequest({ bookingId });
    await newCancel.save();
    console.log('[Cancel] New cancel request saved:', newCancel);

    res.json({ message: 'Cancellation request sent to admin' });
  } catch (error) {
    console.error('Cancel request error:', error);
    res.status(500).json({ message: 'Cancel request failed' });
  }
});

// Get all cancel requests for admin
router.get('/cancel-requests', async (req, res) => {
  try {
    const requests = await CancelRequest.find().populate({
      path: 'bookingId',
      populate: { path: 'showId' }
    });
    console.log('[Cancel] Returning cancel requests:', requests);
    res.json(requests);
  } catch (error) {
    console.error('Error fetching cancel requests:', error);
    res.status(500).json({ message: 'Error fetching cancel requests' });
  }
});

// Admin approves cancellation
router.post('/cancel-approve/:id', async (req, res) => {
  try {
    const cancelRequest = await CancelRequest.findById(req.params.id);
    if (!cancelRequest) return res.status(404).json({ message: 'Cancel request not found' });

    await ConfirmedBooking.findByIdAndDelete(cancelRequest.bookingId);
    await CancelRequest.findByIdAndDelete(req.params.id);

    console.log('[Cancel] Cancellation approved, booking deleted:', cancelRequest.bookingId);
    res.json({ message: 'Cancellation approved and booking deleted' });
  } catch (error) {
    console.error('Cancel approval error:', error);
    res.status(500).json({ message: 'Cancel approval failed' });
  }
});

module.exports = router;
