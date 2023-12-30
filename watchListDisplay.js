let watchList = document.getElementById("watchList")
watchList.textContent = "Your watchlist is looking a little empty... "
function getWatchListObj() {
  const storedWatchListObj = localStorage.getItem('watchListObj')
  if (storedWatchListObj) {
    const parsedWatchListObj = JSON.parse(storedWatchListObj)

    // Call the function to display the watchlist
    displayWatchList(parsedWatchListObj)

    return parsedWatchListObj;
  } else {
    return null
  }
}

// Call the function to retrieve and update the watchList content


getWatchListObj();

function displayWatchList(movieList) {
  // Clear existing content
 

  // Clear existing content
  watchList.innerHTML = ' ';
  
  if (movieList.length === 0) {
    // Display placeholder text when the watchlist is empty
    watchList.innerHTML = `<p>Your watchlist is looking a little empty...</p>
    <p></p>
    <a href= "index.html"> <img src ="images/Icon.png"></img>Lets add some movies </a>`
  } else {


  // Iterate over the watchListObj array and display each movie
  movieList.forEach((movie, index) => {
    const movieEntry = document.createElement('div');
    movieEntry.innerHTML = `
      <img id="moviePoster" src=${movie.poster}></img>
      <header id="movieInfo">
        <div id="movieTits">
          <h2 id="title">${movie.title}</h2>
          <p id="rating">⭐ ${movie.rating}</p>
        </div>
        <div id="movieInfoPartThree">
          <p id="length">${movie.runtime}</p>
          <p id="genre">${movie.genre}</p>
          <button class="deleteButton" id="removeButton" data-index="${index}"> <img src="images/renameIcon.png"> </button><p> Watchlist</p>
        </div>
        <p>${movie.plot}</p>
      </header>
      <br>
    `;
     movieEntry.style.borderBottom = "1px solid #ccc";
     movieEntry.style.border = "width: 100%"
     movieEntry.style.marginTop = "2em";
    watchList.appendChild(movieEntry);
  })
    
        
  // Add event listener for delete buttons
  const deleteButtons = document.querySelectorAll('.deleteButton');
  deleteButtons.forEach(button => {
    button.addEventListener('click', deleteFromWatchList);
  });
}
}

function deleteFromWatchList(event) {
  const indexToDelete = event.target.dataset.index;

  // Retrieve the current watchlist from localStorage
  const storedWatchListObj = localStorage.getItem('watchListObj');
  const watchListObj = storedWatchListObj ? JSON.parse(storedWatchListObj) : [];

  // Remove the selected movie from the watchlist array
  watchListObj.splice(indexToDelete, 1);

  // Update localStorage with the updated watchListObj
  localStorage.setItem('watchListObj', JSON.stringify(watchListObj));

  // Refresh the displayed watchlist
  getWatchListObj();
}