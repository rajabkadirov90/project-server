const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

// 📦 Fayl saqlash sozlamasi
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// 🧠 RAMda saqlash (hozircha)
let projects = [];

// 🏠 Test route
app.get("/", (req, res) => {
  res.send("Server ishlayapti 🚀");
});

// 📤 Upload route
app.post("/upload", upload.single("file"), (req, res) => {

  const newProject = {
    title: req.body.title,
    file: req.file.filename,
    date: new Date()
  };

  projects.push(newProject);

  res.send({
    message: "Yuklandi",
    project: newProject
  });
});

// 📥 Barcha loyihalarni olish
app.get("/projects", (req, res) => {
  res.send(projects);
});

// 🚀 Serverni ishga tushirish
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server ishlayapti 🚀");
});