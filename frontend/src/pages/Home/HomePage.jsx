
import MovieCard from "../../components/Card/MovieCard";
import useMovies from "../../hooks/useMovies";

const HomePage = () => {
  // The Home Page fetches and displays a list of movies.
  const {movies, loading} = useMovies();
  // console.log(movies);
  
    if(loading) return <p>Loading...</p>   
  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Now Showing</h1>
      <MovieCard movies={movies} />
    </div>
    </>
  )
}

export default HomePage