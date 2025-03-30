import express from "express";
import { getMovies, getMovieById, addMovie, deleteMovie, updateMovie } from "../controllers/movieController.js";

import upload from "../middleware/uploadMiddleware.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/",upload.single("image"),verifyToken, addMovie);
router.delete("/:movieId", deleteMovie );
router.put("/:movieId", updateMovie);

export default router;
