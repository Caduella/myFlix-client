import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      image:
        "https://i.ebayimg.com/thumbs/images/g/~ygAAOSwbV5ltN5k/s-l300.webp",
      description: "A skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, is given a chance at redemption.",
      genre: "Science Fiction",
      director: "Christopher Nolan",
      featured: "No"
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      image:
        "https://i.ebayimg.com/images/g/JEwAAOSwOrxga~Bd/s-l960.webp",
      description:"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      genre: "Drama",
      director: "Frank Darabont",
      featured: "Yes"
    },
    {
      id: 3,
      title: "The Fountain",
      image:
        "https://i.ebayimg.com/images/g/Z1cAAOSwysBghuS8/s-l960.webp",
      description:"As a modern-day scientist, Tommy is strugging with mortality, desperately searching for the medical breakthrough that will save the life of his cancer-stricken wife, Izzi.",
      genre: "Drama",
      director: "Darren Aronofsky",
      featured: "Yes"
    },
    {
      id: 4,
      title: "Forrest Gump",
      image:
        "https://i.ebayimg.com/images/g/iU4AAOSwxMlezexq/s-l960.webp",
      description:"The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
      genre: "Drama",
      director: "Robert Zemeckis",
      featured: "No"
    },
    {
      id: 5,
      title: "Spirited Away",
      image:
        "https://i.ebayimg.com/images/g/8yIAAOSwlKhghuOu/s-l960.webp",
      description:"This animated fantasy film tells the story of Chihiro, a sullen ten-year-old girl who, while moving to a new neighborhood, enters the world of Kami (spirits) of Japanese Shinto folklore. She must find the courage and resolve to free herself and her parents from the spell of the witch Yubaba.",
      genre: "Animation",
      director: "Hayao Miyazaki",
      featured: "Yes"
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);
	
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
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
      ))}
    </div>
    );
};
