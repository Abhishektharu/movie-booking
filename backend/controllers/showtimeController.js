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

export const getShowtimes = async (req, res) => {
  try {
    const [showtimes] = await db.query('SELECT * FROM showtimes');
    res.json(showtimes);
  } catch (error) {
    
    res.status(500).json({ error: 'Failed to fetch showtimes' });
  }
};

export const addShowtime = async (req, res) => {
  try {
    const { movie_id, theater_id, show_date, show_time, price } = req.body;

    if (!movie_id || !theater_id || !show_date || !show_time || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await db.execute(
      "INSERT INTO showtimes (movie_id, theater_id, show_date, show_time, price) VALUES (?, ?, ?, ?, ?)",
      [movie_id, theater_id, show_date, show_time, price]
    );

    res.status(201).json({ message: "Showtime added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};