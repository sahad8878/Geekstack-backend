import mongoose from 'mongoose'
import  env from 'dotenv'
env.config() 


const url =  process.env.MONGOOSE_URL

mongoose.connect(url,{
    useNewUrlParser:true,
})
mongoose.connection.on("connected",()=> {
    console.log('connected to mongodb...');
})

mongoose.connection.on('error',(err)=> {
    console.log('Error connected to mongodb',err);
})