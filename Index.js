import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectdb from "./config/db.js";  // MongoDB connection logic
import userRoutes from "./routes/userRoutes.js";  // Import user routes
import cookieParser from "cookie-parser";  // To parse cookies  
import createBlogPost from "./routes/blogRoutes.js";  // Import blog routes
import authRoutes from "./routes/authRoutes.js";  // Import auth routes
dotenv.config();  // Load environment variables from .env file

const app = express();

// Connect to the database
connectdb();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',  // Adjust to your front-end URL
    methods: ['GET', 'POST'],
    credentials: true,  // Allow cookies with cross-origin requests
}));
app.use(express.json());  // Parse JSON bodies
app.use(cookieParser());  // Parse cookies

// Routes
app.use('/api', userRoutes);  // Prefix routes with /api
app.use('/api',createBlogPost);
app.use('/api/auth',authRoutes);
// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5000;  // Use environment variable if set
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
