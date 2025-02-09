import express from "express";
import { getMovies, getMovieById, addMovie } from "../controllers/movieController.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", addMovie);

export default router;
