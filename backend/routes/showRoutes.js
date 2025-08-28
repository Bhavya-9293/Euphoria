const express = require('express');
const router = express.Router();
const Show = require('../models/Show');

// Add a new show
router.post('/add', async (req, res) => {
  console.log('Received show data:', req.body); // Debugging line

  try {
    const { band, date, time, location, boxPrice, upperPrice, generalPrice } = req.body;

    if (!band || !date || !time || !location || !boxPrice || !upperPrice || !generalPrice) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newShow = new Show({
      band: band.toLowerCase(),
      date,
      time,
      location,
      boxPrice,
      upperPrice,
      generalPrice
    });

    await newShow.save();
    res.status(201).json({ message: 'Show added successfully' });
  } catch (error) {
    console.error('Server error while adding show:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get shows by band
router.get('/band/:bandName', async (req, res) => {
  try {
    const bandName = req.params.bandName.toLowerCase();
    const shows = await Show.find({ band: bandName });
    res.json(shows);
  } catch (error) {
    console.error('Error fetching shows:', error);
    res.status(500).json({ message: 'Error fetching shows' });
  }
});

module.exports = router;
