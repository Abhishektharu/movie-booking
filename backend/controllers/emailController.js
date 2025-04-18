import db from "../database/connection.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Worker } from "worker_threads";
import path from "path";
import { emailLogger } from '../utils/logger.js';

dotenv.config();

// Add email to the subscription list
export const insertEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const getEmail = "SELECT * FROM `subscription` WHERE `email` = ?";
    const [emailRow] = await db.query(getEmail, [email]);

    if (emailRow.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await db.execute("INSERT INTO subscription (email) VALUES (?)", [email]);

    res.status(201).json({ message: "Email added successfully", email });
  } catch (error) {
    console.error("Error adding email:", error);
    res.status(500).json({ error: error.message });
  }
};

// Fetch all subscriber emails
export const fetchEmail = async (req, res) => {
  try {
    const query = "SELECT * FROM `subscription`";
    const [rows] = await db.query(query);

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Start the email worker
export const startEmailWorker = (movieName) => {
  const workerPath = path.resolve("workers/emailWorker.js");

  const worker = new Worker(workerPath);

  // Send the movie name to the worker
  worker.postMessage({ movieName });

  worker.on("message", (message) => {
    if (message.type === 'emailSent') {
      emailLogger.info({
        action: 'EMAIL_SENT',
        recipient: message.email,
        movieName: message.movieName,
      });
    } else if (message.type === 'emailError') {
      emailLogger.error({
        action: 'EMAIL_FAILED',
        recipient: message.email,
        movieName: message.movieName,
        error: message.error
      });
    }
    console.log("Worker message:", message);
  });

  worker.on("error", (error) => {
    emailLogger.error({
      action: 'WORKER_ERROR',
      movieName,
      error: error.message
    });
    console.error("Worker error:", error);
  });

  worker.on("exit", (code) => {
    if (code !== 0) {
      emailLogger.error({
        action: 'WORKER_EXIT_ERROR',
        movieName,
        exitCode: code
      });
    } else {
      emailLogger.info({
        action: 'WORKER_COMPLETED',
        movieName
      });
    }
  });

  emailLogger.info({
    action: 'WORKER_STARTED',
    movieName
  });

  console.log("Email worker started");
};

// Send emails to all subscribers
export const sendEmailsToSubscribers = async (req, res) => {
  try {
    const { movieName } = req.body;

    if (!movieName) {
      return res.status(400).json({ error: "Movie name is required" });
    }

    // Start the worker to send emails to all subscribers
    startEmailWorker(movieName);

    return res
      .status(200)
      .json({ message: "Email is being sent to the subscribers at background." });
  } catch (error) {
    console.error("Error starting email worker:", error);
    return res.status(500).json({ error: "Failed to start email worker" });
  }
};
