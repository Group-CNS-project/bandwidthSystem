$(document).ready(function() {
    $('#submit').on('click', async function(event) {
        event.preventDefault(); // Prevent default button behavior
        console.log('Submit button clicked');

        const form = $('.my-form');
        const formData = form.serializeArray(); // Serialize form data
        const userId = 1; // Replace with dynamic user ID if necessary
        let currentPassword = '';
        let newPassword = '';

        // Extract values from serialized form data
        formData.forEach(item => {
            if (item.name === 'currentPassword') {
                currentPassword = item.value;
            } else if (item.name === 'password') {
                newPassword = item.value;
            }
        });

        // Check if form fields are filled
        if (!currentPassword || !newPassword) {
            showCustomAlert('Please fill out all fields.');
            return;
        }

        try {
            const response = await $.ajax({
                url: 'http://localhost:3000/api/update-password',
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    userId: userId,
                    currentPassword: currentPassword,
                    newPassword: newPassword
                }),
                dataType: 'json'
            });

            console.log('Response:', response);
            showCustomAlert(response.message);

        } catch (error) {
            console.error('Error:', error);
            showCustomAlert('There was an error processing your request.');
        }
    });

    function showCustomAlert(message) {
        $('#alert-message').text(message);
        $('#custom-alert').addClass('show');
        setTimeout(() => {
            $('#custom-alert').removeClass('show');
        }, 3000); // Adjust the duration as needed
    }
});
