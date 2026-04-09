const mongoose = require("mongoose");

const feesSchema = new mongoose.Schema({
  email: String,

  hostel: {
    total: Number,
    paid: Number,
    pending: Number,
    dueDate: String,
    status: String
  },

  mess: {
    total: Number,
    paid: Number,
    pending: Number,
    dueDate: String,
    status: String
  }

});

module.exports = mongoose.model("Fees", feesSchema);