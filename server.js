const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

// file upload sozlash
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// test route
app.get("/", (req, res) => {
  res.send("Server ishlayapti 🚀");
});

// upload route
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({
    message: "Fayl yuklandi",
    file: req.file
  });
});

app.listen(3000, () => {
  console.log("Server 3000 portda ishlayapti");
});