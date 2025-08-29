const express = require("express");
const router = express.Router();
const BookingRequest = require("../models/BookingRequest");
const ConfirmedBooking = require("../models/ConfirmedBooking");
const CancelRequest = require("../models/CancelRequest");
const nodemailer = require("nodemailer");

// Submit booking request
router.post("/submit", async (req, res) => {
  try {
    const { name, email, seatType, showId, upiId } = req.body;
    const newRequest = new BookingRequest({ name, email, seatType, showId, upiId });
    await newRequest.save();
    console.log("[Booking] New request saved:", newRequest);
    res.status(201).json({ message: "Booking request submitted" });
  } catch (error) {
    console.error("Booking request error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all booking requests for admin
router.get("/requests", async (req, res) => {
  try {
    const requests = await BookingRequest.find().populate("showId");
    res.json(requests);
  } catch (error) {
    console.error("Fetching requests error:", error);
    res.status(500).json({ message: "Error fetching requests" });
  }
});

// Approve request
router.post("/approve/:id", async (req, res) => {
  try {
    const request = await BookingRequest.findById(req.params.id).populate("showId");
    if (!request) return res.status(404).json({ message: "Request not found" });

    const confirmed = new ConfirmedBooking({
      name: request.name,
      email: request.email,
      seatType: request.seatType,
      showId: request.showId._id,
      upiId: request.upiId,
    });
    await confirmed.save();

    // Email confirmation
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: request.email,
      subject: "Your Show Booking is Confirmed!",
      html: `<h2>Thanks for booking with Euphoria!</h2>
             <p><strong>Show:</strong> ${request.showId.band}</p>
             <p><strong>Date:</strong> ${new Date(request.showId.date).toDateString()}</p>
             <p><strong>Location:</strong> ${request.showId.location}</p>
             <p><strong>Show ID:</strong> ${request.showId._id}</p>`,
    });

    await BookingRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Approved and email sent" });
  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).json({ message: "Error approving request" });
  }
});

// User bookings
router.get("/user-bookings", async (req, res) => {
  try {
    const { email } = req.query;
    const bookings = await ConfirmedBooking.find({ email }).populate("showId");
    res.json(bookings);
  } catch (error) {
    console.error("Fetching user bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Cancel request
router.post("/cancel-request", async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await ConfirmedBooking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const existingRequest = await CancelRequest.findOne({ bookingId });
    if (existingRequest) return res.status(400).json({ message: "Cancellation already requested" });

    const newCancel = new CancelRequest({ bookingId });
    await newCancel.save();
    res.json({ message: "Cancellation request sent to admin" });
  } catch (error) {
    console.error("Cancel request error:", error);
    res.status(500).json({ message: "Cancel request failed" });
  }
});

// Admin cancel requests
router.get("/cancel-requests", async (req, res) => {
  try {
    const requests = await CancelRequest.find().populate({
      path: "bookingId",
      populate: { path: "showId" },
    });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching cancel requests:", error);
    res.status(500).json({ message: "Error fetching cancel requests" });
  }
});

// Approve cancellation
router.post("/cancel-approve/:id", async (req, res) => {
  try {
    const
