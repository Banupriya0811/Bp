document.addEventListener('DOMContentLoaded', function () {
    const deliveryAddressInput = document.getElementById('delivery-address');
    const paymentMethodSelect = document.getElementById('payment-method');
    const cardNumberInput = document.getElementById('card-number');
    const cardExpiryInput = document.getElementById('card-expiry');
    const cardCvcInput = document.getElementById('card-cvc');
    const checkoutBtn = document.getElementById('checkout-btn');
    const totalAmount = document.getElementById('total-amount');
    const cartDetails = document.getElementById('cart-details');
    const orderStatus = document.getElementById('order-status');

    let cart = [];

    // Event listener for add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function () {
            const restaurant = button.getAttribute('data-restaurant');
            const item = button.getAttribute('data-item');
            const price = button.getAttribute('data-price');

            // Add to cart array
            cart.push({ restaurant, item, price });

            // Update cart details and total
            updateCartDetails();
            updateTotal();
            checkIfCheckoutCanBeProcessed();
        });
    });

    // Event listener for rating selection
    document.querySelectorAll('.rating').forEach(select => {
        select.addEventListener('change', function () {
            const item = this.getAttribute('data-item');
            const restaurant = this.getAttribute('data-restaurant');
            const rating = this.value;

            console.log(`Rated ${item} from ${restaurant} as ${rating} stars.`);
        });
    });

    // Event listener for delivery address input
    deliveryAddressInput.addEventListener('input', checkIfCheckoutCanBeProcessed);
    cardNumberInput.addEventListener('input', checkIfCheckoutCanBeProcessed);
    cardExpiryInput.addEventListener('input', checkIfCheckoutCanBeProcessed);
    cardCvcInput.addEventListener('input', checkIfCheckoutCanBeProcessed);
    paymentMethodSelect.addEventListener('change', handlePaymentMethodChange);

    // Event listener for checkout button
    checkoutBtn.addEventListener('click', () => {
        const address = deliveryAddressInput.value;
        const cardNumber = cardNumberInput.value;
        const cardExpiry = cardExpiryInput.value;
        const cardCvc = cardCvcInput.value;

        if (cart.length > 0 && address && cardNumber && cardExpiry && cardCvc) {
            // Here you would typically process the payment with an API
            orderStatus.textContent = `Order placed! Your food will be delivered to ${address}. Total: $${getTotal()}`;
            resetCart();
        } else {
            orderStatus.textContent = "Please fill in all fields correctly.";
        }
    });

    // Update cart details
    function updateCartDetails() {
        cartDetails.innerHTML = ''; // Clear current cart details

        if (cart.length === 0) {
            cartDetails.innerHTML = '<p>No items in cart yet.</p>';
            return;
        }

        // Display each item in the cart
        cart.forEach(order => {
            const orderElement = document.createElement('p');
            orderElement.textContent = `${order.item} from ${order.restaurant} - $${order.price}`;
            cartDetails.appendChild(orderElement);
        });
    }

    // Calculate total
    function getTotal() {
        return cart.reduce((total, order) => total + parseFloat(order.price), 0).toFixed(2);
    }

    // Update total amount display
    function updateTotal() {
        totalAmount.textContent = `Total Amount: $${getTotal()}`;
    }

    // Check if checkout can be processed
    function checkIfCheckoutCanBeProcessed() {
        const address = deliveryAddressInput.value;
        const cardNumber = cardNumberInput.value;
        const cardExpiry = cardExpiryInput.value;
        const cardCvc = cardCvcInput.value;

        checkoutBtn.disabled = !(cart.length > 0 && address && cardNumber && cardExpiry && cardCvc);
    }

    // Handle payment method change
    function handlePaymentMethodChange() {
        const paymentMethod = paymentMethodSelect.value;
        if (paymentMethod === 'credit-card') {
            cardNumberInput.style.display = 'block';
            cardExpiryInput.style.display = 'block';
            cardCvcInput.style.display = 'block';
        } else if (paymentMethod === 'paypal') {
            cardNumberInput.style.display = 'none';
            cardExpiryInput.style.display = 'none';
            cardCvcInput.style.display = 'none';
        }
    }

    // Reset cart
    function resetCart() {
        cart = [];
        updateCartDetails();
        updateTotal();
        deliveryAddressInput.value = '';
        cardNumberInput.value = '';
        cardExpiryInput.value = '';
        cardCvcInput.value = '';
        checkoutBtn.disabled = true;
    }
});
