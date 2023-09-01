import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  courseName: { type: String},
  title: { type: String},
  discription: { type: String},
  videos: [{ type: String }],
},{timestamps:true});
const Video = mongoose.model("Video",videoSchema)
export default Video