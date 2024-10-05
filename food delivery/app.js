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

        // If a new restaurant is selected, reset the order
        if (order.restaurant !== restaurant && order.items.length > 0) {
            if (!confirm('Your previous order will be cleared. Do you want to continue?')) {
                return;
            }
            order.items = [];
        }

        order.restaurant = restaurant;
        order.items.push({ item, price });

        // Update order details on the page
        updateOrderDetails();

        // Enable place order button
        document.getElementById('place-order-btn').disabled = false;
    });
});

// Update order details on the page
function updateOrderDetails() {
    const orderDetails = document.getElementById('order-details');
    orderDetails.innerHTML = '';

    const restaurantName = document.createElement('p');
    restaurantName.innerText = `Restaurant: ${order.restaurant}`;
    orderDetails.appendChild(restaurantName);

    const itemList = document.createElement('ul');
    order.items.forEach(orderItem => {
        const item = document.createElement('li');
        item.innerText = `${orderItem.item} - $${orderItem.price}`;
        itemList.appendChild(item);
    });
    orderDetails.appendChild(itemList);
}

// Event listener for place order button
document.getElementById('place-order-btn').addEventListener('click', () => {
    const total = order.items.reduce((sum, item) => sum + parseFloat(item.price), 0);
    document.getElementById('order-status').innerText = `Your order has been placed! Total: $${total.toFixed(2)}`;

    // Reset the order
    order = { restaurant: '', items: [] };
    document.getElementById('order-details').innerHTML = '<p>No items ordered yet.</p>';
    document.getElementById('place-order-btn').disabled = true;
});
