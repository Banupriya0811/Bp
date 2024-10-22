const products = [
    {
        name: 'Luxury Apartment in NYC',
        description: 'A beautiful luxury apartment located in the heart of New York City.',
        price: '$1,200,000',
        category: 'real-estate',
        location: 'ny',
        image:" https://orelpc.com/blog/top-10-luxury-apartments-in-chennai",
        rating: 4.5
    },
    {
        name: 'Delicious Italian Restaurant',
        description: 'Enjoy authentic Italian cuisine with a great atmosphere.',
        price: '$50',
        category: 'restaurant',
        location: 'la',
        image: null,
        rating: 4.8
    },
    {
        name: 'Organic Grocery Store',
        description: 'Fresh organic products delivered daily.',
        price: '$25',
        category: 'grocery',
        location: 'sf',
        image: null,
        rating: 4.7
    },
    {
        name: 'Used Car Deal',
        description: 'A reliable used car at an affordable price.',
        price: '$15,000',
        category: 'car-deals',
        location: 'tx',
        image: null,
        rating: 4.2
    },
];

// Function to display products
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = ''; // Clear existing products

    productsToDisplay.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        
        const imageUrl = product.image ? URL.createObjectURL(product.image) : 'https://via.placeholder.com/250';
        
        productItem.innerHTML = `
            <img src="${imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price}</p>
            <p class="rating">Rating: ${product.rating || 'N/A'} ⭐</p>
            <button class="buy-now-btn" data-product='${JSON.stringify(product)}'>Buy Now</button>
        `;
        
        // Add event listener for "Buy Now" button
        const buyNowButton = productItem.querySelector('.buy-now-btn');
        buyNowButton.onclick = function () {
            const productData = JSON.parse(buyNowButton.getAttribute('data-product'));
            alert(`You are about to buy: ${productData.name}\nPrice: ${productData.price}`);
        };

        productsGrid.appendChild(productItem);
    });
}

// Show modal for posting ads
document.getElementById('post-ad-btn').onclick = () => {
    document.getElementById('post-ad-modal').style.display = 'block';
};

// Close modal
document.querySelector('.close-btn').onclick = () => {
    document.getElementById('post-ad-modal').style.display = 'none';
};

// Post Ad Form Submission
document.getElementById('post-ad-form').onsubmit = function (e) {
    e.preventDefault(); // Prevent page refresh

    const title = document.getElementById('ad-title').value;
    const description = document.getElementById('ad-description').value;
    const price = document.getElementById('ad-price').value;
    const category = document.getElementById('ad-category').value;
    const location = document.getElementById('ad-location').value;
    const adImageInput = document.getElementById('ad-image');

    products.push({
        name: title,
        description,
        price,
        category,
        location,
        image: adImageInput.files[0],
        rating: 0 // Initialize rating
    });

    document.getElementById('post-ad-form').reset();
    document.getElementById('post-ad-modal').style.display = 'none';
    displayProducts(products); // Display updated products
};

// Search functionality
document.getElementById('search-btn').onclick = function () {
    const keyword = document.getElementById('keyword-filter').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const location = document.getElementById('location-filter').value;

    const filteredProducts = products.filter(product => {
        const matchesKeyword = product.name.toLowerCase().includes(keyword) || product.description.toLowerCase().includes(keyword);
        const matchesCategory = category === 'all' || product.category === category;
        const matchesLocation = location === 'all' || product.location === location;

        return matchesKeyword && matchesCategory && matchesLocation;
    });

    displayProducts(filteredProducts);
};

// Initialize with sample products
displayProducts(products);
