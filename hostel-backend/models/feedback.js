const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  category: String,
  rating: Number,
  message: String,
  email: String,

  type:{                      // ✅ ADD THIS
    type:String,
    default:"hostel"
  },
  
  status: {
    type: String,
    default: 'Pending'
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);