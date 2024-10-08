
// Function to update the order details displayed on the page
function updateOrderDetails() {
    const orderDetails = document.getElementById('order-details');
    orderDetails.innerHTML = '';

    // Display the restaurant name
    const restaurantName = document.createElement('p');
    rest// Object to hold the current order details
let order = {
    restaurant: '',
    items: []
};

// Event listener for all order buttons
const orderButtons = document.querySelectorAll('.order-btn');
orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        const restaurant = button.getAttribute('data-restaurant');
        const item = button.getAttribute('data-item');
        const price = button.getAttribute('data-price');

        // If the user selects food from a different restaurant, prompt to reset the order
        if (order.restaurant !== restaurant && order.items.length > 0) {
            if (!confirm('Your previous order will be cleared. Do you want to continue?')) {
                return;
            }
            order.items = [];  // Clear the existing order
        }

        // Set the restaurant name in the order
        order.restaurant = restaurant;

        // Add the selected item to the order
        order.items.push({ item, price });

        // Update the displayed order details
        updateOrderDetails();

        // Enable the "Place Order" button
        document.getElementById('place-order-btn').disabled = false;
    });
});aurantName.innerText = `Restaurant: ${order.restaurant}`;
    orderDetails.appendChild(restaurantName);

    // Create a list of ordered items
    const itemList = document.createElement('ul');
    order.items.forEach(orderItem => {
        const item = document.createElement('li');
        item.innerText = `${orderItem.item} - $${orderItem.price}`;
        itemList.appendChild(item);
    });
    orderDetails.appendChild(itemList);
}

// Event listener for the "Place Order" button
document.getElementById('place-order-btn').addEventListener('click', () => {
    // Calculate the total cost of the order
    const total = order.items.reduce((sum, item) => sum + parseFloat(item.price), 0);
    
    // Display the total and order status
    document.getElementById('order-status').innerText = `Your order has been placed! Total: $${total.toFixed(2)}`;

    // Reset the order object
    order = { restaurant: '', items: [] };

    // Clear the order details displayed on the page
    document.getElementById('order-details').innerHTML = '<p>No items ordered yet.</p>';

    // Disable the "Place Order" button again
    document.getElementById('place-order-btn').disabled = true;
});
