document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Here you can implement your logic to verify the username and password
    // For example, a simple check with hardcoded values
    if (username === "user" && password === "password") {
        // Redirect to the restaurant page on successful login
        window.location.href = "index.html"; // Replace with your restaurant page
    } else {
        document.getElementById('login-status').innerText = 'Invalid username or password!';
    }
});
