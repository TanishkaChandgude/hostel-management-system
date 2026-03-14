const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const Leave = require("./models/leave");
const cors = require("cors");
const Notice = require("./models/notice");
require("dotenv").config();

const Student = require("./models/student");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));


// API to add student
app.post("/add-student", async (req,res)=>{
  try{
    const student = new Student(req.body);
    await student.save();

    res.json({message:"Student added successfully"});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:"Server error"});
  }
});

app.listen(5000,()=>{
  console.log("Server running on port 5000");
});
const bcrypt = require("bcryptjs");
const User = require("./models/user");

app.post("/register", async (req,res)=>{
  try{

    const {name,email,password,role} = req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.json({message:"User registered successfully"});

  }
  catch(err){
    console.log(err);
    res.status(500).json({error:"Server error"});
  }
});
app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({
    message: "Login successful",
    token: token,
    user: {
      email: user.email,
      role: user.role
    }
  });

});

const Complaint = require('./models/Complaint');

app.post('/add-complaint', async(req,res)=>{

try{

const complaint = new Complaint(req.body);

await complaint.save();

res.json({message:"Complaint submitted"})

}

catch(err){

res.status(500).json(err)

}

});

app.post("/apply-leave", async (req, res) => {
  try {

    const leave = new Leave(req.body);

    await leave.save();

    res.json({ message: "Leave applied successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/my-leaves/:email", async (req, res) => {

  const leaves = await Leave.find({ studentEmail: req.params.email });

  res.json(leaves);

});



app.get("/complaints", async (req, res) => {
  try {

    const complaints = await Complaint.find();

    res.json(complaints);

  } catch (err) {

    console.log(err);
    res.status(500).json({ error: "Server error" });

  }
});



app.put("/resolve-complaint/:id", async (req,res)=>{

try{

await Complaint.findByIdAndUpdate(
req.params.id,
{status:"Resolved"}
);

res.json({message:"Complaint resolved"});

}
catch(err){

res.status(500).json({error:"Server error"});

}

});



app.get("/all-leaves", async (req,res)=>{

try{

const leaves = await Leave.find();

res.json(leaves);

}
catch(err){

res.status(500).json({error:"Server error"});

}

});


app.put("/approve-leave/:id", async (req,res)=>{

await Leave.findByIdAndUpdate(
req.params.id,
{status:"Approved"}
);

res.json({message:"Leave Approved"});

});


app.put("/reject-leave/:id", async (req,res)=>{

await Leave.findByIdAndUpdate(
req.params.id,
{status:"Rejected"}
);

res.json({message:"Leave Rejected"});

});


app.get("/student-dashboard/:email", async (req,res)=>{

try{

const email = req.params.email;

const totalComplaints = await Complaint.countDocuments({email});

const pendingComplaints = await Complaint.countDocuments({
email,
status:"Pending"
});

const approvedLeaves = await Leave.countDocuments({
studentEmail:email,
status:"Approved"
});

const pendingLeaves = await Leave.countDocuments({
studentEmail:email,
status:"Pending"
});

res.json({
totalComplaints,
pendingComplaints,
approvedLeaves,
pendingLeaves
});

}
catch(err){
console.log(err);
res.status(500).json({error:"Server error"});
}

});


app.post("/add-notice", async(req,res)=>{

try{

const notice = new Notice(req.body);

await notice.save();

res.json({message:"Notice added successfully"});

}
catch(err){
console.log(err);
res.status(500).json({error:"Server error"});
}

});

app.get("/notices", async(req,res)=>{

try{

const notices = await Notice.find().sort({date:-1});

res.json(notices);

}
catch(err){
console.log(err);
res.status(500).json({error:"Server error"});
}

});


app.delete("/delete-notice/:id", async(req,res)=>{

try{

await Notice.findByIdAndDelete(req.params.id);

res.json({message:"Notice deleted successfully"});

}
catch(err){
console.log(err);
res.status(500).json({error:"Server error"});
}

});

