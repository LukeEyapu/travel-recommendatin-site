// Fetch the recommendations data from the JSON file
function fetchRecommendations() {
    fetch('travelRecommendation.json')  // Ensure the correct path to your JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Parse the response as JSON
        })
        .then(data => {
            // Log the data to verify it
            console.log('Recommendations fetched:', data);
            recommendations = data; // Store the fetched data into the global variable
            renderRecommendations(recommendations); // Call function to display the recommendations
        })
        .catch(error => {
            // Handle any error during the fetch operation
            console.error('Error fetching recommendations:', error);
        });
}

// Function to render recommendations dynamically
function renderRecommendations(recommendations) {
    const recommendationsContainer = document.getElementById('recommendationsContainer');
    recommendationsContainer.innerHTML = ''; // Clear any previous content
    
    // Loop through the recommendations data and display them
    recommendations.countries.forEach(country => {
        const countryElement = document.createElement('div');
        countryElement.classList.add('country');
        
        const countryName = document.createElement('h3');
        countryName.textContent = country.name;
        
        countryElement.appendChild(countryName);
        
        country.cities.forEach(city => {
            const cityElement = document.createElement('div');
            cityElement.classList.add('city');
            
            const cityName = document.createElement('h4');
            cityName.textContent = city.name;
            
            const cityDescription = document.createElement('p');
            cityDescription.textContent = city.description;
            
            cityElement.appendChild(cityName);
            cityElement.appendChild(cityDescription);
            countryElement.appendChild(cityElement);
        });

        recommendationsContainer.appendChild(countryElement);
    });
}

// Handle search functionality
function handleSearch() {
    const searchInput = document.getElementById('s-input').value.toLowerCase();  // Get search input
    const filteredRecommendations = recommendations.countries
        .map(country => ({
            ...country,
            cities: country.cities.filter(city => city.name.toLowerCase().includes(searchInput)) // Filter cities by search query
        }))
        .filter(country => country.cities.length > 0);  // Only include countries with matching cities

    renderRecommendations({ countries: filteredRecommendations }); // Render the filtered data
}

// Handle the clear functionality
function handleClear() {
    document.getElementById('s-input').value = ''; // Clear the search input
    renderRecommendations(recommendations);  // Render the original data
}

// Fetch recommendations on page load
let recommendations = []; // This will hold the fetched data
fetchRecommendations(); // Fetch data initially when the page loads

// Event listeners for search and clear buttons
document.getElementById('s-input').addEventListener('click', handleSearch);
document.getElementById('s-input').addEventListener('input', handleSearch); // Optional: To search as you type

// Clear button functionality
document.getElementById('clear-btn').addEventListener('click', handleClear);


