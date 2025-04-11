import { useState, useEffect } from "react";
import axios from "axios";
import { getBackend } from "../utils/api";

const usePagination = (page = 1, pageSize = 10)=>{
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination ] = useState({

        currentPage: 1,
        totalPages: 0,
        totalMovies: 0,
    }
    );

    useEffect(()=>{
        const fetchMovies = async () => {

            try {
                setLoading(false);
                const response = await axios.get(`${API_BASE_URL}/api/movies/page/${page}/${pageSize}`);
                // const response = await axios.get(`${API_BASE_URL}/api/movies/page/${page}/${pageSize}/${searchKeyword}`);
                // const response = await axios.get(`${API_BASE_URL}/api/movies/page/?page=${page}&pageSize${pageSize}`);
                setMovies(response.data.movies);
                setPagination({
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    totalMovies: response.data.totalMovies,
                })
            } catch (error) {
                console.log(error);         
                
            }
        }
        fetchMovies();
    }, [page, pageSize])

    return {movies, loading, pagination};
    
};

export default usePagination;