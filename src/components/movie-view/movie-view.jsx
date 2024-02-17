import PropTypes from "prop-types";
import "./movie-view.scss";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { useParams } from "react-router";
import { Link } from "react-router-dom";


export const MovieView = ({movies }) => {
	const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

	if (!movie) {
		return <div> No such movie found.</div>
	}

	return (
	<>
	<Row>""</Row>
	<Row className="my-5 justify-content-md-center">
		<Col md={4} className="col-12">
			<Card>
				<Card.Img src={movie.ImagePath} alt={movie.Title} className="mx-auto w-100" />
			</Card>					
		</Col>
		<Col md={8} className="col-12">
			<Card>
				<Card.Body className="d-flex flex-column">
				<Card.Title className=" h1">{movie.Title}</Card.Title>			
				<Card.Text className="h6">{movie.Description} </Card.Text>

				<div className="my-1">
					<span className="h6">Director: </span>
					<span>{movie.Director.Name}</span>
				</div>
				<div className="my-1">
					<span className="h6">Director Bio: </span>
					<span>{movie.Director.Bio}</span>
				</div>
				<div className="my-1">
					<span className="h6">Genre: </span>
					<span>{movie.Genre.Name}</span>
				</div>
				</Card.Body>	
				<Link to={`/`}>
					<Button className="back-button" style={{ cursor: "pointer" }}>Back</Button>
				</Link>
			</Card>			
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
  }).isRequired
};
