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

    // 1. Insert the new showtime
    const [showtimeResult] = await db.execute(
      "INSERT INTO showtimes (movie_id, theater_id, show_date, show_time, price) VALUES (?, ?, ?, ?, ?)",
      [movie_id, theater_id, show_date, show_time, price]
    );
    const showtimeId = showtimeResult.insertId;

    // 2. Get total seats for the theater
    const [theaterRows] = await db.execute(
      "SELECT total_seats FROM theaters WHERE id = ?",
      [theater_id]
    );
    const totalSeats = theaterRows[0].total_seats;

    // 3. Generate seat numbers (e.g., A1, A2, ..., B1, B2, ...)
    const seatsPerRow = 10;
    const seatRows = Math.ceil(totalSeats / seatsPerRow);
    const seatInserts = [];
    for (let row = 0; row < seatRows; row++) {
      const rowLetter = String.fromCharCode(65 + row); // 'A', 'B', ...
      for (let num = 1; num <= seatsPerRow; num++) {
        const seatNumber = `${rowLetter}${num}`;
        if (seatInserts.length < totalSeats) {
          seatInserts.push([showtimeId, seatNumber, 'available']);
        }
      }
    }

    // 4. Bulk insert seats
    await db.query(
      "INSERT INTO seats (showtime_id, seat_number, status) VALUES ?",
      [seatInserts]
    );

    res.status(201).json({ message: "Showtime and seats created successfully", showtimeId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create showtime and seats" });
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
  }
};