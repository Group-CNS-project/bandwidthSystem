document.addEventListener('DOMContentLoaded', () => {
    // Profile Picture Preview
    const imgUploadInput = document.querySelector('.img-upload input[type="file"]');
    const imgPreview = document.querySelector('.img-preview');

    imgUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imgPreview.style.backgroundImage = `url(${e.target.result})`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Enable/Disable Buttons
    const passwordForm = document.querySelector('form.my-form');
    const submitButtons = passwordForm.querySelectorAll('button[type="submit"]');

    passwordForm.addEventListener('input', () => {
        let enableSubmit = true;

        // Check if all inputs are filled
        passwordForm.querySelectorAll('input').forEach(input => {
            if (!input.value) {
                enableSubmit = false;
            }
        });

        // Enable or disable buttons based on input status
        submitButtons.forEach(button => {
            button.disabled = !enableSubmit;
        });
    });
});
function editField(field) {
    const viewElement = document.getElementById(`${field}-view`);
    const editElement = document.getElementById(`${field}-edit`);

    if (viewElement.style.display === 'none') {
        viewElement.style.display = 'block';
        editElement.style.display = 'none';
    } else {
        viewElement.style.display = 'none';
        editElement.style.display = 'block';
        editElement.focus();
    }
}

function editField(field) {
    document.getElementById(field + '-view').style.display = 'none';
    document.getElementById(field + '-edit').style.display = 'block';
    document.getElementById(field + '-save').style.display = 'inline-block';
}

function saveField(field) {
    const newValue = document.getElementById(field + '-edit').value;
    document.getElementById(field + '-view').innerHTML = `<strong>${capitalizeFirstLetter(field)}:</strong> ${newValue}`;
    document.getElementById(field + '-view').style.display = 'block';
    document.getElementById(field + '-edit').style.display = 'none';
    document.getElementById(field + '-save').style.display = 'none';

    // Here, you can add code to save the new value to the server if needed
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
