import PropTypes from "prop-types";
import "./movie-view.scss";
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

export const MovieView = ({ movie, onBackClick }) => {
	return (
		<>
		<Row className="my-5 justify-content-md-center">
				<Col md={7} className="col-12">
						<img src={movie.ImagePath} alt={movie.Title} className="mx-auto w-100" />
				</Col>
				<Col md={5} className="col-12">
						<div className="my-1">
								<span className="h1">{movie.Title}</span>
						</div>
						<div className="my-1">
								<span className="h6">Description: </span>
								<span>{movie.Description}</span>
						</div>
						<div className="my-1">
								<span className="h6">Director: </span>
								<span>{movie.Director.Name}</span>
						</div>
						<div className="my-1">
								<span className="h6">Genre: </span>
								<span>{movie.Genre.Name}</span>
						</div>				
						<Button 
							onClick={onBackClick}
							className="back-button"
							style={{ cursor: "pointer" }}
						>
							Back
						</Button>						
				</Col>
		</Row>		
</>
	);
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired 
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
