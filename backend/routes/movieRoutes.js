import express from "express";
import { getMovies, getMovieById, addMovie } from "../controllers/movieController.js";
import {verifyToken} from "./middleware/authMiddleware.js"

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", verifyToken, addMovie);

export default router;
