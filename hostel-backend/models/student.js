const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
   name: String,
  email: String,
  password: String,
  branch: String,
  rollNo: String,
  roomNo: String,
  year: String
 
});

module.exports = mongoose.model("Student", StudentSchema);