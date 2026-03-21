const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: String,
  role: String,        // Electrician, Plumber, Mess Staff, Warden
  phone: String,
  email: String,       // ✅ added
  department: String
}, { timestamps: true });

module.exports = mongoose.model("Staff", staffSchema);