document.addEventListener('DOMContentLoaded', () => {
    // Replace with the actual user ID you want to fetch
    const userId = 1;

    // Function to fetch user details from the API
    function fetchUserDetails(userId) {
        fetch(`http://localhost:3000/api/user/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                updateUserProfile(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    // Function to update the user profile section with the fetched data
    function updateUserProfile(user) {
        document.getElementById('name-view').textContent = `Name: ${user.name}`;
        document.getElementById('name-edit').value = user.name;

        document.getElementById('username-view').textContent = `Username: ${user.userName}`;
        document.getElementById('username-edit').value = user.userName;

        document.getElementById('contact-view').textContent = `Contact: ${user.contact}`;
        document.getElementById('contact-edit').value = user.contact;

        document.getElementById('email-view').textContent = `Email: ${user.Email}`;
        document.getElementById('email-edit').value = user.Email;

        // Update profile image if available
        const profileImage = user.image ? user.image : 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';
        document.querySelector('.img-preview').style.backgroundImage = `url(${profileImage})`;
    }

    // Fetch user details on page load
    fetchUserDetails(userId);
});
