// routes/seatRoutes.js
import express from 'express';
import { showUsers } from '../controllers/showUsersController';

const router = express.Router();

router.get('/', showUsers);

export default router;