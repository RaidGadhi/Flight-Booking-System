document.getElementById('registrationForm').addEventListener('submit', function(event){
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
    } else if (password !== confirmPassword) {
        alert('Passwords do not match');
    } else {
        // Here you would normally handle the registration via an API
        alert('Registration successful');
        window.location.href = 'login.html'; // Redirect to the login page
    }
});

function logout() {
    // Here you would normally clear the session storage or cookies
    alert('You have been logged out.');
    window.location.href = 'login.html';
}
document.getElementById('bookingForm').addEventListener('submit', function(event){
    event.preventDefault();
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const flightClass = document.getElementById('class').value;

    if(source && destination && date && flightClass) {
        // Normally, you'd send this data to the server to fetch available flights
        alert('Searching for available flights...');
    } else {
        alert('Please fill in all fields');
    }
});
document.getElementById('paymentForm').addEventListener('submit', function(event){
    event.preventDefault();
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expDate = document.getElementById('expDate').value;
    const cvv = document.getElementById('cvv').value;

    if(cardName && cardNumber && expDate && cvv) {
        // Normally, you'd process the payment through your backend or a payment gateway
        alert('Payment successful! Thank you for your purchase.');
    } else {
        alert('Please fill in all fields correctly.');
    }
});
function printTicket() {
    window.print();
}
document.getElementById('reportForm').addEventListener('submit', function(event){
    event.preventDefault();
    const reportType = document.getElementById('reportType').value;
    const date = document.getElementById('date').value;

    if(reportType && date) {
        // Normally, you'd make an API call here to fetch the report data
        document.getElementById('reportResults').innerHTML = `<p>Report for ${reportType} on ${date} is being generated...</p>`;
    } else {
        alert('Please select a report type and date');
    }
});
