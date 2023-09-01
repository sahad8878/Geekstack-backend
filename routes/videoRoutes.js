import express from 'express'
import { getAll,uploadData } from '../controller/videoController.js'
const router = express.Router()
import multer from 'multer'
import fs from 'fs'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }
    if (!fs.existsSync('public/videos')) {
      fs.mkdirSync('public/videos');
    }
    cb(null, 'public/videos');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the video
    const uniqueFilename = Date.now() + file.originalname;
    // Construct the URL with forward slashes
    const videoURL = `/public/videos/${uniqueFilename}`;
    // Save the URL to the request object for later use
    req.videoURL = videoURL;
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== '.mkv' && ext !== '.mp4') {
      return cb(new Error('Only videos are allowed'));
    }
    cb(null, true);
  },
});

// Define a route to upload videos (you already have this)
router.post('/upload', upload.fields([{ name: 'videos', maxCount: 2 }]), uploadData);

router.get('/getAll',getAll)

export default router