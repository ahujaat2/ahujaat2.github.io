import React, {useState, useEffect} from 'react';
import '../App.css';
import Header from './Header';
import Search from './Search';
import Movie from './Movie';
import MovieData from './MovieData';

const Movie_URL = "https://www.omdbapi.com/?s=man&apikey=fa85666e";

const App = () => {
	const [ isLoading, setLoading ] = useState(true);
	const [ movies, setMovies ] = useState([]);
	const [ errorMessage, setErrorMessage ] = useState(null);
	const [ selected, setSelected ] = useState({});

	useEffect(() => {
		fetch(Movie_URL)
		.then(response => response.json())
		.then(data => {
			setMovies(data.Search);
			setLoading(false);
		})
		.catch(error => {
			setErrorMessage(`OOPS! ${error.message}...`);
			setLoading(false);
		});
	}, []);

	const search = (searchValue) => {
		if(searchValue !== ""){
			setLoading(true);
			setErrorMessage(null);
			fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=fa85666e`)
			.then(response => response.json())
			.then(data => {
				if (data.Response === "True"){
					setMovies(data.Search)
					setLoading(false)
				} else{
					setErrorMessage(data.Error);
					setLoading(false);
				}
			})
		}
	}

	const openPopup = (id) => {
		setLoading(true)
		fetch(`https://www.omdbapi.com/?i=${id}&apikey=fa85666e`)
		.then(response => response.json())
		.then(data => {
			setSelected(data);
			setLoading(false);
		})
	}

	const closePopup = () => {
		setSelected({});
	}

	const clearSearch = () => {
		setLoading(true)
		fetch(Movie_URL)
		.then(response => response.json())
		.then(data => {
			setMovies(data.Search);
			setLoading(false);
		})
		.catch(error => {
			setErrorMessage(`OOPS! ${error.message}...`);
			setLoading(false);
		});
	}

	  return (
	    <div className="App">
	    	<Header className="header-comp" text="SiMDB"/>
	    	<Search className = "search" search = {search} disabled={isLoading} clearSearch = {clearSearch}/>
	    	<p>Sharing some of our all time favourites...</p>
	    	<div className="movie-container">
	    		{ isLoading && errorMessage === null ? 
	    			(<div className="spinner-3"></div>)
	    			: errorMessage ? 
	    			(<div className="error">{errorMessage}</div>)
	    			: typeof selected.Title == "undefined" ? 
	    				( movies.map((movie, index) => <div key={movie.imdbID}> <Movie key={`${index}-${movie.Title}`} movie = {movie} openPopup = {openPopup}/></div>))
						: (<MovieData key={`${selected.imdbID}-${selected.Title}`} movie = {selected} closePopup={closePopup}/>)	    				
	    		}
	    	</div>
	    </div>
	  );
}

export default App;
