// Get the movie ID parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
console.log(movieId);
url = '/movies.json';
// Fetch the movie data from the server
fetch(url)
    .then((res) => {
        return res.json();
    })
  .then(movies => {
      const moviesDiv = document.getElementById('movies');
      
      const movie = movies.find(movie => movie.Imdb === movieId);
      
    
    const movieDiv = document.createElement('div');
      movieDiv.innerHTML = `
        <section class="movie-section">
        <div class="movie-section">
        <h1 class="movie-title">${movie.Title}<span class="movie-rating">${movie.Rated}</span></h1>
        <div>
        <iframe width="420" height="315" class="movie-trailer"
        src="https://www.youtube.com/embed/tgbNymZ7vqY">
        </iframe>
        </div>
        <p>Mai multe informații despre ${movie.Title}</p>
        <div>
        <div>
        <span></span>
        <p>Data Lansării</p><p>${movie.Year}</p>
        </div>
        <div>
        <span></span>
        <p>Durată</p><p>${movie.Runtime}</p>
        </div>
        </div>
        <p>${movie.Plot}</p>
        <img src=${movie.Poster} class="movie-poster">
        </div>   
        </section>   
      `
      
      moviesDiv.appendChild(movieDiv);
  })
  .catch((err) => {
    console.error(err);
  });
