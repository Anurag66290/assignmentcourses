import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
      },
      email: {
        unique: true,
        type: String,  
      },
      role: {
        type: String, // 'User', 'Admin', ' Manager-1', or ' Manager-2'
      },
      password: {
        type: String,
      },
  })
  const user = new mongoose.model("user", userSchema);

export default user;