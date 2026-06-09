const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const files = [];

app.post("/upload", (req, res) => {
  const { name, size, type } = req.body;

  if (!name || !size || !type) {
    return res.status(400).json({
      message: "Invalid metadata",
    });
  }

  const file = {
    id: Date.now(),
    name,
    size,
    type,
    uploadedAt: new Date().toISOString(),
  };

  files.unshift(file);

  res.status(201).json({
    message: "Uploaded",
    file,
  });
});

app.get("/files", (req, res) => {
  res.json(files);
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});