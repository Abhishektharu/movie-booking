import { parentPort } from "worker_threads";
import nodemailer from "nodemailer";
import db from "../database/connection.js";
import dotenv from "dotenv";

dotenv.config();

const sendEmailsToSubscribers = async (movieName) => {
  try {
    // Fetch movie details
    const [movieDetails] = await db.query(
      "SELECT * FROM movies WHERE title = ? ORDER BY created_at DESC LIMIT 1",
      [movieName]
    );

    const movie = movieDetails[0];

    // Fetch all subscriber emails
    const [subscribers] = await db.query("SELECT email FROM subscription");

    if (subscribers.length === 0) {
      parentPort.postMessage({ 
        type: 'info',
        message: 'No subscribers found'
      });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER || "38d60c101ba0b7",
        pass: process.env.SMTP_PASS || "0929a43b6bf875",
      },
    });

    for (const subscriber of subscribers) {
      try {
        const startTime = new Date();
        await transporter.sendMail({
          from: '"Movie Booking" <noreply@moviebooking.com>',
          to: subscriber.email,
          subject: `New Movie Alert: ${movieName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1>New Movie Added: ${movieName}</h1>
              <div style="margin: 20px 0;">
                <img src="${movie.image_url}" alt="${movieName}" style="max-width: 100%; height: auto; border-radius: 8px;"/>
              </div>
              <div style="margin: 20px 0;">
                <p style="font-size: 16px; line-height: 1.5;">${movie.description}</p>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p><strong>Duration:</strong> ${movie.duration} minutes</p>
                <p><strong>Release Date:</strong> ${new Date(movie.release_date).toLocaleDateString()}</p>
              </div>
              <div style="margin-top: 30px;">
                <a href="${process.env.FRONTEND_URL}/movies/${movie.id}" 
                   style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                  Book Now
                </a>
              </div>
            </div>
          `
        });

        parentPort.postMessage({ 
          type: 'emailSent',
          email: subscriber.email,
          movieName,
          sentAt: startTime,
          deliveredAt: new Date()
        });

      } catch (error) {
        parentPort.postMessage({ 
          type: 'emailError',
          email: subscriber.email,
          movieName,
          error: error.message,
          attemptedAt: new Date()
        });
      }
    }
  } catch (error) {
    parentPort.postMessage({ 
      type: 'error',
      error: error.message,
      occurredAt: new Date()
    });
  }
};

// Listen for messages from the main thread
parentPort.on("message", async (data) => {
  const { movieName } = data;
  await sendEmailsToSubscribers(movieName);
});