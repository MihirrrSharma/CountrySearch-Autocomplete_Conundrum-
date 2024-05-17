document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm === '') {
            searchResults.style.display = 'none';
            return;
        }

        if (!isValidInput(searchTerm)) {
            searchResults.innerHTML = '';
            return;
        }

        fetch('countries.json')
            .then(response => response.json())
            .then(data => {
                const countries = data;
                const matchedCountries = countries.filter(country => {
                    const countryName = country.countryName.toLowerCase();
                    const countryCapital = country.capital.toLowerCase();
                    return countryName.includes(searchTerm) || countryCapital.includes(searchTerm);
                });

                if (matchedCountries.length > 0) {
                    displayResults(matchedCountries);
                } else {
                    displayNoResults();
                }
            })
            .catch(error => console.error('Error fetching countries data:', error));
    });

    function isValidInput(input) {
        const regex = /^[a-zA-Z\s]*$/; 
        return regex.test(input);
    }

    function displayResults(results) {
        const resultList = document.createElement('ul');
        resultList.innerHTML = ''; 

        results.forEach(country => {
            const countryElement = document.createElement('li');
    
            const countryNameElement = document.createElement('span');
            countryNameElement.textContent = country.countryName;
            countryNameElement.classList.add('country-name'); 
            countryElement.appendChild(countryNameElement);
    
            const capitalElement = document.createElement('span');
            capitalElement.textContent = ` - ${country.capital}`;
            capitalElement.classList.add('capital'); 
            countryElement.appendChild(capitalElement);
    
            resultList.appendChild(countryElement);
        });

        searchResults.style.display = 'block';
        searchResults.innerHTML = ''; 
        searchResults.appendChild(resultList);
    }

    function displayNoResults() {
        searchResults.innerHTML = '<p>No match found</p>';
        searchResults.style.display = 'block';
    }

    searchInput.addEventListener('keydown', function(event) {
        const key = event.key;
        const isValidKey = /^[a-zA-Z\s]*$/.test(key); 
    
        if (!isValidKey) {
            event.preventDefault(); 
        }
    });
});
