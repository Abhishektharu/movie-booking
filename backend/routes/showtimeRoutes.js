// routes/showtimeRoutes.js
import express from 'express';
import { getShowtimesByMovie, addShowtime, getShowtimes } from '../controllers/showtimeController.js';

const router = express.Router();

router.get('/', getShowtimesByMovie);
router.get('/allShowtimes',getShowtimes);
router.post('/',addShowtime );


export default router;
