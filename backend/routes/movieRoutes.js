import express from "express";
import { getMovies, getMovieById, addMovie, deleteMovie, updateMovie, getMoviesByPage } from "../controllers/movieController.js";

import upload from "../middleware/uploadMiddleware.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Move pagination route before the :id route to avoid conflict
router.get("/page/:page/:pageSize", getMoviesByPage);
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", upload.single("image"), addMovie);
router.delete("/:movieId", deleteMovie);
router.put("/:movieId", updateMovie);

export default router;
