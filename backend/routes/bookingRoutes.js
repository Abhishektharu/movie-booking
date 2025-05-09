import express from "express";
import { bookTicket, getUserBookings, getAllBookings ,getBookingDetails,createBooking} from "../controllers/bookingController.js";

const router = express.Router();

// router.get("/getAllBookings", getAllBookings); // Assuming this is a placeholder for admin to get all bookings
// router.post("/", bookTicket);
// router.get("/:userId", getUserBookings);

router.post('/', createBooking);
router.get('/:id', getBookingDetails);
export default router;