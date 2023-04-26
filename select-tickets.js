const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const movieTime = urlParams.get('time');
const movieType = urlParams.get('booking')

const ticketTypes = [  { type: 'COPIL 22', price: 22 },  { type: 'PENSIONAR 24', price: 24 },  { type: 'ELEV 24', price: 24 },  { type: 'STUDENT 24', price: 24 },  { type: 'ADULT 24', price: 31 },];

function generateTicketSelection() {
  const ticketSelectionDiv = document.createElement('div');
  ticketSelectionDiv.innerHTML = `
    <h2>SELECTEAZA BILETELE</h2>
  `;
  
  const ticketSelection = [];

  ticketTypes.forEach(ticketType => {
    const ticketTypeDiv = document.createElement('div');
    const dropdownOptions = generateDropdownOptions();
    ticketTypeDiv.innerHTML = `
      <label>${ticketType.type}</label>
      <span>${ticketType.price}.00 LEI</span>
      <select id="${ticketType.type.toLowerCase()}-tickets">
        ${dropdownOptions}
      </select>
    `;
    ticketSelectionDiv.appendChild(ticketTypeDiv);

    ticketSelection.push({
      type: ticketType.type,
      price: ticketType.price,
      quantity: 0
    });
  });
  
  const button = document.createElement('button');
  button.innerText = 'Selecteaza locurile';
  button.addEventListener('click', () => {
    const selectedQuantities = ticketSelection.map(ticket => {
      const quantity = parseInt(document.getElementById(`${ticket.type.toLowerCase()}-tickets`).value);
      ticket.quantity = quantity;
      return ticket;
    });
    const totalTickets = selectedQuantities.reduce((total, ticket) => total + ticket.quantity, 0);

    if (totalTickets > 0) {    
      localStorage.setItem('selectedTickets', JSON.stringify(selectedQuantities));

      window.location.href = `/checkout.html`;
    } else {
      const errorDiv = document.createElement('div');
      errorDiv.innerText = 'Va rugam sa selectati cel putin un bilet.';
      errorDiv.style.color = 'red';
      ticketSelectionDiv.appendChild(errorDiv);
    }
  });

  ticketSelectionDiv.appendChild(button);
  return ticketSelectionDiv;
}


function generateDropdownOptions() {
  let options = '';
  for (let i = 0; i <= 10; i++) {
    options += `<option value="${i}">${i}</option>`;
  }
  return options;
}



url = '/movies.json';

// Fetch the movie data from the server
fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((movies) => {
    const moviesDiv = document.getElementById('movies');
    const movie = movies.find(
      (movie) => movie.Imdb === movieId && movie.DD_Show.includes(movieTime) && movieType === "reservation");

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
       <div>${movie.Title}${movie.Format}</div>
        ${movieTime}
      `;
      const ticketSelection = generateTicketSelection();
      movieDiv.appendChild(ticketSelection);
      moviesDiv.appendChild(movieDiv);

    } else {
      const movieDiv = document.createElement('div');
      movieDiv.innerText = 'Movie not found';      
      moviesDiv.appendChild(movieDiv);
    }
  })
  .catch((err) => {
    console.error(err);
  });
