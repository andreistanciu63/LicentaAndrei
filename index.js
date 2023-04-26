url = '/movies.json';
fetch(url)
  .then((res) => {
    return res.json();
  })
  .then(movies => {
    const moviesDiv = document.getElementById('movies');

    movies.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.innerHTML = `
      <div class="line-4">
  <hr>
</div>
        <div class="movie-card">
          <div class="movie-card-image">
          <img src=${movie.Poster} class="movie-card-image">
          </div>
          <div class="movie-card-info">
            <div>
              <a href="movie.html?id=${movie.Imdb}"" class="movie-card-title">${movie.Title}</a>
              <div class="movie-card-subtitle">
                <span class="movie-card-type" title="Nimic">${movie.Rated}</span>
                ${movie.Genre} | ${movie.Runtime} 
            </div>
            ${movie.DD_Show 
        ? `<div class="showtimes">
                <div class="genre">2D</div>
                ${movie.DD_Show.map(showtime => 
                  `<a href="#" data-time="${showtime}" class='movie-card-link'>${showtime}</a>`).join('')}
                <div>${movie.Language}</div>
              </div>`
        : ''} 
            ${movie.DDD_Show 
        ? `<div class="showtimes">
            <div class="line-3">
             <hr>
            </div>
                <div class="genre">3D</div>
                ${movie.DDD_Show.map(showtime =>
                  `<a href="#" data-time="${showtime}" class='movie-card-link'>${showtime}</a>`).join('')}
                <div>${movie.Language}</div>
              </div>`
        : ''}
         ${movie.IMAX2D_Show 
        ? `
            <div class="showtimes">
            <div class="line-3">
             <hr>
            </div>
                <div class="genre">IMAX 2D</div>
                ${movie.IMAX2D_Show.map(showtime =>
                  `<a href="#" data-time="${showtime}" class='movie-card-link'>${showtime}</a>`).join('')}
                <div>${movie.Language}</div>
              </div>`
        : ''}
          ${movie.IMAX3D_Show 
        ? `<div class="showtimes">
            <div class="line-3">
             <hr>
            </div>
                <div class="genre">IMAX 3D</div>
                ${movie.IMAX3D_Show.map(showtime =>
                  `<a href="#" data-time="${showtime}" class='movie-card-link'>${showtime}</a>`).join('')}
                <div>${movie.Language}</div>
              </div>`
        : ''}
            ${movie.VIP_Show 
        ? `<div class="showtimes">
             <div class="line-3">
               <hr>
             </div>
                <div class="genre">VIP 2D</div>
                ${movie.VIP_Show.map(showtime =>
                  `<a href="#" data-time="${showtime}" class='movie-card-link'>${showtime}</a>`).join('')}
                <div>${movie.Language}</div>
              </div>`
        : ''}
          </div>
          </div>
        `;
      moviesDiv.appendChild(movieDiv);   

      const showtimeLinks = movieDiv.querySelectorAll('.showtimes a');
      showtimeLinks.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          const selectedTime = link.dataset.time;
          // Open reservation page with selected time
          window.location.href = `reservation.html?id=${movie.Imdb}&time=${selectedTime}`;
        });
      });
    });
  })
  .catch((err) => {
    console.log(err); 
  });

