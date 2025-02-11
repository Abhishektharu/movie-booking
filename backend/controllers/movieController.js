//get all the movies
//get the movie by id ;
// addd the movie
import db from "../database/connection.js";

export const getMovies = async (req, res) => {
  try {
    const getMovies = "SELECT * FROM `movies`";

    const [rows, fields] = await db.query(getMovies);

    // console.log(rows);
    // console.log(fields);
    return res.status(200).json(rows);
  } catch (err) {
    // console.log(err);
    return res.json(err.message);
  }
};

export const getMovieById = async (req, res) => {
  try {
    const sql = "SELECT * FROM `movies` WHERE `id` = ?";

    const [rows, fields] = await db.execute(sql, [req.params.id]);

    if(rows.length == 0){
        return res.status(404).json({message: "Movie not found."});
    }
    return res.status(200).json(rows[0]);
    // console.log(rows);
    // console.log(fields);
  } catch (err) {
    console.log(err);
    return res.json(err.message);
  }
};

//to do add movie 
export const addMovie = async (req, res) => {
    try {
        const { title, description, genre, duration, release_date, image_url } = req.body;
        await db.execute(
            "INSERT INTO movies (title, description, genre, duration, release_date, image_url) VALUES (?, ?, ?, ?, ?, ?)",
            [title, description, genre, duration, release_date, image_url]
        );
        res.status(201).json({ message: "Movie added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

