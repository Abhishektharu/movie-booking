import express from "express";

import { insertEmail, fetchEmail,sendEmailsToSubscribers } from "../controllers/emailController.js";

const router = express.Router();
router.post("/", insertEmail);
router.get("/all", fetchEmail);
router.post("/send-movie-email", sendEmailsToSubscribers);

export default router;