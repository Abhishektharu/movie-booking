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

// //to do add movie 
// export const addMovie = async (req, res) => {
//     try {
//        const { file } = req.body;
//        //upload   = path =>
//         const { title, description, genre, duration, release_date, image_url } = req.body;
//         console.log(image_url);
//         console.log("this");
        
//         await db.execute(
//             "INSERT INTO movies (title, description, genre, duration, release_date, image_url) VALUES (?, ?, ?, ?, ?, ?)",
//             [title, description, genre, duration, release_date, image_url]
//         );
//         res.status(201).json({ message: "Movie added successfully" });
//     } catch (error) {
//       console.log(error);
      
//         res.status(500).json({ error: error.message });
//     }
// };

export const addMovie = async (req, res) => {
  try {
    const { title, description, genre, duration, release_date } = req.body;
    
    if (!title || !description || !genre || !duration || !release_date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if an image was uploaded
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    console.log("Uploaded Image URL:", image_url);

    await db.execute(
      "INSERT INTO movies (title, description, genre, duration, release_date, image_url) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, genre, duration, release_date, image_url]
    );

    res.status(201).json({ message: "Movie added successfully", image_url });
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
      const { movieId } = req.params;

      // Check if the movie exists
      const [existingMovie] = await db.execute("SELECT * FROM movies WHERE id = ?", [movieId]);
      if (existingMovie.length === 0) {
          return res.status(404).json({ message: "Movie not found" });
      } 

      // Delete related showtimes (if needed)
      await db.execute("DELETE FROM showtimes WHERE movie_id = ?", [movieId]);

      // Delete the movie
      await db.execute("DELETE FROM movies WHERE id = ?", [movieId]);

      return res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
      console.error("Error deleting movie:", error);
      return res.status(500).json({ error: error.message });
  }};

  export const updateMovie = async (req, res) => {
    try {
      const { movieId } = req.params;
      const { title, description, genre, duration, release_date } = req.body;
  
      // Check if the movie exists
      const [existingMovie] = await db.execute("SELECT * FROM movies WHERE id = ?", [movieId]);
      if (existingMovie.length === 0) {
        return res.status(404).json({ message: "Movie not found" });
      }
  
      // Update the movie
      await db.execute(
        "UPDATE movies SET title = ?, description = ?, genre = ?, duration = ?, release_date = ? WHERE id = ?",
        [title, description, genre, duration, release_date, movieId]
      );
  
      return res.status(200).json({ message: "Movie updated successfully" });
    } catch (error) {
      console.error("Error updating movie:", error);
      return res.status(500).json({ error: error.message });
    }};