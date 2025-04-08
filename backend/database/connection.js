import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connectWithRetry = async () => {
  const maxRetries = 5;
  let currentTry = 1;

  while (currentTry <= maxRetries) {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });
      
      console.log("Connected to MySQL database");
      return connection;
    } catch (err) {
      console.log(`Connection attempt ${currentTry} failed:`, err.message);
      
      if (currentTry === maxRetries) {
        throw new Error("Failed to connect to database after multiple attempts");
      }
      
      await new Promise(resolve => setTimeout(resolve, 5000));
      currentTry++;
    }
  }
};

const db = await connectWithRetry();

export default db;