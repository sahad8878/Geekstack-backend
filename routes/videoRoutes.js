import express from 'express'
import { getAll,uploadData } from '../controller/videoController.js'
const router = express.Router()
import multer from 'multer'
import fs from 'fs'
import path from 'path'
const storage = multer.diskStorage({
    destination:function(req,file,cb){
      if(!fs.existsSync("public")) {
        fs.mkdirSync('public')
      }
      if(!fs.existsSync("public/videos")) {
        fs.mkdirSync("public/videos")
      }
      cb(null,'public/videos')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + file.originalname)
    }

})
const upload = multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        var ext = path.extname(file.originalname)
        if(ext !== '.mkv'&& ext !== '.mp4'){
            return cb(new Error("Only videos are allowed"))
        }
        cb(null,true)
    }
})

router.get('/getAll',getAll)

router.post('/upload',upload.fields([{
    name:'videos',
    maxCount:2,
}]),uploadData)
export default router