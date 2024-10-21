// Sample food data
const foodData = [
    { id: 1, name: 'Pizza', price: 10, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Burger', price: 8, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Sushi', price: 12, image: 'https://via.placeholder.com/150' },
];

// Initialize cart and user info
let cart = [];
let currentUser = null;

// Function to display food items
function displayFoodItems() {
    const foodList = document.getElementById('foodList');
    foodList.innerHTML = '';

    foodData.forEach(item => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        foodItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        foodList.appendChild(foodItem);
    });
}

// Function to add food item to cart
function addToCart(id) {
    const item = foodData.find(item => item.id === id);
    const existingItem = cart.find(cartItem => cartItem.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCart();
}

// Function to remove food item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.name} (x${item.quantity}) - $${item.price * item.quantity}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    document.getElementById('totalAmount').innerText = total;
}

// Function to show login modal
function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
}

// Function to close login modal
function closeLogin() {
    document.getElementById('loginForm').style.display = 'none';
}

// Function to handle login
function login() {
    const username = document.getElementById('username').value;
    if (username) {
        currentUser = username;
        document.getElementById('profileUsername').innerText = username;
        closeLogin();
        showMenu();
    } else {
        alert('Please enter a username.');
    }
}

// Function to show the menu
function showMenu() {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('menuLink').style.display = 'none';
    document.getElementById('profileLink').style.display = 'inline';
    document.getElementById('logoutLink').style.display = 'inline';
    displayFoodItems();
}

// Function to show user profile
function showProfile() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('profile').style.display = 'block';
}

// Function to logout
function logout() {
    currentUser = null;
    cart = [];
    document.getElementById('totalAmount').innerText = '0';
    document.getElementById('cartItems').innerHTML = '';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('menuLink').style.display = 'inline';
    document.getElementById('profileLink').style.display = 'none';
    document.getElementById('logoutLink').style.display = 'none';
}

// Function to search food items
function searchFood() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filteredFood = foodData.filter(item => item.name.toLowerCase().includes(query));
    
    const foodList = document.getElementById('foodList');
    foodList.innerHTML = '';

    filteredFood.forEach(item => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        foodItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        foodList.appendChild(foodItem);
    });
}

// Function to handle checkout
function checkout() {
    alert('Checkout successful! Total amount: $' + document.getElementById('totalAmount').innerText);
    cart = []; // Clear the cart
    updateCart(); // Update the cart display
}

// Show login on page load
window.onload = showLogin;
