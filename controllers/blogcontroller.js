import { json } from 'express';
import Blog from '../models/blog.js';
import jwt from 'jsonwebtoken';

export const createBlogPost = async (req, res) => {
    try {
        // Extract token from cookies
        const token = req.cookies?.accessToken;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized. Token not found in cookies." });
        }

        // Verify token and get user details
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is correct
        const userId = decoded.userId;
        const name = decoded.name;
        const email = decoded.email;

        // Create a blog with attached userId, name, and email
        const blog = new Blog({
            ...req.body,
            user: userId,
            name: name,
            email: email,
        });
        await blog.save();

        // Return the blog along with user details
        res.status(201).json({
            message: "Blog created successfully!",
            blog: {
                ...blog.toObject(),
                user: {
                    userId,
                    name,
                    email,
                },
            },
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(400).json({ message: err.message });
    }
};
//get blog by id
export const getBlogPostById = async (req,res)=>{
    try{
        const blog= await Blog.findById(req.params.id).populate('user', 'email');
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }
        res.status(200).json(blog);
    }
    catch(error){
        res.status(500).json({message:"Error occured!!!"});
    }
}