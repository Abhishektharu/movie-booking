// routes/showtimeRoutes.js
import express from 'express';
import { getShowtimesByMovie } from '../controllers/showtimeController.js';

const router = express.Router();

router.get('/', getShowtimesByMovie);

export default router;
