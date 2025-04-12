 import express from 'express';
 import { createBlogPost,getBlogPostById } from '../controllers/blogcontroller.js';
 import { authorize,verifyToken } from '../middlewares/authMiddlewares.js';

 const router= express.Router();
 router.post('/create',verifyToken,authorize(['admin', 'superadmin']),createBlogPost);
 export default router;
 router.get('/:id', getBlogPostById);