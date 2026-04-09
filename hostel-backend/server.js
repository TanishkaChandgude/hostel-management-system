console.log("🔥 SERVER FILE RUNNING");

const jwt = require("jsonwebtoken");
const Notification = require('./models/notification');
const Staff = require('./models/staff');
const express = require("express");
const mongoose = require("mongoose");
const Leave = require("./models/leave");
const cors = require("cors");
const Notice = require("./models/notice");
require("dotenv").config();
const Student = require("./models/student");
const Room = require("./models/room");
const Feedback = require('./models/feedback'); 
const Fees = require('./models/Fees'); 

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.post('/admin/mess', (req, res) => {
  console.log("🔥 MESS HIT");
  res.send("Working");
});

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

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
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
      year,
      role
    } = req.body;

    // 🍽️ MESS USER REGISTER
if(role === "mess"){

  if(!name || !email || !password){
    return res.status(400).json({ error: "Name, email, password required" });
  }

  const existing = await User.findOne({ email });
  if(existing){
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: "mess"
  });

  await user.save();

  return res.json({ message: "Mess user created" });
}

    // ✅ validation (removed roomNo)
    if (!name || !email || !password || !branch || !rollNo || !year) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ❗ check existing student
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: "Student already exists" });
    }

    // 🔒 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔍 find available room
    const rooms = await Room.find();

    let assignedRoom = null;

    for (let room of rooms) {

      const count = await Student.countDocuments({ roomNo: room.roomNo });

      if (count < room.capacity) {
        assignedRoom = room.roomNo;
        break;
      }
    }

    // ❌ if no room available
    if (!assignedRoom) {
      return res.status(400).json({ error: "No rooms available" });
    }

    // 💾 save student
    const student = new Student({
      name,
      email,
      password: hashedPassword,
      branch,
      rollNo,
      year,
      roomNo: assignedRoom   // ✅ auto assigned
    });

    await student.save();

    res.json({
      message: "Student registered successfully",
      roomAssigned: assignedRoom   // 🔥 send to frontend
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Student.findOne({ email });
    let type = "student";

    if (!user) {
      user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      type = user.role;   // ✅ FIXED (admin / mess)
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: type }, "secretkey");

    let userData;

    if (type === "student") {
      userData = {
        name: user.name,
        email: user.email,
        branch: user.branch,
        rollNo: user.rollNo,
        roomNo: user.roomNo,
        year: user.year,
        
      };
    } else {
      userData = {
        name: user.name,
        email: user.email,
        role: type   // ✅ admin OR mess
      };
    }

    res.json({
      message: "Login successful",
      token,
      user: userData
    });

  } catch (err) {
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


app.put("/approve-leave/:id", async (req, res) => {

  const leave = await Leave.findByIdAndUpdate(
    req.params.id,
    { status: "Approved" },
    { new: true }
  );

  // 🔥 Create Notification using email
  await Notification.create({
    studentEmail: leave.studentEmail,
    message: "Your leave request has been approved ✅"
  });

  res.json({ message: "Leave Approved" });
});


app.put("/reject-leave/:id", async (req, res) => {

  const leave = await Leave.findByIdAndUpdate(
    req.params.id,
    { status: "Rejected" },
    { new: true }
  );

  await Notification.create({
    studentEmail: leave.studentEmail,
    message: "Your leave request has been rejected ❌"
  });

  res.json({ message: "Leave Rejected" });
});


app.get("/notifications/:email", async (req, res) => {

  const notifications = await Notification.find({
    studentEmail: req.params.email
  }).sort({ createdAt: -1 });

  res.json(notifications);
});

app.put('/notifications/read-all/:email', async (req, res) => {
  try {
    const email = req.params.email;

    await Notification.updateMany(
      { studentEmail: email, isRead: false },
      { $set: { isRead: true } }
    );

    res.json({ message: "All notifications marked as read" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/student-dashboard/:email', async (req, res) => {
  try {
    const email = req.params.email;

   
    // ✅ FIXED: case-insensitive email match
    const student = await Student.findOne({
      email: new RegExp(`^${email}$`, 'i')
    });

   

    // ✅ FIXED: correct field names
    const leaves = await Leave.countDocuments({
      studentEmail: email
    });

    const complaints = await Complaint.countDocuments({
      email: email
    });

    res.json({
      roomNo: student?.roomNo || "Not Assigned",
      leaves: leaves,
      complaints: complaints
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
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

    res.json({ message: "✅ Notice added successfully." });

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

const Mess = require('./models/mess');

app.post('/mess', async (req, res) => {
  try {
    const { day, breakfast, lunch, dinner } = req.body;

    const existing = await Mess.findOne({ day });

    if (existing) {
      existing.breakfast = breakfast;
      existing.lunch = lunch;
      existing.dinner = dinner;

      await existing.save();
      return res.json({ message: "Menu updated" });
    }

    const newMenu = new Mess({ day, breakfast, lunch, dinner });
    await newMenu.save();

    res.json({ message: "Menu added" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.get('/mess', async (req, res) => {
  try {
    const menu = await Mess.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: "Error fetching menu" });
  }
});

app.get('/today-menu', async (req, res) => {
  try {

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = days[new Date().getDay()];

    const menu = await Mess.findOne({ day: today });

    res.json(menu);

  } catch (err) {
    res.status(500).json({ error: "Error fetching today's menu" });
  }
});

app.get("/room-stats", async (req, res) => {
  try {

    const rooms = await Room.find();      // ✅ get all rooms
    const students = await Student.find();

    let fullRooms = 0;
    let availableRooms = 0;
    let roomsWithVacancy = 0;

    const roomDetails = [];

    rooms.forEach(room => {

      // count students in this room
      const count = students.filter(s => s.roomNo === room.roomNo).length;

      if (count === room.capacity) {
        fullRooms++;
      } else {
        roomsWithVacancy++;
      }

      if (count < room.capacity) {
        availableRooms++;
      }

      roomDetails.push({
        roomNo: room.roomNo,
        occupants: count,
        capacity: room.capacity,
        available: room.capacity - count
      });

    });

    res.json({
      totalRooms: rooms.length,   // ✅ correct total
      fullRooms,
      availableRooms,
      roomsWithVacancy,
      roomDetails
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.put("/update-room/:id", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, {
      roomNo: req.body.roomNo
    });

    res.json({ message: "Room updated successfully" });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/generate-rooms", async (req, res) => {
  try {

    const { block, floors, roomsPerFloor, capacity } = req.body;

    let rooms = [];

    for (let f = 1; f <= floors; f++) {
      for (let r = 1; r <= roomsPerFloor; r++) {

        const roomNo = `${block}${f}${r.toString().padStart(2, '0')}`;

        // prevent duplicates
        const exists = await Room.findOne({ roomNo });

        if (!exists) {
          rooms.push({
            roomNo,
            capacity: capacity || 4,
            block,
            floor: f
          });
        }
      }
    }

    await Room.insertMany(rooms);

    res.json({ message: "Rooms generated successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error generating rooms" });
  }
});


app.post("/staff", async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.json(staff);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});



app.get("/staff", async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});




app.put("/students/:id/room", async (req, res) => {
  try {
    const { roomNo } = req.body;

    // 1. Get room details
    const room = await Room.findOne({ roomNo });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // 2. Count students already in that room
    const count = await Student.countDocuments({ roomNo });

    // 3. Check capacity
    if (count >= room.capacity) {
      return res.status(400).json({ error: "Room is already full ❌" });
    }

    // 4. Update student
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { roomNo },
      { new: true }
    );

    res.json(updatedStudent);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/students", async (req, res) => {
  console.log("✅ /students API HIT"); 

  try {
    const students = await Student.find();
    const rooms = await Room.find();

    console.log("STUDENTS:", students.map(s => s.roomNo));
    console.log("ROOMS:", rooms.map(r => r.roomNo));

    const roomMap = {};

    rooms.forEach(room => {
      if (room.roomNo) {
        const key = room.roomNo.trim().toLowerCase();
        roomMap[key] = room.block;
      }
    });

    const updatedStudents = students.map(student => {
      const key = student.roomNo
        ? student.roomNo.trim().toLowerCase()
        : '';

      return {
        ...student._doc,
        block: roomMap[key] || "Unknown"
      };
    });

    res.json(updatedStudents);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post('/chatbot', async (req, res) => {

  console.log("FULL BODY:", req.body);

  const { message, email, role } = req.body;
  const msg = message.toLowerCase().trim();

  console.log("Message:", message);
console.log("Email:", email);
console.log("Role:", role);

  try {

    // 👨‍🎓 STUDENT
    if(role === 'student'){

      if(message === "room"){
        const student = await Student.findOne({ email });
        return res.json({ reply: `Your room is ${student?.roomNo}` });
      }

      if(message === "leave"){
        const count = await Leave.countDocuments({ studentEmail: email });
        return res.json({ reply: `You applied ${count} leaves` });
      }

      if(message === "complaint"){
        const count = await Complaint.countDocuments({ email });
        return res.json({ reply: `You have ${count} complaints` });
      }

      if(msg === "mess"){
        const menu = await Mess.find();

  if(menu.length === 0){
    reply = "Mess menu is not available yet 🍽️";
  } else {

    reply = "📅 Weekly Mess Menu:\n\n";

    menu.forEach(item => {
      reply += `👉 ${item.day}\n`;
      reply += `Breakfast: ${item.breakfast}\n`;
      reply += `Lunch: ${item.lunch}\n`;
      reply += `Dinner: ${item.dinner}\n\n`;
    });

  }
  res.json({ reply });

      }
    }

    // 👨‍💼 ADMIN
    if(role === 'admin'){

      if(message === "complaints"){
        const total = await Complaint.countDocuments();
        return res.json({ reply: `Total complaints: ${total}` });
      }

      if(message === "leaves"){
        const total = await Leave.countDocuments();
        return res.json({ reply: `Total leaves: ${total}` });
      }

      if(message === "students"){
        const total = await Student.countDocuments();
        return res.json({ reply: `Total students: ${total}` });
      }
    }

    res.json({ reply: "🤖 I couldn't find data. Try: room, leave, complaint or mess." });

  } catch(err){
    res.status(500).json({ reply: "Server error" });
  }
});

app.get('/mess-dashboard', async (req, res) => {
  try {

    const totalComplaints = await Complaint.countDocuments({ type: "mess" });
    const pendingComplaints = await Complaint.countDocuments({ type: "mess", status: "Pending" });

    const totalFeedback = await Feedback.countDocuments();

    res.json({
      totalComplaints,
      pendingComplaints,
      totalFeedback
    });

  } catch (err) {
    res.status(500).json({ error: "Error" });
  }
});

app.post('/feedback', async (req,res)=>{
  const fb = new Feedback(req.body);
  await fb.save();
  res.json({message:"Feedback added"});
});

app.get('/mess-complaints', async (req, res) => {
  const data = await Complaint.find({ type: 'mess' });
  res.json(data);
});

app.get('/complaints', async (req, res) => {
  const data = await Complaint.find({ type: 'hostel' });
  res.json(data);
});

app.get('/create-mess-user', async (req, res) => {

  const bcrypt = require('bcryptjs');

  const hashed = await bcrypt.hash("123456", 10);

  const user = new User({
    name: "Mess Manager",
    email: "mess@gmail.com",
    password: hashed,
    role: "mess"
  });

  await user.save();

  res.send("Mess user created");
});
//Fees
app.get("/fees/:email", async (req, res) => {
  try {
    console.log("📩 Fetching fees for:", req.params.email);

    const student = await Fees.findOne({ email: req.params.email });

    if (!student) {
      return res.status(404).json({ message: "No fee record found" });
    }

    res.json(student);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});
app.post("/update-fees", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { email, hostelPaid, messPaid, hostelDue, messDue } = req.body;

    const hostelTotal = 25000;
    const messTotal = 28200;

    // 🔥 Get existing record
    let existing = await Fees.findOne({ email });

    let oldHostelPaid = existing?.hostel?.paid || 0;
    let oldMessPaid = existing?.mess?.paid || 0;

    // ✅ Add new payment
    const newHostelPaid = oldHostelPaid + Number(hostelPaid || 0);
    const newMessPaid = oldMessPaid + Number(messPaid || 0);

    // 🔥 Calculate pending
    const hostelPending = hostelTotal - newHostelPaid;
    const messPending = messTotal - newMessPaid;

    const hostelStatus = hostelPending <= 0 ? "Paid" : "Pending";
    const messStatus = messPending <= 0 ? "Paid" : "Pending";

    const result = await Fees.updateOne(
      { email },
      {
        $set: {
          hostel: {
            total: hostelTotal,
            paid: newHostelPaid,
            pending: hostelPending,
            dueDate: hostelDue,
            status: hostelStatus
          },
          mess: {
            total: messTotal,
            paid: newMessPaid,
            pending: messPending,
            dueDate: messDue,
            status: messStatus
          }
        }
      },
      { upsert: true }
    );

    console.log("DB RESULT:", result);

    res.json({ message: "Fees Updated Successfully" });

  } catch (err) {
    console.log("🔥 ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});





app.get("/student/:rollNo", async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });
   console.log("PARAM:", req.params.rollNo);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({
      name: student.name,
      email: student.email
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});