let map; // Declare map variable outside of function

async function fetchIPDetails() {
    try {
        // Get the user's public IP address
        let ipResponse = await fetch('https://api.ipify.org?format=json');
        if (!ipResponse.ok) throw new Error('Failed to fetch IP address');
        let ipData = await ipResponse.json();
        let ip = ipData.ip;

        // Get details of the IP address
        let detailsResponse = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=35762b87d0984edb801ef29b1b16ecb4&ip=${ip}`);
        if (!detailsResponse.ok) throw new Error('Failed to fetch IP details');
        let detailsData = await detailsResponse.json();

        // Update the HTML with fetched details
        document.getElementById('ip').textContent = `IP: ${detailsData.ip}`;
        document.getElementById('city').textContent = `City: ${detailsData.city}`;
        document.getElementById('province').textContent = `Province: ${detailsData.state_prov}`;
        document.getElementById('country').textContent = `Country: ${detailsData.country_name}`;
        document.getElementById('service').textContent = `Service: ${detailsData.isp}`;
        document.getElementById('timezone').textContent = `Timezone: ${detailsData.time_zone.name}`;

        // Destroy existing map if it exists
        if (map) {
            map.remove();
        }

        // Initialize the map
        map = L.map('map').setView([detailsData.latitude, detailsData.longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        L.marker([detailsData.latitude, detailsData.longitude]).addTo(map)
            .bindPopup('You are here!')
            .openPopup();
    } catch (error) {
        console.error('Error fetching IP details:', error);
        document.getElementById('all-detail-div').innerHTML = `<p>Error fetching IP details: ${error.message}. Please try again later.</p>`;
    }
}

fetchIPDetails();
