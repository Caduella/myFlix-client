import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
	return (
		<div>
			<div>
				<img src={movie.ImagePath} alt = {movie.Title}/>
			</div>
			<div>
				<span>Title: </span>
				<span>{movie.Title}</span>
			</div>
			<div>
				<span>Description: </span>
				<span>{movie.Description}</span>
			</div>
			<div>
				<span>Genre: </span>
				<span>{movie.Genre.Name}</span>
			</div>
			<div>
				<span>Director: </span>
				<span>{movie.Director.Name}</span>
			</div>
			<button 
			onClick={onBackClick}
			className="back-button"
			style={{ cursor: "pointer" }}
			>
				Back
			</button>
		</div>
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
