async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api/daily-data-usage');
        const data = await response.json();

        // Process and render data
        renderChart(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderChart(data) {
    const chart = document.getElementById('chart');
    const dateAxis = document.getElementById('date-axis');

    // Clear existing content
    chart.innerHTML = '';
    dateAxis.innerHTML = '';

    // Generate bars and date labels
    data.forEach(item => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(item.total / 100) * 100}%`; // Adjust height calculation as needed
        bar.style.backgroundColor = getRandomColor(); // Function to get a random color
        bar.title = `${item.total}MB`;

        chart.appendChild(bar);

        const dateLabel = document.createElement('div');
        dateLabel.className = 'date-label';
        dateLabel.textContent = new Date(item.date_use).toISOString().split('T')[0];

        dateAxis.appendChild(dateLabel);
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Fetch and render data on page load
fetchData();
