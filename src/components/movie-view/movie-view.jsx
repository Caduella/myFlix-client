export const MovieView = ({ movie, onBackClick }) => {
	return (
		<div>
			<div>
				<img src={movie.ImagePath} alt = "movie cover"/>
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
				<span>{movie.director.Name}</span>
			</div>
			<div>
				<span>Featured: </span>
				<span>{movie.featured}</span>
			</div>
			<button onClick={onBackClick}>Back</button>
		</div>
	);
};