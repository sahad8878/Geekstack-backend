import Video from "../model/videos.js";
export const getAll = async (req, res) => {
  try {
   
    const videos = await Video.find({courseName:req.query.courseName});
  
    res.status(201).json(videos);
  } catch (error) {
    res.status(400)
    throw new Error(error);
  }
};

export const uploadData = async (req, res) => {
    const {courseName,description,title}= req.body
    const videoURL = req.videoURL;
   
    if(!courseName && !description && ! title){
      res.status(400);
      throw new Error("fill the fields");
    }
  
    let videosPath = []
    if(Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    for(let video of req.files.videos) {
        videosPath.push('/'+ video.path)
    }
}
try {
const createVideo = await Video.create({
    courseName,
    description,
    title,
    videos:videoURL
})
res.status(201).json({message:"video created successfully",createVideo})
  } catch (error) {
    console.log(error);
    res.status(400)
    throw new Error(error);
  }
};
