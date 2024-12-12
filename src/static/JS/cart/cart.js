const currentUrl = window.location.pathname;
const userId = currentUrl.split('/')[2];

let cartItems = [];

async function fetchCartData() {
    try {
        const response = await fetch(`http://localhost:8000/cart/user/${userId}`);
        const data = await response.json();
        
        cartItems = data.cart.products.map((product, index) => ({
            id: index + 1,
            name: product.name,
            size: product.size,
            price: Math.round(product.price),
            quantity: product.quantity,
            image: product.image
        }));

        updateCart();
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }
}

const cartItemsContainer = document.getElementById('cart-items');
const orderSummaryContainer = document.getElementById('order-summary');
const checkoutButton = document.getElementById('checkout-btn');

function updateCart() {
    cartItemsContainer.innerHTML = '';
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center mb-5 pb-4 border-b border-gray-200';
        itemElement.innerHTML = `
            <div class="flex gap-4 items-center">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
                <div>
                    <h3 class="text-lg font-semibold mb-1 text-black">${item.name}</h3>
                    <p class="text-gray-600">Size: ${item.size}</p>
                    <p class="text-base font-bold text-black">₹${item.price}</p>
                </div>
            </div>
            <div class="flex items-center gap-2.5">
                <button class="decrease-quantity bg-gray-200 px-2 py-1 rounded text-black hover:bg-gray-300" data-id="${item.id}">-</button>
                <span class="text-black">${item.quantity}</span>
                <button class="increase-quantity bg-gray-200 px-2 py-1 rounded text-black hover:bg-gray-300" data-id="${item.id}">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    attachQuantityListeners();
    updateOrderSummary();
}

function attachQuantityListeners() {
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', () => updateQuantity(button.dataset.id, -1));
    });
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', () => updateQuantity(button.dataset.id, 1));
    });
}

async function updateQuantity(itemId, change) {
    const item = cartItems.find(item => item.id == itemId);
    if (item) {
        const newQuantity = item.quantity + change;
        const productIndex = itemId - 1;

        if (newQuantity <= 0) {
            try {
                const deleteResponse = await fetch(`http://localhost:8000/cart/remove/${userId}/${productIndex}`, {
                    method: 'DELETE'
                });

                if (deleteResponse.ok) {
                    await fetchCartData();
                }
            } catch (error) {
                console.error('Error removing product:', error);
            }
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/cart/update/${userId}/${productIndex}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: newQuantity,
                    size: "XL"
                })
            });

            if (response.ok) {
                await fetchCartData();
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    }
}


function updateOrderSummary() {
    let subtotal = 0;
    let itemsHtml = '';

    cartItems.forEach(item => {
        const itemTotal = Math.round(item.price * item.quantity);
        subtotal += itemTotal;
        itemsHtml += `
            <div class="flex justify-between text-gray-600">
                <span>${item.name} (${item.quantity}):</span>
                <span>₹${itemTotal}</span>
            </div>`;
    });

    const discount = subtotal > 700 ? 200 : 0;
    const total = subtotal - discount;

    orderSummaryContainer.innerHTML = `
        <div class="space-y-2 mb-4">
            ${itemsHtml}
        </div>
        <div class="border-t border-gray-200 pt-4 space-y-2">
            <div class="flex justify-between font-bold text-black">
                <span>Subtotal:</span>
                <span>₹${subtotal}</span>
            </div>
            <div class="flex justify-between text-gray-600">
                <span>Discount:</span>
                <span>-₹${discount}</span>
            </div>
            <div class="flex justify-between font-bold text-lg text-black">
                <span>Total:</span>
                <span>₹${total}</span>
            </div>
        </div>
    `;
}

checkoutButton.addEventListener('click', () => {
    window.location.href = '/cart/checkout';
});

fetchCartData();