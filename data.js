// Get the form element
    const form = document.getElementById('reservationForm');
    
    // Add event listener to the form's submit event
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
      
      // Get input values
      const email = document.getElementById('email').value;
      const surname = document.getElementById('surname').value;
      const firstName = document.getElementById('firstName').value;
      const telephone = document.getElementById('telephone').value;
      
      // Create an object to store the data
      const reservationData = {
        email: email,
        surname: surname,
        firstName: firstName,
        telephone: telephone
      };
      
      // Store the data in localStorage
      localStorage.setItem('reservationData', JSON.stringify(reservationData));
      
      // Perform next steps of reservation
      // Add your code here...
      
      // Optional: Redirect to the next page
      window.location.href = 'confirmation.html';
    });