import express from 'express';
import { getAllUsers } from '../controllers/usercontroller.js';

const router = express.Router();


router.get('/getall', getAllUsers);


export default router;