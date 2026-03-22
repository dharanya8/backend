const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/fileDB")
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

const fileSchema = new mongoose.Schema({
  filename: String,
  fileUrl: String
});
const File = mongoose.model("File", fileSchema);

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

app.post("/upload", upload.array("files", 10), async (req, res) => {
  try {
    let result = [];

    for (let file of req.files) {
      const url = `http://localhost:5000/uploads/${file.filename}`;

      const data = new File({
        filename: file.filename,
        fileUrl: url
      });

      await data.save();
      result.push(data);
    }

    res.json({ msg: "Uploaded", files: result });

  } catch (err) {
    console.log(err);
    res.json({ msg: "Error" });
  }
});

/* Get API */
app.get("/images", async (req, res) => {
  const data = await File.find();
  res.json(data);
});

/* Server */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});