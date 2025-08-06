const express = require('express');
const jwt = require('jsonwebtoken');
const Ticket = require('../models/Ticket');

const router = express.Router();

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const verified = jwt.verify(token, 'your_jwt_secret_key');
    req.user = verified;
    next();
  } catch {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// User: Submit Ticket
router.post('/submit', authMiddleware, async (req, res) => {
  const { course, contactNumber, concern } = req.body;
  const { id: userId, name, email } = req.user;

  try {
    const newTicket = new Ticket({ userId, name, email, course, contactNumber, concern });
    await newTicket.save();
    res.status(201).json({ message: 'Ticket submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Get All Tickets
router.get('/all', async (req, res) => {
  try {
    const tickets = await Ticket.find({ status: { $ne: 'Closed' } }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tickets' });
  }
});

// Admin: Update Ticket Status
router.patch('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    await Ticket.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update ticket' });
  }
});

module.exports = router;
