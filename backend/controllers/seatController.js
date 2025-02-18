import db from "../database/connection.js";
export const getSeatsByShowtime = async (req, res) => {
  try {
    const { showtime_id } = req.query;

    const query = "SELECT * FROM `seats` WHERE `showtime_id` = ?";
    const [showtimes] = await db.execute(query, [showtime_id]);
    res.json(showtimes);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to fetch showtimes" });
  }
};
