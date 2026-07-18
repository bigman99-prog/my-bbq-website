let button = document.getElementById('search-button');
let locationInput = document.getElementById('location-input');
let messageElement = document.getElementById('message');
let resultsElement = document.getElementById('results');

button.addEventListener('click', async function() {
    if (locationInput.value.trim() === '') {
        messageElement.textContent = 'Please enter a location.';
        resultsElement.innerHTML = '';}
        else {
        messageElement.textContent = 'Searching...';
        resultsElement.innerHTML = '';

        let response = await fetch(`https://nominatim.openstreetmap.org/search?q=restaurant+${locationInput.value}&format=json&limit=10`);
        let data = await response.json();

        if (data.length === 0) {
            messageElement.textContent = 'No restaurants found.';
            resultsElement.innerHTML = '';
        } else {
            messageElement.textContent = 'Results for: ' + locationInput.value;
            resultsElement.innerHTML = data.map(function(item) {
                return `<div class="result-item">
                            <h3>${item.name}</h3>
                            <p>Location: ${item.display_name}</p>
                            
                        </div>`;
            }).join('');
          
        
        }
    }
});