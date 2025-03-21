import express from "express";
import { addTheater, getTheater } from "../controllers/theaterController.js";


const router = express.Router();

router.post("/addTheater", addTheater); // todo Protect route
router.get("/", getTheater); // todo Protect route

export default router;