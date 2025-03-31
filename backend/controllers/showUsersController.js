// controllers/showtimeController.js
import db from "../database/connection.js";

// Get showtimes for a specific movie
export const showUsers = async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, name, email FROM users ');
    res.json(users);
  } catch (error) {
    
    res.status(500).json({ error: 'Failed to fetch showtimes' });
  }
};