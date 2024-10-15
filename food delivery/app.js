let cart = [];
let totalAmount = 0;

// Add item to cart
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const restaurant = button.getAttribute('data-restaurant');
        const item = button.getAttribute('data-item');
        const price = parseFloat(button.getAttribute('data-price'));

        // Add item to cart
        cart.push({ restaurant, item, price });
        totalAmount += price;

        // Update cart display
        updateCart();
    });
});

// Update cart display
function updateCart() {
    const cartDetails = document.getElementById('cart-details');
    cartDetails.innerHTML = ''; // Clear current cart

    cart.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.item} from ${item.restaurant} - $${item.price}`;
        cartDetails.appendChild(div);
    });

    document.getElementById('total-amount').textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
    document.getElementById('checkout-btn').disabled = cart.length === 0; // Enable checkout if cart is not empty
}

// Checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
    const deliveryAddress = document.getElementById('delivery-address').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (!deliveryAddress) {
        alert('Please enter your delivery address.');
        return;
    }

    // Simulate order placement
    const orderStatus = document.getElementById('order-status');
    orderStatus.textContent = `Order placed! Total: $${totalAmount.toFixed(2)}. Delivery to: ${deliveryAddress}. Payment Method: ${paymentMethod}.`;

    // Reset cart and total
    cart = [];
    totalAmount = 0;
    updateCart();
});
