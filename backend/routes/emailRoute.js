import express from "express";

import { insertEmail } from "../controllers/emailController.js";

const router = express.Router();
router.post("/", insertEmail);

export default router;