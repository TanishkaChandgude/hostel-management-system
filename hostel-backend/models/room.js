const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNo: { type: String, unique: true },
  capacity: { type: Number, default: 4 },
  block: String,
  floor: Number
});

module.exports = mongoose.model("Room", roomSchema);