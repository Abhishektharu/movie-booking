import db from "../database/connection.js";

export const bookTicket = async (req, res) => {
  try {
    const { user_id, showtime_id, seat_id } = req.body;
    const updateSeat = 'UPDATE `seats` SET `status` = "booked" WHERE `id` = ? LIMIT 1';
    
    const [result, fields] = await db.execute(updateSeat, [seat_id]);
    await db.execute(
      "INSERT INTO bookings (user_id, showtime_id, seat_id, payment_status) VALUES (?, ?, ?, 'pending')",
      [user_id, showtime_id, seat_id]
  );
    return res.status(201).json({message: "Booking Confirmed."});
  } catch (err) {
    console.log(err);
    return res.status(500).json({error: err.message});

  }
};

export const getUserBookings = async (req,res) => {
    try {
        const query = 'SELECT * FROM `bookings` WHERE `name` = ?';
        const [bookings] = await db.execute(query, [req.params.userId])
    } catch (error) {
        
    }
}