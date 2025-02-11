// routes/seatRoutes.js
import express from 'express';
import { getSeatsByShowtime } from '../controllers/seatController.js';

const router = express.Router();

router.get('/', getSeatsByShowtime);

export default router;