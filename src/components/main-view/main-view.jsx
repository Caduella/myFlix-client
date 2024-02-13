import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
   
  useEffect(() => {
    if (!token) return;

    fetch("https://myquickmovieapi.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
              Birth: movie.Director.Birth,
              Death: movie.Director.Death
            },
            ImagePath: movie.ImagePath,
            Featured: movie.Featured
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

 // Logout handler
 const handleLogout = () => {
  setUser(null);
  setToken(null);
  localStorage.clear();
};

if (!user) {
  return (
    <>
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);
        }}
      />
      or
      <SignupView />
    </>
  );
}

return (
  <Container fluid>
    <Row className="justify-content-center my-5">    
    {selectedMovie ? (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    ) : movies.length === 0 ? (
      <div>The list is empty!</div>
    ) : (
      movies.map((movie) => (
        <Col xs={12} sm={6} md={3} key={movie._id}>
        <MovieCard
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
        </Col>
      ))
    )}
    
    <Button onClick={handleLogout} variant="outline-primary" size="sm">Logout</Button>
    </Row>
  </Container>
);
};
