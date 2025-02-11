// controllers/showtimeController.js
import db from "../database/connection.js";

// Get showtimes for a specific movie
export const getShowtimesByMovie = async (req, res) => {
  try {
    const { movie_id } = req.query;
    const [showtimes] = await db.query('SELECT * FROM showtimes WHERE movie_id = ?', [movie_id]);
    res.json(showtimes);
  } catch (error) {
    
    res.status(500).json({ error: 'Failed to fetch showtimes' });
  }
};
