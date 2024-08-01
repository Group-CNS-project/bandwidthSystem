function saveField(field) {
    const newValue = document.getElementById(field + '-edit').value;
    document.getElementById(field + '-view').innerHTML = `<strong>${capitalizeFirstLetter(field)}:</strong> ${newValue}`;
    document.getElementById(field + '-view').style.display = 'block';
    document.getElementById(field + '-edit').style.display = 'none';
    document.getElementById(field + '-save').style.display = 'none';

    // Assume userId is available (e.g., from a hidden field or global variable)
    const userId = 1;

    const data = {
        [field]: newValue
    };

    fetch(`http://localhost:3000/api/user/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            // Optionally show a success message
        })
        .catch((error) => {
            console.error('Error:', error);
            // Optionally show an error message
        });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
