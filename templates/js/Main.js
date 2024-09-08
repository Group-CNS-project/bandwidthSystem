const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

document.getElementById('btn_SignUp').addEventListener('click' ,function (){
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password1 = document.getElementById('password1').value;

    if (validate(name,'Name') && validate(email,'Email') &&
        validate(password, 'Password') && validate(password1, 'Confirm Password')) {

        if (password !== password1) {
            Swal.fire({
                icon: 'error',
                title: 'Password does not match',
            });
            return;
        }
        const data = { name, email,password };
        fetch('http://localhost:3001/auth/signup', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    clear();
                    Swal.fire({
                        icon: 'success',
                        title: 'Sign Up Successful',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sign Up Failed',
                        text: data.message, // Add more info if available
                    });
                }
            })

            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'An error occurred',
                    text: err.message // Add more error details if available
                });
            });

    }
});

document.getElementById('btn_SignIn').addEventListener('click' ,function (){
    const email = document.getElementById('mail').value;
    const password = document.getElementById('pass').value;

    if (validate(email,'Email') && validate(email,'Password') ){
        const data = { email,password };

        fetch('http://localhost:3000/auth/signing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful',
                    }).then(() => {
                        // Redirect to another page or perform other actions upon successful login
                        window.location.href = 'index.html';
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: data.message, // Add more info if available
                    });
                }
            })
            .catch(err => {
                console.error('Error during fetch:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'An error occurred',
                    text: err.message // Add more error details if available
                });
            });
    }


});



function validate(value, field_name) {
    if (!value) {
        Swal.fire({
            icon: 'warning',
            title: 'Please enter ' + field_name
        });
        return false;
    } else {
        return true;
    }
}

function clear(){


    $('#name').val("");
    $('#email').val("");
    $('#password').val("");
    $('#password1').val("");

}