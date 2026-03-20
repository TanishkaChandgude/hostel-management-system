const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const Leave = require("./models/leave");
const cors = require("cors");
const Notice = require("./models/notice");
require("dotenv").config();

const Student = require("./models/student");
const Feedback = require('./models/feedback'); 
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

//const Student = require('./models/student');
//const bcrypt = require('bcrypt');

app.post("/register", async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      branch,
      rollNo,
      roomNo,
      year
    } = req.body;

    // ✅ validation
    if (!name || !email || !password || !branch || !rollNo || !roomNo || !year) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ❗ check existing student
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: "Student already exists" });
    }

    // 🔒 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 save student
    const student = new Student({
      name,
      email,
      password: hashedPassword, // store here instead
      branch,
      rollNo,
      roomNo,
      year,
      
    });

    await student.save();

    res.json({ message: "Student registered successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // First check if student
    let user = await Student.findOne({ email });
    let type = "student";

    if (!user) {
      // If not student, check admin
      user = await User.findOne({ email });
      type = "admin";
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT (optional, can use for auth)
    const token = jwt.sign({ id: user._id, role: type }, "secretkey");

    // Send user data according to type
    let userData;
    if (type === "student") {
      userData = {
        name: user.name,
        email: user.email,
        branch: user.branch,
        rollNo: user.rollNo,
        roomNo: user.roomNo,
        year: user.year,
        role: "student"
      };
    } else {
      userData = {
        name: user.name,
        email: user.email,
        role: "admin"
      };
    }

    res.json({
      message: "Login successful",
      token: token,
      user: userData
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
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





const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png|pdf/;
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.test(ext)) {
      cb(null, true);
    } else {
      cb("Only images and PDFs allowed", false);
    }
  }
});

app.post('/notices', upload.single('file'), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const newNotice = new Notice({
      title: req.body.title,
      description: req.body.description || "",
      fileUrl: req.file ? req.file.filename : null, // ✅ FIX
      date: new Date()
    });

    await newNotice.save();

    res.json({ message: "Notice uploaded" });

  } catch (err) {
    console.log("ERROR:", err); // 👈 IMPORTANT
    res.status(500).json({ error: "Upload failed" });
  }
});
app.get('/notices', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete('/delete-notice/:id', async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Notice deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});
app.use('/uploads', express.static('uploads'));

// ✅ SUBMIT FEEDBACK
app.post("/feedback", async (req, res) => {

  const feedback = new Feedback(req.body);

  await feedback.save();

  res.json({ message: "Feedback Saved" });
});


// ✅ GET ALL FEEDBACK
app.get("/feedback", async (req, res) => {

  const data = await Feedback.find();

  res.json(data);
});


// ✅ UPDATE STATUS
app.put("/feedback-status", async (req, res) => {

  const { id, status } = req.body;

  await Feedback.findByIdAndUpdate(id, { status });

  res.json({ message: "Updated" });
});
// ✅ FEEDBACK SAVE ROUTE
app.post("/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();

    res.json({ message: "Feedback Saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error saving feedback" });
  }
});
// ✅ FEEDBACK ROUTE (POST)
app.post("/feedback", async (req, res) => {
  try {
    console.log("Incoming Data:", req.body); // debug

    const feedback = new Feedback(req.body);
    await feedback.save();

    res.status(200).json({ message: "Feedback Saved" });

  } catch (err) {
    console.log("❌ Error:", err);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});
