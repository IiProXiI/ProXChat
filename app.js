// app.js
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get the username and password values
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Validate input
            if (username && password) {
                // Save user data to localStorage (simulating a registration)
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);

                // Redirect to the home page after successful registration
                window.location.href = 'app.html';
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Redirect to login if no username is found in localStorage
    if (window.location.pathname === '/app.html' && !localStorage.getItem('username')) {
        window.location.href = 'register.html';
    }
});
