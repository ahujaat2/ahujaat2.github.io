import React from 'react';
import '../App.css';

const Header = (props) => {
	return(
		<header className='header'>
			<h2 className='header-text'>{props.text}</h2>
		</header>
	)
}

export default Header;