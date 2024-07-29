document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/history') // Updated URL with /api prefix
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('history-data');
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${new Date(row.date_use).toISOString().split('T')[0]}</td>
                    <td>${row.total_download} MB</td>
                    <td>${row.total_upload} MB</td>
                    <td>${row.total} MB</td>
                `;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
