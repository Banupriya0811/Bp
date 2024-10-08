document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    const cartDetails = document.getElementById('cart-details');
    const totalAmount = document.getElementById('total-amount');
    const checkoutButton = document.getElementById('checkout-btn');
    const orderStatus = document.getElementById('order-status');

    // Add to Cart
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function () {
            const restaurant = this.dataset.restaurant;
            const item = this.dataset.item;
            const price = parseFloat(this.dataset.price);
            
            cart.push({ restaurant, item, price });
            updateCart();
        });
    });

    // Update Cart
    function updateCart() {
        cartDetails.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.item} from ${item.restaurant} - $${item.price.toFixed(2)}`;
            cartDetails.appendChild(div);
            total += item.price;
        });

        totalAmount.textContent = `Total Amount: $${total.toFixed(2)}`;
        checkoutButton.disabled = cart.length === 0;
    }

    // Handle rating
    document.querySelectorAll('.rating').forEach(select => {
        select.addEventListener('change', function () {
            const rating = this.value;
            const item = this.dataset.item;
            const restaurant = this.dataset.restaurant;
            console.log(`User rated ${item} from ${restaurant} as ${rating} stars`);
        });
    });

    // Checkout Process
    checkoutButton.addEventListener('click', function () {
        const address = document.getElementById('delivery-address').value;
        const paymentMethod = document.getElementById('payment-method').value;
        const cardNumber = document.getElementById('card-number').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCVC = document.getElementById('card-cvc').value;

        // Simple validation
        if (!address || (paymentMethod === 'credit-card' && (!cardNumber || !cardExpiry || !cardCVC))) {
            orderStatus.textContent = 'Please fill all required fields!';
            return;
        }

        // Simulate order processing
        orderStatus.textContent = `Order placed! Delivering to: ${address}. Total Amount: $${totalAmount.textContent.split('$')[1]}`;
        
        // Clear cart
        cart.length = 0;
        updateCart();
        document.getElementById('delivery-address').value = '';
        document.getElementById('card-number').value = '';
        document.getElementById('card-expiry').value = '';
        document.getElementById('card-cvc').value = '';
    });
});
