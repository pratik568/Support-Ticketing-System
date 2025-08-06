const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  course: String,
  contactNumber: String,
  concern: String,
  status: {
    type: String,
    default: 'Open'
  }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
