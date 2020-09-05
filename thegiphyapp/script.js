const searchButton = document.getElementById("search-btn"); // Search Button
const searchInput = document.getElementById("search-input"); // Search Input box
const superContainer = document.getElementById("super-container"); // Master container
const clearButton = document.getElementById("clear-btn"); // Clear Button
const upButtonTrending = document.getElementById("scroll-top-trending"); // Up button on Trending section
const upButtonSearch = document.getElementById("scroll-top-search"); // Up button on Search GIFs section
const trendingLoadButton = document.getElementById("trending-load"); // Load More button on Trending section
const searchLoadButton = document.getElementById("search-load"); // Load More button on Search GIFs section
let input = ""; // Value of search input
let searchGifs = null; //
let trendingGifs = null;
let tdata = 0; //Counter for Trending GIFs
let sdata = 0; //Counter for Search GIFs

window.addEventListener("scroll", onScroll); //Up button shows up when screen is scrolled

// Gets triggered when window is scrolled
function onScroll(){
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
		upButtonTrending.style.display = "block";
		upButtonSearch.style.display = "block";
	}
	else{
		upButtonTrending.style.display = "none";
		upButtonSearch.style.display = "none";
	}
}

upButtonTrending.addEventListener("click", scrollUp); // Scrolls up to top; Exists on Trending section
upButtonSearch.addEventListener("click", scrollUp); // Scrolls up to top; Exists on Search section

// Gets triggered when the Up button is clicked
function scrollUp(){
	document.documentElement.scrollTop = 0;
}

searchInput.addEventListener("input", getInputValue); //Records the search input

//Gets triggered when something is inputed on the Search GIFs box
function getInputValue(event){
	input = event.target.value;
	let parent = document.getElementById("result-container");
	if (parent !== null){
		parent.parentNode.removeChild(parent);
	}
}

searchButton.addEventListener("click", getGifs); // Loads Search GIFs

//Gets triggered when Search Button is clicked
async function getGifs() {
	sdata = 0;
	// searchGifs = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=sLlIJ9VqlikS8ci0z7RpYKHzKFXuDCc2&q=${input}&limit=100`)
	// .then(res => res.json())
	// .then(res => res.data)
	// .then(res => loadSearchGifs(res));
	fetch(`https://api.giphy.com/v1/gifs/search?api_key=sLlIJ9VqlikS8ci0z7RpYKHzKFXuDCc2&q=${input}&limit=100`)
	.then(res => res.json())
	.then(res => searchGifs = res.data)
	.then(searchGifs => loadSearchGifs(searchGifs));
}

//Loads first 10 gifs that match the search criteria
function loadSearchGifs(res) {
	let data = res.slice(sdata ,sdata+10);
	sdata += 10;
	let childContainer = document.getElementById("trending-container");
	let existingParent = document.getElementById("result-container");
	let loadMoreContainer = document.getElementById("more-search-container");
	if (existingParent !== null){
		superContainer.appendChild(loadMoreContainer);
		existingParent.parentNode.removeChild(existingParent);
	}
	let value;
	if (data.length === 0) {
		value = "Oops! No matching GIFs found!"
		return;
	}
	else{
		value = `Found these GIFs matching your search!`;
		childContainer.style.position = "relative";
	}
	let parent = document.createElement("div");
	parent.setAttribute("id", "result-container");
	superContainer.insertBefore(parent, childContainer);
	let p = document.createElement("p");
	let text = document.createTextNode(value);
	p.appendChild(text);
	p.classList.add("headers");
	parent.appendChild(p);
	loadMoreContainer.classList.remove("hide");
	searchLoadButton.classList.remove("hide");
	parent.appendChild(loadMoreContainer);
	data.forEach( field => {
		let image = document.createElement("img");
		image.src = field.images.original.url;
		parent.insertBefore(image, loadMoreContainer);
		}
	);
}

document.addEventListener("load", getTrendingGifs()); //Display Trending GIFs when page loads

//Gets called when page loads
function getTrendingGifs() {
	fetch(`https://api.giphy.com/v1/gifs/trending?api_key=sLlIJ9VqlikS8ci0z7RpYKHzKFXuDCc2&limit=200`)
	.then(res => res.json())
	.then(res => trendingGifs = res.data)
	.then(() => loadTrendingGifs());
}

//Loads first 20 trending GIFs
function loadTrendingGifs(){
	let data;
	if (tdata+20 > trendingGifs.length){
		data = trendingGifs.slice(tdata,trendingGifs.length);
	}
	else {
		data = trendingGifs.slice(tdata,tdata + 20);
	}
	tdata += 20;
	let parent = document.getElementById("trending-container");
	const trendingLoad = document.getElementById("more-trending-container");
	trendingLoad.classList.remove("hide");
	data.forEach( field => {
		let image = document.createElement("img");
		image.src = field.images.original.url;
		parent.insertBefore(image, trendingLoad);
		}
	);
	if (tdata >= res.length) {
		trendingLoadButton.classList.add("hide");
	}
}

trendingLoadButton.addEventListener("click", loadTrendingGifs); //Load More Trending GIFs
searchLoadButton.addEventListener("click", loadMoreSearchGifs); //Load More Search GIFs

//Gets called on clicking Load More button in the Search section
// async function getMoreSearchGifs(){
// 	// searchGifs = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=sLlIJ9VqlikS8ci0z7RpYKHzKFXuDCc2&q=${input}&limit=100`)
// 	// .then(res => res.json())
// 	// .then(res => res.data)
// 	// .then(res => 
// 	loadMoreSearchGifs();
// }

////Gets called on clicking Load More button in the Search section and loads next 20 results from Search GIFs
function loadMoreSearchGifs() {
	let data;
	if (sdata+10 > searchGifs.length){
		data = searchGifs.slice(sdata, searchGifs.length);
	}
	else{
		data = searchGifs.slice(sdata ,sdata+10);
	}
	
	sdata += 10;
	let parent = document.getElementById("result-container");
	let loadMoreContainer = document.getElementById("more-search-container");
	loadMoreContainer.classList.remove("hide");
	data.forEach( field => {
		let image = document.createElement("img");
		image.src = field.images.original.url;
		parent.insertBefore(image, loadMoreContainer);
		}
	);
	if (sdata >= res.length) {
		searchLoadButton.classList.add("hide");
	}
}

clearButton.addEventListener("click", clearGifs); //Clears Searched GIFs and Input text

//Gets called on clicking the Clear button
function clearGifs(){
	let existingParent = document.getElementById("result-container");
	let loadMoreContainer = document.getElementById("more-search-container");
	searchInput.value = "";
	if (existingParent !== null){
		superContainer.appendChild(loadMoreContainer);
		loadMoreContainer.classList.add("hide");
		existingParent.parentNode.removeChild(existingParent);
	}
}

