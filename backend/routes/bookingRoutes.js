import express from "express";
import { bookTicket, getUserBookings, getAllBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.get("/getAllBookings", getAllBookings); // Assuming this is a placeholder for admin to get all bookings
router.post("/", bookTicket);
router.get("/:userId", getUserBookings);
export default router;