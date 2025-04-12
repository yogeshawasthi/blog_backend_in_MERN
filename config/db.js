import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectdb = () => {
    mongoose.connect("mongodb://localhost:27017/Babita", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);  // Exit the application if database connection fails
    });
};

export default connectdb;
