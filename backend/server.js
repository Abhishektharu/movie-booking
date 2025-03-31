import express, { request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import seatRoutes from "./routes/seatsRoutes.js";
import showtimeRoutes from "./routes/showtimeRoutes.js";
import authRoutesAdmin from "./routes/authRoutesAdmin.js";

import theaterRoutes from "./routes/theaterRoutes.js";
import cookieParser from "cookie-parser";
import {verifyToken} from "./middleware/authMiddleware.js";

import path from "path";
import { showUsers } from "./controllers/showUsersController.js";

dotenv.config();

const app = express();

//allowed requests
const allowedSites = {
    origin: ["http://localhost:5173","http://localhost:5174"],
    request: "GET, POST",
    credentials : true
}

app.use(cors(allowedSites));
app.use(express.json());

// Serve uploaded images as static files
app.use("/uploads", express.static(path.join("uploads")));

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/auth/admin", authRoutesAdmin);
app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);


app.use("/api/showtimes", showtimeRoutes);
app.use("/api/seats", seatRoutes);

//users 
app.use("/api/showUsers", showUsers)

app.use("/api/theaters",theaterRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
