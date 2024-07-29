// Set up the map
var map = L.map('map').setView([6.7741, 79.8815], 13); // Panadura coordinates

// Add a tile layer (you can choose a different tile layer if you prefer)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker (optional)
L.marker([6.7741, 79.8815]).addTo(map)
    .bindPopup('Panadura')
    .openPopup();