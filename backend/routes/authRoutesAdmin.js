import express from "express";
import {loginAdmin, registerAdmin} from "../controllers/authControllerAdmin.js"
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

export default router;
