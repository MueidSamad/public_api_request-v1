// Fetch data from the Random User Generator API
fetch('https://randomuser.me/api/?results=12&nat=US')
    .then(response => response.json())
    .then(data => {
        displayUsers(data.results);
    })
    .catch(error => console.error('Error fetching data:', error));

// Array to hold the user data
let usersData = [];

// Function to display user data
function displayUsers(users) {
    usersData = users; // Store the fetched users globally
    const gallery = document.getElementById('gallery');

    // Clear previous content
    gallery.innerHTML = '';

    users.forEach(user => {
        // Create user card markup
        const userCard = `
      <div class="card">
        <div class="card-img-container">
          <img class="card-img" src="${user.picture.thumbnail}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
      </div>
    `;
        gallery.insertAdjacentHTML('beforeend', userCard);
    });

    // Add event listeners for cards to open modal
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            openModal(index); // Pass the index to open the modal
        });
    });
}

// Function to open modal and display user details
function openModal(index) {
    const user = usersData[index]; // Get the user based on the passed index
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.innerHTML = `
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
        <img class="modal-img" src="${user.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="modal-text">${user.email}</p>
        <p class="modal-text cap">${user.location.city}</p>
        <hr>
        <p class="modal-text">${user.phone}</p>
        <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.state}, ${user.location.postcode}</p>
        <p class="modal-text">Birthday: ${new Date(user.dob.date).toLocaleDateString()}</p>
      </div>
    </div>
    <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
      <button type="button" id="modal-close" class="modal-close btn">Close</button>
    </div>
  `;

    document.body.appendChild(modalContainer);

    // Close modal functionality
    const closeBtn = document.getElementById('modal-close-btn');
    closeBtn.addEventListener('click', () => {
        modalContainer.remove();
    });

    // Add event listeners for the Prev and Next buttons
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');

    prevBtn.addEventListener('click', () => {
        const newIndex = (index - 1 + usersData.length) % usersData.length; // Wrap around to last if at the beginning
        modalContainer.remove(); // Remove the current modal
        openModal(newIndex); // Open modal for the new index
    });

    nextBtn.addEventListener('click', () => {
        const newIndex = (index + 1) % usersData.length; // Wrap around to first if at the end
        modalContainer.remove(); // Remove the current modal
        openModal(newIndex); // Open modal for the new index
    });
}

// Search functionality
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const name = card.querySelector('.card-name').textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            card.style.display = ''; // Show card
        } else {
            card.style.display = 'none'; // Hide card
        }
    });
});
