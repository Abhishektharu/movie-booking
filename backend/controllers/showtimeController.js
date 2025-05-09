// controllers/showtimeController.js
import db from "../database/connection.js";

// Get showtimes for a specific movie
export const getShowtimesByMovie = async (req, res) => {
  try {
    const { movie_id } = req.query;
    const [showtimes] = await db.query(
      "SELECT * FROM showtimes WHERE movie_id = ?",
      [movie_id]
    );
    res.json(showtimes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch showtimes" });
  }
};

export const getShowtimes = async (req, res) => {
  try {
    const [showtimes] = await db.query(`
    select showtimes.id as show_id,movies.id as movie_id, movies.title, showtimes.show_date, showtimes.show_time, showtimes.price
from showtimes
inner join 
movies on showtimes.movie_id = movies.id order by showtimes.id desc
LIMIT 5; 
      `);
    res.json(showtimes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch showtimes" });
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

// Get showtime details with seats
export const getShowtimeDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const [showtime] = await db.query(`
      SELECT 
        s.*,
        m.title as movie_title,
        m.image_url,
        t.name as theater_name,
        t.location as theater_location
      FROM showtimes s
      JOIN movies m ON s.movie_id = m.id
      JOIN theaters t ON s.theater_id = t.id
      WHERE s.id = ?
    `, [id]);

    if (!showtime.length) {
      return res.status(404).json({ message: 'Showtime not found' });
    }

    const [seats] = await db.query(
      'SELECT id, seat_number, status FROM seats WHERE showtime_id = ?',
      [id]
    );res.json({
      ...showtime[0],
      seats
    });

  } catch (error) {
    console.error('Error fetching showtime details:', error);
    res.status(500).json({ message: 'Failed to fetch showtime details' });
  }};