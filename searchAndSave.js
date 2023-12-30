
const movieList = document.getElementById("movieList")
movieList.textContent = "Your movie results will display here"
let watchListObj = []

document.addEventListener("DOMContentLoaded", function () {
  // Initialize watchListObj from localStorage
  const storedWatchListObj = localStorage.getItem('watchListObj');
  watchListObj = storedWatchListObj ? JSON.parse(storedWatchListObj) : [];

  document.getElementById("searchButton").addEventListener("click", searchForMovie);
});


function searchForMovie(){
const movieInput = document.getElementById("movieInput")

   
fetch (`https://www.omdbapi.com/?t=${movieInput.value}&apikey=fa0f547`)
.then(res => res.json())
.then(data => {
    
    if (data.Response === "False"){
        movieList.innerHTML =  `<p>Unable to find what your loooking for</P>`
    }
    else {
        movieList.innerHTML = ``
    movieList.innerHTML = `
    <img id ="moviePoster"src=${data.Poster}></img>
    <header id ="movieInfo">
        
            <div id ="movieTits">
                <h2 id ="title">${data.Title}    </h2>
                <p id  ="rating">⭐ ${data.imdbRating}</p>
            </div> 
        
            <div id = "movieInfoPartThree">
                 <p id = "length"> ${data.Runtime} </p>
                <p id = "genre">  ${data.Genre} </p>
                <button id ="addButton">  <img src = "images/Icon.png"> </button><p>  Watchlist</p>
            </div>
        <p>${data.Plot} </p>
    </header>
    `
    
    document.getElementById("addButton").addEventListener("click", function (){
        saveWatchListObj(data)
    })
    }
})
}

    function saveWatchListObj(data) {
    const movieData = {
    poster: data.Poster,
    title: data.Title,
    rating: data.imdbRating,
    runtime: data.Runtime,
    genre: data.Genre,
    plot: data.Plot
  };

  // Add the new movie to the watchListObj array
  watchListObj.push(movieData);

  // Update localStorage with the updated watchListObj
  localStorage.setItem('watchListObj', JSON.stringify(watchListObj));
}
    
document.getElementById("searchButton").addEventListener("click", searchForMovie)



