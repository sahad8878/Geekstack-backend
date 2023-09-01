import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import NodeMediaServer from 'node-media-server'
import path from 'path'
import { fileURLToPath } from 'url';
import videoRouter from './routes/videoRoutes.js'
import userRouter from './routes/userRoutes.js'
dotenv.config()

import './config/connectDB.js'
import { errorHandler, notFound } from "./middlewares/errorMiddlwares.js";
  


const app = express()
app.use(express.json())
// const corsOptions = {
//     origin: 'http://localhost:5173', // Replace with your frontend URL
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // You might need this if you're sending cookies
//   };
  
  app.use(cors());
  const config = {
    rtmp: {
      port: 1935,
      chunk_size: 60000,
      gop_cache: true,
      ping: 30,
      ping_timeout: 60,
    },
    http: {
      port: 8000,
      mediaroot: './media',
      allow_origin: '*',
    },
  };
  
  const nms = new NodeMediaServer(config);
  nms.run();

  app.use("/api/user",userRouter)
  app.use("/api/videos",videoRouter)

  app.use(notFound);
app.use(errorHandler);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use('/public', express.static(path.join(__dirname, 'public')))


  const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`listening on port ${port}`));