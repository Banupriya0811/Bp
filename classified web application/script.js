// Sample data to simulate ads
const adsData = [
    { id: 1, title: "iPhone 12 Pro", price: 249.00, location: "Seattle, WA", category: "Mobile Phones", image: "phone.jpg" },
    { id: 2, title: "2017 MERCEDES-BENZ GLS 450", price: 40600.00, location: "Gloster, MS", category: "Cars", image: "car.jpg" },
    { id: 3, title: "Apple iMac Retina 4K", price: 800.00, location: "Rochelle Park", category: "Computers", image: "computer.jpg" },
    { id: 4, title: "Apple HomePod Mini - Black", price: 70.00, location: "Warrensville Heights", category: "Electronics", image: "mimi.jpg" },
    { id: 5, title: "Fossil Sport Smartwatch", price: 50.00, location: "Port Barre", category: "Wearables", image: "watch.jpg" }
];

// DOM elements
const adCardsContainer = document.querySelector('.ad-cards');
const categoryNavItems = document.querySelectorAll('.category-item'); // Category buttons
const locationButton = document.querySelector('.location-button');
const loginButton = document.querySelector('.login-button');
const postAdButton = document.querySelector('.post-ad-button');
const searchInput = document.querySelector('.header-right input');

// Function to render ads based on filtered data
function renderAds(ads) {
    adCardsContainer.innerHTML = ''; // Clear existing ads
    ads.forEach(ad => {
        const adCard = document.createElement('div');
        adCard.classList.add('ad-card');
        
        adCard.innerHTML = `
            <span class="featured">FEATURED</span>
            <img src="${ad.image}" alt="${ad.title}">
            <p class="price">$${ad.price.toFixed(2)}</p>
            <p class="description">${ad.title}</p>
            <p class="location">Location: ${ad.location}</p>
        `;
        
        adCardsContainer.appendChild(adCard);
    });
}

// Initial render with all ads
renderAds(adsData);

// Event listener for category selection
categoryNavItems.forEach(item => {
    item.addEventListener('click', () => {
        const selectedCategory = item.getAttribute('data-category');
        
        // Filter ads based on selected category
        const filteredAds = selectedCategory === 'all' 
            ? adsData // Show all ads
            : adsData.filter(ad => ad.category === selectedCategory); // Filter by category
        
        renderAds(filteredAds); // Re-render filtered ads
        
        // Highlight active category
        categoryNavItems.forEach(navItem => navItem.classList.remove('active'));
        item.classList.add('active');
    });
});

// Event listener for location selection
locationButton.addEventListener('click', () => {
    const newLocation = prompt("Enter your location:");
    if (newLocation) {
        locationButton.innerText = newLocation;
    }
});

// Event listener for login button
loginButton.addEventListener('click', () => {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");
    if (username && password) {
        alert(`Welcome, ${username}! You are now logged in.`);
    } else {
        alert("Login failed. Please enter both username and password.");
    }
});

// Event listener for "Post Your Ad" button
postAdButton.addEventListener('click', () => {
    const title = prompt("Enter the title of your ad:");
    const price = parseFloat(prompt("Enter the price of the item:"));
    const location = prompt("Enter the location:");
    const category = prompt("Enter the category:");

    // Create an input element for image upload
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.accept = 'image/*';  // Only accept image files
    imageInput.style.display = 'block';
    
    // Handle the image upload
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const newAd = {
                    id: adsData.length + 1,
                    title: title,
                    price: price,
                    location: location,
                    category: category,
                    image: event.target.result // Base64 image data
                };
                adsData.push(newAd);
                renderAds(adsData); // Re-render all ads including the new one
                alert("Your ad has been posted successfully!");
            };
            reader.readAsDataURL(file);  // Convert the image to base64 and store it
        }
    });

    // Append the file input to the body so the user can select an image
    document.body.appendChild(imageInput);
    imageInput.click();  // Open the file dialog
});

// Event listener for search input
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredAds = adsData.filter(ad => ad.title.toLowerCase().includes(searchTerm));
    renderAds(filteredAds);
});
