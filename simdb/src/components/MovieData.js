import React from 'react';
import '../App.css'

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const MovieData = ({movie, closePopup}) => {
	const Poster = movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
	return(
		<section className="movie-data">
			<div className="movie-content">
				<h2>{ movie.Title }<span>{` (${movie.Year})`}</span></h2>
				<p>{`Rating: iMDb : ${movie.imdbRating}`}</p>
				<div>
					<img src={Poster} alt="Movie poster" width="300" height="400" />
					<p>{movie.Plot}</p>
				</div>
			</div>
			<button onClick={closePopup}>Close</button>
		</section>
	)
}

export default MovieData;