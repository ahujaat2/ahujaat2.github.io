import React, { useState } from 'react';
import '../App.css';

const Search = (props) => {

	const [searchValue, setSearchValue] = useState("");

	const handleChange = (event) => {
		const {value} = event.target;
		setSearchValue(value);
	}

	const resetInputField = () => {
		setSearchValue("");
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		props.search(searchValue);
		//resetInputField();
	}

	const handleClick = () => {
		resetInputField();
		props.clearSearch();
	}

	return(
		<form className="search-form" onSubmit = {handleSubmit}>
			<input type="text" value={searchValue} placeholder = "Search a movie" onChange = {handleChange} disabled={props.disabled}/>
			<button disabled={props.disabled}>Search</button>
			<button disabled={props.disabled} onClick = {handleClick}>Clear</button>
		</form>
	);
};
export default Search;