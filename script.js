// Initialize the map at a global view
const map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Custom marker icon
const customIcon = L.icon({
    iconUrl: 'https://img.icons8.com/ios-filled/50/ffffff/marker.png', // Custom marker icon
    iconSize: [30, 30], // Size of the icon
    iconAnchor: [15, 30], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -30] // Point from which the popup should open relative to the iconAnchor
});

// Event listener for the search button
document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    const apiKey = '6eb8260f73044ffbbc7130228252303';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Location not found. Please try again.');
                return;
            }
            const temperature = data.current.temp_c;
            const locationName = data.location.name;
            const lat = data.location.lat;
            const lon = data.location.lon;

            // Clear previous markers
            map.eachLayer(function (layer) {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Add a custom marker for the location
            L.marker([lat, lon], { icon: customIcon }).addTo(map)
                .bindPopup(`The current temperature in ${locationName} is ${temperature}°C.`)
                .openPopup();

            // Center the map on the new location
            map.setView([lat, lon], 10);
        })
        .catch(error => {
            alert('Error fetching weather data. Please try again.');
            console.error('Error:', error);
        });
});