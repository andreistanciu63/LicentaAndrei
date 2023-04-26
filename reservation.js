const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const movieTime = urlParams.get('time');

url = '/movies.json';

// Fetch the movie data from the server
fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((movies) => {
    const moviesDiv = document.getElementById('movies');
    const movie = movies.find(
      (movie) => movie.Imdb === movieId && movie.DD_Show.includes(movieTime)
    );

    if (movie) {
      const movieDiv = document.createElement('div');
      movieDiv.innerHTML = `
      <div class="box-container">
  <div class="box">
    <span class="circle">1</span><span class="text">Selectare Bilete</span>
  </div>
  <div class="box">
    <span class="circle">2</span><span class="text">Comanda</span>
  </div>
  <div class="box">
    <span class="circle">3</span><span class="text">Confirmare</span>
  </div>
  <div class="box">
    <span class="circle">4</span><span class="text">Finalizare</span>
  </div>
</div>
        <form>
        <h1>Rezervare si cumparare bilete</h1>
          <div>
            <input type="radio" id="reservation" name="booking" value="reservation">
            <label for="reservation">Rezervare</label>
            <p>Rezerva locurile acum si le poti cumpara de la casele de bilete din cinematograful selectat, dar nu mai tarziu de 30 de minute inainte de inceperea filmului. Anumite locuri sunt exclusiv disponibile pentru cumpararea de bilete, nu si pentru rezervare.</p>
          </div>
          <div>
            <input type="radio" id="ticket-purchase" name="booking" value="ticket-purchase">
            <label for="ticket-purchase">Cumparare Bilete</label>
            <p>Cumpara biletele acum si evita cozile de la casele de bilete</p>
          </div>
          <button type="submit">Pasul urmator</button>
        </form>
      `;
      moviesDiv.appendChild(movieDiv);

      const form = movieDiv.querySelector('form');
      form.addEventListener('submit', e => {
        e.preventDefault();
        const selectedBooking = form.elements['booking'].value;

        if (!selectedBooking) {
          const error = document.createElement('div');
          error.innerText = 'Please select a booking option';
          error.style.color = 'red';
          movieDiv.appendChild(error);
          return;
        }

        // Redirect to the next page with the selected booking option
        window.location.href = `select-tickets.html?id=${movieId}&time=${movieTime}&booking=${selectedBooking}`;
      });
    } else {
      const movieDiv = document.createElement('div');
      movieDiv.innerText = 'Movie not found';
      moviesDiv.appendChild(movieDiv);
    }
  })
  .catch((err) => {
    console.error(err);
  });
