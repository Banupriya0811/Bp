document.addEventListener('DOMContentLoaded', () => {
    const orderDetails = document.getElementById('order-details');
    const deliveryAddressInput = document.getElementById('delivery-address');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const orderStatus = document.getElementById('order-status');
    
    let orders = [];

    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', () => {
            const restaurant = button.getAttribute('data-restaurant');
            const item = button.getAttribute('data-item');
            const price = button.getAttribute('data-price');

            // Add to orders array
            orders.push({ restaurant, item, price });

            // Update order details
            updateOrderDetails();
            checkIfOrderCanBePlaced();
        });
    });

    deliveryAddressInput.addEventListener('input', checkIfOrderCanBePlaced);

    placeOrderBtn.addEventListener('click', () => {
        const address = deliveryAddressInput.value;

        if (orders.length > 0 && address) {
            orderStatus.textContent = `Order placed! Your food will be delivered to ${address}.`;
            resetOrder();
        }
    });

    function updateOrderDetails() {
        orderDetails.innerHTML = ''; // Clear current order details

        if (orders.length === 0) {
            orderDetails.innerHTML = '<p>No items ordered yet.</p>';
            return;
        }

        // Display each order
        orders.forEach(order => {
            const orderElement = document.createElement('p');
            orderElement.textContent = `${order.item} from ${order.restaurant} - $${order.price}`;
            orderDetails.appendChild(orderElement);
        });
    }

    function checkIfOrderCanBePlaced() {
        const address = deliveryAddressInput.value.trim();
        placeOrderBtn.disabled = orders.length === 0 || address === '';
    }

    function resetOrder() {
        orders = [];
        updateOrderDetails();
        deliveryAddressInput.value = '';
        placeOrderBtn.disabled = true;
    }
});
