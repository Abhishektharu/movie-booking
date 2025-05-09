import db from "../database/connection.js";

export const bookTicket = async (req, res) => {
  try {
    const { user_id, showtime_id, seat_id } = req.body;

    // Check if seat is available
    const [seatRows] = await db.execute(
      'SELECT status FROM seats WHERE id = ? AND showtime_id = ?',
      [seat_id, showtime_id]
    );
    if (!seatRows.length || seatRows[0].status === 'booked') {
      return res.status(400).json({ message: "Seat is already booked or does not exist." });
    }

    // Book the seat
    await db.execute(
      'UPDATE seats SET status = "booked" WHERE id = ? LIMIT 1',
      [seat_id]
    );
    await db.execute(
      "INSERT INTO bookings (user_id, showtime_id, seat_id, payment_status) VALUES (?, ?, ?, 'pending')",
      [user_id, showtime_id, seat_id]
    );
    return res.status(201).json({ message: "Booking Confirmed." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const query = `
      SELECT b.*, s.show_date, s.show_time, m.title as movie_title, t.name as theater_name, st.seat_number
      FROM bookings b
      JOIN showtimes s ON b.showtime_id = s.id
      JOIN movies m ON s.movie_id = m.id
      JOIN theaters t ON s.theater_id = t.id
      JOIN seats st ON b.seat_id = st.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
    `;
    const [bookings] = await db.execute(query, [req.params.userId]);
    return res.json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch booking." });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const query = `select * from bookings 
    `;
    const [rows] = await db.execute(query);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { userId, showtimeId, seatIds } = req.body;

    if (!Array.isArray(seatIds) || seatIds.length === 0) {
      return res.status(400).json({ message: 'No seats selected' });
    }

    // Check if seats are still available
    const placeholders = seatIds.map(() => '?').join(',');
    const [seats] = await db.execute(
      `SELECT id, status FROM seats WHERE id IN (${placeholders}) AND showtime_id = ?`,
      [...seatIds, showtimeId]
    );
    const bookedSeat = seats.find(seat => seat.status === 'booked');
    if (bookedSeat) {
      return res.status(400).json({ message: 'Some selected seats are already booked' });
    }

    // Create booking record
    const [bookingResult] = await db.execute(
      'INSERT INTO bookings (user_id, showtime_id, payment_status) VALUES (?, ?, ?)',
      [userId, showtimeId, 'pending']
    );
    const bookingId = bookingResult.insertId;

    // Update seats status
    await db.execute(
      `UPDATE seats SET status = ? WHERE id IN (${placeholders})`,
      ['booked', ...seatIds]
    );

    // Get showtime price
    const [showtimeRows] = await db.execute(
      'SELECT price FROM showtimes WHERE id = ?',
      [showtimeId]
    );
    const price = showtimeRows[0]?.price || 0;

    // Create payment record
    await db.execute(
      'INSERT INTO payments (booking_id, amount, payment_method, status) VALUES (?, ?, ?, ?)',
      [bookingId, price * seatIds.length, 'card', 'successful']
    );

    res.status(201).json({
      success: true,
      bookingId,
      message: 'Booking created successfully'
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create booking'
    });
  }
};

export const getBookingDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const [booking] = await db.execute(`
      SELECT 
        b.*,
        s.show_date,
        s.show_time,
        m.title as movie_title,
        t.name as theater_name,
        GROUP_CONCAT(st.seat_number) as seats
      FROM bookings b
      JOIN showtimes s ON b.showtime_id = s.id
      JOIN movies m ON s.movie_id = m.id
      JOIN theaters t ON s.theater_id = t.id
      JOIN seats st ON st.showtime_id = s.id
      WHERE b.id = ?
      GROUP BY b.id
    `, [id]);
    if (!booking.length) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking[0]);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Failed to fetch booking details' });
  }
};
