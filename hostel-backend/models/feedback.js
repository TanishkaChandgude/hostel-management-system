const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  category: String,
  rating: Number,
  message: String,
  email: String,
  status: {
    type: String,
    default: 'Pending'
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);