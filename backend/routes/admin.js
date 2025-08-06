const express = require('express');
const Ticket = require('../models/Ticket');

const router = express.Router();

// GET all non-closed tickets (admin access)
router.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find({ status: { $ne: 'Closed' } });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH update status of a ticket
router.patch('/tickets/:id', async (req, res) => {
  const { status } = req.body;
  try {
    await Ticket.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

module.exports = router;
