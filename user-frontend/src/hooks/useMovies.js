import axios from "axios";
import { useEffect, useState } from "react";

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/movies`);
        setMovies(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return {movies, loading};

};

export default useMovies;