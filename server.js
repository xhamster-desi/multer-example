const express = require('express');
const app = express();
const port = 3000;

const upload = require('./upload');

app.post('/upload/single', upload.single('file'), (req, res) => {
  // Handle the uploaded file
  res.json({ message: 'File uploaded successfully!' });
});

app.post("/upload/multiple", upload.array("file", 10), (req, res) => {
  console.log(req.files)
  res.json({ message: 'Files uploaded successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});