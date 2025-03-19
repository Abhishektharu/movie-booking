import express from "express";
import { addTheater } from "../controllers/theaterController.js";


const router = express.Router();

router.post("/addTheater", addTheater); // Protect route

export default router;
