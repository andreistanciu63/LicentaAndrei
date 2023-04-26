// Get the selected ticket quantities from local storage
const selectedTickets = JSON.parse(localStorage.getItem('selectedTickets'));

// Get the cinema room element
let cinemaRoom = document.getElementById('cinema-room');

// Create a two-dimensional array to represent the seats in the cinema room
let seats = [];
for (let i = 0; i < 10; i++) {
  seats[i] = [];
  for (let j = 0; j < 10; j++) {
    seats[i][j] = 0; // 0 means the seat is available
  }
}

// Create the HTML for the cinema room and the seats
let cinemaRoomHtml = '';
for (let i = 0; i < 10; i++) {
  cinemaRoomHtml += '<div class="row">';
  // Add the row number to the left of the seats
  cinemaRoomHtml += '<div class="row-number">' + (i+1) + '</div>';
  for (let j = 0; j < 10; j++) {
    // Add the seat number to the right of the seats
    cinemaRoomHtml += '<div class="seat available" data-row="' + i + '" data-col="' + j + '">' + (j+1) + '</div>';
  }
  cinemaRoomHtml += '</div>';
}
cinemaRoom.innerHTML = cinemaRoomHtml;


// Add event listeners to the seat elements
let seatElements = document.querySelectorAll('.seat');
let selectedSeats = 0; // Counter for the number of selected seats
for (let i = 0; i < seatElements.length; i++) {
  seatElements[i].addEventListener('click', function() {
    let row = parseInt(this.dataset.row);
    let col = parseInt(this.dataset.col);
    if (seats[row][col] === 0 && selectedSeats < selectedTickets.reduce((a, b) => a + b.quantity, 0)) {
      // If the seat is available and the number of selected seats is less than the total quantity of selected tickets, select it
      seats[row][col] = 1; // 1 means the seat is selected
      this.classList.add('selected');
      this.classList.remove('available');
      selectedSeats++;
      if (selectedSeats === selectedTickets.reduce((a, b) => a + b.quantity, 0)) {
        // If the user has selected all the required seats, update the selectedSeatsMessage
        selectedSeatsMessage.innerText = "Ai rezervat toate biletele. Poti merge mai departe in procesul de rezervare.";
      }
    } else if (seats[row][col] === 1) { // If the seat is already selected, deselect it
      seats[row][col] = 0;
      this.classList.remove('selected');
      this.classList.add('available');
      selectedSeats--;
      selectedSeatsMessage.innerText = 'Te rog selecteaza ' + selectedTickets.reduce((a, b) => a + b.quantity, 0) + ' locuri.\n';
    }
  });
}

// Update the selectedSeatsMessage element to display the correct number of seats for each ticket type
let selectedSeatsMessage = document.createElement('p');
let message = 'Te rog selecteaza ' + selectedTickets.reduce((a, b) => a + b.quantity, 0) + ' locuri.\n';
selectedSeatsMessage.innerText = message;
cinemaRoom.appendChild(selectedSeatsMessage);


let nextButton = document.createElement('button');
nextButton.innerText = 'Pasul urmator';
nextButton.addEventListener('click', function() {
  if (selectedSeats === selectedTickets.reduce((a, b) => a + b.quantity, 0)) {
    // Redirect to the next page only if the required number of tickets is selected
    window.location.href = 'data.html';
  } else {
    // Display an error message
    let errorMessage = document.getElementById('error-message');
    errorMessage.innerText = 'Selecteaza numarul necesar de bilete inainte de a continua.';
  }
});
cinemaRoom.insertAdjacentElement('afterend', nextButton);

// Add an error message container to the HTML
let errorMessageContainer = document.createElement('div');
errorMessageContainer.id = 'error-message';
cinemaRoom.insertAdjacentElement('afterend', errorMessageContainer);


let prevButton = document.createElement('button');
prevButton.innerText = 'Pasul Anterior';
prevButton.addEventListener('click', function() {
  // Redirect to the previous page
  window.history.back();
});
cinemaRoom.insertAdjacentElement('afterend', prevButton);

