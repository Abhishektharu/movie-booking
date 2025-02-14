import axios from "axios";
import { useEffect, useState } from "react";

const useMoviesById = (id) => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {

    const fetchMovies = async () => {
      try {
        if(!id){
            console.log("no id provided.");
        }
        const res = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [id]);

  return {movie};

};

export default useMoviesById;