
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, },
  password: String,
  isLoggedIn: { type: Boolean, default: false }, 
  authStrategy: {
    type: String,
    default: "local",
  },
});


const User =  mongoose.model('User', userSchema);
export default User