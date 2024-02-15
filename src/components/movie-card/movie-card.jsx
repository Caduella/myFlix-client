import PropTypes from "prop-types";
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
    <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} style={{height: '250px', objectFit: 'cover'}}/>
    <Card.Body>
      <Card.Title>{movie.Title}</Card.Title>
      <Card.Text>{movie.Director.Name}</Card.Text>
      <Button  onClick={() => onMovieClick(movie)} variant="primary">
        More Information
      </Button>
    </Card.Body>
  </Card>
  );
};

// Define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id:PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired 
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string,
    Featured: PropTypes.bool
    }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
