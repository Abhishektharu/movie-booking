import nodemailer from "nodemailer";
// Create transporter
// Looking to send emails in production? Check out our Email API/SMTP product!
import db from "../database/connection.js";

const userEmail = async () => {
    try {
      const query  = "select * from `subscription`";
      const [rows, fields] = await db.query(query);
  
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
      
    }
  }

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "38d60c101ba0b7",
    pass: "0929a43b6bf875",
  },
});

// Send email
//for loop
userEmail.forEach((email) => {
  transporter.sendMail(
    {
      from: '"Movie Booking" <noreply@moviebooking.com>',
      to: email.email,
      subject: "Test Email from Node.js",
      text: "This is a plain text email.",
      html: "<h1>This is an HTML email</h1><p>Works like a charm! ✅</p>",
    },
    (error, info) => {
      if (error) {
        return console.error("Error sending email:", error);
      }
      console.log("Email sent:", info.messageId);
    }
  );
});
