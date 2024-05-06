document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if(username && password) {
        // Here you would normally handle the login via an API
        alert('Login successful');
        window.location.href = 'dashboard.html'; // Redirect to the dashboard
    } else {
        alert('Please fill in all fields');
    }
});
