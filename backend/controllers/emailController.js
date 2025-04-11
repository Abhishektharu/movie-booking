import db from "../database/connection.js";

export const insertEmail = async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const getEmail = "SELECT * FROM `subscription` where `email` = ?";

    const [emailRow, fields] = await db.query(getEmail, [req.body.email]);
  
    if(emailRow.length > 0) {
        return res.status(400).json({ error: "Email already exists" });}
  
  
      await db.execute(
        "INSERT INTO subscription (email) VALUES (?)",
        [email]
      );
  
      res.status(201).json({ message: "Email added successfully", email });
    } catch (error) {
      console.error("Error adding email:", error);
      res.status(500).json({ error: error.message });
    }
  };