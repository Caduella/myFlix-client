import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./movie-card.scss";
import { Link } from "react-router-dom";

// The MovieCard function component
export const MovieCard = ({ movie, user, token, setUser}) => { 
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    console.log(user);
    if (user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    }
  }, [user]);

  const addFavoriteMovie = () => {
    console.log("called addfavmovies");
    fetch(
      `https://myquickmovieapi.onrender.com/users/${user.Username}/movies/${movie._id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("failed to add fav movie");
        }
      })     
      .then((responseUser) => {
        if (responseUser) {
          localStorage.setItem("user", JSON.stringify(responseUser));
          setUser(responseUser);
          setIsFavorite(true);
          console.log("sucessfully added to favs");
          console.log(responseUser.FavoriteMovies);
        }
      })
      .catch((err) => {
        console.log(`error on favmovies: ${err}`);
      });
  };

  const removeFavoriteMovie = () => {
    console.log("called removefavmovies");

    fetch(
      `https://myquickmovieapi.onrender.com/users/${user.Username}/movies/${movie._id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          console.log("response ok");
          console.log(response);
          return response.json();
        } else {
          console.log("failed to remove fav movie");
          return undefined;
        }
      })
      .then((user) => {       
        console.log("user", user);
        console.log("isFavorite", isFavorite);

        if (user) {
          console.log("user = true");

          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          //sets isFav variable to false, so the correct button can render
          setIsFavorite(false);
          console.log("isFavorite set to false:", isFavorite);        
        }
      })
      .catch((err) => {
        console.log(`error on favmovies: ${err}`);
      });
  };

 
  return (
    <Col   className="">
      <Container>
        <Card className="h-100">
        <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} style={{height: '250px', objectFit: 'cover'}}/>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Director.Name}</Card.Text>            
        
          <Row> 
            <Col>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link"> More Information</Button> 
            </Link>
            </Col>

               {/* heart(favorite) button */}
               <Col className="col-3">
                 {isFavorite ? (
                  <Button
                    
                    variant="link"
                    onClick={removeFavoriteMovie}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="red"
                      className="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                  </Button>
                ) : (
                  <Button
                   
                    variant="link"
                    onClick={addFavoriteMovie}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="red"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  </Button>
                )}
              </Col>            
          </Row>
          </Card.Body>
      </Card>
    </Container>
  </Col>
  );
};



//Define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({    
    Title: PropTypes.string.isRequired, 
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string,   
    }).isRequired, 
};
