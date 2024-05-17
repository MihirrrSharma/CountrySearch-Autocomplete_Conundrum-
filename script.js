document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Function to perform real-time search and render results
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Hide results container if search term is empty
        if (searchTerm === '') {
            searchResults.style.display = 'none';
            return;
        }

        // Validate the input using regular expression
        if (!isValidInput(searchTerm)) {
            // Clear search results if input is invalid
            searchResults.innerHTML = '';
            return;
        }

        // Fetch JSON data containing countries and capitals
        fetch('countries.json')
            .then(response => response.json())
            .then(data => {
                const countries = data;

                const matchedCountries = countries.filter(country => {
                    const countryName = country.countryName.toLowerCase();
                    const countryCapital = country.capital.toLowerCase();
                    return countryName.includes(searchTerm) || countryCapital.includes(searchTerm);
                });

                // Display matched countries or show "No match found" message
                if (matchedCountries.length > 0) {
                    displayResults(matchedCountries);
                } else {
                    displayNoResults();
                }
            })
            .catch(error => console.error('Error fetching countries data:', error));
    });

    // Validate input using regular expression
    function isValidInput(input) {
        const regex = /^[a-zA-Z\s]*$/; // Allow only alphabetic characters and spaces
        return regex.test(input);
    }

    // Function to display search results
    function displayResults(results) {
        const resultList = document.createElement('ul');
        resultList.innerHTML = ''; // Clear previous results

        results.forEach(country => {
            const countryElement = document.createElement('li');
    
            // Create a span for the country name (bold)
            const countryNameElement = document.createElement('span');
            countryNameElement.textContent = country.countryName;
            countryNameElement.classList.add('country-name'); // Add class for styling
            countryElement.appendChild(countryNameElement);
    
            // Create a span for the capital
            const capitalElement = document.createElement('span');
            capitalElement.textContent = ` - ${country.capital}`;
            capitalElement.classList.add('capital'); // Add class for styling
            countryElement.appendChild(capitalElement);
    
            resultList.appendChild(countryElement);
        });

        // Show results container and update content
        searchResults.style.display = 'block';
        searchResults.innerHTML = ''; // Clear previous content
        searchResults.appendChild(resultList);
    }

    // Function to display "No match found" message
    function displayNoResults() {
        searchResults.innerHTML = '<p>No match found</p>';
        searchResults.style.display = 'block';
    }

    // Add event listener to restrict input keys
    searchInput.addEventListener('keydown', function(event) {
        const key = event.key;
        const isValidKey = /^[a-zA-Z\s]*$/.test(key); // Allow only alphabetic characters and spaces
    
        if (!isValidKey) {
            event.preventDefault(); // Prevent default behavior for invalid keys
        }
    });
});
