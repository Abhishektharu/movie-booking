import { parentPort } from "worker_threads";
import nodemailer from "nodemailer";
import db from "../database/connection.js";
import dotenv from "dotenv";

dotenv.config();

const sendEmailsToSubscribers = async (movieName) => {
  try {
    // Fetch all subscriber emails
    const query = "SELECT email FROM subscription";
    const [subscribers] = await db.query(query);

    if (subscribers.length === 0) {
      console.log("No subscribers found.");
      parentPort.postMessage({ message: "No subscribers found" });
      return;
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER || "38d60c101ba0b7",
        pass: process.env.SMTP_PASS || "0929a43b6bf875",
      },
    });

    // Send emails to all subscribers
    for (const subscriber of subscribers) {
      try {
        await transporter.sendMail({
          from: '"Movie Booking" <noreply@moviebooking.com>',
          to: subscriber.email,
          subject: `New Movie Alert: ${movieName}`,
          html: `<h1>New Movie Released: ${movieName}</h1><p>Check out the latest movie now available in theaters!</p>`,
        });
        console.log(`Email sent to ${subscriber.email}`);
      } catch (error) {
        console.error(`Failed to send email to ${subscriber.email}:`, error);
      }
    }

    parentPort.postMessage({
      message: "Emails sent successfully to all subscribers",
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    parentPort.postMessage({ error: error.message });
  }
};

// Listen for messages from the main thread
parentPort.on("message", async (data) => {
  const { movieName } = data;
  await sendEmailsToSubscribers(movieName);
});