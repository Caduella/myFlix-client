import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
 
  useEffect(() => {
    fetch("https://myquickmovieapi.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              GenreName: movie.Genre.Name,
              GenreDescription: movie.Genre.Description
            },
            Director: {
              DirectorName: movie.Director.Name,
              DirectorBio: movie.Director.Bio,
              DirectorBirth: movie.Director.Birth,
              DirectorDeath: movie.Director.Death
            },
            ImagPath: movie.ImagePath,
            Featured: movie.Featured
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

 

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
    return (
    <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
      ))}
    </div>
    );
};
