
import db from "../database/connection.js";

export const addTheater = async (req, res) => {
    try {
        const { name, location, total_screens } = req.body;
        console.log(req.body);
        

        // Validate input
        if (!name || !location || !total_screens) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //todo check if the same theater exist in db
        const theaterName = await db.execute(
            "select * from theaters where name = ?" , [name]
        )
        if (theaterName.length > 0) {
            return res.status(400).json({message: "Theater already exists."})
        }

        // Insert the theater into the database
        await db.execute(
            "INSERT INTO theaters (name, location, total_screens) VALUES (?, ?, ?)",
            [name, location, total_screens]
        );

        return res.status(201).json({ message: "Theater added successfully" });
    } catch (error) {
        console.error("Error adding theater:", error);
        return res.status(500).json({ error: error.message });
    }
};

export const getTheater = async (req, res) => {
    try {
      const [theaters] = await db.execute("SELECT * FROM theaters");
  
      if (theaters.length === 0) {
        return res.status(404).json({ message: "No theaters found" });
      }
  
      res.status(200).json(theaters);
    } catch (error) {
      console.error("Error fetching theaters:", error);
      res.status(500).json({ error: "Server error, please try again" });
    }
  };