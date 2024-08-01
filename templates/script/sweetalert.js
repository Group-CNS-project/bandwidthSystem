// Function to handle saving a field
async function saveField(field) {
    const value = document.getElementById(`${field}-edit`).value;
    const userId = document.getElementById('user-id').textContent;

    const data = {
        [field]: value
    };

    try {
        const response = await fetch(`http://localhost:3000/api/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            document.getElementById(`${field}-view`).textContent = `${field.charAt(0).toUpperCase() + field.slice(1)}: ${value}`;
            document.getElementById(`${field}-view`).style.display = 'inline-block';
            document.getElementById(`${field}-edit`).style.display = 'none';
            document.getElementById(`${field}-save`).style.display = 'none';
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: `${field.charAt(0).toUpperCase() + field.slice(1)} has been updated successfully.`,
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'Failed to update field. Please try again.',
            });
        }
    } catch (error) {
        console.error('Error updating field:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while updating the field.',
        });
    }
}
