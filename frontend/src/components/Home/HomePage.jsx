
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    // The Home Page fetches and displays a list of movies.

    //get the list of all the movies from the backend
    const [movies, setMovies ] = useState([]);
    useEffect(()=>{
            axios.get('http://localhost:5000/api/movies')
            .then(response => setMovies(response.data))
            .catch(error => console.error('Error fetching movies:', error));

    },[]);

    console.log(movies);
    
  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Now Showing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map(movie => (
          <div key={movie.id} className="bg-white rounded shadow p-4">
            <img src={movie.image_url} alt={movie.title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{movie.title}</h2>
            <p>{movie.genre}</p>
            <Link to={`/movies/${movie.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default HomePage