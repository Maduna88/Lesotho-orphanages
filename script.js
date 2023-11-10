const orphanagesContainer = document.getElementById('orphanages');
const progressBar = document.querySelector('.progress');
progressBar.style.display = 'none'; // Hide the progress bar initially

// Function to fetch orphanages data from the API
function fetchOrphanages() {
  fetch('https://lesotho-orphanages.vercel.app/')
    .then(response => response.json())
    .then(data => {
      // Loop through each orphanage
      data.forEach(orphanage => {
        // Create a card for each orphanage
        const card = document.createElement('div');
        card.classList.add('card');

        // Display orphanage name
        const name = document.createElement('h2');
        name.textContent = orphanage.name;
        card.appendChild(name);

        // Add click event listener to load more details
        card.addEventListener('click', () => {
          loadOrphanageDetails(orphanage.id);
        });

        // Append the card to the orphanages container
        orphanagesContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to fetch orphanage details
function fetchOrphanageDetails(id) {
  return fetch(`https://lesotho-orphanages.vercel.app/${id}`)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching orphanage details:', error);
    });
}

// Function to load more details about an orphanage
function loadOrphanageDetails(orphanageId) {
  fetchOrphanageDetails(orphanageId)
    .then(orphanage => {
      // Clear the orphanages container
      orphanagesContainer.innerHTML = '';

      // Show the progress bar
      progressBar.style.display = 'block';

      // Create a card for the selected orphanage
      const card = document.createElement('div');
      card.classList.add('card');

      // Display orphanage name
      const name = document.createElement('h2');
      name.textContent = orphanage.name;
      card.appendChild(name);

      const id = document.createElement('h2');
      id.textContent = orphanage.id;
      card.appendChild(id);

      // Display orphanage image
      const image = document.createElement('img');
      image.src = orphanage.image;
      card.appendChild(image);

      // Display orphanage location
      const location = document.createElement('p');
      location.textContent = `Location: ${orphanage.location}`;
      card.appendChild(location);

      // Display donation information
      const amountDonated = document.createElement('p');
      amountDonated.textContent = `Amount Donated: ${orphanage.donated}`;
      card.appendChild(amountDonated);

      // Display target donation amount
      const targetDonation = document.createElement('p');
      targetDonation.textContent = `Target Donation: ${orphanage.target}`;
      card.appendChild(targetDonation);

      // Update the progress bar with orphanage details
      updateProgressBar(orphanage);

      // Add a back button
      const backButton = document.createElement('button');
      backButton.textContent = 'Back to Orphanages';
      backButton.addEventListener('click', () => {
        orphanagesContainer.innerHTML = ''; // Clear the orphanages container
        fetchOrphanages(); // Display orphanages list again
        progressBar.style.display = 'none'; // Hide the progress bar
      });

      // Append the card to the orphanages container
      card.appendChild(backButton);
      orphanagesContainer.appendChild(card);
    })
    .catch(error => {
      console.error('Error loading orphanage details:', error);
    });
}

// Function to update the progress bar
function updateProgressBar(orphanage) {
  const progressBar = document.querySelector('.progress-done');

  // Calculate progress percentage
  const progressPercentage = (orphanage.donated / orphanage.target) * 100;

  // Set the width of the progress bar
  progressBar.style.width = `${progressPercentage}%`;
  
}

fetchOrphanages(); // Call the function to fetch and display orphanages
