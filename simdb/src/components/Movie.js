import React from 'react';
import '../App.css';

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({movie, openPopup}) => {
	const Poster = movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
	return(
		<div className="movie" onClick = {() => openPopup(movie.imdbID)}>
			<p className="movie-text"><strong>{movie.Title}</strong></p>
			<div>
				<img 
					src={Poster} 
					alt="Movie poster"
					width="300"
					height="400"
				/>
			</div>
			<p className="movie-text"><strong>{movie.Year}</strong></p>
		</div>
	)
}

export default Movie;