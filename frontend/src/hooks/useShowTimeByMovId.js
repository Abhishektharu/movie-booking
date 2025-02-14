import { useEffect, useState } from "react";
import axios from "axios";

const useShowTimeByMovId = (id) => {
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    const fetchShowTimes = async () => {
      try {
        if (!id) console.log("movie id not provided.");

        const res = await axios.get(
          `http://localhost:5000/api/showtimes?movie_id=${id}`
        );
        setShowtimes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShowTimes();
  }, [id]);

  return {showtimes}
};

export default useShowTimeByMovId;
