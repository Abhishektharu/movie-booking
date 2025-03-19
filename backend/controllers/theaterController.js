
import db from "../database/connection.js";

export const addTheater = async (req, res) => {
    try {
        const { name, location, total_screens } = req.body;
        console.log(req.body);
        

        // Validate input
        if (!name || !location || !total_screens) {
            return res.status(400).json({ message: "All fields are required" });
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
