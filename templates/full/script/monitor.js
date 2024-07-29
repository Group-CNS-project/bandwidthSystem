
let intervalId;
let hourlyData = [];
let hourStartTime = Date.now();
let hourlyDownload = 0;
let hourlyUpload = 0;

async function fetchNetworkData() {
    const response = await fetch('/network_data');
    const data = await response.json();

    document.getElementById('new_received').innerText = data.mb_new_received.toFixed(2) + ' MB';
    document.getElementById('new_sent').innerText = data.mb_new_sent.toFixed(2) + ' MB';
    document.getElementById('new_total').innerText = data.mb_new_total.toFixed(2) + ' MB';
    document.getElementById('total_received').innerText = data.mb_total_received.toFixed(2) + ' MB';
    document.getElementById('total_sent').innerText = data.mb_total_sent.toFixed(2) + ' MB';
    document.getElementById('total_data').innerText = data.mb_total.toFixed(2) + ' MB';

    document.getElementById('meter_new_received').value = data.mb_new_received;
    document.getElementById('meter_new_sent').value = data.mb_new_sent;
    document.getElementById('meter_new_total').value = data.mb_new_total;

    hourlyDownload += data.mb_new_received;
    hourlyUpload += data.mb_new_sent;

    const now = Date.now();
    if (now - hourStartTime >= 3600000) {
        hourlyData.push({
            download: hourlyDownload,
            upload: hourlyUpload,
            timestamp: new Date(hourStartTime).toLocaleString()
        });

        // Reset hourly data
        hourStartTime = now;
        hourlyDownload = 0;
        hourlyUpload = 0;

        // Log hourly data
        console.log(hourlyData);
    }
}

document.getElementById('startButton').addEventListener('click', () => {
    if (!intervalId) {
        intervalId = setInterval(fetchNetworkData, 1000);
    }
});
