// routes/showtimeRoutes.js
import express from 'express';
import { getShowtimesByMovie, addShowtime } from '../controllers/showtimeController.js';

const router = express.Router();

router.get('/', getShowtimesByMovie);
router.post('/',addShowtime );

export default router;
