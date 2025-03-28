import { useEffect, useState } from "react";
import axios from "axios";

const useShowTimeByMovId = (id) => {
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchShowTimes = async () => {
      try {
        if (!id) console.log("movie id not provided.");
        
        const res = await axios.get(
          `${API_BASE_URL}/api/showtimes?movie_id=${id}`
        );
        setShowtimes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShowTimes();
  }, [id]);
  
  // console.log(showtimes);
  return {showtimes}
  
};

export default useShowTimeByMovId;
