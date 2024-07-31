const express = require('express');
const clodinary = require("cloudinary").v2;
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

const upload = require('./upload');

clodinary.config({
  cloud_name: "drc8sihlj",
  api_key: "675897635184932",
  api_secret: "04ziFqnmJJoNdg0JO2bjd4obQrE",
  secure: true,
});

app.use(cors({
  origin: "*"
}));

app.post('/upload/single', upload.single('file'), (req, res) => {
  // Handle the uploaded file
  console.log(req.body);
  console.log(req.file);
  console.log(req.files);
  clodinary.uploader.upload(req.file.path, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading to Cloudinary');
    }
    res.json({
      message: 'File uploaded successfully!',
      secure_url: result.secure_url
    });
  });
  
});

app.post("/upload/multiple", upload.array("file", 10), (req, res) => {
  console.log(req.files)
  res.json({ message: 'Files uploaded successfully!' });
});

app.get("/", (req, res) => {
  clodinary.uploader.upload("./uploads/image.jpg", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading to Cloudinary');
    }
    console.log(result);
    res.json({
      message: 'File uploaded successfully!',
      secure_url: result.secure_url
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});