import mongoose from "mongoose";  // to use library of mongoose

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,  // Ensure password is required
        unique: false,
    },
    role: {
        type: String,
        enum: ["user", "admin","superadmin"],
        default: "user", // default role is user
    },
    refreshToken:{
        type:String,
    },
    });
const User = mongoose.model("User", userSchema);  // Corrected model name (User)

export default User;  // Use this model in controller
