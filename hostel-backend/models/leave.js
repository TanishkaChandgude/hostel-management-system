const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({

  studentEmail:String,
  studentName : String ,

  reason:String,

  fromDate:String,

  toDate:String,

  status:{
    type:String,
    default:"Pending"
  }

});

module.exports = mongoose.model("Leave",leaveSchema);